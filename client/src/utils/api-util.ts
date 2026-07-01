import { MediaDTO, NewsDTO, TagsDTO } from 'utils/admin-util.ts'
import { mutate } from 'swr'

export async function getNews(page = 0, size = 20): Promise<NewsDTO[]> {
  const res = await fetch(`/news?page=${page}&size=${size}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()
  return Array.isArray(data) ? data : (data.content ?? [])
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
