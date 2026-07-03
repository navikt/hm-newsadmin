import { toHaveNoViolations } from 'jest-axe'
import { expect, vi } from 'vitest'

import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
expect.extend(toHaveNoViolations)

vi.mock('environments', () => ({
  HM_REGISTER_URL: vi.fn(() => 'http://localhost:8080'),
  VITE_HM_REGISTER_URL: vi.fn(() => 'http://localhost:8082/imageproxy'),
}))
