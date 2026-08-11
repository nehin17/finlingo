
import { useState } from 'react'
import { Check } from 'lucide-react'

const DEFAULT_ITEMS = [
  'Revenue growth accelerating',
  'Margins expanding',
  'Free cash flow positive',
  'Balance sheet healthy',
  'Valuation reasonable',
  'Competitive advantage durable',
  'Major near-term risks understood',
]

export default function AnalystChecklistSection({
  items = DEFAULT_ITEMS,
  initialChecked = {},
  onChange,
}) {
  const safeItems = Array.isArray(items) ? items : DEFAULT_ITEMS

  const [checked, setChecked] = useState(initialChecked)

  const toggle = (index) => {
    setChecked((current) => {
      const updated = {
        ...current,
        [index]: !current[index],
      }

      // Optional callback for backend/API integration
      if (onChange) {
        onChange(updated)
      }

      return updated
    })
  }

  const done = safeItems.reduce(
    (count, _, index) => count + (checked[index] ? 1 : 0),
    0
  )

  return (
    <section
      className="rounded-3xl border border-border p-6 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">
            Analyst Checklist
          </h3>

          <p className="text-xs text-text-muted mt-0.5">
            Track your investment research
          </p>
        </div>

        <span className="text-xs font-bold text-blue-500 tabular-nums">
          {done} / {safeItems.length}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        {safeItems.map((item, index) => {
          const isChecked = Boolean(checked[index])

          return (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => toggle(index)}
              aria-pressed={isChecked}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                isChecked
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-border hover:border-blue-500/40'
              }`}
              style={{
                background: isChecked
                  ? undefined
                  : 'var(--surface-elevated)',
              }}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                  isChecked
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-border'
                }`}
              >
                {isChecked && (
                  <Check
                    size={12}
                    strokeWidth={3}
                    className="text-white"
                  />
                )}
              </span>

              <span
                className={`text-sm ${
                  isChecked
                    ? 'text-emerald-500 font-semibold'
                    : 'text-text-primary'
                }`}
              >
                {item}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

