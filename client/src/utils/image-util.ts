import { IMAGE_PROXY_URL } from 'environments'
import { uploadNewsMedia } from 'utils/api-util.ts'

enum Size {
  SMALL = '400',
  MEDIUM = '800',
  LARGE = '1600',
}

const toProxyUrl = (src: string, size: Size) => {
  if (src.startsWith('data:')) return src
  return `${IMAGE_PROXY_URL()}/${size}d/${src}`
}

export const mediumImageLoader = (src: string) => toProxyUrl(src, Size.MEDIUM)

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export function getDefaultImageUrl(tags?: string[]): string | null {
  if (!tags) return null
  const lower = tags.map((t) => t.toLowerCase())
  if (lower.some((t) => t.includes('nyhetsbrev'))) return `${base}/default-nyhetsbrev.svg`
  if (lower.some((t) => t.includes('rammeavtale'))) return `${base}/default-rammeavtale.svg`
  return null
}

export function getDefaultAlt(tags?: string[]): string {
  if (!tags) return ''
  const lower = tags.map((t) => t.toLowerCase())
  if (lower.some((t) => t.includes('nyhetsbrev'))) return 'Standardbilde for nyhetsbrev'
  if (lower.some((t) => t.includes('rammeavtale'))) return 'Standardbilde for rammeavtale'
  return ''
}

export async function uploadImageFile(newsId: string, file: File | null): Promise<string | null> {
  if (!file) return null
  const media = await uploadNewsMedia(newsId, file)
  return media.uri ?? null
}
