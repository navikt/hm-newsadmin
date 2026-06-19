import { VStack, TextField, Textarea, Button, Link } from '@navikt/ds-react'
import { Route, Routes } from 'react-router-dom'
import { CreateNewsCard } from 'CreateNewsCard.tsx'
import { NewsComponent } from 'NewsComponent.tsx'
type CreateNewsDto = {
  title: string
  description: string
  body: string
}
export const CreateNewsPage = () => {
  async function createNews(data: CreateNewsDto) {
    const res = await fetch('admin/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return console.log(res.json())
  }

  return <NewsComponent onSubmit={createNews} />
}
