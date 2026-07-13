import { BodyLong, Button, Chips, Heading, HGrid, HStack, Page, Search, ToggleGroup, VStack } from '@navikt/ds-react'
import { Link, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { getNews, getTags, NEWS_PAGE_SIZE } from 'utils/api-util.ts'
import NewsCard from 'komponenter/NewsCard.tsx'
import { FilterValue } from 'utils/news-filter-util.ts'
import { SquareGridIcon, BulletListIcon } from '@navikt/aksel-icons'
import { NewsPage } from 'utils/admin-util.ts'
import NewsPagination from 'komponenter/NewsPagination.tsx'

export const NyhetsOversikt = () => {
  const { data: tagsData } = useSWR('tags', () => getTags())
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('term') || ''
  const filterValue = (searchParams.get('filter') as FilterValue) || FilterValue.alle
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid'
  const selectedTags = searchParams.getAll('tag')
  const currentPage = Number(searchParams.get('page') ?? '1')

  const { data: newsPage } = useSWR<NewsPage>(
    ['news', currentPage, searchTerm, selectedTags, filterValue],
    () =>
      getNews(currentPage - 1, NEWS_PAGE_SIZE, searchTerm || undefined, selectedTags.length ? selectedTags : undefined, filterValue),
    { revalidateOnMount: true, revalidateOnFocus: true, keepPreviousData: true }
  )
  const news = newsPage?.content ?? []
  const totalPages = newsPage?.totalPages ?? 1

  const allTags = tagsData?.map((t) => t.tag) ?? []

  const toggleTag = (tag: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      const current = prev.getAll('tag')
      const updated = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
      next.delete('tag')
      next.delete('page')
      updated.forEach((t) => next.append('tag', t))
      return next
    })
  }

  const clearTerm = () =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('term')
      next.delete('page')
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
          <VStack gap={'space-16'}>
            <Search
              label="Søk"
              variant="secondary"
              hideLabel={false}
              value={searchTerm}
              onChange={(value) =>
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev)
                  next.set('term', value)
                  next.delete('page')
                  return next
                })
              }
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
          </VStack>
          <HStack justify={'space-between'} align={'center'}>
            <ToggleGroup
              value={filterValue}
              onChange={(v) =>
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev)
                  next.set('filter', v)
                  next.delete('page')
                  return next
                })
              }
              label={'Status'}
            >
              <ToggleGroup.Item value="alle" label="Alle" />
              <ToggleGroup.Item value="aktiv" label="Aktiv" />
              <ToggleGroup.Item value="kommende" label="Ferdigstilt" />
              <ToggleGroup.Item value="DRAFT" label="Utkast" />
              <ToggleGroup.Item value="utløpt" label="Utløpt" />
            </ToggleGroup>
            <ToggleGroup
              value={viewMode}
              onChange={(v) =>
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev)
                  next.set('view', v)
                  return next
                })
              }
              label={'Visning'}
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
              {news.map((news) => (
                <NewsCard key={news.id} news={news} searchParams={searchParams} variant={viewMode} />
              ))}
            </HGrid>
          ) : (
            <VStack gap="space-12">
              {news.map((news) => (
                <NewsCard key={news.id} news={news} searchParams={searchParams} variant={viewMode} />
              ))}
            </VStack>
          )}
          {newsPage && news.length === 0 && <BodyLong>Ingen nyheter matchet søket ditt.</BodyLong>}
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
