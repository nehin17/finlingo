import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Mail, Lock, User, Eye, EyeOff,
  BarChart2, Check, ChevronRight, AlertCircle
} from 'lucide-react'
import Button from '../shared/Button.jsx'

const interestChips = [
  'Technology', 'AI & ML', 'Healthcare', 'Banking',
  'Energy', 'Consumer', 'Real Estate', 'Crypto',
]

const difficultyLevels = [
  {
    id: 'beginner',
    label: 'Beginner',
    desc: "I'm new to investing",
    emoji: '🌱',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    desc: 'I understand the basics',
    emoji: '📈',
  },
  {
    id: 'pro',
    label: 'Pro',
    desc: 'I analyze financials regularly',
    emoji: '🏛️',
  },
]

export default function SignUpModal({ onClose, onSuccess, onSwitchToSignIn }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [interests, setInterests] = useState([])
  const [difficulty, setDifficulty] = useState('')
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidPassword = (password) => {
    return password.length >= 8
  }

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleNext = () => {
    setError('')
    
    if (step === 1) {
      if (!name.trim()) {
        setError('Please enter your name')
        return
      }
      if (!isValidEmail(email)) {
        setError('Please enter a valid email address')
        return
      }
      if (!isValidPassword(password)) {
        setError('Password must be at least 8 characters')
        return
      }
    }

    if (step < 3) setStep(step + 1)
  }

  const handleComplete = async () => {
    setError('')
    
    if (!difficulty) {
      setError('Please select your experience level')
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setComplete(true)
    await new Promise(r => setTimeout(r, 1200))
    onSuccess({ name: name || 'Alex', email, interests, difficulty })
  }

  if (complete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
            className="w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              borderColor: 'rgba(16, 185, 129, 0.2)',
            }}
          >
            <Check size={36} style={{ color: '#10B981' }} />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Welcome to FinLingo!
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>Setting up your personalized experience...</p>
        </motion.div>
      </motion.div>
    )
  }

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
          className="w-full max-w-lg rounded-2xl border overflow-hidden"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
                >
                  <BarChart2 size={14} className="text-white" />
                </div>
                <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                  FinLingo
                </span>
              </div>
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

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300"
                    style={{
                      background:
                        step > s
                          ? '#10B981'
                          : step === s
                            ? 'linear-gradient(135deg, #2563EB, #4F46E5)'
                            : 'var(--surface-elevated)',
                      color: step >= s ? 'white' : 'var(--text-muted)',
                    }}
                  >
                    {step > s ? <Check size={12} /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className="flex-1 h-0.5 rounded-full transition-all duration-300"
                      style={{
                        background: step > s ? '#10B981' : 'var(--border)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Create your account
                      </h2>
                      <p style={{ color: 'var(--text-muted)' }} className="text-sm">
                        Start researching stocks like a professional.
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-3 rounded-lg text-sm"
                        style={{
                          background: 'rgba(239, 68, 68, 0.08)',
                          borderLeft: '3px solid #EF4444',
                          color: '#EF4444',
                        }}
                      >
                        <AlertCircle size={16} className="flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    {/* Name Input */}
                    <div>
                      <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Full Name
                      </label>
                      <div
                        className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors focus-within:border-primary"
                        style={{
                          background: 'var(--surface-elevated)',
                          borderColor: error && !name.trim() ? '#EF4444' : 'var(--border)',
                        }}
                      >
                        <User size={16} style={{ color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          value={name}
                          onChange={e => {
                            setName(e.target.value)
                            if (error) setError('')
                          }}
                          placeholder="Your name"
                          className="flex-1 bg-transparent text-sm outline-none"
                          style={{ color: 'var(--text-primary)' }}
                        />
                      </div>
                    </div>

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
                          borderColor: error && !isValidEmail(email) ? '#EF4444' : 'var(--border)',
                        }}
                      >
                        <Mail size={16} style={{ color: 'var(--text-muted)' }} />
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
                          borderColor: error && !isValidPassword(password) ? '#EF4444' : 'var(--border)',
                        }}
                      >
                        <Lock size={16} style={{ color: 'var(--text-muted)' }} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => {
                            setPassword(e.target.value)
                            if (error) setError('')
                          }}
                          placeholder="Create a strong password"
                          className="flex-1 bg-transparent text-sm outline-none"
                          style={{ color: 'var(--text-primary)' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(p => !p)}
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
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        Minimum 8 characters
                      </p>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Your interests
                      </h2>
                      <p style={{ color: 'var(--text-muted)' }} className="text-sm">
                        We'll personalize your experience and watchlist.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {interestChips.map(chip => (
                        <button
                          key={chip}
                          onClick={() => toggleInterest(chip)}
                          className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150"
                          style={
                            interests.includes(chip)
                              ? {
                                  background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                  color: 'white',
                                  borderColor: 'transparent',
                                }
                              : {
                                  background: 'transparent',
                                  color: 'var(--text-secondary)',
                                  borderColor: 'var(--border)',
                                }
                          }
                          onMouseEnter={(e) => {
                            if (!interests.includes(chip)) {
                              e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.4)'
                              e.currentTarget.style.color = 'var(--text-primary)'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!interests.includes(chip)) {
                              e.currentTarget.style.borderColor = 'var(--border)'
                              e.currentTarget.style.color = 'var(--text-secondary)'
                            }
                          }}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                    {interests.length > 0 && (
                      <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                        {interests.length} selected
                      </p>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Your experience level
                      </h2>
                      <p style={{ color: 'var(--text-muted)' }} className="text-sm">
                        We'll tailor explanations to your comfort level.
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-3 rounded-lg text-sm mb-4"
                        style={{
                          background: 'rgba(239, 68, 68, 0.08)',
                          borderLeft: '3px solid #EF4444',
                          color: '#EF4444',
                        }}
                      >
                        <AlertCircle size={16} className="flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    <div className="space-y-3">
                      {difficultyLevels.map(level => (
                        <button
                          key={level.id}
                          onClick={() => {
                            setDifficulty(level.id)
                            if (error) setError('')
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-150"
                          style={{
                            background:
                              difficulty === level.id
                                ? 'rgba(37, 99, 235, 0.08)'
                                : 'var(--surface-elevated)',
                            borderColor:
                              difficulty === level.id
                                ? 'var(--primary)'
                                : 'var(--border)',
                          }}
                          onMouseEnter={(e) => {
                            if (difficulty !== level.id) {
                              e.currentTarget.style.borderColor = 'var(--border)'
                              e.currentTarget.style.background = 'var(--surface-elevated)'
                            }
                          }}
                        >
                          <span className="text-2xl">{level.emoji}</span>
                          <div>
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {level.label}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              {level.desc}
                            </p>
                          </div>
                          {difficulty === level.id && (
                            <div
                              className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: 'var(--primary)' }}
                            >
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div
            className="px-8 py-6 flex items-center justify-between gap-4 border-t"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            {step > 1 && (
              <button
                onClick={() => {
                  setStep(step - 1)
                  setError('')
                }}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                Back
              </button>
            )}
            <div className={step === 1 ? 'w-full' : 'ml-auto'}>
              {step < 3 ? (
                <Button onClick={handleNext} className="w-full sm:w-auto">
                  Continue
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button onClick={handleComplete} disabled={loading || !difficulty} className="w-full sm:w-auto">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Creating...
                    </span>
                  ) : (
                    <>
                      Create Account
                      <Check size={16} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {step === 1 && (
            <div className="px-8 pb-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <button
                onClick={onSwitchToSignIn}
                className="font-semibold transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                Sign in
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}