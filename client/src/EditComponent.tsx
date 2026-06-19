import { BodyLong, Box, Button, HStack, Page, Textarea, TextField, VStack } from '@navikt/ds-react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type EditNewsDto = {
  title: string
  description: string
  body: string
}

type NewsDTO = {
  id: string
  title: string
  description: string
  body: string
}

type Props = {
  onSubmit: (data: EditNewsDto) => void
}

async function getNewsById(): Promise<NewsDTO[]> {
  const res = await fetch('/news/${news.id}/edit', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return res.json()
}

export const EditComponent = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<EditNewsDto>()
  const navigate = useNavigate()
  return (
    <>
      <Box background="neutral-soft" minHeight={'100vh'}>
        <HStack justify={'center'}>
          <h2>Rediger Sak</h2>
          <VStack gap="space-24" justify={'center'}>
            <Page.Block as={'header'} gutters>
              <Button variant="tertiary" icon={<ArrowLeftIcon />} onClick={() => navigate('/')}>
                Tilbake
              </Button>
            </Page.Block>
            <Page.Block as="main" width="text">
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                  <Box
                    background="neutral-soft"
                    borderColor="brand-blue"
                    padding="space-16"
                    borderWidth="2"
                    borderRadius="12 12 0 0"
                  >
                    <BodyLong align={'center'}>Her skal det være et bilde!</BodyLong>
                  </Box>
                  <TextField {...register('title')} label="Tittel" width="text"></TextField>
                  <Textarea {...register('description')} label="Ingress" maxLength={250}></Textarea>
                  <Textarea {...register('body')} label="Innhold" minRows={10}></Textarea>
                  <Button type="submit" variant={'primary'}>
                    Endre sak
                  </Button>
                </VStack>
              </form>
            </Page.Block>
          </VStack>
        </HStack>
      </Box>
    </>
  )
}
