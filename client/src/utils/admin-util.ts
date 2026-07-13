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

export const newsStatusValues = ['PUBLISHED', 'DRAFT', 'ARCHIVE'] as const
export type NewsStatus = (typeof newsStatusValues)[number]

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
  tags?: string[]
  comment?: string
}

export interface TagsDTO {
  id: string
  tag: string
}
