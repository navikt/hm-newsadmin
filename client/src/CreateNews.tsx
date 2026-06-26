import {
  Box,
  Button,
  Chips,
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
import { ArrowLeftIcon, ChevronDownIcon } from '@navikt/aksel-icons'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import RichTextEditorQuill from 'felleskomponenter/RichTextEditor.tsx'
import { ImageUpload } from 'ImageUpload.tsx'
import { useNewsForm, NewsFormValues } from 'felleskomponenter/useNewsForm.ts'
import useSWR from 'swr'
import { TagsDTO } from 'utils/admin-util.ts'
import { getTags } from 'utils/api-util.ts'
import { useNavigate } from 'react-router-dom'

const diktator = '/supreme_leader 2.png'
const CREATE_DEFAULTS = { image_url: diktator }

type Props = {
  onSubmit: (data: NewsFormValues) => void
}

export const CreateNews = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    fromDatepickerProps,
    fromInputProps,
    toDatepickerProps,
    toInputProps,
    setValue,
  } = useNewsForm(CREATE_DEFAULTS)

  const navigate = useNavigate()
  const { data: tags } = useSWR<TagsDTO[]>('tags', () => getTags())
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) => {
      const next = prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
      setValue('tags', next, { shouldValidate: true })
      return next
    })
  }

  return (
    <Box>
      <VStack gap="space-24" justify={'center'}>
        <Page.Block as="main" width="text">
          <form onSubmit={handleSubmit((data) => onSubmit({ ...data, tags: selectedTagIds }))}>
            <VStack gap="space-16">
              <HStack align={'center'} style={{ position: 'relative' }}>
                <Button
                  as={Link}
                  variant={'tertiary'}
                  icon={<ArrowLeftIcon />}
                  onClick={() => navigate(-1)}
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
                        <ActionMenu.Item key={tag.id} onSelect={() => toggleTag(tag.id)}>
                          {tag.tag}
                        </ActionMenu.Item>
                      ))}
                    </ActionMenu.Group>
                  </ActionMenu.Content>
                </ActionMenu>
                {errors.tags && <ErrorMessage showIcon>{errors.tags.message}</ErrorMessage>}
                {selectedTagIds.length > 0 && (
                  <Chips>
                    {selectedTagIds.map((id) => {
                      const tag = tags?.find((t) => t.id === id)
                      return tag ? (
                        <Chips.Removable key={id} onDelete={() => toggleTag(id)}>
                          {tag.tag}
                        </Chips.Removable>
                      ) : null
                    })}
                  </Chips>
                )}
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
