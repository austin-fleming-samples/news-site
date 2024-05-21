const SHORT_MONTH_NAMES = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]

const isValidDate = (maybeDate:any):boolean => !!Object.prototype.toString.call(maybeDate) && !Number.isNaN(Number(maybeDate.getTime()))

export const isoToShortDate = (maybeIsoDate:string):string|undefined =>  {
  const maybeDate = new Date(maybeIsoDate)

  if (!isValidDate(maybeDate)) return undefined

  const year = maybeDate.getFullYear()
  const month = SHORT_MONTH_NAMES[maybeDate.getMonth()]
  const day = maybeDate.getDate()

  return `${month} ${day}, ${year}`
}
