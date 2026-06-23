import {
  VStack,
  HStack,
  Heading,
  Button,
  Page,
  Search,
  BodyLong,
  LinkCard,
  Link,
  ToggleGroup,
  HGrid,
} from '@navikt/ds-react'
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
  const [filterValue, setFilterValue] = useState('alle')

  const filteredNews =
    news
      ?.filter((item) => {
        const query = searchQuery.toLowerCase()
        const matchesTitle = item.title?.toLowerCase().includes(query)
        const matchesDescription = item.description?.toLowerCase().includes(query)
        return matchesTitle || matchesDescription
      })
      .filter((item) => {
        const now = new Date()
        const from = new Date(item.publishedFrom)
        const to = new Date(item.publishedTo)
        if (filterValue === 'fremtidig') return from > now
        if (filterValue === 'publisert') return from <= now && to >= now
        if (filterValue === 'historikk') return to < now
        return true
      })
      .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()) || []

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
          <ToggleGroup value={filterValue} onChange={setFilterValue} label={'Filtrer nyheter'}>
            <ToggleGroup.Item value="alle" label="Alle" />
            <ToggleGroup.Item value="fremtidig" label="Fremtidig" />
            <ToggleGroup.Item value="publisert" label="Publisert" />
            <ToggleGroup.Item value="historikk" label="Historikk" />
          </ToggleGroup>
          <HGrid gap="space-12" columns={{ xs: 'repeat(auto-fit, minmax(10rem, 1fr))', md: 3 }}>
            {filteredNews.map((news) => (
              <LinkCard
                key={news.id}
                onClick={() => navigate(`/news/${news.id}/edit`)}
                style={{ height: '100%', minHeight: '180px' }}
              >
                <HStack justify="space-between" align="start" gap="space-8" wrap={false} style={{ height: '100%' }}>
                  <VStack gap="space-2" style={{ flex: 1, minWidth: 0, height: '100%' }}>
                    <Heading size="small" level="2">
                      {news.title}
                    </Heading>
                    <BodyLong
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {news.description}
                    </BodyLong>
                    <BodyLong>{toReadableDateTimeString(news.created)}</BodyLong>
                  </VStack>
                  <HStack gap="space-2"></HStack>
                </HStack>
              </LinkCard>
            ))}
            {news && filteredNews.length === 0 && <BodyLong>Ingen nyheter matchet søket ditt.</BodyLong>}
          </HGrid>
        </VStack>
      </Page.Block>
    </Page>
  )
}
