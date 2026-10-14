import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response, Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

import { auth } from './auth'
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
      .use(auth)
      .use(newsProxy)
      .use(loginRedirect)
      .get('/settings.js', (_, res) => {
        const appSettings = {
          VITE_HM_REGISTER_URL: process.env.VITE_HM_REGISTER_URL,
          VITE_IMAGE_PROXY_URL: process.env.VITE_IMAGE_PROXY_URL,
          VITE_FARO_URL: process.env.VITE_FARO_URL,
          USE_MSW: process.env.USE_MSW === 'true',
          MILJO: process.env.NAIS_CLUSTER_NAME || 'local',
        }
        res.type('.js')
        res.send(`window.appSettings = ${JSON.stringify(appSettings)}`)
      })
      .get('*splat', express.static(config.build_path))
      .get('*splat', function (req, res) {
        console.info('res:', res.getHeaders())
        res.sendFile('index.html', { root: config.build_path })
      })
  }
}

const loginRedirect = (req: Request, res: Response, next: NextFunction) => {
    if (res.statusCode === 401) {
      const redirect = req.headers.referer || config.public_origin_redirect
      const loginUrl = `https://${req.host}/oauth2/login?redirect=${redirect}`
      console.info('redirect')
      res.redirect(loginUrl)
    }
    return next()
}