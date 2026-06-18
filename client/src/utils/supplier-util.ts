import { LoggedInUser } from 'utils/user-util'

import { SupplierChunk, SupplierRegistrationDTO, SupplierStatus } from './types/response-types'

export interface SupplierDTO {
  id: string
  status: SupplierStatus
  name: string
  address?: string | null
  postNr?: string | null
  postLocation?: string | null
  countryCode?: string | null
  email?: string | null
  phone?: string | null
  homepageUrl?: string | null
}

export interface SupplierUser {
  id: string
  name: string
  email?: string | null
  roles?: string[] | null
  attributes?: {
    phone: string | null
  } | null
  create?: string | null
  updated?: string | null
}

export const mapSupplier = (_source: SupplierRegistrationDTO): SupplierDTO => {
  return {
    id: _source.id,
    status: _source.status,
    name: _source.name,
    address: _source.supplierData.address,
    postNr: _source.supplierData.postNr,
    postLocation: _source.supplierData.postLocation,
    countryCode: _source.supplierData.countryCode,
    email: _source.supplierData.email,
    phone: _source.supplierData.phone,
    homepageUrl: _source.supplierData.homepage,
  }
}

export const mapSuppliers = (data: SupplierChunk): SupplierDTO[] => {
  return data.content.map((supplierRegistrationDTO) => {
    return mapSupplier(supplierRegistrationDTO)
  })
}

export interface SupplierUserDTO {
  name?: string | null
  email: string
  password: string
  roles: string[]
  attributes: {}
}

export interface SupplierDTOBody {
  name: string
  supplierData: {
    email?: string
    phone?: string
    homepage?: string
    address?: string
    postNr?: string
    postLocation?: string
  }
}

// cognita dev, prod:
const allowlistAgreementProducts = ['52084e91-2998-42b2-8b7c-45b0f212d696', '17d6107b-dffa-451b-9565-7b86394de1d3']
const supplierCanChangeAgreementProduct = (user: LoggedInUser | undefined): boolean => {
  return (user && !user.isAdmin && allowlistAgreementProducts.includes(user.supplierId!)) ?? false
}
