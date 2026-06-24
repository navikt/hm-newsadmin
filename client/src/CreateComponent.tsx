import {
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
  ActionMenu,
} from '@navikt/ds-react'
import {ArrowLeftIcon, ChevronDownIcon} from '@navikt/aksel-icons'
import { Controller } from 'react-hook-form'
import RichTextEditorQuill from 'felleskomponenter/RichTextEditor.tsx'
import { ImageUpload } from 'ImageUpload.tsx'
import { useNewsForm, NewsFormValues } from 'felleskomponenter/useNewsForm.ts'
import useSWR from "swr";
import {TagsDTO} from "utils/admin-util.ts";
import {getTags} from "utils/api-util.ts";

const diktator = '/supreme_leader 2.png'
const CREATE_DEFAULTS = { image_url: diktator }

type Props = {
  onSubmit: (data: NewsFormValues) => void
}

export const CreateComponent = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    fromDatepickerProps,
    fromInputProps,
    toDatepickerProps,
    toInputProps,
  } = useNewsForm(CREATE_DEFAULTS)

  const { data: tags } = useSWR<TagsDTO[]>('tags', () => getTags())

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
                <ImageUpload />
              </Box>
              <TextField
                {...register('title', { required: 'Mangler tittel' })}
                label="Tittel"
                error={errors.title?.message}
                width="text"
              ></TextField>
              <Textarea {...register('description')} label="Ingress" maxLength={250}></Textarea>
              <HStack justify={'center'}>
                <HStack align={'start'} gap={'space-64'} paddingInline={'space-32'} justify={'center'}>
                  <DatePicker {...fromDatepickerProps}>
                    <DatePicker.Input {...fromInputProps} label={'Fra dato'} error={errors.publishedFrom?.message} />
                  </DatePicker>
                  <DatePicker {...toDatepickerProps}>
                    <DatePicker.Input {...toInputProps} label={'Til dato'} error={errors.publishedTo?.message} />
                  </DatePicker>
                </HStack>
              </HStack>
              <VStack gap="space-8">
                <ActionMenu>
                  <ActionMenu.Trigger>
                    <Button
                        data-color="neutral"
                        variant="secondary"
                        icon={<ChevronDownIcon aria-hidden />}
                        iconPosition="right"
                    >
                      Tags
                    </Button>
                  </ActionMenu.Trigger>
                  <ActionMenu.Content>
                    <ActionMenu.Group label="Tags">
                      {tags?.map((tag) => (
                        <ActionMenu.Item key={tag.id} onSelect={() => console.info(tag.id)}>
                          {tag.name}
                        </ActionMenu.Item>
                      ))}
                    </ActionMenu.Group>
                  </ActionMenu.Content>
                </ActionMenu>
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
