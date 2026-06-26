import { NewsDTO } from 'utils/admin-util.ts'

export enum FilterValue {
  alle = 'alle',
  fremtidig = 'fremtidig',
  publisert = 'publisert',
  historikk = 'historikk',
}

export function filterBySearch(news: NewsDTO[], searchTerm: string): NewsDTO[] {
  return news.filter((item) => {
    const query = searchTerm.toLowerCase()
    const matchesTitle = item.title?.toLowerCase().includes(query)
    const matchesDescription = item.description?.toLowerCase().includes(query)
    return matchesTitle || matchesDescription
  })
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
