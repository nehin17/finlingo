import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, BookMarked, CheckCircle, X } from 'lucide-react'

const formulaData = {
  'P/E Ratio': {
    formula: 'P/E = Share Price ÷ Earnings Per Share',
    variables: [
      { name: 'Share Price', description: 'Current market price per share' },
      { name: 'EPS', description: 'Net income divided by number of outstanding shares' },
    ],
    interpretation: 'A P/E of 20x means investors are paying ₹20 for every ₹1 of annual earnings.',
    example: 'If a stock trades at ₹2,000 and has EPS of ₹100, P/E = 20x',
  },
  'EV/EBITDA': {
    formula: 'EV/EBITDA = Enterprise Value ÷ EBITDA',
    variables: [
      { name: 'Enterprise Value', description: 'Market cap + debt - cash' },
      { name: 'EBITDA', description: 'Earnings before interest, taxes, depreciation, amortization' },
    ],
    interpretation: 'Compares total company value to operating profitability.',
    example: 'A company with ₹10,000 Cr EV and ₹500 Cr EBITDA = 20x',
  },
  'Free Cash Flow': {
    formula: 'FCF = Operating Cash Flow - Capital Expenditures',
    variables: [
      { name: 'Operating Cash Flow', description: 'Cash generated from business operations' },
      { name: 'CapEx', description: 'Money spent on equipment and infrastructure' },
    ],
    interpretation: 'Cash available to distribute to investors. Higher FCF indicates business quality.',
    example: 'If OCF is ₹1,000 Cr and CapEx is ₹200 Cr, FCF = ₹800 Cr',
  },
  'ROE (Return on Equity)': {
    formula: 'ROE = Net Income ÷ Shareholders Equity',
    variables: [
      { name: 'Net Income', description: 'Bottom-line profit after all expenses' },
      { name: 'Shareholders Equity', description: 'Total assets minus total liabilities' },
    ],
    interpretation: 'Measures how efficiently a company generates profits from shareholder capital.',
    example: 'If net income is ₹500 Cr and equity is ₹2,000 Cr, ROE = 25%',
  },
  'Gross Margin': {
    formula: 'Gross Margin = (Revenue - COGS) ÷ Revenue × 100',
    variables: [
      { name: 'Revenue', description: 'Total sales' },
      { name: 'COGS', description: 'Cost of goods sold' },
    ],
    interpretation: 'Shows percentage of revenue remaining after direct production costs.',
    example: 'Revenue ₹1,000 Cr, COGS ₹400 Cr = 60% Gross Margin',
  },
  'Debt-to-Equity': {
    formula: 'D/E = Total Debt ÷ Shareholders Equity',
    variables: [
      { name: 'Total Debt', description: 'All long-term and short-term debt' },
      { name: 'Shareholders Equity', description: 'Total assets minus total liabilities' },
    ],
    interpretation: 'Measures financial leverage and financial risk.',
    example: 'Total Debt ₹500 Cr, Equity ₹1,000 Cr = 0.5x',
  },
}

export default function ConceptCard({ concept, isCompleted }) {
  const [showFormula, setShowFormula] = useState(false)
  const formula = formulaData[concept.name]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
        style={{ background: 'var(--surface)' }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
              {concept.name}
            </h3>
            <div className="flex gap-2 flex-wrap">
              <span
                className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{
                  background: `${concept.color}20`,
                  color: concept.color,
                }}
              >
                {concept.category}
              </span>
              <span
                className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)' }}
              >
                {concept.difficulty}
              </span>
            </div>
          </div>
          {isCompleted && <CheckCircle size={20} className="text-success flex-shrink-0" />}
        </div>

        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          {concept.description}
        </p>

        <div className="flex gap-3 pt-4 border-t border-border flex-wrap">
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Clock size={14} />
            {concept.readTime} min
          </div>
          {concept.hasFormula && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowFormula(true)
              }}
              className="flex items-center gap-1 text-xs text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <BookMarked size={14} />
              Formula
            </button>
          )}
          {concept.hasQuiz && (
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="flex items-center gap-1 text-xs text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <CheckCircle size={14} />
              Quiz
            </button>
          )}
        </div>
      </motion.div>

      {showFormula && formula && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowFormula(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
            style={{ background: 'var(--surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFormula(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-lg border border-border hover:bg-surface-elevated flex items-center justify-center text-text-muted hover:text-text-primary transition-all"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-text-primary mb-6">{concept.name}</h3>

            <div className="mb-8 p-6 rounded-lg border border-primary/30" style={{ background: 'var(--surface-elevated)' }}>
              <p className="text-xs text-text-muted font-semibold mb-3 uppercase">Formula</p>
              <p className="text-lg font-bold text-primary font-mono">{formula.formula}</p>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-bold text-text-primary mb-4">Variable Definitions</h4>
              <div className="space-y-3">
                {formula.variables.map((variable, i) => (
                  <div key={i} className="p-4 rounded-lg border border-border" style={{ background: 'var(--surface-elevated)' }}>
                    <p className="font-semibold text-text-primary mb-1">{variable.name}</p>
                    <p className="text-sm text-text-secondary">{variable.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 p-6 rounded-lg border-l-4" style={{ background: 'var(--surface-elevated)', borderColor: concept.color }}>
              <p className="text-sm text-text-muted font-semibold mb-2 uppercase">Interpretation</p>
              <p className="text-base text-text-secondary leading-relaxed">{formula.interpretation}</p>
            </div>

            <div className="p-6 rounded-lg border border-border mb-8" style={{ background: 'var(--surface-elevated)' }}>
              <p className="text-sm text-text-muted font-semibold mb-3 uppercase">Practical Example</p>
              <p className="text-base text-text-secondary leading-relaxed">{formula.example}</p>
            </div>

            <button
              onClick={() => setShowFormula(false)}
              className="w-full px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}