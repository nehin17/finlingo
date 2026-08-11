import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_BREAKDOWN = [
  { key: 'growth', label: 'Growth', weight: 30 },
  { key: 'profitability', label: 'Profitability', weight: 30 },
  { key: 'valuation', label: 'Valuation', weight: 20 },
  { key: 'financialHealth', label: 'Financial Health', weight: 20 },
]

export default function BattleScore({
  leftCompany,
  rightCompany,
  scoreBreakdown = DEFAULT_BREAKDOWN,
}) {
  // ------------------------------------------------------------
  // Backend-ready score calculation
  //
  // Expected future shape:
  // company.metrics = {
  //   growth: { score: 92 },
  //   profitability: { score: 88 },
  //   valuation: { score: 70 },
  //   financialHealth: { score: 85 },
  // }
  // ------------------------------------------------------------

  const calculateScore = (company) => {
    const metricValues = Object.values(company?.metrics || {})

    if (metricValues.length === 0) {
      return 0
    }

    const total = metricValues.reduce(
      (sum, metric) => sum + (metric?.score || 0),
      0
    )

    return Math.round(total / metricValues.length)
  }

  // Memoized so it doesn't recalculate on every render
  const leftScore = useMemo(
    () => calculateScore(leftCompany),
    [leftCompany]
  )

  const rightScore = useMemo(
    () => calculateScore(rightCompany),
    [rightCompany]
  )

  const leader =
    leftScore > rightScore
      ? leftCompany?.ticker
      : rightScore > leftScore
        ? rightCompany?.ticker
        : null

  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <div
      className="rounded-2xl border p-8 mb-8"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Relative Strength Score
          </h2>

          <p
            className="text-sm mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Composite score based on company fundamentals.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBreakdown((prev) => !prev)}
          className="text-sm font-medium transition-colors hover:text-primary"
          style={{ color: 'var(--text-muted)' }}
        >
          {showBreakdown ? 'Hide' : 'Show'} Breakdown
        </button>
      </div>

      {/* Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-6">
        {/* Left */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-7xl font-bold mb-3"
            style={{ color: leftCompany?.color }}
          >
            {leftScore}
          </motion.div>

          <div
            className="w-full h-3 rounded-full overflow-hidden mb-3"
            style={{ background: 'var(--surface-elevated)' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${leftScore}%` }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full"
              style={{ background: leftCompany?.color }}
            />
          </div>

          <p
            className="font-semibold text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            {leftCompany?.ticker}
          </p>
        </div>

        {/* Center */}
        <div className="text-center">
          {leader ? (
            <div
              className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-3"
              style={{
                background:
                  leader === leftCompany?.ticker
                    ? leftCompany?.color
                    : rightCompany?.color,
              }}
            >
              {leader} Leads
            </div>
          ) : (
            <div
              className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-3"
              style={{
                background: 'var(--surface-elevated)',
                color: 'var(--text-primary)',
              }}
            >
              Tie
            </div>
          )}

          <p
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: 'var(--text-muted)' }}
          >
            Composite score
          </p>
        </div>

        {/* Right */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-7xl font-bold mb-3"
            style={{ color: rightCompany?.color }}
          >
            {rightScore}
          </motion.div>

          <div
            className="w-full h-3 rounded-full overflow-hidden mb-3"
            style={{ background: 'var(--surface-elevated)' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${rightScore}%` }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full"
              style={{ background: rightCompany?.color }}
            />
          </div>

          <p
            className="font-semibold text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            {rightCompany?.ticker}
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <AnimatePresence>
        {showBreakdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pt-6 border-t overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {scoreBreakdown.map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--surface-elevated)' }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.label}
                  </p>

                  <p
                    className="font-bold text-lg"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.weight}%
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}