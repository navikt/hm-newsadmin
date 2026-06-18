export const HM_REGISTER_URL = () => {
  if (window.location.hostname.includes('ansatt')) {
    return window.appSettings.VITE_HM_REGISTER_EXTERNAL_URL
  } else {
    return window.appSettings.VITE_HM_REGISTER_URL
  }
}
export const IMAGE_PROXY_URL = () => {
  if (window.location.hostname.includes('ansatt')) {
    return window.appSettings.VITE_IMAGE_PROXY_EXTERNAL_URL
  } else {
    return window.appSettings.VITE_IMAGE_PROXY_URL
  }
}
