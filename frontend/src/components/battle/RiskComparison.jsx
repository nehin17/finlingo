import { motion } from 'framer-motion'

const RISK_FACTORS = [
  'Valuation Risk',
  'Growth Slowdown',
  'Margin Pressure',
  'Debt Risk',
  'Concentration Risk',
]

function getRiskLevel(company, risk) {
  return company?.risks?.[risk] ?? 'Moderate'
}

function getRiskColor(level) {
  switch (level) {
    case 'High':
      return '#EF4444'

    case 'Moderate':
      return '#F59E0B'

    case 'Low':
      return '#10B981'

    default:
      return '#64748B'
  }
}

function RiskBadge({ level }) {
  const color = getRiskColor(level)

  return (
    <span
      className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
      style={{
        background: `${color}20`,
        color,
        border: `1px solid ${color}33`,
      }}
    >
      {level}
    </span>
  )
}

export default function RiskComparison({
  leftCompany,
  rightCompany,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-8 mb-12 border overflow-hidden"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Key Risks
          </h3>

          <p
            className="text-sm mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            A comparative view of major fundamental and business
            risks.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr
              className="border-b"
              style={{
                background: 'var(--surface-elevated)',
                borderColor: 'var(--border)',
              }}
            >
              <th
                className="text-left py-4 px-4 font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Risk Factor
              </th>

              <th
                className="text-center py-4 px-4 font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {leftCompany?.ticker}
              </th>

              <th
                className="text-center py-4 px-4 font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {rightCompany?.ticker}
              </th>
            </tr>
          </thead>

          <tbody>
            {RISK_FACTORS.map((risk, index) => {
              const leftLevel = getRiskLevel(
                leftCompany,
                risk
              )

              const rightLevel = getRiskLevel(
                rightCompany,
                risk
              )

              return (
                <motion.tr
                  key={risk}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.04,
                  }}
                  className="border-b last:border-b-0 transition-colors hover:bg-surface-elevated/20"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td
                    className="py-5 px-4 font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {risk}
                  </td>

                  <td className="py-5 px-4 text-center">
                    <RiskBadge level={leftLevel} />
                  </td>

                  <td className="py-5 px-4 text-center">
                    <RiskBadge level={rightLevel} />
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}