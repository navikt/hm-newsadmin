import { toHaveNoViolations } from 'jest-axe'
import { server } from 'mocks/server'
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest'

import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

expect.extend(matchers)
expect.extend(toHaveNoViolations)

vi.mock('environments', () => ({
  HM_REGISTER_URL: vi.fn(() => 'http://localhost:8080'),
  VITE_HM_REGISTER_URL: vi.fn(() => 'http://localhost:8082/imageproxy'),
}))

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' })
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})
