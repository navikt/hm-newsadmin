import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { NewsAdmin } from 'pages/NewsAdmin.tsx'
import { NewsFormValues } from 'komponenter/useNewsForm.ts'
import { uploadNewsMedia } from 'utils/api-util.ts'
import { NewsDTO } from 'utils/admin-util.ts'

export const CreateNewsPage = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const pendingFile = useRef<File | null>(null)

  async function createNews(data: NewsFormValues) {
    const res = await fetch('admin/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) return

    const newsId: string = await res.json()

    if (pendingFile.current) {
      try {
        await uploadNewsMedia(newsId, pendingFile.current)
      } catch (error) {
        console.error(error)
      }
    }

    await mutate('news')
    navigate('/')
  }

  return <NewsAdmin onSubmit={createNews} onDelete={() => {}} onFileSelect={(file) => (pendingFile.current = file)} />
}
