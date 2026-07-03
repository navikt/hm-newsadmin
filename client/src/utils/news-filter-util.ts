import { TagProps } from '@navikt/ds-react'
import { NewsDTO, NewsStatus } from 'utils/admin-util.ts'

export enum FilterValue {
  alle = 'alle',
  publisert = 'PUBLISHED',
  utkast = 'DRAFT',
  arkiv = 'ARCHIVE',
}

export const statusTagProps: Record<NewsStatus, { label: string; variant: TagProps['variant'] }> = {
  PUBLISHED: { label: 'Publisert', variant: 'success' },
  DRAFT: { label: 'Utkast', variant: 'warning' },
  ARCHIVE: { label: 'Arkiv', variant: 'neutral' },
}

export function filterByStatus(news: NewsDTO[], filter: FilterValue): NewsDTO[] {
  if (filter === FilterValue.alle) return news
  return news.filter((item) => item.status === filter)
}

export function filterByTags(news: NewsDTO[], selectedTags: string[]): NewsDTO[] {
  if (selectedTags.length === 0) return news
  return news.filter((item) => selectedTags.every((tag) => item.tags?.includes(tag)))
}
