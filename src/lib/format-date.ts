const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
]

export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate

  let duration = (date.getTime() - Date.now()) / 1000

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit)
    }
    duration /= division.amount
  }

  return isoDate
}

export function formatPublishedDate(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate

  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
