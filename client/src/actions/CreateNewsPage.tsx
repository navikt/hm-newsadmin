import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { NewsAdmin } from 'NewsAdmin.tsx'
import { NewsFormValues } from 'felleskomponenter/useNewsForm.ts'

export const CreateNewsPage = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()

  async function createNews(data: NewsFormValues) {
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

  return <NewsAdmin onSubmit={createNews} onDelete={() => {}} />
}
