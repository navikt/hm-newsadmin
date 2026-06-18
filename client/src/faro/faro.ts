import { Faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk'

let faro: Faro | null = null

export function initInstrumentation(): void {
  if (window.appSettings.MILJO === 'local') return
  if (typeof window === 'undefined' || faro !== null) return

  getFaro()
}

function getFaro(): Faro | null {
  if (faro != null) return faro
  faro = initializeFaro({
    paused: process.env.NODE_ENV !== 'production',
    url: window.appSettings.VITE_FARO_URL,
    app: {
      name: 'hm-adminregister',
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: false,
      }),
      // new TracingInstrumentation(),
    ],
  })
  return faro
}
