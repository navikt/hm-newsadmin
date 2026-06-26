import { LinkCard, Tag, HStack } from '@navikt/ds-react'
import { NewsDTO } from 'utils/admin-util.ts'
import { useNavigate } from 'react-router-dom'
import NewsImage from 'NewsImage.tsx'

export default function NewsCard({ news }: { news: NewsDTO }) {
  const navigate = useNavigate()
  return (
    <LinkCard onClick={() => navigate(`/news/${news.id}/edit`)} style={{ minHeight: '490px' }}>
      <LinkCard.Image aspectRatio="16/9">
        <NewsImage fontSize="5rem" aria-hidden />
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
        <HStack gap={'space-4'} wrap>
          {news.tags?.map((tag) => (
            <Tag key={tag} size={'small'} variant={'moderate'} data-color={'neutral'}>
              {tag}
            </Tag>
          ))}
        </HStack>
      </LinkCard.Footer>
    </LinkCard>
  )
}
