import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/news', () => HttpResponse.json([])),
  http.get('/admin/tags', () => HttpResponse.json([])),
]
