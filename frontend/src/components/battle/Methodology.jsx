export default function Methodology() {
    return (
      <div className="rounded-2xl p-6 mb-10 border border-border" style={{ background: 'var(--surface-elevated)' }}>
        <p className="text-sm text-text-muted leading-relaxed">
          <strong className="text-text-primary">Methodology:</strong> Scores are calculated using a weighted model based on revenue growth, gross margin, operating margin, P/E ratio, return on equity, and debt-to-equity metrics. Each factor is normalized on a 0-100 scale to enable cross-company comparison.
        </p>
      </div>
    )
  }