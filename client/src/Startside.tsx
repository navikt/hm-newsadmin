import { VStack, HStack, Heading, Button, Page, Search, BodyLong, LinkCard, Link } from '@navikt/ds-react'
import { toReadableDateTimeString } from './utils/date-util'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { useState } from 'react'
import { NewsDTO } from 'utils/admin-util.ts'
import { getNews } from 'utils/api-util.ts'

export const Startside = () => {
  const navigate = useNavigate()
  const { data: news } = useSWR<NewsDTO[]>('news', () => getNews())
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews =
    news
      ?.filter((item) => {
        const query = searchQuery.toLowerCase()
        const matchesTitle = item.title?.toLowerCase().includes(query)
        const matchesDescription = item.description?.toLowerCase().includes(query)
        return matchesTitle || matchesDescription
      })
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()) || []

  return (
    <Page>
      <Page.Block as="main" width="xl" gutters>
        <VStack gap="space-8" margin="space-20">
          <HStack justify="space-between" align="center">
            <Heading size="large" level="1">
              Nyheter
            </Heading>
            {/*TODO: fiks styling på knappen?*/}
            <Button as={Link} href={'/createNewsPage'} variant={'secondary'}>
              Opprett nyhet
            </Button>
          </HStack>
          <Search
            label="Søk etter nyheter"
            variant="secondary"
            hideLabel={false}
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            onClear={() => setSearchQuery('')}
          />
          <VStack gap="space-12">
            {filteredNews.map((news) => (
              <LinkCard key={news.id} onClick={() => navigate(`/news/${news.id}/edit`)}>
                <HStack justify="space-between" align="start" gap="space-8" wrap={false}>
                  <VStack gap="space-2" style={{ flex: 1, minWidth: 0 }}>
                    <Heading size="small" level="2">
                      {news.title}
                    </Heading>
                    <BodyLong>{news.description}</BodyLong>
                    <BodyLong>{toReadableDateTimeString(news.created)}</BodyLong>
                  </VStack>
                  <HStack gap="space-2"></HStack>
                </HStack>
              </LinkCard>
            ))}
            {news && filteredNews.length === 0 && <BodyLong>Ingen nyheter matchet søket ditt.</BodyLong>}
          </VStack>
        </VStack>
      </Page.Block>
    </Page>
  )
}
