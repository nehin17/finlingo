const METHODOLOGY = {
  metrics: [
    'Revenue Growth',
    'Gross Margin',
    'Operating Margin',
    'P/E Ratio',
    'Return on Equity',
    'Debt-to-Equity',
  ],
}

export default function Methodology() {
  return (
    <div
      className="rounded-2xl p-6 mb-10 border"
      style={{
        background: 'var(--surface-elevated)',
        borderColor: 'var(--border)',
      }}
    >
      <h4
        className="text-sm font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Methodology
      </h4>

      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        Relative strength scores are calculated using a weighted
        fundamental model that evaluates{' '}
        {METHODOLOGY.metrics.join(', ')}. Each factor is
        normalized to a 0–100 scale to enable more consistent
        cross-company comparison across growth, profitability,
        valuation, and financial health dimensions.
      </p>
    </div>
  )
}