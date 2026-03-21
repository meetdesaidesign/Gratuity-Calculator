import { pluralize } from './format'

export const MIN_SALARY = 5000
export const MAX_SALARY = 500000
export const MIN_YEARS = 0
export const MAX_YEARS = 40
export const MIN_MONTHS = 0
export const MAX_MONTHS = 11
export const STATUTORY_CAP = 2000000

export type GratuityResult = {
  effectiveYears: number
  eligible: boolean
  rawAmount: number
  cappedAmount: number
}

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

export const toNumericInput = (raw: string): number => {
  const digitsOnly = raw.replace(/[^\d]/g, '')
  return digitsOnly.length ? Number(digitsOnly) : 0
}

export const computeEffectiveYears = (years: number, months: number): number =>
  months >= 6 ? years + 1 : years

export const isEligible = (years: number, months: number): boolean =>
  years >= 5 || (years === 4 && months >= 6)

export const calculateGratuity = (
  salary: number,
  years: number,
  months: number,
): GratuityResult => {
  const effectiveYears = computeEffectiveYears(years, months)
  const eligible = isEligible(years, months)
  const rawAmount = (salary * 15 * effectiveYears) / 26
  const cappedAmount = Math.min(rawAmount, STATUTORY_CAP)

  return {
    effectiveYears,
    eligible,
    rawAmount,
    cappedAmount,
  }
}

export const buildNotEligibleNudge = (years: number, months: number): string => {
  if (years <= 0) {
    return ''
  }

  if (years < 4) {
    const remainingYears = 4 - years
    return `પાત્ર થવા માટે હજુ ${remainingYears} ${pluralize(remainingYears, 'વર્ષ', 'વર્ષ')} જોઈએ.`
  }

  if (years === 4 && months < 6) {
    const remainingMonths = 6 - months
    return `હજુ ${remainingMonths} ${pluralize(remainingMonths, 'મહિનો', 'મહિના')} ઉમેરો, તમે પાત્ર થશો.`
  }

  return ''
}
