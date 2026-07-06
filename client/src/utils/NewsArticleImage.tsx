import { Bleed, Box } from '@navikt/ds-react'
import { largeImageLoader } from 'utils/image-util'
import { useState } from 'react'

export default function NewsArticleImage({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const [error, setError] = useState(false)

  if (error) return null

  return (
    <Bleed marginInline="space-64">
      <Box
        style={{ width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}
        borderRadius="12"
      >
        <img
          src={largeImageLoader(imageUrl)}
          alt={alt}
          onError={() => setError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Bleed>
  )
}
