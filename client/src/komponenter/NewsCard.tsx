import { LinkCard, Box } from '@navikt/ds-react'
import { NewsDTO } from 'utils/admin-util.ts'
import { useNavigate } from 'react-router-dom'
import NewsImage from 'komponenter/NewsImage.tsx'
import NewsCardFooter from 'komponenter/NewsCardFooter.tsx'
import './NewsCard.scss'

interface NewsCardProps {
  news: NewsDTO
  searchParams: URLSearchParams
  variant?: 'grid' | 'list'
}

export default function NewsCard({ news, searchParams, variant = 'grid' }: NewsCardProps) {
  const navigate = useNavigate()
  const query = searchParams.toString()
  const isList = variant === 'list'
  return (
    <LinkCard
      onClick={() => navigate(`/aktuelt/${news.id}/edit${query ? `?${query}` : ''}`)}
      {...(isList ? { className: 'card' } : { style: { minHeight: '490px' } })}
    >
      {isList ? (
        <Box className={'image'}>
          <NewsImage imageUrl={news.imageUrl} tags={news.tags} />
        </Box>
      ) : (
        <LinkCard.Image aspectRatio="16/9">
          <NewsImage fontSize="5rem" aria-hidden imageUrl={news.imageUrl} tags={news.tags} />
        </LinkCard.Image>
      )}
      <LinkCard.Title
        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {news.title}
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
