import { Bleed, BodyLong, Box, Button, HStack, Link, Page, Textarea, TextField, VStack } from '@navikt/ds-react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type CreateNewsDto = {
  tittel: string
  ingress: string
  body: string
}
type Props = {
  onSubmit: (data: CreateNewsDto) => void
}

export const NewsComponent = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<CreateNewsDto>()
  const navigate = useNavigate()
  return (
    <>
      <Box background="neutral-soft" minHeight={'100vh'}>
        <VStack gap="space-16" justify={'center'}>
          <Bleed marginInline={'full space-0'} asChild>
            <Button variant="tertiary" icon={<ArrowLeftIcon />} onClick={() => navigate('/')}>
              Tilbake
            </Button>
          </Bleed>
          <Page.Block as="main" width="text">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Opprett Sak</h2>
              <Box
                background="neutral-soft"
                borderColor="brand-blue"
                padding="space-16"
                borderWidth="2"
                borderRadius="12 12 0 0"
              >
                <BodyLong align={'center'}>Her skal det være et bilde!</BodyLong>
              </Box>
              <TextField {...register('tittel')} label="Tittel" width="text"></TextField>
              <Textarea {...register('ingress')} label="Ingress" maxLength={250}></Textarea>
              <Textarea {...register('body')} label="Innhold" minRows={10}></Textarea>
              <Button type="submit" variant={'primary'}>
                Opprett sak
              </Button>
            </form>
          </Page.Block>
        </VStack>
      </Box>
    </>
  )
}
