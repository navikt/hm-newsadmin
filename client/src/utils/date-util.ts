import { format, parseISO } from 'date-fns'

export const toDateTimeString = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS")
}

export const toReadableString = (date: string): string => {
  return format(parseISO(date), 'dd.MM.yyyy')
}

export const toReadableDateTimeString = (date: string): string => {
  return format(parseISO(date), "dd.MM.yyyy', kl. 'HH:mm")
}

export const toReadableDateString = (date: string): string => {
  return format(parseISO(date), 'dd.MM.yyyy')
}

export const toDate = (date: string): Date => {
  return parseISO(date)
}

export const mergeDateWithTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':').map((value) => Number(value))
  const mergedDate = new Date(date)
  mergedDate.setHours(Number.isNaN(hours) ? 0 : hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0)
  return mergedDate
}

export const toTimeString = (date: Date): string => {
  return format(date, 'HH:mm')
}

export const todayTimestamp = (): string => {
  return toDateTimeString(new Date())
}

export const toPeriodString = (published: string, expired: string): string => {
  const publishedDate_ = published ? new Date(published) : undefined
  const expiredDate_ = expired ? new Date(expired) : undefined

  const dateString = `${publishedDate_?.toLocaleDateString()}-${expiredDate_?.toLocaleDateString()}`
  return dateString
}
