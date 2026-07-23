import { Link } from 'react-router-dom'

import NewsCardFooter from 'komponenter/NewsCardFooter.tsx'
import NewsImage from 'komponenter/NewsImage.tsx'
import { NewsDTO } from 'utils/admin-util.ts'

import { Box, LinkCard } from '@navikt/ds-react'

import './NewsCard.scss'

interface NewsCardProps {
  news: NewsDTO
  searchParams: URLSearchParams
  variant?: 'grid' | 'list'
}

export default function NewsCard({ news, searchParams, variant = 'grid' }: NewsCardProps) {
  const query = searchParams.toString()
  const href = `/aktuelt/${news.id}/edit${query ? `?${query}` : ''}`
  const isList = variant === 'list'
  return (
    <LinkCard {...(isList ? { className: 'card' } : { style: { minHeight: '490px' } })}>
      {isList ? (
        <Box className={'image'}>
          <NewsImage aria-hidden imageUrl={news.imageUrl} tags={news.tags} />
        </Box>
      ) : (
        <LinkCard.Image aspectRatio="16/9">
          <NewsImage fontSize="5rem" aria-hidden imageUrl={news.imageUrl} tags={news.tags} />
        </LinkCard.Image>
      )}
      <LinkCard.Title
        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        <LinkCard.Anchor asChild>
          <Link to={href}>{news.title}</Link>
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description
        style={{
          display: '-webkit-box',
          WebkitLineClamp: isList ? 3 : 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {news.description}
      </LinkCard.Description>
      <LinkCard.Footer>
        <NewsCardFooter news={news} />
      </LinkCard.Footer>
    </LinkCard>
  )
}
