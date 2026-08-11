import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

function calculateScore(company) {
  const scores = Object.values(company?.metrics || {})
    .map((metric) => metric?.score)
    .filter((score) => typeof score === 'number')

  if (scores.length === 0) {
    return 0
  }

  return Math.round(
    scores.reduce((total, score) => total + score, 0) /
      scores.length
  )
}

export default function FinalVerdict({
  leftCompany,
  rightCompany,
}) {
  const leftScore = calculateScore(leftCompany)
  const rightScore = calculateScore(rightCompany)

  const leader =
    leftScore > rightScore
      ? leftCompany
      : rightScore > leftScore
      ? rightCompany
      : null

  const trailing =
    leader === leftCompany
      ? rightCompany
      : leftCompany

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="rounded-2xl p-8 mb-12 border"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(37,99,235,0.14), rgba(79,70,229,0.18))',
          }}
        >
          <Sparkles
            size={20}
            style={{ color: 'var(--primary)' }}
          />
        </div>

        <div>
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Final Verdict
          </h3>

          <p
            className="text-sm mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            A data-driven summary of the overall comparison.
          </p>
        </div>
      </div>

      {/* Score summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div
          className="rounded-xl border p-4 text-center"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--surface-elevated)',
          }}
        >
          <p
            className="text-sm font-medium mb-1"
            style={{ color: 'var(--text-muted)' }}
          >
            {leftCompany?.ticker}
          </p>

          <p
            className="text-3xl font-bold"
            style={{ color: leftCompany?.color }}
          >
            {leftScore}
          </p>
        </div>

        <div
          className="rounded-xl border p-4 text-center"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--surface-elevated)',
          }}
        >
          <p
            className="text-sm font-medium mb-1"
            style={{ color: 'var(--text-muted)' }}
          >
            {rightCompany?.ticker}
          </p>

          <p
            className="text-3xl font-bold"
            style={{ color: rightCompany?.color }}
          >
            {rightScore}
          </p>
        </div>
      </div>

      {/* Dynamic verdict */}
      <div
        className="space-y-5 text-base leading-relaxed mb-8"
        style={{ color: 'var(--text-secondary)' }}
      >
        {leader ? (
          <>
            <p>
              <strong
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                {leader.ticker} currently demonstrates the stronger overall fundamental profile
              </strong>
              , based on the weighted comparison of growth,
              profitability, valuation, and financial health
              metrics.
            </p>

            <p>
              <strong
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                {trailing?.ticker} remains a credible alternative
              </strong>
              , with strengths in specific areas that may
              appeal to investors with different risk
              tolerances or valuation preferences.
            </p>

            <p>
              <strong
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                Conclusion:
              </strong>
              {' '}
              Based on the current dataset, {leader.ticker}
              holds the stronger overall relative position in
              this comparison, while {trailing?.ticker} may be
              better suited for investors who prioritize its
              specific strengths and strategic characteristics.
            </p>
          </>
        ) : (
          <p>
            <strong
              style={{
                color: 'var(--text-primary)',
              }}
            >
              The comparison is currently balanced.
            </strong>
            {' '}
            Both companies achieve similar overall scores,
            suggesting that the decision may depend more on
            an investor's priorities—such as growth,
            valuation, stability, or capital efficiency—than
            on a clear fundamental winner.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-xl border p-5"
        style={{
          background: 'rgba(239,68,68,0.05)',
          borderColor: 'rgba(239,68,68,0.18)',
        }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          <strong style={{ color: 'var(--text-primary)' }}>
            Disclaimer:
          </strong>
          {' '}
          This comparison is based on selected financial
          metrics and is provided for informational and
          research purposes only. It does not constitute
          investment, financial, legal, or tax advice.
          Investors should conduct independent research and
          consult a qualified financial professional before
          making investment decisions.
        </p>
      </div>
    </motion.div>
  )
}