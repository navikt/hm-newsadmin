import { Box } from '@navikt/ds-react'
import { NewspaperIcon } from '@navikt/aksel-icons'
import { mediumImageLoader } from 'utils/image-util.ts'
type NewsImageProps = {
  imageUrl?: string
  fontSize?: string
  alt?: string
}

export default function NewsImage({ fontSize = '5rem', alt, imageUrl }: NewsImageProps) {
  if (imageUrl) {
    return (
      <img
        src={mediumImageLoader(imageUrl)}
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
