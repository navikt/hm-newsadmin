import { defaultSeriesHandlers } from 'mocks/handlers/defaultSeriesHandlers'
import { setupServer } from 'msw/node'

export const server = setupServer(...defaultSeriesHandlers)
