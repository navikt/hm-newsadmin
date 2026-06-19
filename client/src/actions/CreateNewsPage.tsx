import { VStack, TextField, Textarea, Button, Link } from '@navikt/ds-react'
import { Route, Routes } from 'react-router-dom'
import { CreateNewsCard } from 'CreateNewsCard.tsx'
import { NewsComponent } from 'NewsComponent.tsx'

export const CreateNewsPage = () => {
  async function createNews(): Promise<NewsDTO[]> {
    const res = await fetch('http://localhost:8084/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  }
  type NewsDTO = {
    id: string
    title: string
    body: string
  }

  console.log(createNews())

  return <NewsComponent />
}
