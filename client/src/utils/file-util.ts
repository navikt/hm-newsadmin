import { IMAGE_PROXY_URL } from 'environments'
import { MediaInfoDTO } from 'utils/types/response-types'

export const fileToUri = async (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result as string)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })

export const uriForMediaFile = (file: MediaInfoDTO) => {
  return `${IMAGE_PROXY_URL()}/file/${file.uri}`
}

export const MIME_TYPE_XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const MIME_TYPE_XLS = 'application/vnd.ms-excel'

export const MIME_EXCEL_TYPES_ARRAY = [MIME_TYPE_XLSX, MIME_TYPE_XLS]
export const MIME_EXCEL_TYPES_STRING = `${MIME_TYPE_XLSX},${MIME_TYPE_XLS}`
