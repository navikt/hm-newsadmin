import { BodyLong, Button, Heading, HGrid, HStack, Link, Page, Search, ToggleGroup, VStack } from '@navikt/ds-react'
import { useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { getNews } from 'utils/api-util.ts'
import NewsCard from 'komponenter/NewsCard.tsx'
import NewsListCard from 'komponenter/NewsListCard.tsx'
import { filterBySearch, filterByStatus, FilterValue } from 'utils/news-filter-util.ts'
import { SquareGridIcon, BulletListIcon } from '@navikt/aksel-icons'

export const NyhetsOversikt = () => {
  const { data: news } = useSWR('news', () => getNews())
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('term') || ''
  const filterValue = (searchParams.get('filter') as FilterValue) || FilterValue.alle
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid'
  const filteredNews = filterByStatus(filterBySearch(news ?? [], searchTerm), filterValue).sort((a, b) => {
    const dateA = new Date(a.updated ?? a.created).getTime()
    const dateB = new Date(b.updated ?? b.created).getTime()
    return dateB - dateA
  })

  const clearTerm = () =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('term')
      return next
    })

  return (
    <Page>
      <Page.Block as="main" width="xl" gutters>
        <VStack gap="space-32" margin="space-20">
          <HStack justify="space-between" align="center">
            <Heading size="large" level="1">
              Nyheter
            </Heading>
            <Button as={Link} href={'/createNewsPage'} variant={'secondary'}>
              Opprett nyhet
            </Button>
          </HStack>
          <Search
            label="Søk etter nyheter"
            variant="secondary"
            hideLabel={false}
            value={searchTerm}
            onChange={(value) => setSearchParams((prev) => ({ ...Object.fromEntries(prev), term: value }))}
            onClear={clearTerm}
          />
          <HStack justify={'space-between'} align={'center'}>
            <ToggleGroup
              value={filterValue}
              onChange={(v) => setSearchParams((prev) => ({ ...Object.fromEntries(prev), filter: v }))}
              label={'Filtrer nyheter'}
            >
              <ToggleGroup.Item value="alle" label="Alle" />
              <ToggleGroup.Item value="fremtidig" label="Fremtidig" />
              <ToggleGroup.Item value="publisert" label="Publisert" />
              <ToggleGroup.Item value="historikk" label="Historikk" />
            </ToggleGroup>
            <ToggleGroup
              value={viewMode}
              onChange={(v) => setSearchParams((prev) => ({ ...Object.fromEntries(prev), view: v }))}
              label={'Grid / List'}
              data-color={'neutral'}
            >
              <ToggleGroup.Item value="grid" aria-label="Rutenett">
                <SquareGridIcon aria-hidden />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="list" aria-label="Liste">
                <BulletListIcon aria-hidden />
              </ToggleGroup.Item>
            </ToggleGroup>
          </HStack>
          {viewMode === 'grid' ? (
            <HGrid gap="space-12" columns={{ xs: 'repeat(auto-fit, minmax(10rem, 1fr))', md: 3 }}>
              {filteredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </HGrid>
          ) : (
            <VStack gap="space-12">
              {filteredNews.map((news) => (
                <NewsListCard key={news.id} news={news} />
              ))}
            </VStack>
          )}
          {news && filteredNews.length === 0 && <BodyLong>Ingen nyheter matchet søket ditt.</BodyLong>}
        </VStack>
      </Page.Block>
    </Page>
  )
}
