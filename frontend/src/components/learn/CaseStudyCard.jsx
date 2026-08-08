import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CaseStudyCard({ caseStudy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-shrink-0 w-[340px] rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
      style={{ background: 'var(--surface)' }}
    >
      {/* Companies */}
      <div className="flex gap-2 mb-4">
        {caseStudy.companies.map((company, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: company.color }}
          >
            {company.ticker}
          </div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
        {caseStudy.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        {caseStudy.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex gap-3">
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{
              background: `${caseStudy.color}20`,
              color: caseStudy.color,
            }}
          >
            {caseStudy.difficulty}
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)' }}
          >
            {caseStudy.readTime} min
          </span>
        </div>
        <ArrowRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
      </div>
    </motion.div>
  )
}