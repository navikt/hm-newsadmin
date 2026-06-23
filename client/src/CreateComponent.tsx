import {
  Bleed,
  BodyLong,
  Box,
  Button,
  DatePicker,
  HStack,
  Label,
  Link,
  Page,
  Textarea,
  TextField,
  useDatepicker,
  VStack,
} from '@navikt/ds-react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CreateNewsDto } from 'utils/admin-util.ts'
import RichTextEditorQuill from 'felleskomponenter/RichTextEditor.tsx'

type Props = {
  onSubmit: (data: CreateNewsDto) => void
}

export const CreateComponent = ({ onSubmit }: Props) => {
  const { register, handleSubmit, control, setValue } = useForm<CreateNewsDto>()
  const navigate = useNavigate()

  const {
    datepickerProps: fromProps,
    inputProps: fromInputProps,
    selectedDay: fromDay,
  } = useDatepicker({
    fromDate: new Date('Aug 23 2019'),
    onDateChange: (date) => {
      if (date) setValue('publishedFrom', date.toISOString())
    },
  })
  const {
    datepickerProps: toProps,
    inputProps: toInputProps,
    selectedDay: toDay,
  } = useDatepicker({
    fromDate: new Date('Aug 24 2019'),
    onDateChange: (date) => {
      if (date) setValue('publishedTo', date.toISOString())
    },
  })
  return (
    <Box>
      <VStack gap="space-24" justify={'center'}>
        <Page.Block as="main" width="text">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="space-16">
              <HStack align={'center'} style={{ position: 'relative' }}>
                <Button
                  as={Link}
                  href={'/'}
                  variant={'tertiary'}
                  icon={<ArrowLeftIcon />}
                  style={{ position: 'absolute', right: '100%' }}
                >
                  Tilbake
                </Button>
                <h2>Opprett Sak</h2>
              </HStack>
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
              <VStack gap="space-8">
                <Label>Innhold</Label>
                <Controller
                  name="body"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditorQuill onTextChange={(html) => field.onChange(html)} defaultValue={field.value} />
                  )}
                />
              </VStack>
              <Button type="submit" variant={'primary'}>
                Opprett sak
              </Button>
            </VStack>
          </form>
        </Page.Block>
      </VStack>
    </Box>
  )
}
