import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { NewsAdmin } from 'pages/NewsAdmin.tsx'
import { NewsFormValues } from 'komponenter/useNewsForm.ts'
import { uploadNewsMedia } from 'utils/api-util.ts'
import { NewsDTO } from 'utils/admin-util.ts'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const CreateNewsPage = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const pendingFile = useRef<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function createNews(data: NewsFormValues) {
    setLoading(true)
    try {
      const res = await fetch(`${base}/admin/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) return

      const newsId: string = await res.json()

      if (pendingFile.current) {
        await uploadNewsMedia(newsId, pendingFile.current)
      }
      await mutate('news')
      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <NewsAdmin
      loading={loading}
      onSubmit={createNews}
      onDelete={() => {}}
      onFileSelect={(file) => (pendingFile.current = file)}
    />
  )
}
