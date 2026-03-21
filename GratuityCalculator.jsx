import { useState, useMemo } from "react";

const STATUTORY_CAP = 2000000;

function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} લાખ`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function Slider({ value, onChange, min, max, step = 1, accent = "var(--gold)" }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ padding: "4px 0" }}>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%", appearance: "none", height: 5, borderRadius: 99,
          outline: "none", cursor: "pointer",
          background: `linear-gradient(to right, ${accent} ${pct}%, var(--track) ${pct}%)`,
        }}
      />
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          appearance: none; width: 20px; height: 20px; border-radius: 50%;
          background: white; border: 3px solid ${accent};
          box-shadow: 0 2px 8px rgba(0,0,0,0.15); cursor: pointer;
          transition: transform 0.12s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.18); }
        input[type=range]::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%; background: white;
          border: 3px solid ${accent}; cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function SalaryInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState("");
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "var(--input-bg)", border: `2px solid ${focused ? "var(--gold)" : "var(--border)"}`,
      borderRadius: 14, padding: "10px 16px", transition: "border-color 0.2s"
    }}>
      <span style={{ fontSize: 20, fontWeight: 700, color: "var(--gold)" }}>₹</span>
      <input
        type="text" inputMode="numeric"
        value={focused ? raw : value.toLocaleString("en-IN")}
        onFocus={() => { setFocused(true); setRaw(String(value)); }}
        onBlur={() => {
          setFocused(false);
          const p = parseInt(raw.replace(/,/g, ""), 10);
          if (!isNaN(p)) onChange(clamp(p, 5000, 500000));
        }}
        onChange={e => setRaw(e.target.value.replace(/[^0-9]/g, ""))}
        style={{
          flex: 1, border: "none", outline: "none", background: "transparent",
          fontSize: 22, fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--text)"
        }}
      />
      <span style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>/ month</span>
    </div>
  );
}

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(35000);
  const [years, setYears]   = useState(5);
  const [months, setMonths] = useState(0);

  const { gratuity, effectiveYears, eligible } = useMemo(() => {
    // Part year ≥ 6 months rounds up (Section 4(2))
    const roundsUp = months >= 6;
    const effectiveYears = roundsUp ? years + 1 : years;
    // Eligible if total service ≥ 5 years (accounting for rounding)
    const eligible = years >= 5 || (years === 4 && roundsUp);
    const formula = eligible ? (salary * 15 * effectiveYears) / 26 : 0;
    const gratuity = Math.min(formula, STATUTORY_CAP);
    return { gratuity, effectiveYears, eligible };
  }, [salary, years, months]);

  const totalService = `${years} yr${years !== 1 ? "s" : ""}${months > 0 ? ` ${months} mo` : ""}`;

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-body)",
      display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "36px 16px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');
        :root {
          --bg: #f5f3ff;
          --card: #ffffff;
          --border: #e5e1f8;
          --text: #1a1535;
          --muted: #7c71a8;
          --gold: #6c47ff;
          --gold-light: #ede9ff;
          --input-bg: #f0eeff;
          --track: #ddd8f5;
          --font-body: 'Sora', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=range] { -webkit-appearance: none; width: 100%; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 440 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--gold-light)", borderRadius: 99, padding: "4px 14px",
            fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 14
          }}>
            🇮🇳 Gratuity Act, 1972
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "var(--text)", lineHeight: 1.2 }}>
            Gratuity Calculator
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
            Find out how much gratuity you're owed.
          </p>
        </div>

        {/* Result card */}
        <div style={{
          background: "linear-gradient(135deg, #3a1fa8 0%, #6c47ff 100%)",
          borderRadius: 24, padding: "28px 28px 24px", marginBottom: 16,
          position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(108,71,255,0.3)"
        }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: 6 }}>
            Your Gratuity
          </div>

          <div style={{
            fontSize: eligible ? 52 : 36, fontWeight: 800,
            color: eligible ? "white" : "rgba(255,255,255,0.25)",
            lineHeight: 1.1, letterSpacing: "-0.02em",
            transition: "all 0.25s ease"
          }}>
            {eligible ? formatINR(gratuity) : "—"}
          </div>

          {/* Eligibility pill */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: eligible ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.1)",
              border: `1px solid ${eligible ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.15)"}`,
              borderRadius: 99, padding: "5px 12px",
              fontSize: 12, fontWeight: 600,
              color: eligible ? "#6ee7b7" : "rgba(255,255,255,0.45)"
            }}>
              <span>{eligible ? "✓" : "✗"}</span>
              {eligible ? `Eligible · ${totalService}` : `Not eligible · ${totalService}`}
            </div>

            {eligible && (
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                {effectiveYears} yrs counted
              </div>
            )}
          </div>

          {/* Not eligible nudge */}
          {!eligible && years > 0 && (
            <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
              {years < 4
                ? `Need ${4 - years} more year${4 - years !== 1 ? "s" : ""} to be close.`
                : `Add ${6 - months} more month${6 - months !== 1 ? "s" : ""} and you'll qualify.`
              }
            </div>
          )}
        </div>

        {/* Salary card */}
        <div style={{ background: "var(--card)", borderRadius: 20, padding: 22, border: "1.5px solid var(--border)", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 14 }}>
            Monthly Salary (Basic + DA)
          </div>
          <SalaryInput value={salary} onChange={setSalary} />
          <div style={{ marginTop: 12 }}>
            <Slider value={salary} onChange={setSalary} min={5000} max={500000} step={500} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
            <span>₹5,000</span><span>₹5,00,000</span>
          </div>
        </div>

        {/* Service card */}
        <div style={{ background: "var(--card)", borderRadius: 20, padding: 22, border: "1.5px solid var(--border)", marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 20 }}>
            Years of Service
          </div>

          {/* Years */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Years</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: "var(--gold)" }}>{years}</span>
            </div>
            <Slider value={years} onChange={setYears} min={0} max={40} step={1} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
              <span>0</span><span>40 yrs</span>
            </div>
          </div>

          {/* Months */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Extra Months</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {months >= 6 && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, background: "#dcfce7", color: "#16a34a",
                    borderRadius: 99, padding: "2px 8px", letterSpacing: "0.04em"
                  }}>rounds up ↑</span>
                )}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: months >= 6 ? "#16a34a" : "var(--gold)" }}>{months}</span>
              </div>
            </div>
            <Slider
              value={months} onChange={setMonths} min={0} max={11} step={1}
              accent={months >= 6 ? "#16a34a" : "var(--gold)"}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
              <span>0 mo</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>6+ rounds up</span>
              <span>11 mo</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>
          Based on the Payment of Gratuity Act, 1972.<br />
          Payout capped at ₹20L. This is an estimate.
        </div>

      </div>
    </div>
  );
}
