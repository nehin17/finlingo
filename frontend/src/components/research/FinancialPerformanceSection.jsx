
import { useState } from 'react'

const TABS = [
  { key: 'income', label: 'Income Statement' },
  { key: 'balance', label: 'Balance Sheet' },
  { key: 'cashFlow', label: 'Cash Flow' },
]

function formatValue(value, format) {
  if (value == null || Number.isNaN(Number(value))) {
    return '—'
  }

  const num = Number(value)

  switch (format) {
    case 'currency':
      if (Math.abs(num) >= 1000) {
        return `$${(num / 1000).toFixed(1)}B`
      }

      return `$${num.toFixed(0)}M`

    case 'number':
      return num.toFixed(2)

    case 'ratio':
      return `${num.toFixed(2)}x`

    default:
      return String(value)
  }
}

export default function FinancialPerformanceSection({
  financials = null,
  loading = false,
}) {
  const [tab, setTab] = useState('income')

  // Normalize backend data safely.
  // These are NOT hooks, so they can safely be calculated
  // before the loading/empty-state returns.
  const periods = Array.isArray(financials?.periods)
    ? financials.periods
    : []

  const section = financials?.[tab]

  const rows = Array.isArray(section)
    ? section
    : []

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <section
        className="rounded-3xl border border-border p-6 shadow-sm animate-pulse"
        style={{ background: 'var(--surface)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div
            className="h-6 w-48 rounded"
            style={{ background: 'var(--surface-elevated)' }}
          />

          <div
            className="h-9 w-56 rounded-xl"
            style={{ background: 'var(--surface-elevated)' }}
          />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-10 rounded-xl"
              style={{
                background: 'var(--surface-elevated)',
              }}
            />
          ))}
        </div>
      </section>
    )
  }

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (
    !financials ||
    periods.length === 0 ||
    rows.length === 0
  ) {
    return (
      <section
        className="rounded-3xl border border-border p-6 shadow-sm"
        style={{ background: 'var(--surface)' }}
      >
        <h3 className="text-lg font-bold text-text-primary mb-2">
          Financial Performance
        </h3>

        <div
          className="rounded-2xl border border-dashed border-border p-8
                     text-center text-sm text-text-muted"
        >
          Financial statement data is not available.
        </div>
      </section>
    )
  }

  // =========================================================
  // MAIN CONTENT
  // =========================================================

  return (
    <section
      className="rounded-3xl border border-border p-6 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-bold text-text-primary">
            Financial Performance
          </h3>

          <p className="text-xs text-text-muted mt-0.5">
            Historical financial statements and operating performance
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl border border-border overflow-x-auto scrollbar-hide"
          style={{
            background: 'var(--surface-elevated)',
          }}
        >
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                tab === item.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] text-sm tabular-nums">
          <thead
            style={{
              background: 'var(--surface-elevated)',
            }}
          >
            <tr>
              <th
                className="text-left font-semibold text-text-primary py-3 pl-4 pr-6
                           sticky left-0 z-10
                           bg-[color:var(--surface-elevated)]"
              >
                Metric
              </th>

              {periods.map((period) => (
                <th
                  key={period}
                  className="text-right font-semibold text-text-primary
                             py-3 px-4 whitespace-nowrap"
                >
                  {period}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => {
              const values = Array.isArray(row?.values)
                ? row.values
                : []

              return (
                <tr
                  key={row?.label || `row-${rowIndex}`}
                  style={{
                    background:
                      rowIndex % 2
                        ? 'var(--surface-elevated)'
                        : 'transparent',
                  }}
                  className="border-t border-border/50
                             hover:bg-black/[0.02]
                             dark:hover:bg-white/[0.02]
                             transition-colors"
                >
                  <td
                    className="py-3 pl-4 pr-6 font-semibold
                               text-text-primary sticky left-0
                               bg-[inherit]"
                  >
                    {row?.label || 'Unknown Metric'}
                  </td>

                  {periods.map((period) => {
                    const cell = values.find(
                      (value) => value?.period === period
                    )

                    return (
                      <td
                        key={period}
                        className="py-3 px-4 text-right
                                   text-text-secondary
                                   whitespace-nowrap"
                      >
                        {formatValue(
                          cell?.value,
                          row?.format
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

