import {
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
  VStack,
  ErrorMessage,
} from '@navikt/ds-react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { Controller } from 'react-hook-form'
import RichTextEditorQuill from 'felleskomponenter/RichTextEditor.tsx'
import { useNewsForm, NewsFormValues } from 'felleskomponenter/useNewsForm.ts'

type Props = {
  onSubmit: (data: NewsFormValues) => void
}

export const CreateComponent = ({ onSubmit }: Props) => {
  const { register, handleSubmit, control, errors, datepickerProps, fromInputProps, toInputProps } = useNewsForm()

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
              <TextField
                {...register('title', { required: 'Mangler tittel' })}
                label="Tittel"
                error={errors.title?.message}
                width="text"
              ></TextField>
              <Textarea {...register('description')} label="Ingress" maxLength={250}></Textarea>
              <HStack justify={'center'}>
                <DatePicker {...datepickerProps}>
                  <HStack align={'start'} gap={'space-64'} paddingInline={'space-32'} justify={'center'}>
                    <DatePicker.Input
                      {...fromInputProps}
                      label={'Fra dato'}
                      error={errors.publishedFrom?.message}
                    ></DatePicker.Input>
                    <DatePicker.Input {...toInputProps} label={'Til dato'} error={errors.publishedTo?.message} />
                  </HStack>
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
                Opprett sak
              </Button>
            </VStack>
          </form>
        </Page.Block>
      </VStack>
    </Box>
  )
}
