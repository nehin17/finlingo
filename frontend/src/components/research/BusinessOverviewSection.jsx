export default function BusinessOverviewSection({
    business = null,
    company = null,
    loading = false,
  }) {
    // Loading skeleton
    if (loading) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm animate-pulse"
          style={{ background: 'var(--surface)' }}
        >
          <div
            className="h-6 w-48 rounded mb-5"
            style={{ background: 'var(--surface-elevated)' }}
          />
  
          <div className="grid md:grid-cols-4 gap-3 mb-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-3"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <div
                  className="h-3 w-16 rounded mb-2"
                  style={{ background: 'var(--surface)' }}
                />
                <div
                  className="h-4 w-24 rounded"
                  style={{ background: 'var(--surface)' }}
                />
              </div>
            ))}
          </div>
  
          <div className="space-y-3 mb-6">
            <div
              className="h-4 w-full rounded"
              style={{ background: 'var(--surface-elevated)' }}
            />
            <div
              className="h-4 w-11/12 rounded"
              style={{ background: 'var(--surface-elevated)' }}
            />
            <div
              className="h-4 w-10/12 rounded"
              style={{ background: 'var(--surface-elevated)' }}
            />
          </div>
  
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-full"
                style={{ background: 'var(--surface-elevated)' }}
              />
            ))}
          </div>
        </section>
      )
    }
  
    // Normalize API data
    const info = business || {}
    const entity = company || {}
  
    const facts = [
      { label: 'Founded', value: info.founded },
      { label: 'Headquarters', value: info.headquarters },
      { label: 'CEO', value: info.ceo },
      {
        label: 'Employees',
        value: typeof info.employees === 'number'
          ? info.employees.toLocaleString()
          : info.employees,
      },
    ]
  
    const summaryParagraphs = info.summary
      ? info.summary
          .split(/\\n\\s*\\n/)
          .map((p) => p.trim())
          .filter(Boolean)
      : []
  
    const segments = Array.isArray(info.segments) ? info.segments : []
  
    // Empty state if backend has no business data
    if (!info.summary && facts.every((f) => !f.value) && segments.length === 0) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm"
          style={{ background: 'var(--surface)' }}
        >
          <h3 className="text-lg font-bold text-text-primary mb-2">
            About {entity.name || 'Company'}
          </h3>
  
          <div
            className="rounded-2xl border border-dashed border-border p-8
                       text-center text-sm text-text-muted"
          >
            Business overview data is not available for this company.
          </div>
        </section>
      )
    }
  
    return (
      <section
        className="rounded-3xl border border-border p-6 shadow-sm"
        style={{ background: 'var(--surface)' }}
      >
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              About {entity.name || 'Company'}
            </h3>
  
            <p className="text-xs text-text-muted mt-0.5">
              Company overview and business composition
            </p>
          </div>
        </div>
  
        {/* Company facts */}
        <div className="grid md:grid-cols-4 gap-3 mb-6">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-border p-3"
              style={{ background: 'var(--surface-elevated)' }}
            >
              <p className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                {fact.label}
              </p>
  
              <p className="text-sm font-bold text-text-primary mt-1 break-words">
                {fact.value ?? '—'}
              </p>
            </div>
          ))}
        </div>
  
        {/* Summary */}
        {summaryParagraphs.length > 0 && (
          <div className="mb-6">
            <div className="space-y-3">
              {summaryParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
  
        {/* Revenue segments */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
              Revenue Segments
            </p>
  
            {segments.length > 0 && (
              <span className="text-[10px] text-text-muted font-semibold">
                {segments.length} segments
              </span>
            )}
          </div>
  
          {segments.length === 0 ? (
            <div
              className="rounded-xl border border-dashed border-border p-4
                         text-center text-xs text-text-muted"
            >
              Segment breakdown is not available.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {segments.map((segment) => (
                <div
                  key={segment.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-full
                             border border-border transition-colors hover:border-blue-500/40"
                  style={{ background: 'var(--surface-elevated)' }}
                >
                  <span className="text-xs font-semibold text-text-primary">
                    {segment.label}
                  </span>
  
                  <span className="text-[10px] font-bold text-blue-500 tabular-nums">
                    {typeof segment.share === 'number'
                      ? `${segment.share}%`
                      : segment.share}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }