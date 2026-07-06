import { BodyLong, Button, Chips, Heading, HGrid, HStack, Page, Search, ToggleGroup, VStack } from '@navikt/ds-react'
import { Link, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { getNews, getTags } from 'utils/api-util.ts'
import NewsCard from 'komponenter/NewsCard.tsx'
import NewsListCard from 'komponenter/NewsListCard.tsx'
import { FilterValue } from 'utils/news-filter-util.ts'
import { SquareGridIcon, BulletListIcon } from '@navikt/aksel-icons'
import { NewsDTO, NewsPage } from 'utils/admin-util.ts'
import NewsPagination from 'komponenter/NewsPagination.tsx'

export const NyhetsOversikt = () => {
  const { data: tagsData } = useSWR('tags', () => getTags())
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('term') || ''
  const filterValue = (searchParams.get('filter') as FilterValue) || FilterValue.alle
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid'
  const selectedTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  const currentPage = Number(searchParams.get('page') ?? '1')

  const { data: newsPage } = useSWR<NewsPage>(
    ['news', currentPage, searchTerm, selectedTags, filterValue],
    () =>
      getNews(currentPage - 1, 6, searchTerm || undefined, selectedTags.length ? selectedTags : undefined, filterValue),
    { revalidateOnMount: true, revalidateOnFocus: true }
  )
  const news = newsPage?.content ?? []
  const totalPages = newsPage?.totalPages ?? 1

  const allTags = tagsData?.map((t) => t.tag) ?? []

  const toggleTag = (tag: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      const current = prev.get('tags') ? prev.get('tags')!.split(',') : []
      const updated = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
      if (updated.length === 0) next.delete('tags')
      else next.set('tags', updated.join(','))
      return next
    })
  }

  const sortedNews = news

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
              Aktuelt
            </Heading>
            <Button as={Link} to={'/createNewsPage'} variant={'secondary'}>
              Opprett sak
            </Button>
          </HStack>
          <Search
            label="Søk"
            variant="secondary"
            hideLabel={false}
            value={searchTerm}
            onChange={(value) => setSearchParams((prev) => ({ ...Object.fromEntries(prev), term: value }))}
            onClear={clearTerm}
          />
          {allTags.length > 0 && (
            <Chips>
              {allTags.map((tag) => (
                <Chips.Toggle key={tag} selected={selectedTags.includes(tag)} onClick={() => toggleTag(tag)}>
                  {tag}
                </Chips.Toggle>
              ))}
            </Chips>
          )}
          <HStack justify={'space-between'} align={'center'}>
            <ToggleGroup
              value={filterValue}
              onChange={(v) => setSearchParams((prev) => ({ ...Object.fromEntries(prev), filter: v }))}
              label={'Status'}
            >
              <ToggleGroup.Item value="alle" label="Alle" />
              <ToggleGroup.Item value="publisert" label="Publisert" />
              <ToggleGroup.Item value="utløpt" label="Utløpt" />
              <ToggleGroup.Item value="DRAFT" label="Utkast" />
            </ToggleGroup>
            <ToggleGroup
              value={viewMode}
              onChange={(v) => setSearchParams((prev) => ({ ...Object.fromEntries(prev), view: v }))}
              label={'Visning'}
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
              {sortedNews.map((news: NewsDTO) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </HGrid>
          ) : (
            <VStack gap="space-12">
              {sortedNews.map((news: NewsDTO) => (
                <NewsListCard key={news.id} news={news} />
              ))}
            </VStack>
          )}
          {newsPage && sortedNews.length === 0 && <BodyLong>Ingen nyheter matchet søket ditt.</BodyLong>}
          {totalPages > 1 && (
            <HStack justify="center">
              <NewsPagination currentPage={currentPage} totalPages={totalPages} />
            </HStack>
          )}
        </VStack>
      </Page.Block>
    </Page>
  )
}
