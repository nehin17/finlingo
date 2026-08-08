import { motion } from 'framer-motion'

export default function CompanyStrengths({ leftCompany, rightCompany }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Left Strengths */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-xl p-6 border-l-4"
        style={{
          background: 'var(--surface)',
          borderColor: leftCompany.color,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: leftCompany.color }}
          />
          <h3 className="font-bold text-xl text-text-primary">Where {leftCompany.ticker} Wins</h3>
        </div>
        <div className="space-y-3 text-base text-text-secondary">
          <div>
            <p className="font-semibold text-lg text-text-primary mb-1">Growth</p>
            <p>{leftCompany.ticker}'s revenue growth ({leftCompany.metrics['Revenue Growth'].value}) significantly exceeds {rightCompany.ticker}'s, indicating substantially stronger recent expansion.</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-text-primary mb-1">Profitability</p>
            <p>{leftCompany.ticker} currently operates with higher gross and operating margins ({leftCompany.metrics['Gross Margin'].value} gross, {leftCompany.metrics['Operating Margin'].value} operating).</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-text-primary mb-1">Balance Sheet</p>
            <p>{leftCompany.ticker} has a lower debt-to-equity ratio ({leftCompany.metrics['Debt/Equity'].value}), indicating a stronger balance sheet.</p>
          </div>
        </div>
      </motion.div>

      {/* Right Strengths */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-xl p-6 border-l-4"
        style={{
          background: 'var(--surface)',
          borderColor: rightCompany.color,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: rightCompany.color }}
          />
          <h3 className="font-bold text-xl text-text-primary">Where {rightCompany.ticker} Wins</h3>
        </div>
        <div className="space-y-3 text-base text-text-secondary">
          <div>
            <p className="font-semibold text-lg text-text-primary mb-1">Valuation</p>
            <p>{rightCompany.ticker} trades at a lower P/E multiple ({rightCompany.metrics['P/E Ratio'].value}), meaning investors are paying less for each unit of current earnings.</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-text-primary mb-1">Return on Equity</p>
            <p>{rightCompany.ticker} currently reports a stronger ROE of {rightCompany.metrics['ROE'].value}, indicating superior capital efficiency.</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-text-primary mb-1">Stability</p>
            <p>More moderate growth expectations and valuation multiples provide a more conservative risk profile.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}