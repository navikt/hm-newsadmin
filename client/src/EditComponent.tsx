import {
  Bleed,
  BodyLong,
  Box,
  Button,
  DatePicker,
  HStack,
  Page,
  Textarea,
  TextField,
  useDatepicker,
  VStack,
} from '@navikt/ds-react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CreateUpdateNewsDTO } from 'utils/types/response-types.ts'
import { EditNewsDto } from 'utils/admin-util.ts'
import RichTextEditorQuill from 'felleskomponenter/RichTextEditor.tsx'

type Props = {
  onSubmit: (data: EditNewsDto) => void
  defaultValues?: CreateUpdateNewsDTO
}

export const EditComponent = ({ onSubmit, defaultValues }: Props) => {
  const { register, handleSubmit, reset, control } = useForm<EditNewsDto>({
    defaultValues,
  })

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues])
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
    <Box>
      <VStack gap="space-24" justify={'center'}>
        <Bleed marginInline={'full space-0'} asChild>
          <Button variant="tertiary" icon={<ArrowLeftIcon />} onClick={() => navigate('/')}>
            Tilbake
          </Button>
        </Bleed>
        <Page.Block as="main" width="text">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="space-16">
              <h2>Rediger Sak</h2>
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
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <RichTextEditorQuill onTextChange={(html) => field.onChange(html)} defaultValue={field.value} />
                )}
              />{' '}
              <Button type="submit" variant={'primary'}>
                Endre sak
              </Button>
            </VStack>
          </form>
        </Page.Block>
      </VStack>
    </Box>
  )
}
