import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, AlertCircle } from 'lucide-react'

const caseStudyData = {
  'nvda-vs-aapl': {
    title: 'NVIDIA vs Apple: Build a Growth vs Value Investment Thesis',
    difficulty: 'Intermediate',
    readTime: 12,
    companies: [
      { ticker: 'NVDA', name: 'NVIDIA Corporation', color: '#3B82F6' },
      { ticker: 'AAPL', name: 'Apple Inc.', color: '#4F46E5' },
    ],
    objectives: [
      'Understand how revenue growth rates influence valuation multiples',
      'Compare profitability metrics across different business models',
      'Analyze market expectations priced into stock valuations',
      'Build a comparative investment thesis',
    ],
  },
  'apple-vs-microsoft-roe': {
    title: 'Apple vs Microsoft: Analyzing Return on Equity Quality',
    difficulty: 'Intermediate',
    readTime: 10,
    companies: [
      { ticker: 'AAPL', name: 'Apple Inc.', color: '#4F46E5' },
      { ticker: 'MSFT', name: 'Microsoft Corporation', color: '#10B981' },
    ],
    objectives: [
      'Understand return on equity and its components',
      'Analyze how leverage affects ROE',
      'Compare capital allocation strategies',
      'Evaluate earnings quality across tech companies',
    ],
  },
  'amazon-cash-flow-paradox': {
    title: "Amazon's Cash Flow Paradox: Growth, Capex, and Free Cash Flow",
    difficulty: 'Intermediate',
    readTime: 15,
    companies: [
      { ticker: 'AMZN', name: 'Amazon.com Inc.', color: '#FF9900' },
    ],
    objectives: [
      'Understand the difference between accounting earnings and cash flow',
      'Analyze capital expenditure strategies',
      'Evaluate free cash flow quality',
      'Assess long-term business sustainability',
    ],
  },
  'tesla-growth-sustainability': {
    title: 'Tesla: Testing the Sustainability of High-Growth Valuations',
    difficulty: 'Advanced',
    readTime: 18,
    companies: [
      { ticker: 'TSLA', name: 'Tesla Inc.', color: '#E82127' },
    ],
    objectives: [
      'Analyze high-growth company valuation frameworks',
      'Understand growth rate normalization scenarios',
      'Evaluate competitive dynamics in emerging markets',
      'Build sensitivity analyses for valuation assumptions',
    ],
  },
}

export default function CaseStudyDetailPage() {
  const { caseStudyId } = useParams()
  const navigate = useNavigate()

  const caseStudy = caseStudyData[caseStudyId]

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/learn')}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
          >
            Back to Learn Hub
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <div className="flex-1">
        <main className="pt-24 sm:pt-28 p-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/learn')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-semibold"
            >
              <ArrowLeft size={20} />
              Back to Learn Hub
            </motion.button>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex gap-3 mb-4 flex-wrap">
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    background: `${caseStudy.companies[0].color}20`,
                    color: caseStudy.companies[0].color,
                  }}
                >
                  {caseStudy.difficulty}
                </span>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"
                  style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)' }}
                >
                  <Clock size={14} />
                  {caseStudy.readTime} min read
                </span>
              </div>

              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {caseStudy.title}
              </h1>

              <div className="flex gap-3 mb-6">
                {caseStudy.companies.map((company, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ background: company.color }}
                  >
                    {company.ticker} — {company.name}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-6 mb-8 border border-border"
              style={{ background: 'var(--surface)' }}
            >
              <h2 className="text-xl font-bold text-text-primary mb-4">Learning Objectives</h2>
              <ul className="space-y-3">
                {caseStudy.objectives.map((objective, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span className="text-text-secondary">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Coming Soon Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-8 border-2 border-primary/30 text-center"
              style={{ background: 'var(--surface)' }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                  <AlertCircle size={24} className="text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Full Case Study Content Coming Soon
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                This case study is currently in development. We're preparing comprehensive analysis, 
                real financial data, worked examples, and interactive exercises to help you master 
                comparative company analysis.
              </p>
              <button
                onClick={() => navigate('/learn')}
                className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
              >
                Explore Other Content
              </button>
            </motion.div>

            {/* Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-6 mt-8 border border-border"
              style={{ background: 'var(--surface-elevated)' }}
            >
              <p className="text-sm text-text-muted">
                <strong className="text-text-primary">Tip:</strong> In the meantime, explore our concept library 
                and interactive tools to build foundational knowledge in valuation, profitability analysis, and 
                financial statement interpretation.
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}