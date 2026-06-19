import { useNavigate } from 'react-router-dom'
import { EditComponent } from 'EditComponent.tsx'
import { mutate } from 'swr'
type EditNewsDto = {
  title: string
  description: string
  body: string
}
export const EditNewsPage = () => {
  const navigate = useNavigate()
  async function editNews(data: EditNewsDto) {
    const res = await fetch('admin/news', {
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
    return console.log(res.json())
  }

  return <EditComponent onSubmit={editNews} />
}
