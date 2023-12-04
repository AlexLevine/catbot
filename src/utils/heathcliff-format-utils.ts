export const formatHeathUrlFromDate = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = String(date.getFullYear())

  return formatHeathUrl(dd, mm, yyyy)
}

export const formatHeathUrl = (day: string, month: string, year: string): string => {
  return `https://www.gocomics.com/heathcliff/${year}/${month}/${day}`
}
