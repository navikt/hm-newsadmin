import {
  Bleed,
  BodyLong,
  Box,
  Button,
  DatePicker,
  Dialog,
  HStack,
  Link,
  Page,
  Textarea,
  TextField,
  useDatepicker,
  VStack,
} from '@navikt/ds-react'
import { ArrowLeftIcon, TrashIcon } from '@navikt/aksel-icons'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CreateUpdateNewsDTO } from 'utils/types/response-types.ts'
import { EditNewsDto } from 'utils/admin-util.ts'

type Props = {
  onSubmit: (data: EditNewsDto) => void
  onDelete: () => void
  defaultValues?: CreateUpdateNewsDTO
}

export const EditComponent = ({ onSubmit, onDelete, defaultValues }: Props) => {
  const { register, handleSubmit, reset } = useForm<EditNewsDto>()

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues])
  const navigate = useNavigate()

  const {
    datepickerProps: fromProps,
    inputProps: fromInputProps,
    selectedDay: fromDay,
  } = useDatepicker({
    fromDate: new Date('Aug 23 2019'),
    onDateChange: console.info,
  })

  const {
    datepickerProps: toProps,
    inputProps: toInputProps,
    selectedDay: toDay,
  } = useDatepicker({
    fromDate: new Date('Aug 24 2019'),
    onDateChange: console.info,
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
              <HStack align={'start'} gap={'space-24'} paddingInline={'space-32'} justify={'space-between'}>
                <DatePicker {...fromProps}>
                  <DatePicker.Input {...fromInputProps} label="Fra dato" description="Format: dd.mm.åååå" />
                </DatePicker>
                <DatePicker {...toProps}>
                  <DatePicker.Input {...toInputProps} label="Velg dato" description="Format: dd.mm.åååå" />
                </DatePicker>
              </HStack>
              <Textarea {...register('body')} label="Innhold" minRows={10}></Textarea>
              <Button type="submit" variant={'primary'}>
                Endre sak
              </Button>
              <VStack gap={'space-16'} paddingBlock={'space-0 space-16'}>
                <Dialog>
                  <Dialog.Trigger>
                    <Button data-color="danger" icon={<TrashIcon aria-hidden />}>
                      Slett
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                    <Dialog.Header withClosebutton={false}>
                      <Dialog.Title>Er du sikker?</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <BodyLong>Du er i ferd med å slette denne nyheten. Denne handlingen kan ikke angres.</BodyLong>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.CloseTrigger>
                        <Button variant="secondary" data-color="neutral">
                          Avbryt
                        </Button>
                      </Dialog.CloseTrigger>
                      <Dialog.CloseTrigger>
                        <Button variant="danger" onClick={() => onDelete()}>
                          Ja, slett
                        </Button>
                      </Dialog.CloseTrigger>
                    </Dialog.Footer>
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
