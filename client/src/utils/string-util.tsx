import { AgreementInfo } from 'utils/types/types'

export const labelRequired = (label: string) => (
  <>
    {label}
    <span aria-hidden={true}>*</span>
  </>
)

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit and non-plus sign characters
  const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '')

  // Use regular expressions to format the clean string of digits and plus signs

  return cleanPhoneNumber.replace(/(\d{2})(?=\d|\+)/g, '$1 ')
}

// Rules from Språkrådet: https://www.sprakradet.no/sprakhjelp/Skriveregler/Mellomrom/
export const toValueAndUnit = (value: string, unit: string) => {
  if (unit === '"' || unit === "'" || unit === '°') {
    return value + unit
  }

  return `${value} ${unit}`
}

export const isUUID = (string: string) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  return uuidRegex.test(string)
}

export const formatAgreementRanks = (agreements: AgreementInfo[]): string => {
  if (agreements.length === 0) return '-'
  if (agreements.length === 1 && agreements[0].rank === 99) return '-'

  return agreements
    .map((ag) => ag.rank)
    .filter((rank) => rank !== 99)
    .sort()
    .join(', ')
}
