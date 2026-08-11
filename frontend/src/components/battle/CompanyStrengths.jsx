import { motion } from 'framer-motion'

function metric(company, name, fallback = 'N/A') {
  return company?.metrics?.[name]?.value ?? fallback
}

function StrengthCard({
  company,
  title,
  points,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: title.includes('Wins') ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl p-6 border-l-4 h-full"
      style={{
        background: 'var(--surface)',
        borderColor: company?.color,
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-4 h-4 rounded-full shrink-0"
          style={{ background: company?.color }}
        />

        <h3
          className="font-bold text-xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
      </div>

      <div className="space-y-4">
        {points.map((point) => (
          <div key={point.heading}>
            <h4
              className="font-semibold text-lg mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {point.heading}
            </h4>

            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function CompanyStrengths({
  leftCompany,
  rightCompany,
}) {
  const leftPoints = [
    {
      heading: 'Growth',
      text: `${leftCompany?.ticker}'s revenue growth (${metric(
        leftCompany,
        'Revenue Growth'
      )}) exceeds ${rightCompany?.ticker}'s, indicating stronger recent expansion.`,
    },
    {
      heading: 'Profitability',
      text: `${leftCompany?.ticker} operates with higher gross and operating margins (${metric(
        leftCompany,
        'Gross Margin'
      )} gross, ${metric(
        leftCompany,
        'Operating Margin'
      )} operating).`,
    },
    {
      heading: 'Balance Sheet',
      text: `${leftCompany?.ticker} has a lower debt-to-equity ratio (${metric(
        leftCompany,
        'Debt/Equity'
      )}), indicating a stronger leverage profile.`,
    },
  ]

  const rightPoints = [
    {
      heading: 'Valuation',
      text: `${rightCompany?.ticker} trades at a lower P/E multiple (${metric(
        rightCompany,
        'P/E Ratio'
      )}), meaning investors are paying less for each unit of current earnings.`,
    },
    {
      heading: 'Return on Equity',
      text: `${rightCompany?.ticker} reports a stronger ROE of ${metric(
        rightCompany,
        'ROE'
      )}, indicating superior capital efficiency.`,
    },
    {
      heading: 'Stability',
      text: 'More moderate growth expectations and valuation multiples provide a more conservative risk profile.',
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <StrengthCard
        company={leftCompany}
        title={`Where ${leftCompany?.ticker} Wins`}
        points={leftPoints}
      />

      <StrengthCard
        company={rightCompany}
        title={`Where ${rightCompany?.ticker} Wins`}
        points={rightPoints}
      />
    </div>
  )
}