import { NewsDTO } from 'utils/admin-util.ts'
import { displayStatusTagProps, getDisplayStatus } from 'utils/news-filter-util.ts'

import { BodyShort, HStack, Tag, VStack } from '@navikt/ds-react'

import './NewsCard.scss'

export default function NewsCardFooter({ news }: { news: NewsDTO }) {
  const { label, variant } = displayStatusTagProps[getDisplayStatus(news)]
  const publishedFrom = new Date(news.publishedFrom).toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const publishedTo = new Date(news.publishedTo).toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return (
    <VStack gap="space-8" width="100%">
      <BodyShort size={'small'} style={{ color: 'var(--ax-text-neutral-decoration)' }}>
        {`Fra: ${publishedFrom} - til: ${publishedTo}`}
      </BodyShort>
      <HStack gap={'space-4'} wrap justify={'space-between'} width={'100%'}>
        {news.tags?.map((tag) => (
          <Tag key={tag} variant="neutral">
            {tag}
          </Tag>
        ))}
        <Tag variant={variant}>{label}</Tag>
      </HStack>
    </VStack>
  )
}
