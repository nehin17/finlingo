import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const CATEGORIES = {
  growth: {
    name: 'Growth',
    description: 'Revenue expansion and momentum.',
    metrics: ['Revenue Growth', 'EPS Growth'],
  },
  profitability: {
    name: 'Profitability',
    description: 'Gross and operating margin efficiency.',
    metrics: ['Gross Margin', 'Operating Margin', 'ROE'],
  },
  valuation: {
    name: 'Valuation',
    description: 'Price paid relative to current earnings.',
    metrics: ['P/E Ratio'],
  },
  health: {
    name: 'Financial Health',
    description: 'Balance sheet strength and leverage profile.',
    metrics: ['Debt/Equity'],
  },
}

export default function CategoryScorecard({
  leftCompany,
  rightCompany,
}) {
  const [expanded, setExpanded] = useState(null)

  // ------------------------------------------------------------
  // Safe score calculation
  // Handles missing metrics from future API responses
  // ------------------------------------------------------------
  const getCategoryScore = (company, categoryKey) => {
    const category = CATEGORIES[categoryKey]

    if (!company?.metrics || !category) {
      return 0
    }

    const scores = category.metrics
      .map((metric) => company.metrics?.[metric]?.score)
      .filter((score) => typeof score === 'number')

    if (scores.length === 0) {
      return 0
    }

    return Math.round(
      scores.reduce((total, score) => total + score, 0) /
        scores.length
    )
  }

  const getCategoryWinner = (categoryKey) => {
    const leftScore = getCategoryScore(leftCompany, categoryKey)
    const rightScore = getCategoryScore(rightCompany, categoryKey)

    if (leftScore > rightScore) return 'left'
    if (rightScore > leftScore) return 'right'

    return null
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Category Performance
          </h3>

          <p
            className="text-sm mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Compare how each company performs across key
            fundamental categories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(CATEGORIES).map(
          ([key, category]) => {
            const leftScore = getCategoryScore(
              leftCompany,
              key
            )

            const rightScore = getCategoryScore(
              rightCompany,
              key
            )

            const winner = getCategoryWinner(key)

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
                onClick={() =>
                  setExpanded(
                    expanded === key ? null : key
                  )
                }
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4
                      className="font-semibold text-lg"
                      style={{
                        color: 'var(--text-primary)',
                      }}
                    >
                      {category.name}
                    </h4>

                    <p
                      className="text-sm mt-1 leading-relaxed"
                      style={{
                        color: 'var(--text-muted)',
                      }}
                    >
                      {category.description}
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      rotate:
                        expanded === key ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 mt-1"
                  >
                    <ChevronDown
                      size={18}
                      style={{
                        color: 'var(--text-muted)',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Scores */}
                <div className="space-y-4">
                  {/* Left company */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: 'var(--text-primary)',
                        }}
                      >
                        {leftCompany?.ticker}
                      </span>

                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: leftCompany?.color,
                        }}
                      >
                        {leftScore}
                      </span>
                    </div>

                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{
                        background:
                          'var(--surface-elevated)',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${leftScore}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: 'easeOut',
                        }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            leftCompany?.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Right company */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: 'var(--text-primary)',
                        }}
                      >
                        {rightCompany?.ticker}
                      </span>

                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: rightCompany?.color,
                        }}
                      >
                        {rightScore}
                      </span>
                    </div>

                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{
                        background:
                          'var(--surface-elevated)',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${rightScore}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: 'easeOut',
                        }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            rightCompany?.color,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Winner */}
                <div
                  className="mt-4 pt-4 border-t flex items-center justify-between"
                  style={{
                    borderColor: 'var(--border)',
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: 'var(--text-muted)',
                    }}
                  >
                    {winner
                      ? `${winner === 'left'
                          ? leftCompany?.ticker
                          : rightCompany?.ticker} leads`
                      : 'Tied'}
                  </span>

                  {winner && (
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background:
                          winner === 'left'
                            ? leftCompany?.color
                            : rightCompany?.color,
                      }}
                    />
                  )}
                </div>

                {/* Expanded details */}
                <AnimatePresence initial={false}>
                  {expanded === key && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-4 pt-4 border-t space-y-3"
                        style={{
                          borderColor: 'var(--border)',
                        }}
                      >
                        {category.metrics.map(
                          (metric) => (
                            <div
                              key={metric}
                              className="grid grid-cols-[1fr_auto_auto] gap-4 items-center text-sm"
                            >
                              <span
                                style={{
                                  color: 'var(--text-muted)',
                                }}
                              >
                                {metric}
                              </span>

                              <span
                                className="font-medium text-right"
                                style={{
                                  color:
                                    leftCompany?.color,
                                }}
                              >
                                {leftCompany?.metrics?.[
                                  metric
                                ]?.value ?? 'N/A'}
                              </span>

                              <span
                                className="font-medium text-right"
                                style={{
                                  color:
                                    rightCompany?.color,
                                }}
                              >
                                {rightCompany?.metrics?.[
                                  metric
                                ]?.value ?? 'N/A'}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          }
        )}
      </div>
    </div>
  )
}