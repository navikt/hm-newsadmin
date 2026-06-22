import { useNavigate, useParams } from 'react-router-dom'
import { EditComponent } from 'EditComponent.tsx'
import useSWR, { mutate } from 'swr'
type EditNewsDto = {
  title: string
  description: string
  body: string
}
export const EditNewsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: news } = useSWR(`/news/${id}`, () => fetch(`/news/${id}`).then((res) => res.json()))
  console.log(id)

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
      navigate('/')
    }
  }

  return <EditComponent onSubmit={editNews} defaultValues={news} />
}
