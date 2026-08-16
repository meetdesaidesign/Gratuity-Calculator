import { useMemo, useState } from 'react'
import { ResultCard } from './components/ResultCard'
import { SalaryInput } from './components/SalaryInput'
import { ServiceInput } from './components/ServiceInput'
import { COPY } from './constants/copy'
import {
  MAX_MONTHS,
  MAX_YEARS,
  MIN_MONTHS,
  MIN_YEARS,
  buildNotEligibleNudge,
  calculateGratuity,
  clamp,
} from './utils/gratuity'

function App() {
  const [salary, setSalary] = useState(35000)
  const [years, setYears] = useState(5)
  const [months, setMonths] = useState(0)

  const result = useMemo(
    () => calculateGratuity(salary, years, months),
    [salary, years, months],
  )

  const onYearsChange = (value: number) => {
    const nextYears = clamp(value, MIN_YEARS, MAX_YEARS)
    setYears(nextYears)
    if (nextYears === MAX_YEARS) {
      setMonths(0)
    }
  }

  const onMonthsChange = (value: number) => {
    if (years === MAX_YEARS) {
      setMonths(0)
      return
    }
    setMonths(clamp(value, MIN_MONTHS, MAX_MONTHS))
  }

  const nudge = result.eligible ? '' : buildNotEligibleNudge(years, months)

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '36px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 440 }}>
        <header style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--gold-light)',
              borderRadius: 99,
              padding: '4px 14px',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--gold)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            {COPY.headerBadge}
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>
            {COPY.pageTitle}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>{COPY.pageSubtitle}</p>
        </header>

        <ResultCard
          eligible={result.eligible}
          salary={salary}
          years={years}
          months={months}
          effectiveYears={result.effectiveYears}
          cappedAmount={result.cappedAmount}
          nudge={nudge}
        />

        <SalaryInput value={salary} onChange={setSalary} />

        <ServiceInput
          years={years}
          months={months}
          onYearsChange={onYearsChange}
          onMonthsChange={onMonthsChange}
        />
        <footer style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', lineHeight: 1.7 }}>
          <p>{COPY.footerLineOne}</p>
          <p>{COPY.footerLineTwo}</p>
        </footer>
      </div>
    </main>
  )
}

export default App
