import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/news', () => HttpResponse.json([])),
  http.get('/admin/tags', () => HttpResponse.json([])),
  http.post('/admin/media/news/:newsId', () =>
    HttpResponse.json([{ uri: 'http://localhost/test-image.jpg' }], { status: 201 })
  ),
  http.get('/admin/media/news/:newsId', () => HttpResponse.json([])),
  http.delete('/admin/media/news/:newsId/:uri', () => HttpResponse.json({})),
]
