import { BodyShort, Button, ErrorMessage, FileObject, FileUpload, Label, VStack } from '@navikt/ds-react'
import { useId, useState } from 'react'
import { UploadIcon } from '@navikt/aksel-icons'
import { uploadNewsMedia } from 'utils/api-util.ts'

type Props = {
  newsId?: string
  defaultImageUrl?: string
  onImageUpload?: (uri: string) => void
}

export const ImageUpload = ({ newsId, defaultImageUrl, onImageUpload }: Props) => {
  const labelId = useId()
  const descId = useId()
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultImageUrl)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | undefined>()

  async function handleSelect(files: FileObject[]) {
    const file = files[0]?.file
    if (!file || !newsId) return

    setPreviewUrl(URL.createObjectURL(file))
    setUploadError(undefined)
    setIsUploading(true)

    try {
      const media = await uploadNewsMedia(newsId, file)
      const uri = media[0]?.uri
      if (uri) onImageUpload?.(uri)
    } catch {
      setUploadError('Kunne ikke laste opp bildet. Prøv igjen.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <VStack gap="space-8" align="center">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Forhåndsvisning"
          style={{ objectFit: 'contain', width: '100%', maxHeight: '300px', borderRadius: '4px' }}
        />
      )}
      <VStack gap="space-2" align="start">
        <Label id={labelId} as="div">
          Last opp bilde
        </Label>
        <BodyShort id={descId} textColor="subtle">
          {newsId ? 'Du kan laste opp maks 1 bilde.' : 'Lagre nyheten først for å laste opp bilde.'}
        </BodyShort>
      </VStack>
      {uploadError && <ErrorMessage showIcon>{uploadError}</ErrorMessage>}
      <FileUpload.Trigger accept="image/*" onSelect={handleSelect} multiple={false}>
        <Button
          type="button"
          aria-describedby={`${labelId} ${descId}`}
          variant="secondary"
          icon={<UploadIcon aria-hidden />}
          loading={isUploading}
          disabled={!newsId}
        >
          {previewUrl ? 'Bytt bilde' : 'Velg fil'}
        </Button>
      </FileUpload.Trigger>
    </VStack>
  )
}
