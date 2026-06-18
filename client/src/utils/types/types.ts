import { components } from 'utils/types/schema'

export interface Product {
  id?: string
  title: string
  attributes: Attributes
  variantCount: number
  variants: ProductVariant[]
  compareData: ComparingData
  isoCategory: string
  isoCategoryTitle: string
  isoCategoryText: string
  accessory: boolean
  sparepart: boolean
  supplierId: string
  agreements: AgreementInfo[]
  /** expired from backend is a Date data field like 2043-06-01T14:19:30.505665648*/
}

interface ProductToApprove {
  title: string
  articleName: string
  /** Format: uuid */
  seriesId: string
  status: string
  supplierName: string
  /** Format: uuid */
  agreementId?: string | null
  delkontrakttittel?: string | null
  thumbnail?: components['schemas']['MediaInfoDTO'] | null
}

export interface ProductVariant {
  id: string
  hmsArtNr: string | null
  supplierRef: string
  articleName: string
  techData: TechDataDict
  hasAgreement: boolean
  filters: { [key: string]: string | number }
  expired: string
  agreements: AgreementInfo[]
  /** expired from backend is a Date data field like 2043-06-01T14:19:30.505665648*/
}

export interface AgreementInfo {
  id: string
  identifier: string
  title: string
  rank: number
  postNr: number
  postTitle: string
  expired: string
}

interface TechDataDict {
  [key: string]: { value: string; unit: string }
}

interface Attributes {
  manufacturer?: string
  articlename?: string
  series?: string
  shortdescription?: string
  text?: string
  bestillingsordning?: boolean
  commonCharacteristics?: TechDataDict
  compatibleWith?: string[]
}

interface ComparingData {
  techDataRange: TechDataRange
  agreementRank: number | null
}

interface TechDataRange {
  [key: string]: { minValue: string; maxValue: string | null; unit: string }
}

export enum SeriesStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  DRAFT_CHANGE = 'DRAFT_CHANGE',
}
