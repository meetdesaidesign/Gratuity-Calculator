import { COPY } from '../constants/copy'
import { MAX_MONTHS, MAX_YEARS, MIN_MONTHS, MIN_YEARS } from '../utils/gratuity'
import { Slider } from './Slider'

type ServiceInputProps = {
  years: number
  months: number
  onYearsChange: (value: number) => void
  onMonthsChange: (value: number) => void
}

export function ServiceInput({
  years,
  months,
  onYearsChange,
  onMonthsChange,
}: ServiceInputProps) {
  const roundsUp = months >= 6

  return (
    <section
      style={{
        background: 'var(--card)',
        borderRadius: 20,
        padding: 22,
        border: '1.5px solid var(--border)',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted)',
          marginBottom: 20,
        }}
      >
        {COPY.yearsOfServiceLabel}
      </div>

      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
            {COPY.yearsSliderLabel}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--gold)',
            }}
          >
            {years}
          </span>
        </div>
        <Slider value={years} onChange={onYearsChange} min={MIN_YEARS} max={MAX_YEARS} step={1} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 4,
          }}
        >
          <span>0</span>
          <span>40 yrs</span>
        </div>
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
            {COPY.extraMonthsLabel}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {roundsUp && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: '#dcfce7',
                  color: '#16a34a',
                  borderRadius: 99,
                  padding: '2px 8px',
                  letterSpacing: '0.04em',
                }}
              >
                {COPY.roundsUpBadge}
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 20,
                fontWeight: 700,
                color: roundsUp ? '#16a34a' : 'var(--gold)',
              }}
            >
              {months}
            </span>
          </div>
        </div>
        <Slider
          value={months}
          onChange={onMonthsChange}
          min={MIN_MONTHS}
          max={MAX_MONTHS}
          step={1}
          accent={roundsUp ? '#16a34a' : 'var(--gold)'}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 4,
          }}
        >
          <span>{COPY.monthsFooterLeft}</span>
          <span style={{ color: '#16a34a', fontWeight: 600 }}>{COPY.monthsFooterCenter}</span>
          <span>{COPY.monthsFooterRight}</span>
        </div>
      </div>
    </section>
  )
}
