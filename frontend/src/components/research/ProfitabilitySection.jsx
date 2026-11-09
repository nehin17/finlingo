export default function ProfitabilitySection({
    profitability = [],
    loading = false,
  }) {
    // Normalize backend response safely
    const metrics = Array.isArray(profitability) ? profitability : []
  
    // Loading state
    if (loading) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm animate-pulse"
          style={{ background: 'var(--surface)' }}
        >
          <div
            className="h-6 w-32 rounded mb-5"
            style={{ background: 'var(--surface-elevated)' }}
          />
  
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <div
                    className="h-3 w-24 rounded"
                    style={{ background: 'var(--surface-elevated)' }}
                  />
                  <div
                    className="h-3 w-20 rounded"
                    style={{ background: 'var(--surface-elevated)' }}
                  />
                </div>
  
                <div
                  className="h-2 rounded-full"
                  style={{ background: 'var(--surface-elevated)' }}
                />
              </div>
            ))}
          </div>
        </section>
      )
    }
  
    // Empty state
    if (metrics.length === 0) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm"
          style={{ background: 'var(--surface)' }}
        >
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Profitability
          </h3>
  
          <div
            className="rounded-2xl border border-dashed border-border p-8
                       text-center text-sm text-text-muted"
          >
            Profitability metrics are not available.
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
              Profitability
            </h3>
  
            <p className="text-xs text-text-muted mt-0.5">
              Margin and return metrics versus industry benchmarks
            </p>
          </div>
  
          <span className="text-[11px] font-semibold text-text-muted">
            {metrics.length} metrics
          </span>
        </div>
  
        {/* Metrics */}
        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const value = Number(metric?.value ?? 0)
            const benchmark = Number(metric?.benchmark ?? 0)
  
            // Keep bar width between 0 and 100
            const barWidth = Math.max(0, Math.min(value, 100))
            const benchmarkPosition = Math.max(0, Math.min(benchmark, 100))
  
            const outperforming = value >= benchmark
  
            return (
              <div key={metric?.label || index}>
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <span className="text-sm font-semibold text-text-primary">
                    {metric?.label || 'Unknown Metric'}
                  </span>
  
                  <div className="text-xs tabular-nums text-right">
                    <span
                      className={`font-bold ${
                        outperforming ? 'text-emerald-500' : 'text-amber-500'
                      }`}
                    >
                      {value.toFixed(0)}%
                    </span>
  
                    <span className="text-text-muted font-normal ml-1">
                      · benchmark {benchmark.toFixed(0)}%
                    </span>
                  </div>
                </div>
  
                {/* Progress bar */}
                <div
                  className="relative h-2 rounded-full overflow-hidden"
                  style={{ background: 'var(--border)' }}
                >
                  {/* Actual value */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      outperforming ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
  
                  {/* Benchmark marker */}
                  <div
                    className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-white/70 dark:bg-black/70 rounded-full"
                    style={{ left: `${benchmarkPosition}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }