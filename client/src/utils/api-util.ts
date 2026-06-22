import {NewsDTO} from 'utils/admin-util.ts'
import { mutate } from 'swr'

export async function getNews(): Promise<NewsDTO[]> {
  const res = await fetch('/news', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return res.json()
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
