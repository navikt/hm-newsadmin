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

export type NewsStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVE'

export interface NewsDTO {
  id: string
  title: string
  description: string
  body: string
  image_url?: string
  imageDescription?: string
  created: Date
  updated: Date
  publishedFrom: Date
  publishedTo: Date
  status: NewsStatus
  tags?: string[]
  comment?: string
}

export interface CreateNewsDto {
  title: string
  description: string
  body: string
  image_url?: string
  imageDescription?: string
  publishedFrom: Date
  publishedTo: Date
  tags: string[]
}

export interface EditNewsDto {
  title: string
  description: string
  body: string
  image_url?: string
  imageDescription?: string
  publishedFrom: Date
  publishedTo: Date
  tags: string[]
}

export interface TagsDTO {
  id: string
  tag: string
}

export enum NewsFilter {
  Alle = 'alle',
  Fremtidig = 'fremtidig',
  Publisert = 'publisert',
  Historikk = 'historikk',
}
