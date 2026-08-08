import { motion } from 'framer-motion'
import { ChevronRight, BookOpen } from 'lucide-react'

export default function LearningPathCard({ path }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-6 border border-border hover:border-border/80 transition-all cursor-pointer group"
      style={{ background: 'var(--surface)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
            {path.name}
          </h3>
          <div className="flex gap-3 flex-wrap">
            {/* Level Badge */}
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{
                background: `${path.color}20`,
                color: path.color,
              }}
            >
              {path.level}
            </span>
            {/* Lessons Badge */}
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)' }}
            >
              {path.lessons} lessons
            </span>
            {/* Time Badge */}
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)' }}
            >
              {path.time}
            </span>
          </div>
        </div>
        <ChevronRight size={20} className="text-text-muted group-hover:text-primary transition-colors" />
      </div>

      {/* Topics Preview */}
      <div className="mb-4 space-y-2">
        {path.topics.slice(0, 3).map((topic, i) => (
          <p key={i} className="text-sm text-text-muted flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ background: path.color }}></span>
            {topic}
          </p>
        ))}
        {path.topics.length > 3 && (
          <p className="text-sm text-text-muted font-semibold">+ {path.topics.length - 3} more</p>
        )}
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-text-muted font-semibold">Progress</p>
          <p className="text-xs font-bold text-text-primary">{path.progress}%</p>
        </div>
        <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${path.progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full"
            style={{ background: path.color }}
          />
        </div>
      </div>
    </motion.div>
  )
}