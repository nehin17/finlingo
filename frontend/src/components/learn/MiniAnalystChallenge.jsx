import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Lightbulb, X } from 'lucide-react'

export default function MiniAnalystChallenge() {
  const [showAnswer, setShowAnswer] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')

  const data = [
    { metric: 'Revenue Growth',       companyA: '18%',  companyB: '7%'  },
    { metric: 'Gross Margin',         companyA: '62%',  companyB: '41%' },
    { metric: 'Free Cash Flow Margin',companyA: '22%',  companyB: '14%' },
    { metric: 'Debt-to-Equity',       companyA: '0.3x', companyB: '1.2x'},
  ]

  const expertAnalysis =
    'Company A demonstrates stronger long-term economics. While Company B has shown respectable growth, Company A superior margins (62% gross, 22% FCF) indicate better pricing power and operational efficiency.'

  const handleCompare = () => {
    if (userAnswer.trim()) setShowComparison(true)
  }

  const handleTryAgain = () => {
    setShowComparison(false)
    setUserAnswer('')
  }

  return (
    <div className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Lightbulb size={20} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Mini Analyst Challenge</h2>
        </div>
        <p className="text-base text-text-muted">
          Test your analysis skills with a real-world comparative evaluation exercise.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-8 border border-border"
        style={{ background: 'var(--surface)' }}
      >
        <div className="mb-8">
          <h3 className="text-lg font-bold text-text-primary mb-4">
            Which company has the stronger long-term economics?
          </h3>
          <p className="text-base text-text-secondary mb-6 leading-relaxed">
            Analyze the financial metrics below and explain your reasoning in 2–3 sentences.
            Consider growth trajectory, operational efficiency, and financial flexibility.
          </p>
        </div>

        <div className="mb-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--surface-elevated)' }}>
                <th className="text-left py-4 px-6 font-semibold text-text-primary">Metric</th>
                <th className="text-center py-4 px-6 font-semibold text-text-primary">Company A</th>
                <th className="text-center py-4 px-6 font-semibold text-text-primary">Company B</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-border hover:bg-surface-elevated/20 transition-colors"
                >
                  <td className="py-4 px-6 text-text-primary font-semibold">{row.metric}</td>
                  <td className="text-center py-4 px-6 text-lg font-bold text-primary">
                    {row.companyA}
                  </td>
                  <td className="text-center py-4 px-6 text-lg font-bold text-text-secondary">
                    {row.companyB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-8">
          <label className="text-base font-semibold text-text-primary block mb-3">
            Your Analysis
          </label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your 2–3 sentence analysis here..."
            className="w-full h-24 p-4 rounded-lg border border-border outline-none
                       focus:border-primary transition-colors resize-none"
            style={{ background: 'var(--surface-elevated)', color: 'var(--text-primary)' }}
          />
          <p className="text-xs text-text-muted mt-2">{userAnswer.length} characters</p>
        </div>

        <div className="flex gap-3 flex-wrap mb-8">
          <button
            onClick={handleCompare}
            disabled={!userAnswer.trim()}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold
                       hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed
                       transition-all text-base"
          >
            Compare My Answer
          </button>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold
                       hover:bg-primary/10 transition-all text-base flex items-center gap-2"
          >
            {showAnswer ? 'Hide' : 'Reveal'} Analyst Explanation
            <ChevronDown
              size={18}
              className={`transition-transform ${showAnswer ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-6 rounded-lg border border-primary/30"
            style={{ background: 'var(--surface-elevated)' }}
          >
            <h4 className="text-base font-bold text-text-primary mb-3">Analyst Explanation</h4>
            <p className="text-base text-text-secondary leading-relaxed">{expertAnalysis}</p>
            <p className="text-xs text-text-muted mt-4 pt-4 border-t border-border/50">
              This type of analysis forms the basis of comparative company research in equity investing.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* ✅ Modal with relative on inner div */}
      {showComparison && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowComparison(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl p-8 max-w-3xl w-full max-h-[90vh]
                       overflow-y-auto border border-border"
            style={{ background: 'var(--surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✅ absolute works because parent has relative */}
            <button
              onClick={() => setShowComparison(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-lg border border-border
                         hover:bg-surface-elevated flex items-center justify-center
                         text-text-muted hover:text-text-primary transition-all"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-text-primary mb-8">Answer Comparison</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                className="rounded-lg border border-border p-6"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                    You
                  </div>
                  <h4 className="text-lg font-bold text-text-primary">Your Analysis</h4>
                </div>
                <p className="text-base text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {userAnswer}
                </p>
                <p className="text-xs text-text-muted mt-4 pt-4 border-t border-border/50">
                  {userAnswer.split(' ').length} words
                </p>
              </div>

              <div
                className="rounded-lg border border-primary/30 p-6"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-text-primary">Expert Analysis</h4>
                </div>
                <p className="text-base text-text-secondary leading-relaxed">{expertAnalysis}</p>
                <p className="text-xs text-text-muted mt-4 pt-4 border-t border-border/50">
                  {expertAnalysis.split(' ').length} words
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-lg border-l-4"
              style={{ background: 'var(--surface-elevated)', borderColor: 'var(--primary)' }}
            >
              <p className="text-sm text-text-muted font-semibold mb-2 uppercase">Key Takeaways</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>Look for quantitative evidence in financial metrics to support your thesis</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>Consider both growth AND profitability when evaluating company quality</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>Balance sheet strength determines financial flexibility and downside protection</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3 mt-8 flex-wrap">
              <button
                onClick={() => setShowComparison(false)}
                className="flex-1 px-6 py-3 rounded-lg bg-primary text-white font-semibold
                           hover:bg-primary/90 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleTryAgain}
                className="flex-1 px-6 py-3 rounded-lg border border-primary text-primary
                           font-semibold hover:bg-primary/10 transition-all"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}