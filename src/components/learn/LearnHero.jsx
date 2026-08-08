import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function LearnHero() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-8 md:p-12 mb-16 border border-border"
      style={{ background: 'var(--surface)' }}
    >
      {/* Content */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <BookOpen size={24} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary">Learn Hub</h1>
        </div>

        <p className="text-xl text-text-secondary leading-relaxed mb-3">
          Master financial analysis like an equity research analyst. Learn valuation, profitability, 
          cash flow analysis, financial statement interpretation, and investment research through 
          structured lessons, real company examples, and interactive exercises.
        </p>

        {/* Career-Oriented Line */}
        <p className="text-base text-text-muted mb-8 italic">
          Used by aspiring equity researchers, finance students, and long-term investors to build practical financial analysis skills.
        </p>

        {/* Progress Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-xl" style={{ background: 'var(--surface-elevated)' }}>
          <div>
            <p className="text-sm text-text-muted mb-1 font-semibold">Progress</p>
            <p className="text-2xl font-bold text-primary">12%</p>
            <p className="text-xs text-text-muted">Complete</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1 font-semibold">Streak</p>
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-xs text-text-muted">Days</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1 font-semibold">Level</p>
            <p className="text-2xl font-bold text-primary">Beginner</p>
            <p className="text-xs text-text-muted">→ Analyst</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap">
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all text-base"
          >
            Continue Learning
          </button>
          <button 
            onClick={() => navigate('#learning-paths')}
            className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-all text-base"
          >
            Explore the Research Curriculum
          </button>
        </div>
      </div>
    </motion.div>
  )
}