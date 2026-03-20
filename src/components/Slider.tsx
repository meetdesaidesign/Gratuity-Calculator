type SliderProps = {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  accent?: string
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  accent = 'var(--gold)',
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div style={{ padding: '4px 0' }}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          width: '100%',
          appearance: 'none',
          height: 5,
          borderRadius: 99,
          outline: 'none',
          cursor: 'pointer',
          background: `linear-gradient(to right, ${accent} ${pct}%, var(--track) ${pct}%)`,
        }}
      />
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${accent};
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.12s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.18); }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${accent};
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
