import { LoggedInUserResponse } from './types/response-types'

export interface LoggedInUser {
  isAdmin: boolean
  isHmsUser: boolean
  isAdminOrHmsUser: boolean
  isSupplier: boolean
  userId: string | undefined
  supplierId: string | undefined
  userName: string | undefined
  supplierName: string | undefined
  exp: string | undefined
}

export const mapLoggedInUser = (_source: LoggedInUserResponse): LoggedInUser => {
  const roles: string[] = _source.attributes['roles'] as unknown as string[]
  return {
    isAdminOrHmsUser: roles.includes('ROLE_ADMIN') || roles.includes('ROLE_HMS'),
    isAdmin: roles.includes('ROLE_ADMIN'),
    isHmsUser: roles.includes('ROLE_HMS'),
    isSupplier: roles.includes('ROLE_SUPPLIER'),
    userId: String(_source.attributes['userId']) ?? undefined,
    //kun supplier bruker får supplierId
    supplierId: String(_source.attributes['supplierId']) ?? undefined,
    userName: String(_source.attributes['userName']) ?? undefined,
    supplierName: String(_source.attributes['supplierName']) ?? undefined,
    exp: String(_source.attributes['exp']) ?? undefined,
  }
}
