import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Mail, Lock, Eye, EyeOff, ArrowLeft,
  BarChart2, Sparkles, Shield, TrendingUp
} from 'lucide-react'
import Button from '../shared/Button.jsx'

const benefits = [
  { icon: Sparkles, text: 'AI-powered stock research' },
  { icon: TrendingUp, text: 'Personalized market digest' },
  { icon: Shield, text: 'SEC-grounded answers' },
]

export default function SignInModal({ onClose, onSuccess, onSwitchToSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onSuccess({ name: 'Alex', email })
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!forgotEmail) {
      setError('Please enter your email address')
      return
    }
    setForgotLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setForgotLoading(false)
    setForgotSent(true)
  }

  const resetForgotPassword = () => {
    setShowForgotPassword(false)
    setForgotEmail('')
    setForgotSent(false)
    setError('')
  }

  // FORGOT PASSWORD MODAL
  if (showForgotPassword) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={e => e.target === e.currentTarget && resetForgotPassword()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-2xl border overflow-hidden p-8"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            {!forgotSent ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Reset password
                  </h2>
                  <button
                    onClick={resetForgotPassword}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      color: 'var(--text-muted)',
                      background: 'var(--surface-elevated)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                {/* Form */}
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Email Address
                    </label>
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors focus-within:border-primary"
                      style={{
                        background: 'var(--surface-elevated)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <Mail size={16} style={{ color: 'var(--text-muted)' }} />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value)
                          setError('')
                        }}
                        placeholder="you@example.com"
                        className="flex-1 bg-transparent text-sm outline-none"
                        style={{ color: 'var(--text-primary)' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm px-4 py-3 rounded-lg"
                      style={{
                        color: '#EF4444',
                        background: 'rgba(239, 68, 68, 0.08)',
                        borderLeft: '3px solid #EF4444',
                      }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button type="submit" disabled={forgotLoading} className="w-full">
                    {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>

                {/* Back Button */}
                <button
                  onClick={resetForgotPassword}
                  className="w-full flex items-center justify-center gap-2 mt-4 text-sm font-medium transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  <ArrowLeft size={16} />
                  Back to Sign In
                </button>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '2px solid rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    <Mail size={28} style={{ color: '#10B981' }} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    Check your email
                  </h3>

                  {/* Message */}
                  <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    We've sent a password reset link to{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>{forgotEmail}</strong>
                  </p>

                  {/* Additional Info */}
                  <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                    The link will expire in 24 hours. If you don't see it, check your spam folder.
                  </p>

                  {/* Back Button */}
                  <Button onClick={resetForgotPassword} className="w-full">
                    Back to Sign In
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // SIGN IN MODAL
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl rounded-2xl border overflow-hidden flex max-h-[90vh]"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Left Panel - Brand & Benefits */}
          <div
            className="hidden md:flex flex-col justify-between p-8 w-[45%] shrink-0"
            style={{
              background: 'var(--surface-elevated)',
              borderRight: '1px solid var(--border)',
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--primary)' }}
              >
                <BarChart2 size={16} className="text-white" />
              </div>
              <span className="font-bold text-text-primary">FinLingo</span>
            </div>

            {/* Value Prop */}
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Research like a pro
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                AI-powered financial intelligence grounded in real market data and SEC filings.
              </p>
              <ul className="space-y-4">
                {benefits.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--primary)', opacity: 0.15 }}>
                      <Icon size={14} style={{ color: 'var(--primary)' }} />
                    </div>
                    <span className="text-sm text-text-secondary">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Text */}
            <p className="text-xs text-text-muted">
              Join thousands of investors researching smarter.
            </p>
          </div>

          {/* Right Panel - Sign In Form */}
          <div className="flex-1 p-8 overflow-y-auto" style={{ background: 'var(--surface)' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-text-primary">Welcome back</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--surface-elevated)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Email Address
                </label>
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors focus-within:border-primary"
                  style={{
                    background: 'var(--surface-elevated)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Mail size={16} className="text-text-muted shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="you@example.com"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Password
                </label>
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors focus-within:border-primary"
                  style={{
                    background: 'var(--surface-elevated)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Lock size={16} className="text-text-muted shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="Enter your password"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--text-primary)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm px-4 py-3 rounded-lg"
                  style={{
                    color: '#EF4444',
                    background: 'rgba(239, 68, 68, 0.08)',
                    borderLeft: '3px solid #EF4444',
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: 'var(--primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-xs text-text-muted">or continue with</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            {/* Social Sign In */}
            <div className="space-y-3">
              {['Google', 'GitHub'].map(provider => (
                <button
                  key={provider}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all"
                  style={{
                    color: 'var(--text-secondary)',
                    background: 'var(--surface-elevated)',
                    borderColor: 'var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'var(--text-muted)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  Continue with {provider}
                </button>
              ))}
            </div>

            {/* Sign Up CTA */}
            <p className="text-center text-sm text-text-muted mt-6">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="font-semibold transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                Create one free
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}