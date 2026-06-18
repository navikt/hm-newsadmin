import { components } from './schema'

// Schema Obj
export type UserDTO = components['schemas']['UserDTO']
export type AdminUserChunk = components['schemas']['Page_UserDTO_']
export type SupplierRegistrationDTO = components['schemas']['SupplierRegistrationDTO']
export type LoggedInUserResponse = components['schemas']['RegistrationAuthentication']

export type SupplierStatus = components['schemas']['SupplierStatus']

export type SupplierChunk = components['schemas']['Page_SupplierRegistrationDTO_']

export type AgreementsChunk = {
  content: components['schemas']['AgreementBasicInformationDto'][]
  pageable: components['schemas']['OpenApiPageable']
  /** Format: int32 */
  pageNumber?: number
  /** Format: int64 */
  offset?: number
  /** Format: int32 */
  size?: number
  totalPages?: number
  empty?: boolean
  /** Format: int32 */
  numberOfElements?: number
}

export type NewsChunk = {
  content: NewsRegistrationDTO[]
  pageable: components['schemas']['OpenApiPageable']
  /** Format: int32 */
  pageNumber?: number
  /** Format: int64 */
  offset?: number
  /** Format: int32 */
  size?: number
  totalPages?: number
  empty?: boolean
  /** Format: int32 */
  numberOfElements?: number
}

export type ProductRegistrationDTO = components['schemas']['ProductRegistrationDTO']
export type ProductRegistrationDTOV2 = components['schemas']['ProductRegistrationDTOV2']
export type UpdateProductRegistrationDTO = components['schemas']['UpdateProductRegistrationDTO']
export type ProductRegistration = components['schemas']['ProductRegistration']
export type ProductAgreementRegistrationDTO = components['schemas']['ProductAgreementRegistrationDTO']
export type ProductAgreementRegistrationDTOList = components['schemas']['ProductAgreementRegistrationDTO'][]
export type AgreementRegistrationDTO = components['schemas']['AgreementRegistrationDTO']
export type IsoCategoryDTO = components['schemas']['IsoCategoryDTO']
export type AgreementGroupDto = components['schemas']['AgreementBasicInformationDto'][]
export type AgreementAttachment = components['schemas']['AgreementAttachment']
export type AgreementDraftWithDTO = components['schemas']['AgreementDraftWithDTO']
export type MediaDTO = components['schemas']['MediaDTO']
export type MediaInfo = components['schemas']['MediaInfo']
export type MediaInfoDTO = components['schemas']['MediaInfoDTO']
export type MediaSort = components['schemas']['MediaSort']
export type SeriesDraftWithDTO = components['schemas']['SeriesDraftWithDTO']
export type DraftVariantDTO = components['schemas']['DraftVariantDTO']
export type PartDraftWithDTO = components['schemas']['PartDraftWithDTO']
export type TechData = components['schemas']['TechData']
export type DelkontraktRegistrationDTO = components['schemas']['DelkontraktRegistrationDTO']
export type ProductVariantsForDelkontraktDto = components['schemas']['ProductVariantsForDelkontraktDto']
export type SeriesToApproveDto = components['schemas']['SeriesToApproveDTO']
export type SeriesDraftResponse = components['schemas']['SeriesDraftResponse']
export type PartDraftResponse = components['schemas']['PartDraftResponse']
export type SeriesDTO = components['schemas']['SeriesDTO']
export type SeriesSearchDTO = components['schemas']['SeriesSearchDTO']
export type RejectSeriesDTO = components['schemas']['RejectSeriesDTO']
export type NewsRegistrationDTO = components['schemas']['NewsRegistrationDTO']
export type CreateUpdateNewsDTO = components['schemas']['CreateUpdateNewsDTO']
export type SupplierInventoryDTO = components['schemas']['SupplierInventoryDTO']
export type TechDataType = components['schemas']['TechDataType']
export type NewVideo = components['schemas']['NewVideo']
export type NewDocumentUrl = components['schemas']['NewDocumentUrl']
export type DeleteDocumentUrl = components['schemas']['DeleteDocumentUrl']
export type FileTitleDto = components['schemas']['FileTitleDto']
export type PartDTO = components['schemas']['PartDTO']
export type UpdatePartDTO = components['schemas']['UpdatePartDto']

