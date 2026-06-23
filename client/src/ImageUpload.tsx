import { BodyShort, Button, FileObject, FileUpload, Label, VStack } from '@navikt/ds-react'
import { useId, useState } from 'react'
import { UploadIcon } from '@navikt/aksel-icons'

export const ImageUpload = () => {
  const labelId = useId()
  const descId = useId()
  const [imageUri, setImageUri] = useState<string>('')

  function handleSelect(files: FileObject[]) {
    const file = files[0]?.file
    if (file) {
      setImageUri(URL.createObjectURL(file))
    }
  }

  return (
    <VStack gap="space-8" align="center">
      {imageUri && <img src={imageUri} alt={'bilde'} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />}
      <VStack gap="space-2" align="start">
        <Label id={labelId} as="div">
          Last opp bilde
        </Label>
        <BodyShort id={descId} textColor="subtle">
          Du kan laste opp maks 1 bilde.
        </BodyShort>
      </VStack>
      <FileUpload.Trigger accept="image/*" onSelect={handleSelect} multiple={false}>
        <Button aria-describedby={`${labelId} ${descId}`} variant="secondary" icon={<UploadIcon aria-hidden />}>
          {imageUri ? 'Bytt bilde' : 'Velg fil'}
        </Button>
      </FileUpload.Trigger>
    </VStack>
  )
}
