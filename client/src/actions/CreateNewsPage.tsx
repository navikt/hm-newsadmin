import { VStack, TextField, Textarea, Button, Link } from '@navikt/ds-react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { CreateNewsCard } from 'CreateNewsCard.tsx'
import { NewsComponent } from 'NewsComponent.tsx'
import { mutate } from 'swr'
type CreateNewsDto = {
  title: string
  description: string
  body: string
}
export const CreateNewsPage = () => {
  const navigate = useNavigate()
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

  return <NewsComponent onSubmit={createNews} />
}
