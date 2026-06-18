import { Box, Heading, Page, Textarea, TextField, VStack } from '@navikt/ds-react'
import { FileObject, FileUpload } from '@navikt/ds-react/FileUpload'
import { useState } from 'react'

export const CreateNewsCard = () => {
  const filePdf = new File(['abc'.repeat(100000)], 'document.pdf')
  const fileJpg = new File(['abc'.repeat(500000)], 'picture.jpg')
  const exampleFiles: FileObject[] = [
    { file: filePdf, error: false },
    { file: fileJpg, error: true, reasons: ['fileType'] },
  ]
  const [files, setFiles] = useState<FileObject[]>(exampleFiles)

  return (
    <Page>
      <Page.Block as="main" width="text" gutters>
        <Heading size={'large'}>Opprett sak</Heading>
        <VStack
          gap={{
            xs: 'space-8',
            sm: 'space-24',
            md: 'space-40',
            lg: 'space-56',
            xl: 'space-72',
          }}
        >
          <Box padding={'space-16'}></Box>
          <FileUpload.Dropzone
            label={'Last opp bilde'}
            fileLimit={{ max: 1, current: files.length }}
            multiple={false}
            onSelect={setFiles}
          />
          {files.map((file: any) => (
            <FileUpload.Item
              key={file.file.name}
              file={file.file}
              button={{
                action: 'delete',
                onClick: () => null,
              }}
            />
          ))}
          <TextField label="Tittel"></TextField>
          <Textarea label="Innhold" resize></Textarea>
        </VStack>
      </Page.Block>
    </Page>
  )
}
