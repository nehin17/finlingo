import { motion } from 'framer-motion'

export default function AnalystSummary({
  leftCompany,
  rightCompany,
}) {
  // Backend-safe fallbacks while data is loading
  const leftTicker = leftCompany?.ticker || 'Left company'
  const rightTicker = rightCompany?.ticker || 'Right company'
  const accentColor = leftCompany?.color || 'var(--primary)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-8 mb-12 border-l-4"
      style={{
        background: 'var(--surface)',
        borderColor: accentColor,
      }}
    >
      <h3
        className="text-xl font-bold mb-5"
        style={{ color: 'var(--text-primary)' }}
      >
        Analyst Summary
      </h3>

      <div className="space-y-5 text-base leading-relaxed">
        <p style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>
            {leftTicker} appears better positioned for investors seeking
            high-growth exposure
          </strong>
          , supported by exceptional revenue momentum and industry-leading
          operating margins. The company demonstrates superior profitability
          metrics and maintains a balanced balance sheet relative to its growth
          profile.
        </p>

        <p style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>
            {rightTicker} remains the stronger choice for investors prioritizing
            valuation discipline, capital efficiency, and business stability.
          </strong>
          {' '}The company's more moderate valuation multiple and exceptional
          return on equity provide a more conservative risk-adjusted profile
          suitable for long-term investors.
        </p>

        <p style={{ color: 'var(--text-secondary)' }}>
          The current comparison suggests that <strong style={{ color: 'var(--text-primary)' }}>{leftTicker}</strong> has the stronger
          near-term fundamental profile, while <strong style={{ color: 'var(--text-primary)' }}>{rightTicker}</strong> offers a more balanced
          risk-adjusted profile for conservative investors seeking stability and
          earnings quality.
        </p>
      </div>
    </motion.div>
  )
}