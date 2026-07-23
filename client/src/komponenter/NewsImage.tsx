import { getDefaultAlt, getDefaultImageUrl, mediumImageLoader } from 'utils/image-util.ts'

import { NewspaperIcon } from '@navikt/aksel-icons'
import { Box } from '@navikt/ds-react'

type NewsImageProps = {
  imageUrl?: string
  fontSize?: string
  alt?: string
  tags?: string[]
}

export default function NewsImage({ fontSize = '5rem', alt, imageUrl, tags }: NewsImageProps) {
  const src = imageUrl ? mediumImageLoader(imageUrl) : getDefaultImageUrl(tags)
  const altText = alt ?? getDefaultAlt(tags)
  if (src) {
    return <img src={src} alt={altText ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }
  return (
    <Box
      style={{
        backgroundColor: 'var(--ax-bg-neutral-soft)',
        width: '100%',
        aspectRatio: '16/9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NewspaperIcon fontSize={fontSize} aria-hidden opacity={'5%'} />
    </Box>
  )
}
