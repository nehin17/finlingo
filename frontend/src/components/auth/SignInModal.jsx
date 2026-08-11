
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Shield,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'

import Button from '../shared/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const benefits = [
  { icon: Sparkles, text: 'AI-powered stock research' },
  { icon: TrendingUp, text: 'Personalized market digest' },
  { icon: Shield, text: 'SEC-grounded answers' },
]

export default function SignInModal({
  onClose,
  onSuccess,
  onSwitchToSignUp,
}) {
  // ============================================================
  // AUTH CONTEXT
  // ============================================================
  // The component does NOT directly access LocalStorage.
  //
  // Current flow:
  // SignInModal → AuthContext → authService → LocalStorage
  //
  // BACKEND INTEGRATION:
  // authService.signin() will eventually call:
  // POST /api/auth/login
  //
  // This component should NOT need to change when that happens.
  // ============================================================

  const { signin } = useAuth()

  // ============================================================
  // SIGN IN STATE
  // ============================================================

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ============================================================
  // FORGOT PASSWORD STATE
  // ============================================================
  // TEMPORARY:
  // The actual password-reset email system does not exist yet.
  //
  // BACKEND INTEGRATION:
  // This will eventually call something like:
  // POST /api/auth/forgot-password
  // ============================================================

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  // ============================================================
  // VALIDATION
  // ============================================================

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  }

  // ============================================================
  // SIGN IN
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const normalizedEmail = email.trim()

    // Basic frontend validation.
    if (!normalizedEmail || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (!isValidEmail(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)

    try {
      // ========================================================
      // AUTHENTICATION
      // ========================================================
      // AuthContext handles updating the global user state.
      //
      // Current implementation:
      // AuthContext → authService → LocalStorage
      //
      // BACKEND INTEGRATION:
      // This same call will eventually reach:
      // POST /api/auth/login
      //
      // The component does NOT need to know how authentication
      // is implemented.
      // ========================================================

      const user = await signin(normalizedEmail, password)

      // Keep the existing callback so the parent component can
      // close the modal / navigate / perform any existing logic.
      if (onSuccess) {
        onSuccess(user)
      }
    } catch (err) {
      // authService currently throws useful authentication errors.
      setError(err?.message || 'Unable to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ============================================================
  // FORGOT PASSWORD
  // ============================================================

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    setError('')

    const normalizedEmail = forgotEmail.trim()

    if (!normalizedEmail) {
      setError('Please enter your email address.')
      return
    }

    if (!isValidEmail(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    setForgotLoading(true)

    try {
      // ========================================================
      // TEMPORARY DEVELOPMENT BEHAVIOR
      // ========================================================
      // There is currently no real password-reset backend.
      //
      // BACKEND INTEGRATION:
      // Replace this section with:
      //
      // await authService.forgotPassword(normalizedEmail)
      //
      // which will eventually call:
      // POST /api/auth/forgot-password
      //
      // The backend should send the actual reset email.
      // ========================================================

      await new Promise((resolve) => setTimeout(resolve, 800))

      setForgotSent(true)
    } catch (err) {
      setError(
        err?.message ||
          'Unable to process your request. Please try again.'
      )
    } finally {
      setForgotLoading(false)
    }
  }

  // ============================================================
  // RESET FORGOT PASSWORD UI
  // ============================================================

  const resetForgotPassword = () => {
    setShowForgotPassword(false)
    setForgotEmail('')
    setForgotSent(false)
    setError('')
    setForgotLoading(false)
  }

  // ============================================================
  // FORGOT PASSWORD MODAL
  // ============================================================

  if (showForgotPassword) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={(e) =>
            e.target === e.currentTarget && resetForgotPassword()
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-md rounded-2xl border overflow-hidden p-8"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            {!forgotSent ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
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
                      e.currentTarget.style.color =
                        'var(--text-primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'var(--text-muted)'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Description */}
                <p
                  className="text-sm mb-6"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Enter your email address and we'll send you a
                  password reset link.
                </p>

                {/* Form */}
                <form
                  onSubmit={handleForgotPassword}
                  className="space-y-4"
                >
                  {/* Email */}
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
                      <Mail
                        size={16}
                        style={{ color: 'var(--text-muted)' }}
                      />

                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value)
                          if (error) setError('')
                        }}
                        placeholder="you@example.com"
                        className="flex-1 bg-transparent text-sm outline-none"
                        style={{
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 text-sm px-4 py-3 rounded-lg"
                      style={{
                        color: '#EF4444',
                        background: 'rgba(239, 68, 68, 0.08)',
                        borderLeft: '3px solid #EF4444',
                      }}
                    >
                      <AlertCircle size={16} />
                      {error}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full"
                  >
                    {forgotLoading
                      ? 'Sending...'
                      : 'Send Reset Link'}
                  </Button>
                </form>

                {/* Back */}
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border:
                        '2px solid rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    <Mail
                      size={28}
                      style={{ color: '#10B981' }}
                    />
                  </motion.div>

                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Check your email
                  </h3>

                  <p
                    className="text-sm mb-6"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    We've prepared a password reset request for{' '}
                    <strong
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {forgotEmail}
                    </strong>
                  </p>

                  {/* IMPORTANT:
                      This is currently a frontend-only placeholder.
                      A real email will NOT be sent until the backend
                      password-reset endpoint is implemented. */}

                  <p
                    className="text-xs mb-6"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Password reset emails will be enabled when
                    the authentication backend is connected.
                  </p>

                  <Button
                    onClick={resetForgotPassword}
                    className="w-full"
                  >
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

  // ============================================================
  // MAIN SIGN IN MODAL
  // ============================================================

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={(e) =>
          e.target === e.currentTarget && onClose()
        }
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-4xl rounded-2xl border overflow-hidden flex max-h-[90vh]"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow:
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* ====================================================
              LEFT PANEL
          ==================================================== */}

          <div
            className="hidden md:flex flex-col justify-between p-8 w-[45%] shrink-0"
            style={{
              background: 'var(--surface-elevated)',
              borderRight: '1px solid var(--border)',
            }}
          >
            {/* Logo */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--primary)' }}
            >
              <span className="font-bold text-xs text-white">
                FL
              </span>
            </div>

            {/* Value Proposition */}
            <div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Research like a pro
              </h3>

              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: 'var(--text-muted)' }}
              >
                AI-powered financial intelligence grounded in
                real market data and SEC filings.
              </p>

              <ul className="space-y-4">
                {benefits.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: 'rgba(37, 99, 235, 0.12)',
                      }}
                    >
                      <Icon
                        size={14}
                        style={{ color: 'var(--primary)' }}
                      />
                    </div>

                    <span
                      className="text-sm"
                      style={{
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <p
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              Research smarter. Understand more.
            </p>
          </div>

          {/* ====================================================
              RIGHT PANEL
          ==================================================== */}

          <div
            className="flex-1 p-8 overflow-y-auto"
            style={{ background: 'var(--surface)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Welcome back
              </h2>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--surface-elevated)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    'var(--text-muted)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Sign In Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email */}
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
                    borderColor: error
                      ? '#EF4444'
                      : 'var(--border)',
                  }}
                >
                  <Mail
                    size={16}
                    style={{ color: 'var(--text-muted)' }}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="you@example.com"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Password
                </label>

                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors focus-within:border-primary"
                  style={{
                    background: 'var(--surface-elevated)',
                    borderColor: error
                      ? '#EF4444'
                      : 'var(--border)',
                  }}
                >
                  <Lock
                    size={16}
                    style={{ color: 'var(--text-muted)' }}
                  />

                  <input
                    type={
                      showPassword ? 'text' : 'password'
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="Enter your password"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{
                      color: 'var(--text-primary)',
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="transition-colors"
                    style={{
                      color: 'var(--text-muted)',
                    }}
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-sm px-4 py-3 rounded-lg"
                  style={{
                    color: '#EF4444',
                    background: 'rgba(239, 68, 68, 0.08)',
                    borderLeft: '3px solid #EF4444',
                  }}
                >
                  <AlertCircle
                    size={16}
                    className="shrink-0"
                  />
                  {error}
                </motion.div>
              )}

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    setShowForgotPassword(true)
                  }}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />

                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* ==================================================
                SOCIAL AUTH
            ================================================== */}

            <div className="flex items-center gap-3 my-6">
              <div
                className="flex-1 h-px"
                style={{
                  background: 'var(--border)',
                }}
              />

              <span
                className="text-xs"
                style={{
                  color: 'var(--text-muted)',
                }}
              >
                or continue with
              </span>

              <div
                className="flex-1 h-px"
                style={{
                  background: 'var(--border)',
                }}
              />
            </div>

            <div className="space-y-3">
              {['Google', 'GitHub'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  disabled
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium opacity-60 cursor-not-allowed"
                  style={{
                    color: 'var(--text-secondary)',
                    background: 'var(--surface-elevated)',
                    borderColor: 'var(--border)',
                  }}
                  title={`${provider} authentication will be connected later`}
                >
                  Continue with {provider}
                  <span
                    className="text-[10px]"
                    style={{
                      color: 'var(--text-muted)',
                    }}
                  >
                    Coming soon
                  </span>
                </button>
              ))}
            </div>

            {/* Sign Up */}
            <p
              className="text-center text-sm mt-6"
              style={{ color: 'var(--text-muted)' }}
            >
              Don't have an account?{' '}

              <button
                type="button"
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

