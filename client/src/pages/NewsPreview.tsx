import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { Button, Detail, Heading, HStack, Page, Skeleton, Tag, VStack, BodyLong } from '@navikt/ds-react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import NewsArticleImage from 'utils/NewsArticleImage.tsx'
import { NewsDTO } from 'utils/admin-util.ts'
import { displayStatusTagProps, getDisplayStatus } from 'utils/news-filter-util.ts'

export const NewsPreview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: news, isLoading } = useSWR<NewsDTO>(`/news/${id}`, () =>
    fetch(`/news/${id}`).then((res) => res.json())
  )

  if (isLoading) return <Skeleton variant="rectangle" height={400} />
  if (!news) return null

  const { label, variant } = displayStatusTagProps[getDisplayStatus(news)]

  return (
    <Page>
      <Page.Block as="main" width="text">
        <VStack gap="space-16" paddingBlock="space-16 space-24">
          <HStack align="center" style={{ position: 'relative' }}>
            <Button
              variant="tertiary"
              icon={<ArrowLeftIcon />}
              onClick={() => navigate(`/aktuelt/${id}/edit`)}
              style={{ position: 'absolute', right: '100%' }}
            >
              Tilbake
            </Button>
            <Heading size="medium">Forhåndsvisning</Heading>
          </HStack>
          {(news.image_url || news.tags?.length) && (
            <NewsArticleImage imageUrl={news.image_url} alt={news.title} tags={news.tags} />
          )}
          <Heading size="large">{news.title}</Heading>
          <HStack gap="space-8" align="center" wrap>
            {new Date(news.updated) > new Date(news.publishedFrom) && (
              <Detail>
                Oppdatert:{' '}
                {new Date(news.updated).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Detail>
            )}
            {news.tags?.map((tag) => (
              <Tag key={tag} variant="neutral">
                {tag}
              </Tag>
            ))}
            <Tag variant={variant}>{label}</Tag>
          </HStack>
          <BodyLong size="large">{news.description}</BodyLong>
          <div dangerouslySetInnerHTML={{ __html: news.body }} />
        </VStack>
      </Page.Block>
    </Page>
  )
}
