declare global {
  interface Window {
    SKYRA_CONFIG?: {
      org: string
      slug: string
    }
    skyra?: {
      controller: {
        stop: () => void
      }
      reload?: () => void
    }
    skyraSurvey?: object
  }
}
declare const window: typeof globalThis & Window

export const initSkyra = () => {
  window.SKYRA_CONFIG = {
    org: 'arbeids-og-velferdsetaten-nav',
    slug: 'arbeids-og-velferdsetaten-nav/digihot-lev-dashboard',
  }

  const script = document.createElement('script')
  script.src = 'https://survey.skyra.no/skyra-survey.js'
  script.async = true
  document.body.appendChild(script)
}

export const stopSkyra = () => {
  // Remove Skyra script from DOM
  const skyraScript = document.querySelector('script[src*="skyra-survey.js"]')

  if (window.SKYRA_CONFIG) {
    delete window.SKYRA_CONFIG
  }

  if (skyraScript) {
    skyraScript.remove()
  }

  // Remove Skyra object from window
  if (typeof window.skyra === 'object') {
    delete window.skyra
  }
}
