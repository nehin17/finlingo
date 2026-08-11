
import { motion } from 'framer-motion'

export default function DetailedComparison({
  leftCompany,
  rightCompany,
}) {
  // Create a union of metric keys from both companies
  const metrics = Array.from(
    new Set([
      ...Object.keys(leftCompany?.metrics || {}),
      ...Object.keys(rightCompany?.metrics || {}),
    ])
  )

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Detailed Financial Comparison
          </h3>

          <p
            className="text-sm mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Compare key financial metrics side-by-side to identify
            strengths, weaknesses, and valuation differences.
          </p>
        </div>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Header */}
        <div
          className="grid grid-cols-3 px-6 py-4 border-b text-sm font-semibold"
          style={{
            background: 'var(--surface-elevated)',
            borderColor: 'var(--border)',
          }}
        >
          <div style={{ color: 'var(--text-primary)' }}>
            {leftCompany?.ticker}
          </div>

          <div
            className="text-center uppercase tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            Metric
          </div>

          <div
            className="text-right"
            style={{ color: 'var(--text-primary)' }}
          >
            {rightCompany?.ticker}
          </div>
        </div>

        {/* Rows */}
        {metrics.map((metric, index) => {
          const leftMetric = leftCompany?.metrics?.[metric]
          const rightMetric = rightCompany?.metrics?.[metric]

          const leftScore =
            typeof leftMetric?.score === 'number'
              ? leftMetric.score
              : null

          const rightScore =
            typeof rightMetric?.score === 'number'
              ? rightMetric.score
              : null

          const leftWins =
            leftScore !== null &&
            rightScore !== null &&
            leftScore > rightScore

          const rightWins =
            leftScore !== null &&
            rightScore !== null &&
            rightScore > leftScore

          return (
            <motion.div
              key={metric}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.03,
              }}
              className="grid grid-cols-3 items-center px-6 py-5 border-b last:border-b-0 transition-colors hover:bg-surface-elevated/20"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Left */}
              <div>
                <p
                  className="font-bold text-xl sm:text-2xl"
                  style={{
                    color: leftWins
                      ? leftCompany?.color
                      : 'var(--text-primary)',
                  }}
                >
                  {leftMetric?.value ?? 'N/A'}
                </p>

                {leftWins && (
                  <span
                    className="text-xs font-semibold mt-1 inline-block"
                    style={{ color: 'var(--success)' }}
                  >
                    ✓ Winner
                  </span>
                )}
              </div>

              {/* Center */}
              <div className="text-center px-3">
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {metric}
                </p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p
                  className="font-bold text-xl sm:text-2xl"
                  style={{
                    color: rightWins
                      ? rightCompany?.color
                      : 'var(--text-primary)',
                  }}
                >
                  {rightMetric?.value ?? 'N/A'}
                </p>

                {rightWins && (
                  <span
                    className="text-xs font-semibold mt-1 inline-block"
                    style={{ color: 'var(--success)' }}
                  >
                    ✓ Winner
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

