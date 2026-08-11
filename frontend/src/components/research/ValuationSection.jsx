export default function ValuationSection({
    valuation = [],
    loading = false,
  }) {
    const toneClasses = {
      better: 'text-emerald-500',
      worse: 'text-amber-500',
      neutral: 'text-text-secondary',
    }
  
    // Normalize backend response safely
    const rows = Array.isArray(valuation) ? valuation : []
  
    // Loading state
    if (loading) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm animate-pulse"
          style={{ background: 'var(--surface)' }}
        >
          <div
            className="h-6 w-28 rounded mb-2"
            style={{ background: 'var(--surface-elevated)' }}
          />
  
          <div
            className="h-4 w-44 rounded mb-5"
            style={{ background: 'var(--surface-elevated)' }}
          />
  
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-xl"
                style={{ background: 'var(--surface-elevated)' }}
              />
            ))}
          </div>
        </section>
      )
    }
  
    // Empty state
    if (rows.length === 0) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm"
          style={{ background: 'var(--surface)' }}
        >
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Valuation
          </h3>
  
          <div
            className="rounded-2xl border border-dashed border-border p-8
                       text-center text-sm text-text-muted"
          >
            Valuation data is not available for this company.
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
              Valuation
            </h3>
  
            <p className="text-xs text-text-muted mt-0.5">
              Company vs. industry median
            </p>
          </div>
  
          <span className="text-[11px] font-semibold text-text-muted">
            {rows.length} metrics
          </span>
        </div>
  
        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[420px] text-sm tabular-nums">
            <thead style={{ background: 'var(--surface-elevated)' }}>
              <tr>
                <th className="text-left font-semibold text-text-primary py-3 pl-4 pr-4">
                  Metric
                </th>
  
                <th className="text-right font-semibold text-text-primary py-3 px-4">
                  Company
                </th>
  
                <th className="text-right font-semibold text-text-primary py-3 px-4">
                  Industry
                </th>
              </tr>
            </thead>
  
            <tbody>
              {rows.map((row, index) => {
                const toneClass =
                  toneClasses[row?.tone] || 'text-text-primary'
  
                return (
                  <tr
                    key={row?.metric || index}
                    style={{
                      background: index % 2
                        ? 'var(--surface-elevated)'
                        : 'transparent',
                    }}
                    className="border-t border-border/50 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 pl-4 pr-4 font-semibold text-text-primary whitespace-nowrap">
                      {row?.metric || 'Unknown Metric'}
                    </td>
  
                    <td className={`py-3 px-4 text-right font-bold whitespace-nowrap ${toneClass}`}
                    >
                      {row?.company ?? '—'}
                    </td>
  
                    <td className="py-3 px-4 text-right text-text-muted whitespace-nowrap">
                      {row?.industry ?? '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    )
  }