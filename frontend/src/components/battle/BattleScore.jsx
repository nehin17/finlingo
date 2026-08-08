import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BattleScore({ leftCompany, rightCompany, metrics }) {
  const calculateScore = (company) => {
    return Math.round(
      Object.values(company.metrics).reduce((acc, m) => acc + m.score, 0) / 
      Object.keys(company.metrics).length
    )
  }

  const leftScore = calculateScore(leftCompany)
  const rightScore = calculateScore(rightCompany)
  const leader = leftScore > rightScore ? leftCompany.ticker : rightScore > leftScore ? rightCompany.ticker : null

  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <div className="rounded-2xl p-8 mb-8 border border-border" style={{ background: 'var(--surface)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-text-primary">Relative Strength Score</h3>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-base text-text-muted hover:text-primary transition-colors"
        >
          {showBreakdown ? 'Hide' : 'Show'} Breakdown
        </button>
      </div>

      {/* Score Display */}
      <div className="grid grid-cols-3 gap-8 items-center mb-6">
        {/* Left */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl font-bold mb-3"
            style={{ color: leftCompany.color }}
          >
            {leftScore}
          </motion.div>
          <div className="w-full h-3 bg-surface-elevated rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${leftScore}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: leftCompany.color }}
            />
          </div>
          <p className="font-semibold text-lg text-text-primary">{leftCompany.ticker}</p>
        </div>

        {/* Center */}
        <div className="text-center">
          {leader && (
            <div 
              className="inline-block px-4 py-2 rounded-full text-base font-bold text-white mb-3"
              style={{ background: leader === leftCompany.ticker ? leftCompany.color : rightCompany.color }}
            >
              {leader} Leads
            </div>
          )}
          <p className="text-sm text-text-muted uppercase tracking-wide font-semibold">Score</p>
        </div>

        {/* Right */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl font-bold mb-3"
            style={{ color: rightCompany.color }}
          >
            {rightScore}
          </motion.div>
          <div className="w-full h-3 bg-surface-elevated rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${rightScore}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: rightCompany.color }}
            />
          </div>
          <p className="font-semibold text-lg text-text-primary">{rightCompany.ticker}</p>
        </div>
      </div>

      {/* Breakdown */}
      {showBreakdown && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="pt-6 border-t border-border"
        >
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-text-muted text-base mb-2 font-semibold">Growth</p>
              <p className="font-bold text-lg text-text-primary">30%</p>
            </div>
            <div>
              <p className="text-text-muted text-base mb-2 font-semibold">Profitability</p>
              <p className="font-bold text-lg text-text-primary">30%</p>
            </div>
            <div>
              <p className="text-text-muted text-base mb-2 font-semibold">Valuation</p>
              <p className="font-bold text-lg text-text-primary">20%</p>
            </div>
            <div>
              <p className="text-text-muted text-base mb-2 font-semibold">Financial Health</p>
              <p className="font-bold text-lg text-text-primary">20%</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}