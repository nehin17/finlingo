import { motion } from 'framer-motion'

export default function DetailedComparison({ leftCompany, rightCompany }) {
  const metrics = Object.keys(leftCompany.metrics)

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-text-primary mb-6">Detailed Financial Comparison</h3>
      
      <div className="rounded-2xl border border-border overflow-hidden" style={{ background: 'var(--surface)' }}>
        {/* Header */}
        <div className="grid grid-cols-3 px-6 py-4 border-b border-border bg-surface-elevated/50">
          <div className="font-semibold text-lg text-text-primary">{leftCompany.ticker}</div>
          <div className="text-center font-semibold text-base text-text-muted uppercase">Metric</div>
          <div className="font-semibold text-lg text-text-primary text-right">{rightCompany.ticker}</div>
        </div>

        {/* Rows */}
        {metrics.map((metric, i) => {
          const lm = leftCompany.metrics[metric]
          const rm = rightCompany.metrics[metric]
          const lWins = lm.score > rm.score
          const rWins = rm.score > lm.score

          return (
            <motion.div
              key={metric}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-3 items-center px-6 py-5 border-b border-border last:border-0 hover:bg-surface-elevated/20 transition-colors"
            >
              {/* Left */}
              <div>
                <p 
                  className="font-bold text-2xl"
                  style={{ color: lWins ? leftCompany.color : 'var(--text-muted)' }}
                >
                  {lm.value}
                </p>
                {lWins && <span className="text-base text-success font-bold">✓ Winner</span>}
              </div>

              {/* Center */}
              <div className="text-center">
                <p className="text-base font-semibold text-text-muted">{metric}</p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p 
                  className="font-bold text-2xl"
                  style={{ color: rWins ? rightCompany.color : 'var(--text-muted)' }}
                >
                  {rm.value}
                </p>
                {rWins && <span className="text-base text-success font-bold">✓ Winner</span>}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}