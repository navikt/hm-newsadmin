'use client'

export enum umami_customevents {
  VISIT = 'besøk',
  ERROR_URL = 'feil ved url',
  CLICK = 'knapp klikket',
  NAVIGATE = 'navigere',
  FILTER_CHANGED = 'filter-endret',
}

type LogEvent = (params: { name: string; data?: any }) => void

let umamiLogger: LogEvent | undefined = undefined

const APP_NAME = 'hm-finnhjelpemiddel-adminregister'
const TEAM_NAME = 'teamdigihot'
const UMAMI_TRACKING_ID_DEV = 'd2c4d342-5355-4dbc-9c0e-6d6498f4f4e1'
const UMAMI_TRACKING_ID_PROD = 'a3d9368d-1e78-4002-88f2-ec66909a4d5b'
const UMAMI_DATA_DOMAIN =
  window.appSettings.MILJO === 'prod-gcp' || window.appSettings.MILJO === 'dev-gcp'
    ? 'https://umami.nav.no'
    : 'http://localhost:3000'
console.debug(UMAMI_DATA_DOMAIN)

export const initUmami = () => {
  const UMAMI_WEBSITE_ID = window.appSettings.MILJO
    ? window.appSettings.MILJO === 'prod-gcp'
      ? UMAMI_TRACKING_ID_PROD
      : window.appSettings.MILJO === 'dev-gcp'
        ? UMAMI_TRACKING_ID_DEV
        : 'mock'
    : 'mock'

  // Ikke last Umami i lokalt miljø eller hvis det er deaktivert
  if (!UMAMI_WEBSITE_ID) {
    stopUmami()
    console.debug('Umami er deaktivert eller ikke konfigurert, laster ikke sporing.')
    return
  }
  if (UMAMI_WEBSITE_ID === 'mock') {
    umamiLogger = (params: { name: string; data?: any }) => {
      console.debug('[Mock Amplitude Event]', {
        name: params.name,
        data: {
          ...('data' in params.data ? params.data.data : {}),
          ...params.data,
        },
      })
    }
  } else {
    const script = document.createElement('script')
    script.src = 'https://cdn.nav.no/team-researchops/sporing/sporing.js'
    script.defer = true
    script.setAttribute('data-host-url', `${UMAMI_DATA_DOMAIN}`)
    script.setAttribute('data-website-id', `${UMAMI_WEBSITE_ID}`)
    script.setAttribute('data-auto-track', 'true')
    document.head.appendChild(script)
    console.debug(`Umami er initialisert med website ID: ${UMAMI_WEBSITE_ID} og data_domain: ${UMAMI_DATA_DOMAIN}`)
  }
}

export const stopUmami = () => {
  const umamiScript = document.querySelector('script[src="https://cdn.nav.no/team-researchops/sporing/sporing.js"]')

  if (umamiScript) {
    umamiScript.remove()
  }
}

export function logEvent(eventName: string, data?: object) {
  const umamiScript = document.querySelector('script[src="https://cdn.nav.no/team-researchops/sporing/sporing.js"]')
  setTimeout(() => {
    data = {
      app: APP_NAME,
      team: TEAM_NAME,
      ...data,
    }
    try {
      if (umamiScript) {
        umami.track(eventName, data)
      }
    } catch (error) {
      console.error(error)
    }
  })
}

export function logCustomEvent(event: umami_customevents, data?: any) {
  logEvent(event, {
    APP_NAME: APP_NAME,
    TEAM_NAME: TEAM_NAME,
    ...data,
  })
}

export function logNavigationEvent(component: string, destination: string, linkText: string) {
  logCustomEvent(umami_customevents.NAVIGATE, {
    component: component,
    destination: destination,
    linkText: linkText,
  })
}

export function logFilterChangeEvent(component: string, filterType: string, filterValue: string) {
  logCustomEvent(umami_customevents.FILTER_CHANGED, {
    component: component,
    filterType: filterType,
    filterValue: filterValue,
  })
}

export function logClickButton(buttonName: string, buttonType: string, buttonVariant: string) {
  logCustomEvent(umami_customevents.CLICK, {
    buttonName: buttonName,
    buttonType: buttonType,
    buttonVariant: buttonVariant,
  })
}

export function logVisit(url: string, pageTitle: string, pageType: string) {
  logEvent(umami_customevents.VISIT, {
    url: url,
    pageTitle: pageTitle,
    pageType: pageType,
  })
}

export function logErrorOnUrl(url: string) {
  logCustomEvent(umami_customevents.ERROR_URL, {
    url: url,
  })
}
