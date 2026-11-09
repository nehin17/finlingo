// src/components/learn/LearningPathCard.jsx
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function LearningPathCard({ path, pathProgress }) {
  // Only render progress when a real number was supplied
  const hasProgress = typeof pathProgress === 'number' &&
  Number.isFinite(pathProgress) &&
  pathProgress >= 0 &&
  pathProgress <= 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-6 border border-border hover:border-border/80
                 transition-all cursor-pointer group flex flex-col"
      style={{ background: 'var(--surface)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
            {path.name}
          </h3>
          <div className="flex gap-3 flex-wrap">
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: `${path.color}20`, color: path.color }}
            >
              {path.level}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)' }}
            >
              {path.lessons} lessons
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: 'var(--surface-elevated)', color: 'var(--text-muted)' }}
            >
              {path.time}
            </span>
          </div>
        </div>
        <ChevronRight
          size={20}
          className="text-text-muted group-hover:text-primary transition-colors flex-shrink-0"
        />
      </div>

      {/* Topics preview — public */}
      <div className="mb-4 space-y-2 flex-1">
        {(Array.isArray(path?.topics) ? path.topics : [])
          .slice(0, 3)
          .map((topic, i) =>(
          <p key={i} className="text-sm text-text-muted flex items-center gap-2">
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: path.color }}
            />
            {topic}
          </p>
        ))}
        {Array.isArray(path?.topics) && path.topics.length > 3 && (
          <p className="text-sm text-text-muted font-semibold">
            + {path.topics.length - 3} more
          </p>
        )}
      </div>

      {/* Footer */}
      {hasProgress ? (
        /* ── AUTHENTICATED: personal completion ── */
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-text-muted font-semibold">Progress</p>
            <p className="text-xs font-bold text-text-primary">{pathProgress}%</p>
          </div>
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--surface-elevated)' }}
            role="progressbar"
            aria-valuenow={pathProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${path.name} progress`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pathProgress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full"
              style={{ background: path.color }}
            />
          </div>
        </div>
      ) : (
        /* ── LOGGED OUT: public curriculum metadata ── */
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <p className="text-xs text-text-muted font-semibold">
            {Array.isArray(path?.topics) ? path.topics.length : 0} topics covered
          </p>
          <p className="text-xs font-semibold text-primary group-hover:underline">
            View curriculum
          </p>
        </div>
      )}
    </motion.div>
  )
}