import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { newsStatusValues } from 'utils/admin-util.ts'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useDatepicker } from '@navikt/ds-react'

const toLocalISOString = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`
}

export const MAX_TITLE_LENGTH = 100

const newsSchema = z.object({
  title: z
    .string({ error: 'Mangler tittel' })
    .min(1, { error: 'Mangler tittel' })
    .max(MAX_TITLE_LENGTH, { error: `Tittelen kan ikke være lengre enn ${MAX_TITLE_LENGTH} tegn` }),
  body: z.string(),
  publishedFrom: z.string({ error: 'Mangler fra-dato' }).min(1, { error: 'Mangler fra-dato' }),
  publishedTo: z.string({ error: 'Mangler til-dato' }).min(1, { error: 'Mangler til-dato' }),
  imageUrl: z.string().optional(),
  imageDescription: z.string().optional(),
  status: z.enum(newsStatusValues),
  tags: z.array(z.string(), { error: 'Mangler type' }).min(1, { error: 'Mangler type' }),
  comment: z.string(),
})

export type NewsFormValues = z.infer<typeof newsSchema>

export const useNewsForm = (defaultValues?: Partial<NewsFormValues>) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues,
  })

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues])

  register('publishedFrom')
  register('publishedTo')
  register('tags')
  register('imageUrl')
  register('imageDescription')
  register('status')
  register('comment')

  const publishedFrom = watch('publishedFrom')
  const fromDateValue = publishedFrom ? new Date(publishedFrom) : new Date()

  const resetToDateRef = useRef<(() => void) | null>(null)

  const { datepickerProps: fromDatepickerProps, inputProps: fromInputProps } = useDatepicker({
    fromDate: new Date(),
    defaultSelected: defaultValues?.publishedFrom ? new Date(defaultValues.publishedFrom) : undefined,
    onDateChange: (date) => {
      setValue('publishedFrom', date ? toLocalISOString(date) : '', { shouldValidate: true })
      if (date) {
        const currentTo = getValues('publishedTo')
        if (currentTo && new Date(currentTo) < date) {
          setValue('publishedTo', '', { shouldValidate: true })
          resetToDateRef.current?.()
        }
      }
    },
  })

  const {
    datepickerProps: toDatepickerProps,
    inputProps: toInputProps,
    reset: resetToDate,
  } = useDatepicker({
    fromDate: fromDateValue,
    defaultSelected: defaultValues?.publishedTo ? new Date(defaultValues.publishedTo) : undefined,
    onDateChange: (date) => {
      setValue('publishedTo', date ? toLocalISOString(date) : '', { shouldValidate: true })
    },
  })

  resetToDateRef.current = resetToDate

  return {
    register,
    handleSubmit,
    control,
    errors,
    watch,
    setError,
    fromDatepickerProps,
    fromInputProps,
    toDatepickerProps,
    toInputProps,
    setValue,
  }
}
