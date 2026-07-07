import { Bleed, Box } from '@navikt/ds-react'
import { largeImageLoader } from 'utils/image-util.ts'
import { useState } from 'react'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function getDefaultImageUrl(tags?: string[]): string | null {
  if (!tags) return null
  const lower = tags.map((t) => t.toLowerCase())
  if (lower.some((t) => t.includes('nyhetsbrev'))) return `${base}/default-nyhetsbrev.svg`
  if (lower.some((t) => t.includes('rammeavtale'))) return `${base}/default-rammeavtale.svg`
  return null
}

export default function NewsArticleImage({ imageUrl, alt, tags }: { imageUrl?: string; alt: string; tags?: string[] }) {
  const [error, setError] = useState(false)

  const src = imageUrl && !error ? largeImageLoader(imageUrl) : getDefaultImageUrl(tags)

  if (!src) return null

  return (
    <Bleed marginInline="space-64">
      <Box style={{ width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }} borderRadius="12">
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Bleed>
  )
}
