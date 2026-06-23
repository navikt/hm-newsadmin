import { useForm } from 'react-hook-form'
import { useRangeDatepicker } from '@navikt/ds-react'
import { useEffect } from 'react'

export type NewsFormValues = {
  title: string
  description: string
  body: string
  publishedFrom: string
  publishedTo: string
}

export const useNewsForm = (defaultValues?: NewsFormValues) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewsFormValues>({ defaultValues })

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues])

  register('publishedFrom', { required: 'Mangler fra-dato' })
  register('publishedTo', { required: 'Mangler til-dato' })

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: new Date(),
    onRangeChange: (range) => {
      setValue('publishedFrom', range?.from?.toISOString() ?? '')
      setValue('publishedTo', range?.to?.toISOString() ?? '')
    },
    defaultSelected:
      defaultValues?.publishedFrom
        ? {
            from: new Date(defaultValues.publishedFrom),
            to: defaultValues.publishedTo ? new Date(defaultValues.publishedTo) : undefined,
          }
        : undefined,
  })

  return { register, handleSubmit, control, errors, datepickerProps, fromInputProps, toInputProps }
}
