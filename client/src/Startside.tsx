import {
  BodyLong,
  Button,
  Heading,
  HGrid,
  HStack,
  Link,
  LinkCard,
  Page,
  Search,
  ToggleGroup,
  VStack,
} from '@navikt/ds-react'
import { toReadableDateTimeString } from './utils/date-util'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { useState } from 'react'
import { NewsDTO, NewsFilter } from 'utils/admin-util.ts'
import { getNews } from 'utils/api-util.ts'

export const Startside = () => {
  const navigate = useNavigate()
  const { data: news } = useSWR<NewsDTO[]>('news', () => getNews())
  const [filterValue, setFilterValue] = useState(NewsFilter.Alle)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('term') || ''

  const filteredNews =
    news
      ?.filter((item) => {
        const query = searchTerm.toLowerCase()
        const matchesTitle = item.title?.toLowerCase().includes(query)
        const matchesDescription = item.description?.toLowerCase().includes(query)
        return matchesTitle || matchesDescription
      })
      .filter((item) => {
        const now = new Date()
        const from = new Date(item.publishedFrom)
        const to = new Date(item.publishedTo)
        if (filterValue === NewsFilter.Fremtidig) return from > now
        if (filterValue === NewsFilter.Publisert) return from <= now && to >= now
        if (filterValue === NewsFilter.Historikk) return to < now
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
            value={searchTerm}
            onChange={(value) => setSearchParams({ term: value })}
            onClear={() => setSearchParams('')}
          />
          <ToggleGroup value={filterValue} onChange={(v) => setFilterValue(v as NewsFilter)} label={'Filtrer nyheter'}>
            <ToggleGroup.Item value="alle" label="Alle" />
            <ToggleGroup.Item value={NewsFilter.Fremtidig} label="Fremtidig" />
            <ToggleGroup.Item value={NewsFilter.Publisert} label="Publisert" />
            <ToggleGroup.Item value={NewsFilter.Historikk} label="Historikk" />
          </ToggleGroup>
          <HGrid gap="space-12" columns={{ xs: 'repeat(auto-fit, minmax(10rem, 1fr))', md: 3 }}>
            {filteredNews.map((news) => (
              <LinkCard
                key={news.id}
                onClick={() => navigate(`/news/${news.id}/edit`)}
                style={{ height: '100%', minHeight: '180px' }}
              >
                <img
                  src={news.image_url}
                  alt=""
                  aria-hidden
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                />
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
