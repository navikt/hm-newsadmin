import { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { FINNHJELPEMIDDEL_PUBLIC_URL } from 'environments'
import { ImageUpload } from 'komponenter/ImageUpload.tsx'
import RichTextEditorQuill from 'komponenter/RichTextEditor.tsx'
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, NewsFormValues, useNewsForm } from 'komponenter/useNewsForm.ts'
import useSWR from 'swr'
import { NewsStatus, TagsDTO } from 'utils/admin-util.ts'
import { getTags } from 'utils/api-util.ts'

import { ArrowLeftIcon, EyeIcon, TrashIcon } from '@navikt/aksel-icons'
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
  Select,
  TextField,
  Textarea,
  ToggleGroup,
  VStack,
} from '@navikt/ds-react'
import { DialogBody, DialogFooter, DialogHeader } from '@navikt/ds-react/Dialog'

type Props = {
  onSubmit: (data: NewsFormValues) => void
  onDelete: () => void
  defaultValues?: NewsFormValues
  newsId?: string
  onFileSelect?: (file: File) => void
  loading?: boolean
  returnTo?: string
}

export const NewsAdmin = ({ onSubmit, onDelete, defaultValues, newsId, onFileSelect, loading, returnTo }: Props) => {
  const isEdit = !!newsId
  const createDefaults = useMemo(() => ({ status: 'DRAFT' as NewsStatus }), [])

  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    watch,
    fromDatepickerProps,
    fromInputProps,
    toDatepickerProps,
    toInputProps,
    setValue,
  } = useNewsForm(isEdit ? defaultValues : createDefaults)

  const [hasImage, setHasImage] = useState(!!defaultValues?.imageUrl)

  const navigate = useNavigate()
  const { data: tags } = useSWR<TagsDTO[]>('tags', () => getTags())
  const status = watch('status')

  useEffect(() => {
    if (tags && defaultValues?.tags) {
      const ids = defaultValues.tags
        .map((name) => tags.find((t) => t.tag === name)?.id)
        .filter((id): id is string => Boolean(id))
      setValue('tags', ids)
    }
  }, [tags, defaultValues?.tags])

  return (
    <Page>
      <Page.Block as="main" width="text">
        <form
          onSubmit={handleSubmit(
            (data) => {
              if (hasImage && !data.imageDescription?.trim()) {
                setError('imageDescription', { message: 'Alt-tekst er obligatorisk når bilde er lastet opp' })
                return
              }
              onSubmit(data)
            },
            (errors) => console.log('Valideringsfeil:', errors)
          )}
        >
          <VStack gap="space-16" paddingBlock={'space-0 space-24'}>
            <HStack align={'center'} style={{ position: 'relative' }}>
              <Link
                onClick={() => navigate(returnTo ?? '/')}
                style={{ position: 'absolute', right: 'calc(100% + 2rem)' }}
              >
                <ArrowLeftIcon />
                Tilbake
              </Link>
              <h2>{isEdit ? 'Rediger' : 'Opprett'}</h2>
            </HStack>
            <Box
              background="neutral-soft"
              borderColor="brand-blue"
              padding="space-16"
              borderWidth="2"
              borderRadius="12 12 0 0"
            >
              <VStack gap="space-8">
                <ImageUpload
                  defaultImageUrl={defaultValues?.imageUrl}
                  onImageRemove={() => {
                    setValue('imageUrl', '')
                    setValue('imageDescription', '')
                    setHasImage(false)
                  }}
                  onFileSelect={(file) => {
                    onFileSelect?.(file)
                    setHasImage(true)
                  }}
                />
                {hasImage && (
                  <TextField
                    {...register('imageDescription', {
                      validate: (v) => !hasImage || !!v?.trim() || 'Alt-tekst er obligatorisk når bilde er lastet opp',
                    })}
                    defaultValue={defaultValues?.imageDescription}
                    label="Alt-tekst"
                    description="Beskriv bildet for skjermlesere"
                    error={errors.imageDescription?.message}
                  />
                )}
              </VStack>
            </Box>
            <Textarea
              {...register('title', { required: 'Mangler tittel' })}
              label="Tittel"
              maxLength={MAX_TITLE_LENGTH}
              error={errors.title?.message}
            ></Textarea>
            <Textarea
              {...register('description')}
              label="Ingress"
              maxLength={MAX_DESCRIPTION_LENGTH}
              error={errors.description?.message}
            ></Textarea>
            <HStack gap={'space-16'} justify={'start'} style={{ width: '100%' }}>
              <DatePicker {...fromDatepickerProps}>
                <DatePicker.Input {...fromInputProps} label={'Fra dato'} error={errors.publishedFrom?.message} />
              </DatePicker>
              <DatePicker {...toDatepickerProps}>
                <DatePicker.Input {...toInputProps} label={'Til dato'} error={errors.publishedTo?.message} />
              </DatePicker>
            </HStack>
            <Label>Innhold</Label>
            <Controller
              name="body"
              control={control}
              rules={{ required: 'Mangler innhold' }}
              render={({ field }) => (
                <>
                  <RichTextEditorQuill
                    onTextChange={(html, rawText) => field.onChange(rawText.trim() ? html : '')}
                    defaultValue={field.value}
                  />
                </>
              )}
            />
            <Controller
              name="tags"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  label="Type"
                  value={field.value?.[0] ?? ''}
                  onChange={(e) => field.onChange([e.target.value])}
                  error={fieldState.error?.message}
                  style={{ width: 'fit-content' }}
                >
                  <option value="" disabled>
                    Velg type
                  </option>
                  {tags?.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.tag}
                    </option>
                  ))}
                </Select>
              )}
            />
            <VStack gap={'space-32'}>
              <HStack gap="space-8" align="end" justify={'space-between'} style={{ width: '100%' }}>
                <ToggleGroup value={status} onChange={(v) => setValue('status', v as NewsStatus)} label="Status">
                  <ToggleGroup.Item value="DRAFT">Utkast</ToggleGroup.Item>
                  <ToggleGroup.Item value="PUBLISHED">Ferdigstilt</ToggleGroup.Item>
                </ToggleGroup>
                {newsId && (
                  <Button
                    variant="secondary"
                    icon={<EyeIcon aria-hidden />}
                    onClick={() => window.open(`${FINNHJELPEMIDDEL_PUBLIC_URL()}/aktuelt/${newsId}`, '_blank')}
                    type="button"
                  >
                    Forhåndsvis
                  </Button>
                )}
              </HStack>
              <Textarea
                {...register('comment')}
                label="Kommentar"
                description="Intern merknad, vises ikke til brukere"
              />
              {isEdit ? (
                <HStack gap={'space-8'}>
                  <Dialog>
                    <Dialog.Trigger style={{ flex: 1, display: 'flex' }}>
                      <Button data-color={'danger'} icon={<TrashIcon aria-hidden />} style={{ width: '100%' }}>
                        Slett
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Popup role={'alertdialog'} closeOnOutsideClick={false}>
                      <DialogHeader>Slett nyhet</DialogHeader>
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
                    </Dialog.Popup>
                  </Dialog>
                  <Button loading={loading} type="submit" variant={'primary'} style={{ flex: 1 }}>
                    Lagre sak
                  </Button>
                </HStack>
              ) : (
                <Button loading={loading} type="submit" variant={'primary'} style={{ width: '100%' }}>
                  Opprett sak
                </Button>
              )}
            </VStack>
          </VStack>
        </form>
      </Page.Block>
    </Page>
  )
}
