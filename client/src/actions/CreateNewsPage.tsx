import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { NewsAdmin } from 'pages/NewsAdmin.tsx'
import { NewsFormValues } from 'komponenter/useNewsForm.ts'
import { uploadImageFile } from 'utils/image-util.ts'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const CreateNewsPage = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  const selectedImageFile = useRef<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function createNews(data: NewsFormValues) {
    setLoading(true)
    try {
      const res = await fetch(`${base}/admin/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) return

      const newsId: string = await res.json()
      await uploadImageFile(newsId, selectedImageFile.current)
      await mutate('news')
      navigate(`/aktuelt/${newsId}/edit`)
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
      onFileSelect={(file) => (selectedImageFile.current = file)}
    />
  )
}
