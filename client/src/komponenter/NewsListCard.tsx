import { LinkCard, Tag, HStack, Box } from '@navikt/ds-react'
import { NewsDTO } from 'utils/admin-util.ts'
import { useNavigate } from 'react-router-dom'
import NewsImage from 'komponenter/NewsImage.tsx'
import { getDisplayStatus, displayStatusTagProps } from 'utils/news-filter-util.ts'
import './NewsListCard.scss'

export default function NewsListCard({ news }: { news: NewsDTO }) {
  const navigate = useNavigate()
  const { label, variant } = displayStatusTagProps[getDisplayStatus(news)]
  return (
    <LinkCard onClick={() => navigate(`/aktuelt/${news.id}/edit`)} className={'card'}>
      <Box className={'image'}>
        <NewsImage imageUrl={news.image_url} />
      </Box>
      <LinkCard.Title
        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {news.title}
      </LinkCard.Title>
      <LinkCard.Description
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {news.description}
      </LinkCard.Description>
      <LinkCard.Footer>
        <HStack gap="space-2" wrap justify={'space-between'} width="100%">
          {news.tags?.map((tag) => (
            <Tag key={tag} variant="neutral">
              {tag}
            </Tag>
          ))}
          <Tag variant={variant}>{label}</Tag>
        </HStack>
      </LinkCard.Footer>
    </LinkCard>
  )
}
