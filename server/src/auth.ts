import { NextFunction, type Request, type Response } from 'express'

import { getToken, parseAzureUserToken, requestOboToken, validateToken } from '@navikt/oasis'
import { config } from './config'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  console.info('auth')
  const isLocal = process.env.NODE_ENV === 'development'
  const buildenv = process.env.BUILD_ENV

  const pathname = req.path
  const origin = req.host
  const loginUrl = `https://${origin}/oauth2/login?redirect=${config.public_origin_redirect}`
  
  if (isLocal) {
    return localDev(pathname, req, next)
  }

  const token = getToken(req)
  if (!token) {
    console.info('no token:', req.headers)
    res.redirect(loginUrl)
    return
  }

  const validationResult = await validateToken(token!)
  if (!validationResult.ok && validationResult.errorType === 'token expired') {
    res.redirect(loginUrl)
    return 
  } else if (!validationResult.ok) {
    console.info('validation not ok:', validationResult.error)
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

  const azureToken = parseAzureUserToken(token!)
  if (!azureToken.ok) {
    console.info('azuretoken not ok: ', azureToken.error)
    return errorResponse('azure token not ok')
  } else if (azureToken.ok && (!azureToken.groups || !azureToken.groups.includes(group))) {
    console.info('not a member of correct azure group')
    res.redirect(`${origin}/tilgang`)
    return 
  }

  if (pathname.startsWith('/admin')) {
    const audience = process.env.NEWS_AUDIENCE

    if (!audience) {
      console.info('ingen miljøvariabler for backend_audience')
      return errorResponse('no audience')
    }

    const obo = await requestOboToken(token!, audience)
    if (!obo.ok) {
      console.info('obo not ok:', obo.error)
      return errorResponse('obo token not ok')
    }
    req.headers['content-type'] = 'application/json'
    req.headers.authorization = `Bearer ${obo.token}`
  }

  return next()
}

const localDev = (pathname: string, request: Request, next: NextFunction) => {
  console.info('localdev')

  if (pathname.startsWith('/admin')) {
    const devtoken = process.env.DEV_TOKEN

    request.headers['content-type'] = 'application/json'
    request.headers.authorization = `Bearer ${devtoken}`
  }

  return next()
}

const errorResponse = (cause: string, res?: Response) => {
  return Response.json({ success: false, message: `Server error from ${cause}}` }, { status: 500 })
}
