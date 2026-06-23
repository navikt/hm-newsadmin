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
  useRangeDatepicker,
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

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: new Date(),
    onRangeChange: (range) => {
      if (range?.from) setValue('publishedFrom', range.from.toISOString())
      if (range?.to) setValue('publishedTo', range.to?.toISOString())
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
              <HStack justify={'center'}>
                <DatePicker {...datepickerProps}>
                  <HStack align={'start'} gap={'space-64'} paddingInline={'space-32'} justify={'center'}>
                    <DatePicker.Input {...fromInputProps} label={'Fra dato'}></DatePicker.Input>
                    <DatePicker.Input {...toInputProps} label={'Til dato'}></DatePicker.Input>
                  </HStack>
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
