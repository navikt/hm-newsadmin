import {baseUrl} from "main.tsx";


export async function initMsw(): Promise<unknown> {
  if (!window.appSettings.USE_MSW) {
    return
  }

  const { worker } = await import('../mocks/browser')
  worker.listHandlers().forEach((handler) => {
    if (handler.kind === 'request') {
      console.log(handler.info.header)
    } else if (handler.kind === 'websocket') {
      console.log(handler.id)
    }
  })
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: baseUrl('/mockServiceWorker.js'),
    },
  })
}
