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
  created: string
  updated: string
  publishedFrom: string
  publishedTo: string
}

export interface CreateNewsDto {
  title: string
  description: string
  body: string
  publishedFrom: string
  publishedTo: string
}

export interface EditNewsDto {
  title: string
  description: string
  body: string
  publishedFrom: string
  publishedTo: string
}
