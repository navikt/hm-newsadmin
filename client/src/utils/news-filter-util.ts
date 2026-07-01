import { NewsDTO } from 'utils/admin-util.ts'

export enum FilterValue {
  alle = 'alle',
  fremtidig = 'fremtidig',
  publisert = 'publisert',
  historikk = 'historikk',
}

export type NewsStatus = Exclude<FilterValue, FilterValue.alle>

export function getNewsStatus(news: NewsDTO): NewsStatus {
  const now = new Date()
  const from = new Date(news.publishedFrom)
  const to = new Date(news.publishedTo)
  if (from > now) return FilterValue.fremtidig
  if (to < now) return FilterValue.historikk
  return FilterValue.publisert
}

export const statusTagProps: Record<NewsStatus, { label: string; color: string }> = {
  [FilterValue.publisert]: { label: 'Publisert', color: 'success' },
  [FilterValue.fremtidig]: { label: 'Fremtidig', color: 'info' },
  [FilterValue.historikk]: { label: 'Historikk', color: 'neutral' },
}

export function filterBySearch(news: NewsDTO[], searchTerm: string): NewsDTO[] {
  return news.filter((item) => {
    const query = searchTerm.toLowerCase()
    const matchesTitle = item.title?.toLowerCase().includes(query)
    const matchesDescription = item.description?.toLowerCase().includes(query)
    return matchesTitle || matchesDescription
  })
}

export function filterByTags(news: NewsDTO[], selectedTags: string[]): NewsDTO[] {
  if (selectedTags.length === 0) return news
  return news.filter((item) => selectedTags.every((tag) => item.tags?.includes(tag)))
}

export function filterByStatus(news: NewsDTO[], filter: FilterValue): NewsDTO[] {
  const now = new Date()
  return news.filter((item) => {
    const from = new Date(item.publishedFrom)
    const to = new Date(item.publishedTo)
    switch (filter) {
      case FilterValue.publisert:
        return from <= now && to >= now
      case FilterValue.historikk:
        return to < now
      case FilterValue.fremtidig:
        return from > now
      case FilterValue.alle:
        return true
    }
  })
}
