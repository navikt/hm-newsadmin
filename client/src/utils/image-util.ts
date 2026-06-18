import { IMAGE_PROXY_URL } from 'environments'

type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

enum Size {
  SMALL = '400',
  MEDIUM = '800',
  LARGE = '1600',
}

type ImageOptions = {
  src: string
  size: Size
}

const imageLoader = ({ src, size }: ImageOptions) => `${IMAGE_PROXY_URL()}/${size}d/${src}`

const imageLoaderAdvanced = ({ src, size }: ImageOptions) => {
  if (!src.startsWith('data:')) return imageLoader({ src, size })
  else {
    return src
  }
}

export const smallImageLoader = ({ src }: ImageLoaderProps) => imageLoaderAdvanced({ src, size: Size.SMALL })
export const mediumImageLoader = ({ src }: ImageLoaderProps) => imageLoaderAdvanced({ src, size: Size.MEDIUM })
const largeImageLoader = ({ src }: ImageLoaderProps) => imageLoaderAdvanced({ src, size: Size.LARGE })
