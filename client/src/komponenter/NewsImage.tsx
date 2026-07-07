import { Box } from '@navikt/ds-react'
import { NewspaperIcon } from '@navikt/aksel-icons'
import { mediumImageLoader } from 'utils/image-util.ts'

type NewsImageProps = {
  imageUrl?: string
  fontSize?: string
  alt?: string
  tags?: string[]
}

function getDefaultImageUrl(tags?: string[]): string | null {
  if (!tags) return null
  const lower = tags.map((t) => t.toLowerCase())
  if (lower.some((t) => t.includes('nyhetsbrev'))) return '/default-nyhetsbrev.svg'
  if (lower.some((t) => t.includes('rammeavtale'))) return '/default-rammeavtale.svg'
  return null
}

export default function NewsImage({ fontSize = '5rem', alt, imageUrl, tags }: NewsImageProps) {
  const src = imageUrl ? mediumImageLoader(imageUrl) : getDefaultImageUrl(tags)

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    )
  }
  return (
    <Box
      style={{
        backgroundColor: 'var(--ax-bg-neutral-soft)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NewspaperIcon fontSize={fontSize} aria-hidden opacity={'5%'} />
    </Box>
  )
}
