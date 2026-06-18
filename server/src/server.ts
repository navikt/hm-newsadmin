import express from 'express'

import { config } from './config'
import { routes } from './routes'

const router = express.Router()
router.use('/internal/', routes.internal())
router.use('/', routes.public())

const app = express()
app.use(config.base_path, router)
app.listen(config.port, () => console.info(`Listening on port ${config.port}`))
