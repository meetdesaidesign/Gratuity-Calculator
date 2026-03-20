import { COPY } from '../constants/copy'
import { formatGratuityAmount, formatServiceText } from '../utils/format'

type ResultCardProps = {
  eligible: boolean
  salary: number
  years: number
  months: number
  effectiveYears: number
  cappedAmount: number
  nudge: string
}

export function ResultCard({
  eligible,
  salary,
  years,
  months,
  effectiveYears,
  cappedAmount,
  nudge,
}: ResultCardProps) {
  const showEligibleState = eligible && salary > 0
  const amount = showEligibleState
    ? formatGratuityAmount(cappedAmount)
    : COPY.amountNotEligible
  const pillPrefix = showEligibleState
    ? COPY.eligiblePillPrefix
    : COPY.notEligiblePillPrefix
  const service = formatServiceText(years, months)

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #3a1fa8 0%, #6c47ff 100%)',
        borderRadius: 24,
        padding: '28px 28px 24px',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(108,71,255,0.3)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 130,
          height: 130,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }}
      />
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 6,
        }}
      >
        {COPY.resultLabel}
      </div>

      <div
        style={{
          fontSize: showEligibleState ? 52 : 36,
          fontWeight: 800,
          color: showEligibleState ? 'white' : 'rgba(255,255,255,0.25)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          transition: 'all 0.25s ease',
        }}
      >
        {amount}
      </div>

      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: showEligibleState ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.1)',
            border: `1px solid ${
              showEligibleState ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.15)'
            }`,
            borderRadius: 99,
            padding: '5px 12px',
            fontSize: 12,
            fontWeight: 600,
            color: showEligibleState ? '#6ee7b7' : 'rgba(255,255,255,0.45)',
          }}
        >
          <span>{showEligibleState ? '✓' : '✗'}</span>
          {pillPrefix} · {service}
        </div>
        {showEligibleState && (
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            {effectiveYears} {COPY.yearsCountedSuffix}
          </div>
        )}
      </div>

      {!showEligibleState && nudge && (
        <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          {nudge}
        </div>
      )}
    </section>
  )
}
