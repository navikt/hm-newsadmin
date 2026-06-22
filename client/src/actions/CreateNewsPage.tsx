import { useNavigate } from 'react-router-dom'
import { CreateComponent } from 'CreateComponent.tsx'
import { useSWRConfig } from 'swr'
import { CreateNewsDto } from 'utils/admin-util.ts'

export const CreateNewsPage = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()
  async function createNews(data: CreateNewsDto) {
    const res = await fetch('admin/news', {
      method: 'POST',
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

  return <CreateComponent onSubmit={createNews} />
}
