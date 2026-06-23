import {
  Bleed,
  BodyLong,
  Box,
  Button,
  DatePicker,
  Dialog,
  HStack,
  Label,
  Link,
  Page,
  Textarea,
  TextField,
  useDatepicker,
  useRangeDatepicker,
  VStack,
} from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CreateUpdateNewsDTO } from 'utils/types/response-types.ts'
import { EditNewsDto } from 'utils/admin-util.ts'
import RichTextEditorQuill from 'felleskomponenter/RichTextEditor.tsx'
import { ArrowLeftIcon, TrashIcon } from '@navikt/aksel-icons'
import { DialogBody, DialogFooter, DialogHeader } from '@navikt/ds-react/Dialog'

type Props = {
  onSubmit: (data: EditNewsDto) => void
  onDelete: () => void
  defaultValues?: EditNewsDto
}

export const EditComponent = ({ onSubmit, onDelete, defaultValues }: Props) => {
  const { register, handleSubmit, reset, control, setValue } = useForm<EditNewsDto>({
    defaultValues,
  })

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues])
  const navigate = useNavigate()

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: new Date(),
    onRangeChange: (range) => {
      if (range?.from) setValue('publishedFrom', range.from.toISOString())
      if (range?.to) setValue('publishedTo', range.to?.toISOString())
    },
    defaultSelected: {
      from: defaultValues?.publishedFrom ? new Date(defaultValues.publishedFrom) : undefined,
      to: defaultValues?.publishedTo ? new Date(defaultValues.publishedTo) : undefined,
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
                <h2>Rediger Sak</h2>
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
                  <HStack align={'start'} gap={'space-64'} paddingInline={'space-32'} justify={'space-between'}>
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
                Endre sak
              </Button>
              <VStack gap={'space-16'} paddingBlock={'space-0 space-16'}>
                <Dialog>
                  <Dialog.Trigger>
                    <Button data-color={'danger'} icon={<TrashIcon aria-hidden />}>
                      Slett
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Popup role={'alertdialog'} closeOnOutsideClick={false}>
                    <DialogHeader>
                      <DialogBody>
                        <BodyLong>Du er i ferd med å slette denne nyheten. Denne handlingen kan ikke angres</BodyLong>
                      </DialogBody>
                      <DialogFooter>
                        <Dialog.CloseTrigger>
                          <Button variant={'secondary'} data-color={'neutral'}>
                            Avbryt
                          </Button>
                        </Dialog.CloseTrigger>
                        <Dialog.CloseTrigger>
                          <Button variant={'danger'} onClick={() => onDelete()}>
                            Ja, slett
                          </Button>
                        </Dialog.CloseTrigger>
                      </DialogFooter>
                    </DialogHeader>
                  </Dialog.Popup>
                </Dialog>
              </VStack>
            </VStack>
          </form>
        </Page.Block>
      </VStack>
    </Box>
  )
}
