import { useNavigate, useParams } from 'react-router-dom'
import useSWR, { useSWRConfig } from 'swr'
import { deleteNews } from 'utils/api-util.ts'
import { NewsAdmin } from 'pages/NewsAdmin.tsx'
import { NewsFormValues } from 'komponenter/useNewsForm.ts'
import { useState } from 'react'

export const EditNewsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate } = useSWRConfig()
  const { data: news } = useSWR(`/news/${id}`, () => fetch(`/news/${id}`).then((res) => res.json()))
  const [loading, setLoading] = useState(false)

  async function editNews(data: NewsFormValues) {
    setLoading(true)
    try {
      const res = await fetch(`/admin/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await mutate('news')
        await mutate(`/news/${id}`)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!news) return <div></div>

  async function handleDelete() {
    await deleteNews(id!)
    navigate('/')
  }

  return <NewsAdmin loading={loading} onSubmit={editNews} onDelete={handleDelete} defaultValues={news} newsId={id} />
}
