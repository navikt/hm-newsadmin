import { IMAGE_PROXY_URL } from 'environments'

enum Size {
  SMALL = '400',
  MEDIUM = '800',
  LARGE = '1600',
}

const toProxyUrl = (src: string, size: Size) => {
  if (src.startsWith('data:')) return src
  return `${IMAGE_PROXY_URL()}/${size}d/${src}`
}

export const smallImageLoader = (src: string) => toProxyUrl(src, Size.SMALL)
export const mediumImageLoader = (src: string) => toProxyUrl(src, Size.MEDIUM)
export const largeImageLoader = (src: string) => toProxyUrl(src, Size.LARGE)
