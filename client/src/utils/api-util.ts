import { MediaDTO, NewsPage, TagsDTO } from 'utils/admin-util.ts'
import { mutate } from 'swr'

export async function getNews(page = 0, size = 6, search?: string, tags?: string[], status?: string): Promise<NewsPage> {
  const params = new URLSearchParams({ page: String(page), size: String(size) })
  if (search) params.set('search', search)
  if (status && status !== 'alle') params.set('status', status)
  tags?.forEach((tag) => params.append('tag', tag))

  const res = await fetch(`/admin/news?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()
  if (Array.isArray(data)) return { content: data, totalPages: 1, totalElements: data.length }
  const totalSize = data.totalSize ?? 0
  const pageSize = data.pageable?.size ?? size
  return {
    content: data.content ?? [],
    totalPages: Math.ceil(totalSize / pageSize),
    totalElements: totalSize,
  }
}

export async function deleteNews(id: string): Promise<void> {
  const response = await fetch(`/admin/news/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Sletting feilet: ${response.status}`)
  }
  await mutate('news')
}

export async function uploadNewsMedia(newsId: string, file: File): Promise<MediaDTO> {
  const formData = new FormData()
  formData.append('files', file)
  const res = await fetch(`/admin/news/${newsId}/media`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error(`Bildeoplasting feilet: ${res.status}`)
  return res.json()
}

export async function getNewsMedia(newsId: string): Promise<MediaDTO[]> {
  const res = await fetch(`/news/admin/media/${newsId}`)
  if (!res.ok) throw new Error(`Henting av media feilet: ${res.status}`)
  return res.json()
}

export async function deleteNewsMedia(newsId: string, uri: string): Promise<void> {
  const res = await fetch(`/news/admin/media/${newsId}/${encodeURIComponent(uri)}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Sletting av media feilet: ${res.status}`)
}

export async function getTags(): Promise<TagsDTO[]> {
  const res = await fetch('/admin/tags', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`Henting av tags feilet: ${res.status}`)
  }

  return res.json()
}
