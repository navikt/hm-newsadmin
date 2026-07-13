import { BodyShort, Button, ErrorMessage, FileObject, FileUpload, Label, VStack } from '@navikt/ds-react'
import { useId, useState } from 'react'
import { UploadIcon, XMarkIcon } from '@navikt/aksel-icons'
import { mediumImageLoader } from 'utils/image-util.ts'

type Props = {
  defaultImageUrl?: string
  onImageRemove?: () => void
  onFileSelect?: (file: File) => void
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg']

export const ImageUpload = ({ defaultImageUrl, onImageRemove, onFileSelect }: Props) => {
  const labelId = useId()
  const descId = useId()
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    defaultImageUrl ? mediumImageLoader(defaultImageUrl) : undefined
  )
  const [uploadError, setUploadError] = useState<string | undefined>()

  function handleSelect(files: FileObject[]) {
    const file = files[0]?.file
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Kun PNG- og JPEG-bilder er tillatt')
      return
    }

    setUploadError(undefined)
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
    onFileSelect?.(file)
  }

  return (
    <VStack gap="space-8" align="center">
      {previewUrl && (
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src={previewUrl}
            alt="Forhåndsvisning"
            style={{ objectFit: 'contain', width: '100%', maxHeight: '300px', borderRadius: '4px' }}
          />
          <Button
            type="button"
            variant="tertiary-neutral"
            size="small"
            icon={<XMarkIcon aria-hidden />}
            aria-label="Fjern bilde"
            onClick={() => {
              if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
              setPreviewUrl(undefined)
              onImageRemove?.()
            }}
            style={{ position: 'absolute', top: '4px', right: '4px', background: 'white', borderRadius: '50%' }}
          />
        </div>
      )}
      <VStack gap="space-2" align="start">
        <Label id={labelId} as="div">
          Last opp bilde
        </Label>
        <BodyShort id={descId} textColor="subtle">
          Du kan laste opp bilde i PNG-, JPG- eller JPEG-format. Du kan legge ved maks 1 bilde.
        </BodyShort>
      </VStack>
      {uploadError && <ErrorMessage showIcon>{uploadError}</ErrorMessage>}
      <FileUpload.Trigger accept="image/png, image/jpeg" onSelect={handleSelect} multiple={false}>
        <Button
          type="button"
          aria-describedby={`${labelId} ${descId}`}
          variant="secondary"
          icon={<UploadIcon aria-hidden />}
        >
          {previewUrl ? 'Bytt bilde' : 'Velg fil'}
        </Button>
      </FileUpload.Trigger>
    </VStack>
  )
}
