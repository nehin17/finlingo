import { useState } from 'react'
import { motion } from 'framer-motion'
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

export default function CategoryScorecard({ leftCompany, rightCompany }) {
  const [expanded, setExpanded] = useState(null)

  const getCategoryScore = (company, category) => {
    const categoryMetrics = CATEGORIES[category].metrics
    const scores = categoryMetrics
      .filter(m => company.metrics[m])
      .map(m => company.metrics[m].score)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const getCategoryWinner = (category) => {
    const leftScore = getCategoryScore(leftCompany, category)
    const rightScore = getCategoryScore(rightCompany, category)
    if (leftScore > rightScore) return 'left'
    if (rightScore > leftScore) return 'right'
    return null
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-text-primary mb-6">Category Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(CATEGORIES).map(([key, category]) => {
          const leftScore = getCategoryScore(leftCompany, key)
          const rightScore = getCategoryScore(rightCompany, key)
          const winner = getCategoryWinner(key)

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border p-5 cursor-pointer hover:border-border/80 transition-colors"
              style={{ background: 'var(--surface)' }}
              onClick={() => setExpanded(expanded === key ? null : key)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg text-text-primary">{category.name}</h4>
                <motion.div animate={{ rotate: expanded === key ? 180 : 0 }}>
                  <ChevronDown size={20} className="text-text-muted" />
                </motion.div>
              </div>
              
              {/* Category Description */}
              <p className="text-sm text-text-muted mb-4">{category.description}</p>

              {/* Score bars */}
              <div className="space-y-3">
                <div>
                  <p className="text-base text-text-muted mb-2 font-semibold">{leftCompany.ticker}</p>
                  <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${leftScore}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: leftCompany.color }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-base text-text-muted mb-2 font-semibold">{rightCompany.ticker}</p>
                  <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rightScore}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: rightCompany.color }}
                    />
                  </div>
                </div>
              </div>

              {/* Winner indicator */}
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-base">
                <span className="text-text-muted font-semibold">
                  {winner ? `${winner === 'left' ? leftCompany.ticker : rightCompany.ticker} leads` : 'Tied'}
                </span>
                {winner && (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: winner === 'left' ? leftCompany.color : rightCompany.color }}
                  />
                )}
              </div>

              {/* Expanded details */}
              {expanded === key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border/50 space-y-3 text-base"
                >
                  {category.metrics.map(metric => (
                    <div key={metric} className="flex justify-between">
                      <span className="text-text-muted font-semibold">{metric}</span>
                      <div className="space-x-6">
                        <span className="font-semibold" style={{ color: leftCompany.color }}>
                          {leftCompany.metrics[metric]?.value || 'N/A'}
                        </span>
                        <span className="font-semibold" style={{ color: rightCompany.color }}>
                          {rightCompany.metrics[metric]?.value || 'N/A'}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}