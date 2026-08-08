//src/components/layout/Navbar.jsx


import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart2,
  Search,
  Menu,
  ChevronDown,
  Flame,
  User,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react'

import SearchBar from '../shared/SearchBar.jsx'

const navLinks = [
  { label: 'Markets', href: '/markets' },
  { label: 'Research', href: '/dashboard' },
  { label: 'Battle Mode', href: '/battle' },
  { label: 'Learn', href: '/learn' },
]

/* ────────────────────────────────────────────────────────────────
   STREAK BUTTON
──────────────────────────────────────────────────────────────── */

function StreakButton({
  isAuthenticated,
  streak,
  onSignInClick,
  onSignUpClick,
  compact = false,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const encouragement =
    streak.currentStreak >= 30
      ? 'Elite consistency'
      : streak.currentStreak >= 10
      ? "You're on fire"
      : streak.currentStreak >= 5
      ? "You're on a great run"
      : 'Keep it going'

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={
          isAuthenticated
            ? `${streak.currentStreak} day streak — view details`
            : 'Streak — sign in to start tracking'
        }
        className={`flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 ${
          compact ? 'w-10 h-10' : isAuthenticated ? 'px-2 h-10' : 'w-10 h-10'
        }`}
        style={{
          background: 'transparent',
          border: 'none',
        }}
      >
        {/* Circular streak ring */}

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'rgba(249, 115, 22, 0.10)',
            border: '1.5px solid rgba(249, 115, 22, 0.28)',
            boxShadow: open
              ? '0 0 0 4px rgba(249, 115, 22, 0.10), 0 6px 16px rgba(249, 115, 22, 0.18)'
              : '0 4px 12px rgba(249, 115, 22, 0.12)',
          }}
        >
          <Flame size={20} style={{ color: '#FB923C' }} />
        </div>

        {/* Streak number */}

        {!compact && isAuthenticated && (
          <span
            className="text-sm font-bold whitespace-nowrap"
            style={{ color: '#FB923C' }}
          >
            {streak.currentStreak}
          </span>
        )}
      </button>

      {/* Popover */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute right-0 top-full mt-3 rounded-2xl border p-5 z-[60] ${
              isAuthenticated ? 'w-72' : 'w-80'
            }`}
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            }}
          >
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(249, 115, 22, 0.12)' }}
                  >
                    <Flame size={20} style={{ color: '#FB923C' }} />
                  </div>

                  <div>
                    <p
                      className="text-base font-bold leading-snug"
                      style={{ color: 'var(--text)' }}
                    >
                      {streak.currentStreak}-day streak
                    </p>

                    <p
                      className="text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {encouragement}
                    </p>
                  </div>
                </div>

                <div
                  className="space-y-2.5 pt-4"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>
                      Today's lesson
                    </span>

                    <span
                      className="font-semibold"
                      style={{
                        color: streak.todayCompleted
                          ? '#16A34A'
                          : 'var(--text-muted)',
                      }}
                    >
                      {streak.todayCompleted ? '✓ Done' : 'Pending'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>
                      Last active
                    </span>

                    <span
                      className="font-semibold"
                      style={{ color: 'var(--text)' }}
                    >
                      {streak.lastActiveDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>
                      Best streak
                    </span>

                    <span
                      className="font-semibold"
                      style={{ color: 'var(--text)' }}
                    >
                      {streak.bestStreak} days
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(249, 115, 22, 0.12)' }}
                  >
                    <Flame size={20} style={{ color: '#FB923C' }} />
                  </div>

                  <div>
                    <p
                      className="text-base font-bold mb-1 leading-snug"
                      style={{ color: 'var(--text)' }}
                    >
                      Keep your learning streak alive
                    </p>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Track daily finance lessons, market research sessions,
                      and investing concepts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-5">
                  <button
                    onClick={() => {
                      setOpen(false)
                      onSignInClick?.()
                    }}
                    className="flex-1 h-11 rounded-xl border text-sm font-semibold transition-colors"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                      background: 'transparent',
                    }}
                  >
                    Sign in
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false)
                      onSignUpClick?.()
                    }}
                    className="flex-1 h-11 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{
                      background:
                        'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                    }}
                  >
                    Create account
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   NAVBAR
──────────────────────────────────────────────────────────────── */

export default function Navbar({
  isAuthenticated,
  user,
  onSignInClick,
  onSignUpClick,
  onSignOut,
  theme = 'light',
  onThemeToggle,
  onSidebarToggle,
  streak = {
    currentStreak: 7,
    bestStreak: 12,
    lastActiveDate: 'Today',
    todayCompleted: true,
  },
}) {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerBg =
    theme === 'dark'
      ? scrolled
        ? 'rgba(11, 18, 32, 0.92)'
        : 'rgba(11, 18, 32, 0.78)'
      : scrolled
      ? 'rgba(255, 255, 255, 0.92)'
      : 'rgba(255, 255, 255, 0.78)'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 sm:h-24"
      style={{
        background: headerBg,
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(15, 23, 42, 0.08)'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3.5 shrink-0">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
              }}
            >
              <BarChart2 size={24} className="text-white" />
            </div>

            <span
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: 'var(--text)' }}
            >
              FinLingo
            </span>
          </Link>

          {/* Desktop Nav */}

          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-5 py-3 rounded-xl text-lg font-semibold transition-all duration-200 whitespace-nowrap"
                  style={{
                    color: isActive
                      ? 'var(--primary)'
                      : 'var(--text-muted)',
                    background: isActive
                      ? 'rgba(37, 99, 235, 0.10)'
                      : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Side */}

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Search */}

            <div className="relative">
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-96 z-[60]"
                  >
                    <SearchBar className="w-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}

            <button
              onClick={onThemeToggle}
              className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>

            {/* Streak */}

            <StreakButton
              isAuthenticated={isAuthenticated}
              streak={streak}
              onSignInClick={onSignInClick}
              onSignUpClick={onSignUpClick}
            />

            {/* User Menu */}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-3 px-4 h-12 rounded-xl border transition-colors"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(37, 99, 235, 0.12)' }}
                  >
                    <User size={18} style={{ color: 'var(--primary)' }} />
                  </div>

                  <span
                    className="text-base font-semibold"
                    style={{ color: 'var(--text)' }}
                  >
                    {user?.name || 'Alex'}
                  </span>

                  <ChevronDown
                    size={18}
                    style={{ color: 'var(--text-muted)' }}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-56 rounded-2xl border py-2 z-[60]"
                      style={{
                        background: 'var(--surface)',
                        borderColor: 'var(--border)',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    >
                      <button
                        onClick={() => {
                          onSignOut()
                          setUserMenuOpen(false)
                        }}
                        className="flex items-center gap-3 w-full px-5 py-3.5 text-base font-semibold transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <LogOut size={18} />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={onSignInClick}
                  className="text-base font-semibold transition-colors px-5 h-12 rounded-xl whitespace-nowrap"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Sign In
                </button>

                <button
                  onClick={onSignUpClick}
                  className="px-6 h-12 rounded-xl text-base font-semibold text-white whitespace-nowrap transition-all"
                  style={{
                    background:
                      'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                  }}
                >
                  Create Account
                </button>
              </>
            )}
          </div>

          {/* Mobile Right Side */}

          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <StreakButton
              compact
              isAuthenticated={isAuthenticated}
              streak={streak}
              onSignInClick={onSignInClick}
              onSignUpClick={onSignUpClick}
            />

            <button
              className="w-12 h-12 rounded-xl border flex items-center justify-center transition-colors"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-muted)',
              }}
              onClick={onSidebarToggle}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

