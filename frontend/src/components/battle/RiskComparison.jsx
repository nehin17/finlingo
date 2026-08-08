import { motion } from 'framer-motion'

export default function RiskComparison({ leftCompany, rightCompany }) {
  const risks = [
    'Valuation Risk',
    'Growth Slowdown',
    'Margin Pressure',
    'Debt Risk',
    'Concentration Risk'
  ]

  const getRiskLevel = (ticker, risk) => {
    const riskMap = {
      'Valuation Risk': { NVDA: 'High', AAPL: 'Moderate', MSFT: 'Moderate' },
      'Growth Slowdown': { NVDA: 'Moderate', AAPL: 'Moderate', MSFT: 'Moderate' },
      'Margin Pressure': { NVDA: 'Moderate', AAPL: 'Moderate', MSFT: 'Moderate' },
      'Debt Risk': { NVDA: 'Low', AAPL: 'Moderate', MSFT: 'Low' },
      'Concentration Risk': { NVDA: 'Moderate', AAPL: 'Low', MSFT: 'Low' },
    }
    return riskMap[risk]?.[ticker] || 'Moderate'
  }

  const getRiskColor = (level) => {
    if (level === 'High') return '#EF4444'
    if (level === 'Moderate') return '#F59E0B'
    return '#10B981'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-8 mb-12 border border-border overflow-x-auto"
      style={{ background: 'var(--surface)' }}
    >
      <h3 className="text-2xl font-bold text-text-primary mb-6">Key Risks</h3>

      <table className="w-full text-base">
        <thead>
          <tr className="border-b border-border" style={{ background: 'var(--surface-elevated)' }}>
            <th className="text-left py-4 px-4 font-semibold text-lg text-text-primary">Risk Factor</th>
            <th className="text-center py-4 px-4 font-semibold text-lg text-text-primary">{leftCompany?.ticker}</th>
            <th className="text-center py-4 px-4 font-semibold text-lg text-text-primary">{rightCompany?.ticker}</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk, i) => {
            const leftLevel = getRiskLevel(leftCompany?.ticker, risk)
            const rightLevel = getRiskLevel(rightCompany?.ticker, risk)

            return (
              <motion.tr
                key={risk}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-surface-elevated/20 transition-colors"
              >
                <td className="py-5 px-4 text-text-primary font-semibold">{risk}</td>
                <td className="py-5 px-4 text-center">
                  <span
                    className="text-sm font-bold uppercase px-3 py-1.5 rounded-full inline-block"
                    style={{
                      background: `${getRiskColor(leftLevel)}20`,
                      color: getRiskColor(leftLevel),
                    }}
                  >
                    {leftLevel}
                  </span>
                </td>
                <td className="py-5 px-4 text-center">
                  <span
                    className="text-sm font-bold uppercase px-3 py-1.5 rounded-full inline-block"
                    style={{
                      background: `${getRiskColor(rightLevel)}20`,
                      color: getRiskColor(rightLevel),
                    }}
                  >
                    {rightLevel}
                  </span>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </motion.div>
  )
}