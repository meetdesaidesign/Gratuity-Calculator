import { describe, expect, it } from 'vitest'
import { formatGratuityAmount, formatServiceText } from './format'

describe('formatters', () => {
  it('formats under-lakh values with Indian commas', () => {
    expect(formatGratuityAmount(99999)).toBe('₹99,999')
  })

  it('formats lakh and crore values using shorthand', () => {
    expect(formatGratuityAmount(125000)).toBe('₹1.25 L')
    expect(formatGratuityAmount(15000000)).toBe('₹1.50 Cr')
  })

  it('omits months when they are zero', () => {
    expect(formatServiceText(5, 0)).toBe('5 yrs')
    expect(formatServiceText(5, 2)).toBe('5 yrs 2 mo')
  })
})
