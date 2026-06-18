import { apiPath } from 'mocks/apiPath'
import { HttpResponse, http } from 'msw'
import { v4 as uuidv4 } from 'uuid'

const noSeriesHandler = http.get(apiPath('api/v1/series'), (info) => {
  return HttpResponse.json({
    content: [],
    pageable: {
      number: 0,
      sort: {
        orderBy: [
          {
            property: 'created',
            direction: 'DESC',
            ignoreCase: false,
            ascending: false,
          },
        ],
      },
      size: 10,
    },
    totalSize: 1,
    totalPages: 1,
    empty: true,
    size: 10,
    offset: 0,
    pageNumber: 0,
    numberOfElements: 1,
  })
})

const defaultSeriesHandler = http.get(apiPath('api/v1/series/*'), (info) => {
  return HttpResponse.json({
    id: uuidv4(),
    supplierName: 'defaultSupplier',
    title: 'defaultTitle',
    text: 'defaultText',
    isoCategory: {
      isoCode: '10101010',
      isoTitle: 'DefaultIsoTitle',
      isoText: 'DefaultIsoText',
      isoTextShort: 'DefaultIsoTextShort',
      isoTranslations: {
        titleEn: '',
        textEn: '',
      },
      isoLevel: 4,
      isActive: true,
      showTech: true,
      allowMulti: true,
      created: '2024-07-17T12:41:35.676752966',
      updated: '2024-07-17T12:41:35.676759257',
    },
    status: 'EDITABLE',
    seriesData: {
      media: [],
      attributes: {
        keywords: ['defaultKeyword'],
        url: 'https://nav.no',
      },
    },
    created: '2024-05-24T09:54:25.595126',
    updated: '2024-05-24T09:54:25.595163',
    expired: '2039-05-24T13:00:52.664454747',
    updatedByUser: 'system',
    createdByUser: 'system',
    variants: [],
    version: 0,
    isExpired: false,
    isPublished: false,
    inAgreement: false,
  })
})

export const defaultSeriesHandlers = [noSeriesHandler, defaultSeriesHandler]
