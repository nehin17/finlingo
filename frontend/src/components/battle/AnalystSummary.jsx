import { motion } from 'framer-motion'

export default function AnalystSummary({ leftCompany, rightCompany }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-8 mb-12 border-l-4"
      style={{
        background: 'var(--surface)',
        borderColor: leftCompany.color,
      }}
    >
      <h3 className="text-2xl font-bold text-text-primary mb-6">Analyst Summary</h3>
      
      <div className="space-y-5 text-base text-text-secondary leading-relaxed">
        <p>
          <strong className="text-text-primary">{leftCompany?.ticker} appears better positioned for investors seeking high-growth exposure</strong>, 
          supported by exceptional revenue momentum and industry-leading operating margins. The company demonstrates superior profitability metrics and 
          maintains a balanced balance sheet relative to its growth profile.
        </p>

        <p>
          <strong className="text-text-primary">{rightCompany?.ticker} remains the stronger choice for investors prioritizing valuation discipline, capital efficiency, and business stability.</strong> 
          The company's more moderate valuation multiple and exceptional return on equity provide a more conservative risk-adjusted profile suitable for long-term investors.
        </p>

        <p>
          The current comparison suggests that {leftCompany?.ticker} has the stronger near-term fundamental profile, while {rightCompany?.ticker} offers 
          a more balanced risk-adjusted profile for conservative investors seeking stability and earnings quality.
        </p>
      </div>
    </motion.div>
  )
}