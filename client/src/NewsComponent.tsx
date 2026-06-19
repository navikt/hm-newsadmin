import { BodyLong, Box, Button, Link, Page, Textarea, TextField, VStack } from '@navikt/ds-react'

export const NewsComponent = () => {
  return (
    <Box background="neutral-soft" minHeight={'100vh'}>
      <Page.Block as="main" width="text" gutters>
        <VStack gap="space-24" justify={'center'}>
          <h1>Opprett Sak</h1>
          <Box
            background="neutral-soft"
            borderColor="brand-blue"
            padding="space-16"
            borderWidth="2"
            borderRadius="12 12 0 0"
          >
            <BodyLong align={'center'}>Her skal det være et bilde!</BodyLong>
          </Box>
          <TextField label="Tittel" width="text"></TextField>
          <Textarea label="Ingress" maxLength={250}></Textarea>
          <Textarea label="Innhold" minRows={10}></Textarea>

          <Button variant={'primary'}>Opprett sak</Button>
        </VStack>
      </Page.Block>
    </Box>
  )
}
