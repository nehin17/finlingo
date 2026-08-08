// src/components/layout/Sidebar.jsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home, Search, BarChart2, BookOpen,
  Star, ChevronRight, BarChart
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Research', href: '/dashboard' },
  { icon: BarChart2, label: 'Battle', href: '/battle' },
  { icon: BookOpen, label: 'Learn', href: '/learn' },
  { icon: Star, label: 'Watchlist', href: '/watchlist' },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()

  return (
    <motion.aside
      animate={{ width: expanded ? 240 : 80 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed left-0 top-[72px] bottom-0 z-40 flex flex-col py-6 overflow-hidden"
      style={{
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="px-2 flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = location.pathname === href

          return (
            <Link
              key={href}
              to={href}
              className="relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group"
              style={{
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                background: isActive
                  ? 'rgba(37, 99, 235, 0.08)'
                  : 'transparent',
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                  style={{ background: 'var(--primary)' }}
                />
              )}

              {/* Icon */}
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Icon size={18} />
              </div>

              {/* Label */}
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-between flex-1 min-w-0"
                >
                  <span className="text-sm font-medium whitespace-nowrap">
                    {label}
                  </span>

                  <ChevronRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--text-muted)' }}
                  />
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>

      {/* Bottom section */}
      <div className="mt-auto px-2">
        <div
          className="rounded-xl p-3 border"
          style={{
            background: 'var(--surface-2)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(37, 99, 235, 0.12)' }}
            >
              <BarChart size={16} style={{ color: 'var(--primary)' }} />
            </div>

            {expanded && (
              <div className="min-w-0">
                <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                  Market Pulse
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  Live AI insights
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}