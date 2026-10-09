import cookieParser from 'cookie-parser'
import express, { NextFunction, type Request, RequestHandler, type Response, Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { getToken, parseAzureUserToken, requestOboToken, validateToken } from '@navikt/oasis'

import { config } from './config'
import { createMetrics } from './metrics'

export const routes = {
  internal(): Router {
    const metrics = createMetrics()
    return Router()
      .get('/isalive', (_, res) => res.send('alive'))
      .get('/isready', (_, res) => res.send('ready'))
      .get('/metrics', async (req, res) => {
        res.set('Content-Type', metrics.contentType)
        res.end(await metrics.metrics())
      })
  },
  public(): Router {
    const newsProxy = createProxyMiddleware({
      target: process.env.HM_NEWS_URL,
      changeOrigin: true,
      pathFilter: config.proxy_path_filter,
    })

    return Router()
      .use(cookieParser())
      .use(newsProxy)
      .use(auth)
      .get('/settings.js', (_, res) => {
        const appSettings = {
          VITE_HM_REGISTER_URL: process.env.VITE_HM_REGISTER_URL,
          VITE_IMAGE_PROXY_URL: process.env.VITE_IMAGE_PROXY_URL,
          VITE_FARO_URL: process.env.VITE_FARO_URL,
          USE_MSW: process.env.USE_MSW === 'true',
          MILJO: process.env.NAIS_CLUSTER_NAME,
        }
        res.type('.js')
        res.send(`window.appSettings = ${JSON.stringify(appSettings)}`)
      })
      .get('*splat', express.static(config.build_path))
      .get('*splat', function (req, res) {
        res.sendFile('index.html', { root: config.build_path })
      })
  },

}


const auth = (): RequestHandler => async (req: Request, res: Response, next)=> {
  console.log("auth")

  const isLocal = process.env.NODE_ENV === 'development'
  const buildenv = process.env.BUILD_ENV

  const pathname = req.path
  const origin = req.host
  const loginUrl = `${origin}/oauth2/login?redirect=${pathname}`

  if (isLocal) {
    return localDev(pathname, req, next)
  }

  const token = getToken(req.headers.authorization ?? "")
  if (!token) {
    return res.redirect(loginUrl)
  }

  const validationResult = await validateToken(token)
  if (!validationResult.ok && validationResult.errorType === 'token expired') {
    return res.redirect(loginUrl)
  } else if (!validationResult.ok) {
    console.log('validation not ok:', validationResult.error)
    return errorResponse('token validation')
  }

    const categoryAdminGroupProd = 'a6d5a807-6173-4654-9317-8b196cccef5d'
    const categoryAdminGroupDev = 'da88f4ec-23b3-427b-87c5-e890b7d02519'
    let group = ''
    if (buildenv === 'prod') {
      group = categoryAdminGroupProd
    } else if (buildenv === 'dev') {
      group = categoryAdminGroupDev
    }

    const azureToken = parseAzureUserToken(token)
    if (!azureToken.ok) {
      console.log('azuretoken not ok: ', azureToken.error)
      return errorResponse('azure token not ok')
    } else if (azureToken.ok && (!azureToken.groups || !azureToken.groups.includes(group))) {
      console.log('not a member of correct azure group')
      return res.redirect(`${origin}/tilgang`)
    }

  if (pathname.startsWith("/admin")) {
    const audience = process.env.NEWS_AUDIENCE
    const destination = process.env.HM_NEWS_URL + pathname

    if (!audience) {
      console.log('ingen miljøvariabler for backend_audience')
      return errorResponse('no audience')
    }

    const obo = await requestOboToken(token, audience)
    if (!obo.ok) {
      console.log('obo not ok:', obo.error)
      return errorResponse('obo token not ok')
    }

    // @ts-ignore
    return await fetch(new Request(destination, req), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${obo.token}`,
      },
    })
  }

  return next()
}

const localDev = async (pathname: string, request: Request, next: NextFunction) => {
  console.log("localdev")

  if (pathname.startsWith("/admin")) {
    const destination = process.env.HM_NEWS_URL + pathname

    const devtoken = process.env.DEV_TOKEN

    // @ts-ignore
    return await fetch(new Request(destination, request), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${devtoken}`,
      },
    })
  }

  return next()
}

const errorResponse = (cause: string) => {
  return Response.json({ success: false, message: `Server error from ${cause}}` }, { status: 500 })
}