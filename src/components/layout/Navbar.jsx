// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart2, Search, Menu, X, ChevronDown,
  Sparkles, User, LogOut, Sun, Moon
} from 'lucide-react'

import SearchBar from '../shared/SearchBar.jsx'
import Button from '../shared/Button.jsx'

const navLinks = [
  { label: 'Research', href: '/dashboard' },
  { label: 'Battle Mode', href: '/battle' },
  { label: 'Learn', href: '/learn' },
  { label: 'Markets', href: '/dashboard' },
]

export default function Navbar({
  isAuthenticated,
  user,
  onSignInClick,
  onSignUpClick,
  onSignOut,
  onChatToggle,
  theme = 'light',
  onThemeToggle,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const headerBg = theme === 'dark'
    ? (scrolled ? 'rgba(11, 18, 32, 0.92)' : 'rgba(11, 18, 32, 0.78)')
    : (scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.78)')

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: headerBg,
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? '0 4px 24px rgba(15, 23, 42, 0.08)' : 'none',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 h-20 sm:h-24 flex items-center justify-between gap-6">

          {/* LOGO — bigger icon, single line title, no subtitle */}
          <Link to="/" className="flex items-center gap-3.5 shrink-0">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
              }}
            >
              <BarChart2 size={24} className="text-white" />
            </div>

            <span
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: 'var(--text)' }}
            >
              PulseBoard
            </span>
          </Link>

          {/* DESKTOP NAV — much bigger text and padding */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navLinks.map(link => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-5 py-3 rounded-xl text-lg font-semibold transition-all duration-200 whitespace-nowrap"
                  style={{
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    background: isActive ? 'rgba(37, 99, 235, 0.10)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT SIDE — bigger buttons, better gaps */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(prev => !prev)}
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
                    className="absolute right-0 top-full mt-3 w-96"
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

            {/* AI Chat */}
            <button
              onClick={onChatToggle}
              className="flex items-center gap-2.5 px-5 h-12 rounded-xl text-base font-semibold transition-all border"
              style={{
                color: 'var(--text-muted)',
                background: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <Sparkles size={20} />
              AI
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(prev => !prev)}
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

                  <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-56 rounded-2xl border py-2"
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
                    background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                  }}
                >
                  Create Account
                </button>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden w-12 h-12 rounded-xl border flex items-center justify-center transition-colors shrink-0"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-muted)',
            }}
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU — bigger text, better spacing */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t overflow-hidden"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="px-5 sm:px-8 py-6 space-y-3">

                <div className="mb-5">
                  <SearchBar className="w-full" />
                </div>

                {navLinks.map(link => {
                  const isActive = location.pathname === link.href
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="flex items-center px-5 py-4 rounded-xl transition-colors text-lg font-semibold"
                      style={{
                        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                        background: isActive ? 'rgba(37, 99, 235, 0.10)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                <button
                  onClick={onChatToggle}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-lg font-semibold border transition-all"
                  style={{
                    color: 'var(--text-muted)',
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Sparkles size={20} />
                  Ask AI
                </button>

                <button
                  onClick={onThemeToggle}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-lg font-semibold border transition-all"
                  style={{
                    color: 'var(--text-muted)',
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>

                <div className="pt-3 flex flex-col gap-3">
                  {isAuthenticated ? (
                    <button
                      onClick={onSignOut}
                      className="w-full py-4 rounded-xl text-lg font-semibold border transition-all"
                      style={{
                        color: 'var(--text-muted)',
                        background: 'var(--surface)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={onSignInClick}
                        className="w-full py-4 rounded-xl text-lg font-semibold border transition-all"
                        style={{
                          color: 'var(--text-muted)',
                          background: 'var(--surface)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        Sign In
                      </button>

                      <button
                        onClick={onSignUpClick}
                        className="w-full py-4 rounded-xl text-lg font-semibold text-white transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                        }}
                      >
                        Create Account
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}