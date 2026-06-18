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
