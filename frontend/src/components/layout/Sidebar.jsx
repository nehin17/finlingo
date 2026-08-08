import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home, Search, BookOpen,
  ChevronRight, BarChart, ChevronLeft, Swords,
  TrendingUp
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: TrendingUp, label: 'Markets', href: '/markets' },
  { icon: Search, label: 'Research', href: '/dashboard' },
  { icon: Swords, label: 'Battle Mode', href: '/battle' },
  { icon: BookOpen, label: 'Learn', href: '/learn' },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      
      <motion.aside
        animate={{ width: expanded ? 240 : 80 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="hidden lg:flex lg:sticky lg:top-24 self-start flex-col py-6 px-2 overflow-y-auto flex-shrink-0 h-[calc(100vh-6rem)] border-r"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
        >  

        <div className="flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = location.pathname === href

            return (
              <Link
                key={href}
                to={href}
                className="relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group flex-shrink-0"
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
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} />
                </div>

                {/* Label */}
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm font-medium whitespace-nowrap flex-shrink-0"
                  >
                    {label}
                  </motion.span>
                )}

                {/* Hover chevron */}
                {expanded && (
                  <ChevronRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0"
                    style={{ color: 'var(--text-muted)' }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-auto flex-shrink-0">
          <div
            className="rounded-xl p-3 border"
            style={{
              background: 'var(--surface-2)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37, 99, 235, 0.12)' }}
              >
                <BarChart size={16} style={{ color: 'var(--primary)' }} />
              </div>

              {expanded && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="min-w-0"
                >
                  <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                    Market Pulse
                  </p>
                  <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                    Live AI insights
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* MOBILE SIDEBAR */}
      <motion.aside
        initial={{ x: -80 }}
        animate={{ x: expanded ? 0 : -80 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden fixed left-0 top-20 sm:top-24 bottom-0 w-64 z-40 flex flex-col py-6 px-2 overflow-y-auto"
        style={{
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setExpanded(false)}
          className="lg:hidden self-end mb-4 p-2 rounded-lg border"
          style={{
            background: 'var(--surface-elevated)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = location.pathname === href

            return (
              <Link
                key={href}
                to={href}
                onClick={() => setExpanded(false)}
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
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} />
                </div>

                {/* Label */}
                <span className="text-sm font-medium flex-shrink-0">
                  {label}
                </span>

                {/* Chevron */}
                <ChevronRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0"
                  style={{ color: 'var(--text-muted)' }}
                />
              </Link>
            )
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-auto flex-shrink-0">
          <div
            className="rounded-xl p-3 border"
            style={{
              background: 'var(--surface-2)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37, 99, 235, 0.12)' }}
              >
                <BarChart size={16} style={{ color: 'var(--primary)' }} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                  Market Pulse
                </p>
                <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                  Live AI insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpanded(false)}
          className="lg:hidden fixed inset-0 bg-black/50 top-20 sm:top-24 z-30"
        />
      )}
    </>
  )
}