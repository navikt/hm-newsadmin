import { apiPath } from 'mocks/apiPath'
import { tilGodkjenningLangListe } from 'mocks/data/tilGodkjenningLangListe'
import { HttpResponse, http } from 'msw'
import { ProdukterTilGodkjenningChunk } from 'utils/types/response-types'

export const tilGodkjenningHandlers = [
  http.get<any, any, ProdukterTilGodkjenningChunk>(apiPath(`admin/api/v1/product/til-godkjenning`), async (info) => {
    const url = new URL(info.request.url)
    const page = url.searchParams.has('page') ? Number(url.searchParams.get('page')) : null
    const size = url.searchParams.has('size') ? Number(url.searchParams.get('size')) : null

    if (page !== null && size !== null) {
      const products = tilGodkjenningLangListe.content.slice(page * size, page * size + size)
      return HttpResponse.json({
        ...tilGodkjenningLangListe,
        content: products,
        pageNumber: page,
        size: products.length,
        totalPages: Math.ceil(tilGodkjenningLangListe.content.length / size),
        pageable: {
          number: page,
          sort: 'title',
          size: products.length,
        },
      })
    } else {
      return HttpResponse.json(tilGodkjenningLangListe)
    }
  }),
]
