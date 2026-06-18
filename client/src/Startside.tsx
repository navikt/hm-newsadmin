import {Textarea, TextField, VStack} from "@navikt/ds-react";

export const Startside = () => {
   async function getNews(): Promise<NewsDTO[]> {
    const res = await fetch("http://localhost:8084/news" , {
      method: 'GET',
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

  console.log(getNews())

  return (
  <VStack>
    <TextField label="Tittel"></TextField>
    <Textarea label="Innhold"></Textarea>
  </VStack>

  )

}
