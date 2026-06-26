export interface NewAdminUserDTO {
  name?: string | null
  email: string
  password: string
  roles: string[]
  attributes: {}
}

export interface NewHmsUserDTO {
  name?: string | null
  email: string
  password: string
  roles: string[]
  attributes: {}
}

export interface NewsDTO {
  id: string
  title: string
  description: string
  body: string
  image_url?: string
  created: string
  updated: string
  publishedFrom: string
  publishedTo: string
  tags?: string[]
}

export interface CreateNewsDto {
  title: string
  description: string
  body: string
  image_url?: string
  publishedFrom: string
  publishedTo: string
  tags: string[]
}

export interface EditNewsDto {
  title: string
  description: string
  body: string
  image_url?: string
  publishedFrom: string
  publishedTo: string
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
