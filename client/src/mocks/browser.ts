import { resetPasswordHandler } from 'mocks/handlers/resetPasswordHandler'
import { tilGodkjenningHandlers } from 'mocks/handlers/tilGodkjenningHandler'
import { unleashHandler } from 'mocks/handlers/unleashHandler'
import { RequestHandler } from 'msw'
import { setupWorker } from 'msw/browser'

const handlers: RequestHandler[] = [...tilGodkjenningHandlers, ...unleashHandler, ...resetPasswordHandler]

export const worker = setupWorker(...handlers)
