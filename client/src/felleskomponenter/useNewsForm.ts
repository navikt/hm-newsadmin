import { useForm } from 'react-hook-form'
import { useDatepicker } from '@navikt/ds-react'
import { useEffect, useRef } from 'react'

export type NewsFormValues = {
  title: string
  description: string
  body: string
  publishedFrom: string
  publishedTo: string
  image_url: string
}

export const useNewsForm = (defaultValues?: Partial<NewsFormValues>) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewsFormValues>({ defaultValues })

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues])

  register('publishedFrom', { required: 'Mangler fra-dato' })
  register('publishedTo', { required: 'Mangler til-dato' })

  const publishedFrom = watch('publishedFrom')
  const fromDateValue = publishedFrom ? new Date(publishedFrom) : new Date()

  const resetToDateRef = useRef<(() => void) | null>(null)

  const { datepickerProps: fromDatepickerProps, inputProps: fromInputProps } = useDatepicker({
    fromDate: new Date(),
    defaultSelected: defaultValues?.publishedFrom ? new Date(defaultValues.publishedFrom) : undefined,
    onDateChange: (date) => {
      setValue('publishedFrom', date?.toISOString() ?? '')
      if (date) {
        const currentTo = getValues('publishedTo')
        if (currentTo && new Date(currentTo) < date) {
          setValue('publishedTo', '')
          resetToDateRef.current?.()
        }
      }
    },
  })

  const { datepickerProps: toDatepickerProps, inputProps: toInputProps, reset: resetToDate } = useDatepicker({
    fromDate: fromDateValue,
    defaultSelected: defaultValues?.publishedTo ? new Date(defaultValues.publishedTo) : undefined,
    onDateChange: (date) => {
      setValue('publishedTo', date?.toISOString() ?? '')
    },
  })

  resetToDateRef.current = resetToDate

  return { register, handleSubmit, control, errors, fromDatepickerProps, fromInputProps, toDatepickerProps, toInputProps }
}
