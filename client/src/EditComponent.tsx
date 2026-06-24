import {
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
  VStack,
  ErrorMessage,
} from '@navikt/ds-react'
import { Controller } from 'react-hook-form'
import RichTextEditorQuill from 'felleskomponenter/RichTextEditor.tsx'
import { ArrowLeftIcon, TrashIcon } from '@navikt/aksel-icons'
import { DialogBody, DialogFooter, DialogHeader } from '@navikt/ds-react/Dialog'
import { useNewsForm, NewsFormValues } from 'felleskomponenter/useNewsForm.ts'
import { ImageUpload } from 'ImageUpload.tsx'

type Props = {
  onSubmit: (data: NewsFormValues) => void
  onDelete: () => void
  defaultValues?: NewsFormValues
}

export const EditComponent = ({ onSubmit, onDelete, defaultValues }: Props) => {
  const { register, handleSubmit, control, errors, fromDatepickerProps, fromInputProps, toDatepickerProps, toInputProps } =
    useNewsForm(defaultValues)

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
                <ImageUpload />
              </Box>
              <TextField
                {...register('title', { required: 'Mangler tittel' })}
                label="Tittel"
                error={errors.title?.message}
                width="text"
              />
              <Textarea {...register('description')} label="Ingress" maxLength={250}></Textarea>
              <HStack align={'start'} gap={'space-64'} paddingInline={'space-32'} justify={'center'}>
                <DatePicker {...fromDatepickerProps}>
                  <DatePicker.Input {...fromInputProps} label={'Fra dato'} error={errors.publishedFrom?.message} />
                </DatePicker>
                <DatePicker {...toDatepickerProps}>
                  <DatePicker.Input {...toInputProps} label={'Til dato'} error={errors.publishedTo?.message} />
                </DatePicker>
              </HStack>
              <VStack gap="space-8">
                <Label>Innhold</Label>
                <Controller
                  name="body"
                  control={control}
                  rules={{ required: 'Mangler innhold' }}
                  render={({ field, fieldState }) => (
                    <>
                      <RichTextEditorQuill
                        onTextChange={(html, rawText) => field.onChange(rawText.trim() ? html : '')}
                        defaultValue={field.value}
                        error={!!fieldState.error}
                      />
                      {fieldState.error && <ErrorMessage showIcon>{fieldState.error.message}</ErrorMessage>}
                    </>
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
