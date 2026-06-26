import { useNavigate, useParams } from 'react-router-dom'
import useSWR, { useSWRConfig } from 'swr'
import { EditNewsDto } from 'utils/admin-util.ts'
import { deleteNews } from 'utils/api-util.ts'
import { NewsAdmin } from 'NewsAdmin.tsx'

export const EditNewsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate } = useSWRConfig()
  const { data: news } = useSWR(`/news/${id}`, () => fetch(`/news/${id}`).then((res) => res.json()))

  async function editNews(data: EditNewsDto) {
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
  }
  if (!news) return <div></div>

  async function handleDelete() {
    await deleteNews(id!)
    navigate('/')
  }

  return <NewsAdmin onSubmit={editNews} onDelete={handleDelete} defaultValues={news} />
}
