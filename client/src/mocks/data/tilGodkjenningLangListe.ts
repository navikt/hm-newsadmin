import { ProdukterTilGodkjenningChunk } from 'utils/types/response-types'

export const tilGodkjenningLangListe: ProdukterTilGodkjenningChunk = {
  content: [
    {
      title: 'Fingerløse hansker',
      seriesUUID: '702b07d9-a1d5-4d8c-85ea-7e8a4aafdd54',
      status: 'NEW',
      supplierName: 'Ullvotten AS',
      isExpired: false,
      updated: Date.now().toString(),
      mainProduct: true,
    },
    {
      title: 'Varmevotten',
      seriesUUID: '4ad3fbbc-dd97-47c8-894a-d4ac75341e4c',
      status: 'NEW',
      supplierName: 'Ullvotten AS',
      isExpired: false,
      updated: Date.now().toString(),
      mainProduct: true,
    },
    {
      title: 'Vikinghjelm',
      seriesUUID: 'b0900f25-463a-4cbe-8150-707d9d9ec7d1',
      status: 'EXISTING',
      supplierName: 'Hjelmfabrikken AS',
      isExpired: false,
      updated: Date.now().toString(),
      mainProduct: true,
    },
  ],
  pageable: {
    number: 0,
    sort: 'title',
    size: 1000,
  },
  empty: false,
  size: 1000,
  offset: 0,
  pageNumber: 0,
  numberOfElements: 1000,
}
