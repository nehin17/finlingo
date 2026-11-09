// src/components/learn/ProgressDashboard.jsx
import { motion } from 'framer-motion'
import { BookMarked, Flame, Zap, Clock } from 'lucide-react'

import AccountGateCard from './AccountGateCard'

/**
 * Stats are DERIVED from the progress object — never hardcoded.
 * If progress is null this function is never called.
 */
function buildStats(progress) {
  return [
    {
      label: 'Lessons Completed',
      value: String(progress.lessonsCompleted),
      total: String(progress.totalLessons),
      icon: BookMarked,
      color: '#3B82F6',
    },
    {
      label: 'Learning Streak',
      value: String(progress.streakDays),
      unit: progress.streakDays === 1 ? 'day' : 'days',
      icon: Flame,
      color: '#EF4444',
    },
    {
      label: 'Current Level',
      value: progress.currentLevel,
      icon: Zap,
      color: '#F59E0B',
    },
    {
      label: 'Time Remaining',
      value: `${progress.timeRemainingHours}h`,
      unit: `${progress.timeRemainingMinutes}m`,
      icon: Clock,
      color: '#10B981',
    },
  ]
}

export default function ProgressDashboard({
  progress,          // null when logged out
  onSignInClick,
  onSignUpClick,
}) {
  /* ── LOGGED OUT ─────────────────────────────────────────── */
  if (!progress) {
    return (
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Track Your Personal Progress
        </h2>

        <AccountGateCard
          variant="section"
          title="Your learning progress is saved to your FinLingo account"
          description="Sign in or create an account to track completed lessons, learning streaks, skill level, and remaining curriculum across every learning path."
          onSignInClick={onSignInClick}
          onSignUpClick={onSignUpClick}
        />
      </div>
    )
  }

  /* ── AUTHENTICATED ──────────────────────────────────────── */
  const stats = buildStats(progress)

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Your Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-6 border border-border"
              style={{ background: 'var(--surface)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
              </div>

              <p className="text-sm text-text-muted mb-2 font-semibold">
                {stat.label}
              </p>

              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                {stat.total && (
                  <p className="text-sm text-text-muted">/ {stat.total}</p>
                )}
                {stat.unit && (
                  <p className="text-sm text-text-muted">{stat.unit}</p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}