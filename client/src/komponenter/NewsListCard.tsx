import { LinkCard, Tag, HStack, Box } from '@navikt/ds-react'
import { NewsDTO } from 'utils/admin-util.ts'
import { useNavigate } from 'react-router-dom'
import NewsImage from 'komponenter/NewsImage.tsx'
import { statusTagProps } from 'utils/news-filter-util.ts'

export default function NewsListCard({ news }: { news: NewsDTO }) {
  const navigate = useNavigate()
  const { label, variant } = statusTagProps[news.status]
  return (
    <LinkCard
      onClick={() => navigate(`/news/${news.id}/edit`)}
      style={{ height: '14rem', paddingInlineStart: '26rem' }}
    >
      <Box
        style={{
          position: 'absolute',
          overflow: 'hidden',
          borderTopLeftRadius: 'calc(var(--ax-radius-12) - 1px',
          borderBottomLeftRadius: 'calc(var(--ax-radius-12) - 1px)',
          left: 0,
          top: 0,
          bottom: 0,
          width: '400px',
        }}
      >
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
