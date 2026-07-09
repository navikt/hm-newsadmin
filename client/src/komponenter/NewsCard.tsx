import { LinkCard } from '@navikt/ds-react'
import { NewsDTO } from 'utils/admin-util.ts'
import { useNavigate } from 'react-router-dom'
import NewsImage from 'komponenter/NewsImage.tsx'
import NewsCardFooter from 'komponenter/NewsCardFooter.tsx'

export default function NewsCard({ news, searchParams }: { news: NewsDTO; searchParams: URLSearchParams }) {
  const navigate = useNavigate()
  const returnTo = searchParams.toString()
  return (
    <LinkCard
      onClick={() => navigate(`/aktuelt/${news.id}/edit${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`)}
      style={{ minHeight: '490px' }}
    >
      <LinkCard.Image aspectRatio="16/9">
        <NewsImage fontSize="5rem" aria-hidden imageUrl={news.image_url} tags={news.tags} />
      </LinkCard.Image>
      <LinkCard.Title
        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {news.title}
      </LinkCard.Title>
      <LinkCard.Description
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 5,
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
