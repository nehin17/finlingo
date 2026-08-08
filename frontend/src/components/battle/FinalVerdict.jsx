import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function FinalVerdict({ leftCompany, rightCompany }) {
  const calculateScore = (company) => {
    return Math.round(
      Object.values(company.metrics).reduce((acc, m) => acc + m.score, 0) /
      Object.keys(company.metrics).length
    )
  }

  const leftScore = calculateScore(leftCompany)
  const rightScore = calculateScore(rightCompany)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl p-8 mb-12 border border-border"
      style={{
        background: 'var(--surface)',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
          <Sparkles size={20} className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary">Final Verdict</h3>
      </div>

      <div className="space-y-6 text-base text-text-secondary leading-relaxed mb-8">
        <p>
          <strong className="text-text-primary">{leftCompany?.ticker} currently demonstrates the stronger overall fundamental profile</strong>, 
          driven primarily by superior revenue growth and operating profitability. The company's exceptional growth momentum and industry-leading 
          margins position it favorably for investors seeking exposure to high-growth technology trends.
        </p>

        <p>
          <strong className="text-text-primary">{rightCompany?.ticker} maintains meaningful advantages in valuation efficiency and return on equity</strong>, 
          making it potentially more attractive for investors who prioritize earnings quality and a more conservative risk profile. The company's 
          diversified business model and established market position provide stability for long-term investors.
        </p>

        <p>
          <strong className="text-text-primary">Conclusion:</strong> For aggressive growth-oriented investors, {leftCompany?.ticker} appears more compelling 
          given its superior growth trajectory. For valuation-conscious or stability-oriented investors, {rightCompany?.ticker} presents a stronger 
          relative case based on earnings multiple efficiency and balance sheet characteristics.
        </p>
      </div>

      <div className="p-5 rounded-lg" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <p className="text-sm text-text-muted">
          <strong className="text-text-primary">Disclaimer:</strong> This comparison is based on selected financial metrics and is provided for 
          informational and research purposes only. It does not constitute personalized investment, financial, legal, or tax advice. Investors should 
          conduct independent research and consult a qualified financial professional before making investment decisions.
        </p>
      </div>
    </motion.div>
  )
}