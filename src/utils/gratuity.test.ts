import { describe, expect, it } from 'vitest'
import {
  STATUTORY_CAP,
  buildNotEligibleNudge,
  calculateGratuity,
  computeEffectiveYears,
  isEligible,
} from './gratuity'

describe('gratuity logic', () => {
  it('rounds up effective years when months are 6 or more', () => {
    expect(computeEffectiveYears(4, 6)).toBe(5)
    expect(computeEffectiveYears(4, 5)).toBe(4)
  })

  it('marks 4 years 6 months as eligible', () => {
    expect(isEligible(4, 6)).toBe(true)
    expect(isEligible(4, 5)).toBe(false)
  })

  it('applies statutory cap of 20L', () => {
    const result = calculateGratuity(500000, 40, 11)
    expect(result.cappedAmount).toBe(STATUTORY_CAP)
    expect(result.rawAmount).toBeGreaterThan(STATUTORY_CAP)
  })

  it('builds singular/plural nudge copy correctly', () => {
    expect(buildNotEligibleNudge(3, 0)).toBe('Need 1 more year to be close.')
    expect(buildNotEligibleNudge(4, 5)).toBe(
      "Add 1 more month and you'll qualify.",
    )
    expect(buildNotEligibleNudge(2, 0)).toBe('Need 2 more years to be close.')
  })
})
