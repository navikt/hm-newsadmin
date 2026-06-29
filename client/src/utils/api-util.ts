import { NewsDTO, TagsDTO } from 'utils/admin-util.ts'
import { mutate } from 'swr'

export async function getNews(): Promise<NewsDTO[]> {
  const res = await fetch('/news', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()
  return data.content
}

export async function deleteNews(id: String): Promise<void> {
  const response = await fetch(`/admin/news/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Sletting feilet: ${response.status}`)
  }
  await mutate('news')
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
