import { LinkCard, Tag, HStack } from '@navikt/ds-react'
import { NewsDTO } from 'utils/admin-util.ts'
import { useNavigate } from 'react-router-dom'
import NewsImage from 'NewsImage.tsx'
import { getNewsStatus, statusTagProps } from 'utils/news-filter-util.ts'

export default function NewsCard({ news }: { news: NewsDTO }) {
  const navigate = useNavigate()
  const status = getNewsStatus(news)
  const { label, color } = statusTagProps[status]
  return (
    <LinkCard onClick={() => navigate(`/news/${news.id}/edit`)} style={{ minHeight: '490px' }}>
      <LinkCard.Image aspectRatio="16/9">
        <NewsImage fontSize="5rem" aria-hidden imageUrl={news.image_url} />
      </LinkCard.Image>
      <LinkCard.Title>{news.title}</LinkCard.Title>
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
        <HStack gap={'space-4'} wrap justify={'space-between'} width={'100%'}>
          {news.tags?.map((tag) => (
            <Tag key={tag} data-color={'neutral'}>
              {tag}
            </Tag>
          ))}
          <Tag data-color={color}>{label}</Tag>
        </HStack>
      </LinkCard.Footer>
    </LinkCard>
  )
}
