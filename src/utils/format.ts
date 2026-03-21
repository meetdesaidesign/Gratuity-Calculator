export const formatIndianNumber = (value: number): string =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(value)),
  )

export const formatCurrencyInput = (value: number): string =>
  formatIndianNumber(value)

export const formatServiceText = (years: number, months: number): string => {
  if (months === 0) {
    return `${years} વર્ષ`
  }
  return `${years} વર્ષ ${months} મહિના`
}

export const formatGratuityAmount = (value: number): string => {
  const safeValue = Math.max(0, value)
  if (safeValue >= 10000000) {
    return `₹${(safeValue / 10000000).toFixed(2)} Cr`
  }
  if (safeValue >= 100000) {
    return `₹${(safeValue / 100000).toFixed(2)} લાખ`
  }
  return `₹${formatIndianNumber(safeValue)}`
}

export const pluralize = (count: number, singular: string, plural: string): string =>
  count === 1 ? singular : plural
