import { useState } from 'react'
import { COPY } from '../constants/copy'
import { Slider } from './Slider'
import { MAX_SALARY, MIN_SALARY, clamp } from '../utils/gratuity'

type SalaryInputProps = {
  value: number
  onChange: (value: number) => void
}

export function SalaryInput({ value, onChange }: SalaryInputProps) {
  const [focused, setFocused] = useState(false)
  const [raw, setRaw] = useState('')

  return (
    <section
      style={{
        background: 'var(--card)',
        borderRadius: 20,
        padding: 22,
        border: '1.5px solid var(--border)',
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted)',
          marginBottom: 14,
        }}
      >
        {COPY.monthlySalaryLabel}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--input-bg)',
          border: `2px solid ${focused ? 'var(--gold)' : 'var(--border)'}`,
          borderRadius: 14,
          padding: '10px 16px',
          transition: 'border-color 0.2s',
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>
          {COPY.currencyPrefix}
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={focused ? raw : value.toLocaleString('en-IN')}
          onFocus={() => {
            setFocused(true)
            setRaw(String(value))
          }}
          onBlur={() => {
            setFocused(false)
            const parsed = parseInt(raw.replace(/,/g, ''), 10)
            if (!Number.isNaN(parsed)) {
              onChange(clamp(parsed, MIN_SALARY, MAX_SALARY))
            }
          }}
          onChange={(event) => setRaw(event.target.value.replace(/[^0-9]/g, ''))}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 22,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text)',
          }}
          aria-label={COPY.monthlySalaryLabel}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <Slider value={value} onChange={onChange} min={MIN_SALARY} max={MAX_SALARY} step={500} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          color: 'var(--muted)',
          marginTop: 2,
        }}
      >
        <span>₹5,000</span>
        <span>₹5,00,000</span>
      </div>
    </section>
  )
}
