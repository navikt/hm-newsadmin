import {
  Bleed,
  BodyLong,
  Box,
  Button,
  DatePicker,
  HStack,
  Link,
  Page,
  Textarea,
  TextField,
  useDatepicker,
  VStack,
} from '@navikt/ds-react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PageBlock } from '@navikt/ds-react/Page'

type CreateNewsDto = {
  title: string
  description: string
  body: string
}
type Props = {
  onSubmit: (data: CreateNewsDto) => void
}

export const NewsComponent = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<CreateNewsDto>()
  const navigate = useNavigate()

  const {
    datepickerProps: fromProps,
    inputProps: fromInputProps,
    selectedDay: fromDay,
  } = useDatepicker({
    fromDate: new Date('Aug 23 2019'),
    onDateChange: console.info,
  })

  const {
    datepickerProps: toProps,
    inputProps: toInputProps,
    selectedDay: toDay,
  } = useDatepicker({
    fromDate: new Date('Aug 24 2019'),
    onDateChange: console.info,
  })
  return (
    <>
      <Box background="neutral-soft" minHeight={'100vh'}>
        <HStack justify={'center'}>
          <h2>Opprett Sak</h2>
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
                    Opprett sak
                  </Button>
                </VStack>
              </form>
            </Page.Block>
          </VStack>
        </HStack>
        <VStack gap="space-24" justify={'center'}>
          <Bleed marginInline={'full space-0'} asChild>
            <Button variant="tertiary" icon={<ArrowLeftIcon />} onClick={() => navigate('/')}>
              Tilbake
            </Button>
          </Bleed>
          <Page.Block as="main" width="text">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap="space-16">
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
                <TextField {...register('title')} label="Tittel" width="text"></TextField>
                <Textarea {...register('description')} label="Ingress" maxLength={250}></Textarea>
                <HStack align={'start'} gap={'space-24'} paddingInline={'space-32'} justify={'space-between'}>
                  <DatePicker {...fromProps}>
                    <DatePicker.Input {...fromInputProps} label="Fra dato" description="Format: dd.mm.åååå" />
                  </DatePicker>
                  <DatePicker {...toProps}>
                    <DatePicker.Input {...toInputProps} label="Velg dato" description="Format: dd.mm.åååå" />
                  </DatePicker>
                </HStack>
                <Textarea {...register('body')} label="Innhold" minRows={10}></Textarea>
                <Button type="submit" variant={'primary'}>
                  Opprett sak
                </Button>
              </VStack>
            </form>
          </Page.Block>
        </VStack>
      </Box>
    </>
  )
}
