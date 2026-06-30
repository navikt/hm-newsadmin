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

    const created: NewsDTO = await res.json()

    if (pendingFile.current) {
      try {
        const media = await uploadNewsMedia(created.id, pendingFile.current)
        const uri = media[0]?.uri
        if (uri) {
          await fetch(`/admin/news/${created.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, image_url: uri }),
          })
        }
      } catch {
      }
    }

    await mutate('news')
    navigate('/')
  }

  return <NewsAdmin onSubmit={createNews} onDelete={() => {}} onFileSelect={(file) => (pendingFile.current = file)} />
}
