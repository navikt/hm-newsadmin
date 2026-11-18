import { vi } from 'vitest'

import '@testing-library/jest-dom/vitest'

vi.mock('environments', () => ({
  HM_REGISTER_URL: vi.fn(() => 'http://localhost:8080'),
  VITE_HM_REGISTER_URL: vi.fn(() => 'http://localhost:8082/imageproxy'),
}))
