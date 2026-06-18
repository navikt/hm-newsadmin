export {}

declare global {
  interface Window {
    appSettings: {
      USE_MSW?: boolean
      GIT_COMMIT?: string
      MILJO?: 'local' | 'dev-gcp' | 'prod-gcp' | string
      VITE_HM_REGISTER_URL?: string
      VITE_IMAGE_PROXY_URL?: string
      VITE_HM_REGISTER_EXTERNAL_URL?: string
      VITE_IMAGE_PROXY_EXTERNAL_URL?: string
      VITE_FARO_URL?: string
    }
  }
}
