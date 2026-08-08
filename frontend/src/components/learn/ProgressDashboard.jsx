import { motion } from 'framer-motion'
import { BookMarked, Flame, Zap, Clock } from 'lucide-react'

const stats = [
  {
    label: 'Lessons Completed',
    value: '8',
    total: '64',
    icon: BookMarked,
    color: '#3B82F6',
  },
  {
    label: 'Learning Streak',
    value: '3',
    unit: 'days',
    icon: Flame,
    color: '#EF4444',
  },
  {
    label: 'Current Level',
    value: 'Intermediate',
    icon: Zap,
    color: '#F59E0B',
  },
  {
    label: 'Time Remaining',
    value: '5h',
    unit: '20m',
    icon: Clock,
    color: '#10B981',
  },
]

export default function ProgressDashboard() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
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
              
              <p className="text-sm text-text-muted mb-2 font-semibold">{stat.label}</p>
              
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                {stat.total && <p className="text-sm text-text-muted">/ {stat.total}</p>}
                {stat.unit && <p className="text-sm text-text-muted">{stat.unit}</p>}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}