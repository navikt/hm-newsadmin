import { Box, TagProps } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { DocPencilIcon, LightBulbIcon, MegaphoneSpeakingIcon, NewsletterIcon } from '@navikt/aksel-icons'


export interface MediaDTO {
  uri: string
  sourceUri?: string
  filename?: string
  priority?: number
  type?: string
}

export interface NewsPage {
  content: NewsDTO[]
  totalPages: number
  totalElements: number
}

export type TagConfig = {
  tagColor: TagProps['data-color']
  defaultBackgroundColor: string
  defaultIcon: ReactElement
}

export enum NewsTag {
  NYHETSBREV = 'Nyhetsbrev',
  RAMMEAVTALE = 'Rammeavtale',
  NY_FUNKSJON = 'Ny funksjon',
  AVTALER = 'Avtaler',
  FRA_HJELPEMIDDELOMRÅDET = 'Fra hjelpemiddelområdet',
  TIPS_OG_TRIKS = 'Tips og triks'
}

export const newsTagMeta: Record<
  NewsTag,
  TagConfig
> = {
  [NewsTag.NYHETSBREV]: {
    tagColor: 'info',
    defaultBackgroundColor: 'var(--ax-bg-info-moderate)',
    defaultIcon: <NewsletterIcon color={'var(--ax-bg-accent-moderate-pressed)'} />
  },
  [NewsTag.RAMMEAVTALE]: {
    tagColor: 'danger',
    defaultBackgroundColor: 'var(--ax-bg-brand-magenta-soft)',
    defaultIcon: <DocPencilIcon color={'var(--ax-bg-brand-magenta-moderate-pressed)'} />
  },
  [NewsTag.NY_FUNKSJON]: {
    tagColor: 'warning',
    defaultBackgroundColor: 'var(--ax-bg-warning-soft)',
    defaultIcon: <LightBulbIcon color={'var(--ax-bg-warning-moderate-pressed)'} />
  },
  [NewsTag.FRA_HJELPEMIDDELOMRÅDET]: {
    tagColor: 'info',
    defaultBackgroundColor: 'var(--ax-bg-info-moderate)',
    defaultIcon:  <Box paddingInline={'space-12 space-0'}>
      <MegaphoneSpeakingIcon color={'var(--ax-bg-accent-moderate-pressed)'} aria-hidden />
    </Box>
  },
  [NewsTag.AVTALER]: {
    tagColor: 'danger',
    defaultBackgroundColor: 'var(--ax-bg-brand-magenta-soft)',
    defaultIcon: <DocPencilIcon color={'var(--ax-bg-brand-magenta-moderate-pressed)'} />
  },
  [NewsTag.TIPS_OG_TRIKS]: {
    tagColor: 'warning',
    defaultBackgroundColor: 'var(--ax-bg-warning-soft)',
    defaultIcon: <LightBulbIcon color={'var(--ax-bg-warning-moderate-pressed)'} />
  },
}

export const getTagConfig = (tag: NewsTag): TagConfig => {
  if (!Object.values(NewsTag).includes(tag)) {
    return {
      tagColor: 'info',
      defaultBackgroundColor: 'var(--ax-bg-info-moderate)',
      defaultIcon: (
        <Box paddingInline={'space-12 space-0'}>
          <MegaphoneSpeakingIcon color={'var(--ax-bg-accent-moderate-pressed)'} aria-hidden />
        </Box>
      ),
    }
  }

  return newsTagMeta[tag]
}



export const newsStatusValues = ['PUBLISHED', 'DRAFT', 'ARCHIVE'] as const
export type NewsStatus = (typeof newsStatusValues)[number]

/*
export enum NewsStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVE = 'ARCHIVE',
}
 */


export interface NewsDTO {
  id: string
  title: string
  description: string
  body: string
  imageUrl?: string
  imageDescription?: string
  created: Date
  updated: Date
  publishedFrom: Date
  publishedTo: Date
  status: NewsStatus
  tags: NewsTag[]
  comment?: string
}

export interface TagsDTO {
  id: string
  tag: string
}