export type ServiceJobDTO = components['schemas']['ServiceJobDTO']

type CompatibleWith = components['schemas']['CompatibleWith']
export type CompatibleWithDTO = components['schemas']['CompatibleWithDTO']

export type HiddenPart = components['schemas']['HiddenPartAdminController.HiddenPartDTO']

export type WorksWithMapping = components['schemas']['WorksWithMapping']
export type WorksWithMappingList = components['schemas']['WorksWithMapping'][]

export type SuitableForBrukerpassbrukerDTO = components['schemas']['SuitableForBrukerpassbrukerDTO']
export type SuitableForKommunalTeknikerDTO = components['schemas']['SuitableForKommunalTeknikerDTO']

export type DifferenceDTO = components['schemas']['Difference_String.Object_']

export type TechLabelRegistrationDTO = components['schemas']['TechLabelRegistrationDTO']
export type TechLabelType = components['schemas']['TechLabelType']
export type TechLabelCreateUpdateDTO = components['schemas']['TechLabelCreateUpdateDTO']
export type CatalogFile = components['schemas']['CatalogFile']
export type CatalogImportResultReport = components['schemas']['CatalogImportResultReport']
export type CatalogImport = components['schemas']['CatalogImport']
export type DuplicateConflict = components['schemas']['DuplicateConflict']

export type ProdukterTilGodkjenningChunk = {
  content: SeriesToApproveDto[]
  pageable: components['schemas']['OpenApiPageable']
  /** Format: int32 */
  pageNumber?: number
  /** Format: int64 */
  offset?: number
  /** Format: int32 */
  size?: number
  totalPages?: number
  empty?: boolean
  /** Format: int32 */
  numberOfElements?: number
}

export type ProductChunk = {
  content: ProductRegistrationDTOV2[]
  pageable: components['schemas']['OpenApiPageable']
  /** Format: int32 */
  pageNumber?: number
  /** Format: int64 */
  offset?: number
  /** Format: int32 */
  size?: number
  /** Format: int64 */
  totalSize?: number
  totalPages?: number
  empty?: boolean
  /** Format: int32 */
  numberOfElements?: number
}

export type SeriesSearchChunk = {
  content: SeriesSearchDTO[]
  pageable: components['schemas']['OpenApiPageable']
  /** Format: int32 */
  pageNumber?: number
  /** Format: int64 */
  offset?: number
  /** Format: int32 */
  size?: number
  /** Format: int64 */
  totalSize?: number
  totalPages?: number
  empty?: boolean
  /** Format: int32 */
  numberOfElements?: number
}

// Path params
//type EndpointParams = paths['/my/endpoint']['parameters']

// Response obj
//type SuccessResponse = paths['/my/endpoint']['get']['responses'][200]['content']['application/json']['schema']
//type ErrorResponse = paths['/my/endpoint']['get']['responses'][500]['content']['application/json']['schema']

export type UpdateSeriesRegistrationDTO = components['schemas']['UpdateSeriesRegistrationDTO']

export type OTPRequest = {
  email: string
}

export type VerifyOTPRequest = {
  otp: string
  email: string
}

export type ResetPasswordRequest = {
  otp: string
  email: string
  newPassword: string
}

export type TechLabelCriteria = {
  label?: string
  type?: string
  unit?: string
  isoCode?: string
}

export type CatalogFileCriteria = {
  fileName?: string
  orderRef?: string
  supplierId?: string
  status?: string
}

export type CatalogFileChunk = {
  content: CatalogFile[]
  pageable: components['schemas']['OpenApiPageable']
  /** Format: int32 */
  pageNumber?: number
  /** Format: int64 */
  offset?: number
  /** Format: int32 */
  size?: number
  totalPages?: number
  empty?: boolean
  /** Format: int32 */
  numberOfElements?: number
}
