import { ShieldCheck, AlertTriangle } from 'lucide-react'

function Column({ title, items, Icon, accent, emptyMessage }) {
  const safeItems = Array.isArray(items)
    ? items.filter((item) => item && typeof item === 'object')
    : []

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center ${accent.bg}`}
        >
          <Icon size={15} className={accent.text} />
        </div>

        <h4 className="text-sm font-bold text-text-primary">
          {title}
        </h4>
      </div>

      <div className="space-y-2">
        {safeItems.length === 0 ? (
          <div
            className="rounded-xl border border-border p-3"
            style={{ background: 'var(--surface-elevated)' }}
          >
            <p className="text-xs text-text-muted">
              {emptyMessage}
            </p>
          </div>
        ) : (
          safeItems.map((item, index) => {
            const itemTitle =
              typeof item.title === 'string' && item.title.trim()
                ? item.title
                : `${title} ${index + 1}`

            const description =
              typeof item.description === 'string'
                ? item.description
                : ''

            return (
              <div
                key={`${title}-${index}-${itemTitle}`}
                className="rounded-xl border border-border p-3"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <p className="text-sm font-semibold text-text-primary">
                  {itemTitle}
                </p>

                {description && (
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default function CompetitivePositionSection({
  competitivePosition = {},
  loading = false,
}) {
  if (loading) {
    return (
      <section
        className="rounded-3xl border border-border p-6 shadow-sm"
        style={{ background: 'var(--surface)' }}
      >
        <div
          className="h-6 w-48 rounded animate-pulse mb-5"
          style={{ background: 'var(--surface-elevated)' }}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {[0, 1].map((column) => (
            <div key={column}>
              <div
                className="h-8 w-32 rounded-xl animate-pulse mb-3"
                style={{ background: 'var(--surface-elevated)' }}
              />

              <div className="space-y-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-16 rounded-xl animate-pulse"
                    style={{ background: 'var(--surface-elevated)' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const strengths = Array.isArray(competitivePosition?.strengths)
    ? competitivePosition.strengths
    : []

  const risks = Array.isArray(competitivePosition?.risks)
    ? competitivePosition.risks
    : []

  return (
    <section
      className="rounded-3xl border border-border p-6 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <h3 className="text-lg font-bold text-text-primary mb-4">
        Competitive Position
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <Column
          title="Strengths"
          items={strengths}
          Icon={ShieldCheck}
          accent={{
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-500',
          }}
          emptyMessage="No strengths available."
        />

        <Column
          title="Risks"
          items={risks}
          Icon={AlertTriangle}
          accent={{
            bg: 'bg-amber-500/10',
            text: 'text-amber-500',
          }}
          emptyMessage="No risks available."
        />
      </div>
    </section>
  )
}