const STATUS = {
    good: {
      dot: 'bg-emerald-500',
      text: 'text-emerald-500',
      badge: 'Healthy',
    },
    warn: {
      dot: 'bg-amber-500',
      text: 'text-amber-500',
      badge: 'Monitor',
    },
    bad: {
      dot: 'bg-red-500',
      text: 'text-red-500',
      badge: 'Risk',
    },
    neutral: {
      dot: 'bg-gray-400',
      text: 'text-text-primary',
      badge: 'Neutral',
    },
  }
  
  export default function BalanceSheetHealthSection({
    balanceSheet = [],
    loading = false,
  }) {
    // Normalize backend response safely
    const items = Array.isArray(balanceSheet) ? balanceSheet : []
  
    // Loading state
    if (loading) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm animate-pulse"
          style={{ background: 'var(--surface)' }}
        >
          <div
            className="h-6 w-44 rounded mb-5"
            style={{ background: 'var(--surface-elevated)' }}
          />
  
          <div className="grid sm:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-4"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="h-3 w-24 rounded"
                    style={{ background: 'var(--surface)' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--surface)' }}
                  />
                </div>
  
                <div
                  className="h-6 w-20 rounded mb-2"
                  style={{ background: 'var(--surface)' }}
                />
  
                <div
                  className="h-3 w-full rounded"
                  style={{ background: 'var(--surface)' }}
                />
              </div>
            ))}
          </div>
        </section>
      )
    }
  
    // Empty state
    if (items.length === 0) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm"
          style={{ background: 'var(--surface)' }}
        >
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Balance Sheet Health
          </h3>
  
          <div
            className="rounded-2xl border border-dashed border-border p-8
                       text-center text-sm text-text-muted"
          >
            Balance sheet health metrics are not available.
          </div>
        </section>
      )
    }
  
    return (
      <section
        className="rounded-3xl border border-border p-6 shadow-sm"
        style={{ background: 'var(--surface)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              Balance Sheet Health
            </h3>
  
            <p className="text-xs text-text-muted mt-0.5">
              Liquidity, leverage, and solvency indicators
            </p>
          </div>
  
          <span className="text-[11px] font-semibold text-text-muted">
            {items.length} metrics
          </span>
        </div>
  
        {/* Metrics grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((item, index) => {
            const status = STATUS[item?.status] || STATUS.neutral
  
            return (
              <div
                key={item?.label || index}
                className="rounded-xl border border-border p-4 transition-colors hover:border-blue-500/40"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-xs font-semibold text-text-muted">
                    {item?.label || 'Unknown Metric'}
                  </p>
  
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${status.dot}`} />
  
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${status.text}`}
                    >
                      {status.badge}
                    </span>
                  </div>
                </div>
  
                <p className={`text-lg font-bold tabular-nums ${status.text}`}
                >
                  {item?.value ?? '—'}
                </p>
  
                {item?.note && (
                  <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                    {item.note}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    )
  }