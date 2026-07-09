import { useForm } from 'react-hook-form'
import { useDatepicker } from '@navikt/ds-react'
import { useEffect, useRef } from 'react'
import { newsStatusValues } from 'utils/admin-util.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const toLocalISOString = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`
}

/*export type NewsFormValues = {
  title: string
  description: string
  body: string
  publishedFrom: string
  publishedTo: string
  imageUrl: string
  imageDescription: string
  status: NewsStatus
  tags: string[]
  comment: string
}
 */

const newsSchema = z.object({
  title: z
    .string({ error: 'Mangler tittel' })
    .min(1, { error: 'Mangler tittel' })
    .max(100, { error: 'Tittelen kan ikke være lengre enn 100 tegn' }),
  description: z.string().max(100, { error: 'Ingressen kan ikke være lengre enn 100 tegn' }),
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
      setValue('publishedFrom', date ? toLocalISOString(date) : '')
      if (date) {
        const currentTo = getValues('publishedTo')
        if (currentTo && new Date(currentTo) < date) {
          setValue('publishedTo', '')
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
      setValue('publishedTo', date ? toLocalISOString(date) : '')
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
