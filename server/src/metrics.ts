import { Registry, collectDefaultMetrics } from 'prom-client'

export function createMetrics(): Registry {
  const register = new Registry()
  collectDefaultMetrics({ register })
  return register
}
