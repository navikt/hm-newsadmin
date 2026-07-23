import { NewsDTO } from 'utils/admin-util.ts'

import { TagProps } from '@navikt/ds-react'

export enum FilterValue {
  alle = 'alle',
  aktiv = 'aktiv',
  kommende = 'kommende',
  utløpt = 'utløpt',
  utkast = 'DRAFT',
}

export type DisplayStatus = 'aktiv' | 'planlagt' | 'utløpt' | 'utkast'

export function getDisplayStatus(news: NewsDTO): DisplayStatus {
  if (news.status === 'DRAFT') return 'utkast'
  const now = new Date()
  if (new Date(news.publishedFrom) > now) return 'planlagt'
  if (new Date(news.publishedTo) < now) return 'utløpt'
  return 'aktiv'
}

export const displayStatusTagProps: Record<DisplayStatus, { label: string; variant: TagProps['variant'] }> = {
  aktiv: { label: 'Aktiv', variant: 'success' },
  planlagt: { label: 'Ferdigstilt', variant: 'info' },
  utløpt: { label: 'Utløpt', variant: 'neutral-filled' },
  utkast: { label: 'Utkast', variant: 'warning' },
}
