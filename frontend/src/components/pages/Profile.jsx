
// src/components/pages/Profile.jsx

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Star,
  Bell,
  BarChart3,
  ShieldCheck,
  PencilLine,
  Camera,
  Calendar,
  Key,
  Laptop,
  LogOut,
  Check,
  TrendingUp,
  TrendingDown,
  X,
  Save,
  Brain,
  Zap,
  CircleCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'

import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'
import GrowthTree from '../profile/GrowthTree.jsx'

// ============================================================
// API CONFIGURATION
// ============================================================
//
// Change these endpoints if your backend uses different routes.
//
// Expected backend shape:
//
// GET    /api/profile
// PATCH  /api/profile
// PATCH  /api/profile/preferences
// PATCH  /api/profile/status
// POST   /api/profile/avatar
// PATCH  /api/profile/password
//
// The GET /api/profile response is expected to look roughly like:
//
// {
//   user: {
//     id,
//     username,
//     displayName,
//     email,
//     avatarUrl,
//     timezone,
//     joinedAt
//   },
//   stats: {
//     watchlist,
//     alerts,
//     sessions,
//     portfolioHealth
//   },
//   growth: {
//     progress,
//     streak,
//     lastWateredStreak,
//     totalResearchDays,
//     lastActiveDate,
//     completedTrees
//   },
//   activity: {
//     weekly: [
//       { day, value, hours }
//     ],
//     totals: {
//       companiesAnalysed,
//       earningsReviewed,
//       battleComparisons,
//       marketBriefsRead
//     },
//     comparisonPercent
//   },
//   watchlist: [],
//   achievements: [],
//   insights: [],
//   preferences: {
//     theme,
//     emailNotifs,
//     earningsReminders,
//     weeklyDigest
//   },
//   cognitiveStatus
// }
//
// ============================================================

const API_BASE_URL = '/api'

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`
    )
  }

  return data
}

async function getProfile() {
  return apiRequest('/profile')
}

async function updateProfile(payload) {
  return apiRequest('/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

async function updatePreferences(payload) {
  return apiRequest('/profile/preferences', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

async function updateCognitiveStatus(status) {
  return apiRequest('/profile/status', {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

async function uploadAvatar(file) {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Avatar upload failed with status ${response.status}`
    )
  }

  return data
}

async function changePassword(payload) {
  return apiRequest('/profile/password', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

// ============================================================
// CONSTANTS
// ============================================================

const STATUS_MODES = {
  research: {
    label: 'Deep Research',
    description: 'Analysing companies',
  },
  scanning: {
    label: 'Market Scan',
    description: 'Tracking live market movement',
  },
  learning: {
    label: 'Learning',
    description: 'Exploring new investment ideas',
  },
  focus: {
    label: 'Focus Session',
    description: 'Deep work with no distractions',
  },
  offline: {
    label: 'Offline',
    description: 'Taking a short break',
  },
}

const HEALTH_BADGE = {
  intact: {
    label: 'Intact',
    className:
      'bg-emerald-200 text-emerald-900 border border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40',
  },
  watch: {
    label: 'Watch',
    className:
      'bg-amber-200 text-amber-900 border border-amber-400 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40',
  },
  review: {
    label: 'Review',
    className:
      'bg-red-200 text-red-900 border border-red-400 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/40',
  },
}

// ============================================================
// HELPERS
// ============================================================

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (!parts.length) return '?'

  return (
    (parts[0]?.[0] || '') +
    (parts.length > 1 ? parts[parts.length - 1]?.[0] || '' : '')
  ).toUpperCase()
}

function formatJoinDate(date) {
  if (!date) return '—'

  try {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return date
  }
}

function formatUsername(username = '') {
  return username
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}

function createFallbackProfile(user) {
  return {
    user: {
      id: user?.id ?? null,
      username: user?.username ?? '',
      displayName: user?.displayName ?? user?.name ?? '',
      email: user?.email ?? '',
      avatarUrl: user?.avatarUrl ?? user?.photoURL ?? null,
      timezone:
        user?.timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone ||
        'Asia/Kolkata',
      joinedAt: user?.joinedAt ?? null,
    },

    stats: {
      watchlist: 0,
      alerts: 0,
      sessions: 0,
      portfolioHealth: '—',
    },

    growth: {
      progress: 0,
      streak: 0,
      lastWateredStreak: null,
      totalResearchDays: 0,
      lastActiveDate: null,
      completedTrees: 0,
    },

    activity: {
      weekly: [],
      totals: {
        companiesAnalysed: 0,
        earningsReviewed: 0,
        battleComparisons: 0,
        marketBriefsRead: 0,
      },
      comparisonPercent: null,
    },

    watchlist: [],
    achievements: [],
    insights: [],

    preferences: {
      theme: 'System',
      emailNotifs: false,
      earningsReminders: false,
      weeklyDigest: false,
    },

    cognitiveStatus: 'research',
  }
}

// ============================================================
// SMALL UI COMPONENTS
// ============================================================

function Toggle({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm
          transition-transform duration-200
          ${checked ? 'translate-x-[18px]' : 'translate-x-[3px]'}`}
      />
    </button>
  )
}

function AnimatedNumber({ value }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (typeof value !== 'number') return undefined

    const controls = animate(count, value, {
      duration: 1.1,
      ease: 'easeOut',
    })

    const unsubscribe = rounded.on('change', setDisplay)

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, count, rounded])

  if (typeof value !== 'number') {
    return <>{value ?? '—'}</>
  }

  return <>{display}</>
}

function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      {Icon && (
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center
                     bg-blue-600/10 shrink-0"
        >
          <Icon size={18} className="text-blue-600 dark:text-blue-400" />
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-text-primary">{title}</h2>

        {subtitle && (
          <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

function LoadingCard({ className = '' }) {
  return (
    <div
      className={`rounded-3xl border border-border p-7 animate-pulse ${className}`}
      style={{ background: 'var(--surface)' }}
    >
      <div className="h-5 w-40 rounded bg-surface-elevated mb-6" />
      <div className="h-4 w-full rounded bg-surface-elevated mb-3" />
      <div className="h-4 w-4/5 rounded bg-surface-elevated mb-3" />
      <div className="h-24 w-full rounded-2xl bg-surface-elevated" />
    </div>
  )
}

function ErrorCard({ message, onRetry }) {
  return (
    <div
      className="rounded-3xl border border-red-200 dark:border-red-500/30
                 p-8 text-center"
      style={{ background: 'var(--surface)' }}
    >
      <div
        className="w-12 h-12 mx-auto rounded-2xl bg-red-500/10
                   flex items-center justify-center mb-4"
      >
        <AlertCircle size={22} className="text-red-500" />
      </div>

      <h2 className="text-lg font-bold text-text-primary">
        Couldn't load your profile
      </h2>

      <p className="text-sm text-text-muted mt-2 max-w-md mx-auto">
        {message || 'Something went wrong while loading your account.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 mt-5 px-4 py-2.5
                     rounded-xl bg-blue-700 text-white text-sm font-semibold
                     hover:bg-blue-600 transition-colors"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  )
}

// ============================================================
// PROFILE COMPLETION
// ============================================================

function ProfileCompletion({ percent = 0, tips = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-border p-5"
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-text-primary">
          Profile Completion
        </p>

        <span className="text-sm font-bold text-blue-600">
          {percent}%
        </span>
      </div>

      <div
        className="h-1.5 rounded-full mb-4 overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500"
        />
      </div>

      {tips.length > 0 ? (
        <ul className="space-y-1.5">
          {tips.map((tip) => (
            <li
              key={tip}
              className="flex items-center gap-2 text-xs text-text-muted"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          Your profile is looking great.
        </p>
      )}
    </motion.div>
  )
}

// ============================================================
// PROFILE SIDEBAR
// ============================================================

function ProfileSidebar({
  profile,
  onAvatarChange,
  onStatusChange,
  onEditProfile,
}) {
  const fileRef = useRef(null)
  const menuRef = useRef(null)

  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [avatarError, setAvatarError] = useState('')

  const status = profile.cognitiveStatus || 'research'
  const currentStatus = STATUS_MODES[status] || STATUS_MODES.research

  const handleFile = async (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('Please choose an image smaller than 5 MB.')
      event.target.value = ''
      return
    }

    setAvatarError('')
    setUploadingAvatar(true)

    try {
      const result = await uploadAvatar(file)

      const avatarUrl =
        result?.avatarUrl ||
        result?.user?.avatarUrl ||
        result?.profile?.avatarUrl

      if (avatarUrl) {
        onAvatarChange(avatarUrl)
      }
    } catch (error) {
      setAvatarError(error.message || 'Failed to upload your photo.')
    } finally {
      setUploadingAvatar(false)
      event.target.value = ''
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setStatusMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full lg:w-[400px] xl:w-[450px] shrink-0
                 sticky top-24 self-start p-2 relative"
      style={{
        background:
          'linear-gradient(180deg, var(--surface) 0%, rgba(37,99,235,0.04) 55%, rgba(16,185,129,0.03) 100%)',
      }}
    >
      <div className="flex flex-col items-center text-center mb-5">
        <div className="relative mb-4 flex justify-center">
          <div
            className="w-40 h-40 rounded-full overflow-hidden flex items-center
                       justify-center shadow-2xl ring-4 ring-blue-500/10
                       border-4 border-blue-200 dark:border-blue-500/30"
            style={{
              background: profile.user.avatarUrl
                ? undefined
                : 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
            }}
          >
            {profile.user.avatarUrl ? (
              <img
                src={profile.user.avatarUrl}
                alt={
                  profile.user.displayName ||
                  profile.user.username ||
                  'Profile'
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl font-black text-white tracking-tight select-none">
                {getInitials(
                  profile.user.displayName ||
                  profile.user.username
                )}
              </span>
            )}
          </div>

          {/* Cognitive status */}
          <div
            ref={menuRef}
            className="absolute bottom-0 right-[calc(50%-5rem)] z-20 group"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStatusMenuOpen((value) => !value)}
              className="relative w-12 h-12 rounded-full flex items-center
                         justify-center border border-border shadow-xl
                         backdrop-blur-md hover:border-blue-400
                         transition-all duration-300 overflow-hidden"
              style={{ background: 'var(--surface-elevated)' }}
              aria-label="Set cognitive status"
            >
              <motion.div
                animate={
                  status === 'research'
                    ? { rotate: [-6, 6, -6] }
                    : status === 'focus'
                      ? { scale: [1, 1.08, 1] }
                      : status === 'learning'
                        ? { y: [0, -2, 0] }
                        : {}
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <Brain
                  size={19}
                  className={
                    status === 'offline'
                      ? 'text-gray-400'
                      : status === 'focus'
                        ? 'text-emerald-500'
                        : status === 'scanning'
                          ? 'text-cyan-500'
                          : status === 'learning'
                            ? 'text-violet-500'
                            : 'text-blue-500'
                  }
                />
              </motion.div>
            </motion.button>

            <div
              className="pointer-events-none absolute left-1/2 top-full mt-2
                         -translate-x-1/2 whitespace-nowrap rounded-lg border
                         border-border px-3 py-1.5 text-[11px] font-semibold
                         opacity-0 group-hover:opacity-100 transition-opacity
                         duration-200 shadow-lg z-30"
              style={{ background: 'var(--surface)' }}
            >
              Set cognitive status
            </div>

            <AnimatePresence>
              {statusMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-14 w-64 rounded-2xl border
                             border-border shadow-2xl overflow-hidden
                             backdrop-blur-xl z-40"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs font-bold text-text-primary">
                      Cognitive Status
                    </p>

                    <p className="text-[11px] text-text-muted mt-0.5">
                      Choose how your research brain feels right now.
                    </p>
                  </div>

                  <div className="p-2 space-y-1">
                    {Object.entries(STATUS_MODES).map(([key, item]) => (
                      <button
                        type="button"
                        key={key}
                        disabled={status === key}
                        onClick={async () => {
                          await onStatusChange(key)
                          setStatusMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3
                          rounded-xl text-left transition-all duration-200
                          disabled:cursor-default
                          ${
                            status === key
                              ? 'bg-blue-500/10 border border-blue-400/20'
                              : 'hover:bg-surface-elevated border border-transparent'
                          }`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl border border-border
                                     flex items-center justify-center shrink-0"
                          style={{
                            background: 'var(--surface-elevated)',
                          }}
                        >
                          <Brain
                            size={15}
                            className={
                              status === key
                                ? 'text-blue-500'
                                : 'text-text-secondary'
                            }
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-text-primary">
                            {item.label}
                          </p>

                          <p className="text-[11px] text-text-muted truncate">
                            {item.description}
                          </p>
                        </div>

                        {status === key && (
                          <Check
                            size={13}
                            className="text-blue-500 shrink-0"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploadingAvatar}
          className="inline-flex items-center gap-2 rounded-xl border
                     border-border px-3 py-2 text-xs font-semibold
                     text-text-primary hover:bg-surface-elevated
                     transition-all mb-2 disabled:opacity-50"
        >
          {uploadingAvatar ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Camera size={13} />
          )}

          {uploadingAvatar ? 'Uploading...' : 'Change photo'}
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />

        {avatarError && (
          <p className="text-xs text-red-500 mb-3">
            {avatarError}
          </p>
        )}

        <h2 className="text-2xl font-bold text-text-primary">
          {profile.user.displayName ||
            profile.user.username ||
            'Your Profile'}
        </h2>

        <div className="flex flex-col items-center gap-2 mt-1">
          {profile.user.username && (
            <p className="text-sm text-text-muted">
              @{formatUsername(profile.user.username)}
            </p>
          )}

          <div
            className={`relative inline-flex items-center gap-2 rounded-full
              px-3 py-1.5 text-xs font-semibold border ${
                status === 'research'
                  ? 'bg-blue-100 text-black border-blue-300'
                  : status === 'scanning'
                    ? 'bg-cyan-100 text-black border-cyan-300'
                    : status === 'learning'
                      ? 'bg-violet-100 text-black border-violet-300'
                      : status === 'focus'
                        ? 'bg-emerald-100 text-black border-emerald-300'
                        : 'bg-gray-100 text-black border-gray-300'
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'research'
                  ? 'bg-blue-600'
                  : status === 'scanning'
                    ? 'bg-cyan-600'
                    : status === 'learning'
                      ? 'bg-violet-600'
                      : status === 'focus'
                        ? 'bg-emerald-600'
                        : 'bg-gray-500'
              }`}
            />

            <span>
              {currentStatus.label}
            </span>
          </div>

          {profile.user.joinedAt && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted mt-2">
              <Calendar size={12} />
              <span>
                Member since {formatJoinDate(profile.user.joinedAt)}
              </span>
            </div>
          )}
        </div>
      </div>

      <motion.button
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={onEditProfile}
        className="w-full flex items-center justify-center gap-2 py-3
                   rounded-xl text-sm font-semibold text-white
                   bg-blue-700 hover:bg-blue-600 transition-colors"
      >
        <PencilLine size={15} />
        Edit Profile
      </motion.button>

      <GrowthTree
        progress={profile.growth.progress}
        streak={profile.growth.streak}
        lastWateredStreak={profile.growth.lastWateredStreak}
        totalResearchDays={profile.growth.totalResearchDays}
        lastActiveDate={profile.growth.lastActiveDate}
        completedTrees={profile.growth.completedTrees}
      />

      <div
        className="mt-4 rounded-2xl border border-border
                   divide-y divide-border overflow-hidden"
        style={{ background: 'var(--surface-elevated)' }}
      >
        {[
          {
            label: 'Watchlist',
            value: profile.stats.watchlist,
            icon: Star,
            color: '#F59E0B',
          },
          {
            label: 'Alerts',
            value: profile.stats.alerts,
            icon: Bell,
            color: '#EF4444',
          },
          {
            label: 'Sessions',
            value: profile.stats.sessions,
            icon: BarChart3,
            color: '#2563EB',
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <Icon size={14} style={{ color }} />
              <span className="text-sm text-text-muted">
                {label}
              </span>
            </div>

            <span className="text-sm font-bold text-text-primary">
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.aside>
  )
}

// ============================================================
// WELCOME HERO
// ============================================================

function WelcomeHero({ profile }) {
  const { user, stats } = profile

  const tiles = [
    {
      label: 'Watchlist Companies',
      value: stats.watchlist,
      sub: 'Currently tracked',
      icon: Star,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.10)',
    },
    {
      label: 'Active Alerts',
      value: stats.alerts,
      sub: 'Currently configured',
      icon: Bell,
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.10)',
    },
    {
      label: 'Research Sessions',
      value: stats.sessions,
      sub: 'Total sessions',
      icon: BarChart3,
      color: '#2563EB',
      bg: 'rgba(37,99,235,0.10)',
    },
    {
      label: 'Portfolio Health',
      value: null,
      display: stats.portfolioHealth || '—',
      sub: 'Current status',
      icon: ShieldCheck,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.10)',
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-border p-7 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex items-start justify-between gap-5 mb-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Welcome back
            {user.displayName
              ? `, ${user.displayName.split(' ')[0]}`
              : ''}
            {' '}👋
          </h1>

          <p className="text-sm text-text-muted mt-2 max-w-2xl">
            Your research workspace is active.
            {stats.alerts > 0 && (
              <>
                {' '}
                You currently have{' '}
                <span className="font-semibold text-text-primary">
                  {stats.alerts} alert{stats.alerts !== 1 ? 's' : ''}
                </span>
                {' '}configured.
              </>
            )}
          </p>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full border
                     border-emerald-300 dark:border-emerald-500/40
                     bg-emerald-50 dark:bg-emerald-500/10
                     self-start shrink-0"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500"
          />

          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Workspace active
          </span>
        </div>
      </div>

      <p className="text-xs text-text-muted mb-6">
        Your data is synced with your account.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile, index) => {
          const Icon = tile.icon

          return (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-2xl border border-border p-5
                         transition-shadow hover:shadow-lg"
              style={{ background: 'var(--surface-elevated)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center
                           justify-center mb-3"
                style={{ background: tile.bg }}
              >
                <Icon size={18} style={{ color: tile.color }} />
              </div>

              <p className="text-2xl font-bold text-text-primary leading-none mb-0.5">
                {tile.value !== null
                  ? <AnimatedNumber value={tile.value} />
                  : tile.display}
              </p>

              <p className="text-xs font-semibold text-text-primary mt-1">
                {tile.label}
              </p>

              <p className="text-xs text-text-muted mt-0.5">
                {tile.sub}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

// ============================================================
// ACCOUNT INFORMATION
// ============================================================

function AccountInformation({
  profile,
  onProfileSaved,
}) {
  const [form, setForm] = useState({
    username: profile.user.username || '',
    displayName: profile.user.displayName || '',
    email: profile.user.email || '',
    timezone: profile.user.timezone || '',
  })

  const [prefs, setPrefs] = useState({
    ...profile.preferences,
  })

  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPreferences, setSavingPreferences] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [preferencesSaved, setPreferencesSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm({
      username: profile.user.username || '',
      displayName: profile.user.displayName || '',
      email: profile.user.email || '',
      timezone: profile.user.timezone || '',
    })

    setPrefs({
      ...profile.preferences,
    })
  }, [profile])

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const togglePreference = (key) => {
    setPrefs((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const handleProfileSave = async () => {
    setSavingProfile(true)
    setError('')
    setProfileSaved(false)

    try {
      const result = await updateProfile({
        username: form.username.trim(),
        displayName: form.displayName.trim(),
        email: form.email.trim(),
        timezone: form.timezone.trim(),
      })

      onProfileSaved?.(result)

      setProfileSaved(true)

      setTimeout(() => {
        setProfileSaved(false)
      }, 2000)
    } catch (saveError) {
      setError(saveError.message || 'Failed to save profile.')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePreferencesSave = async () => {
    setSavingPreferences(true)
    setError('')
    setPreferencesSaved(false)

    try {
      const result = await updatePreferences(prefs)

      onProfileSaved?.(result)

      setPreferencesSaved(true)

      setTimeout(() => {
        setPreferencesSaved(false)
      }, 2000)
    } catch (saveError) {
      setError(saveError.message || 'Failed to save preferences.')
    } finally {
      setSavingPreferences(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-border p-7 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <SectionHeader
        title="Account Information"
        subtitle="Manage your profile details and preferences."
        icon={PencilLine}
      />

      {error && (
        <div className="mb-6 rounded-xl border border-red-200
                        dark:border-red-500/30 bg-red-500/5 p-3
                        text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
            Personal
          </p>

          {[
            {
              label: 'Username',
              key: 'username',
              type: 'text',
            },
            {
              label: 'Email',
              key: 'email',
              type: 'email',
            },
            {
              label: 'Display Name',
              key: 'displayName',
              type: 'text',
            },
            {
              label: 'Time Zone',
              key: 'timezone',
              type: 'text',
            },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs text-text-muted mb-1">
                {field.label}
              </label>

              <input
                type={field.type}
                value={form[field.key]}
                onChange={(event) =>
                  updateField(field.key, event.target.value)
                }
                className="w-full rounded-xl border border-border px-3 py-2.5
                           text-sm text-text-primary bg-transparent
                           focus:outline-none focus:border-blue-500
                           transition-colors"
                style={{
                  background: 'var(--surface-elevated)',
                }}
              />
            </div>
          ))}

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={savingProfile}
            onClick={handleProfileSave}
            className="flex items-center justify-center gap-2 px-5 py-2.5
                       rounded-xl text-sm font-semibold text-white
                       bg-blue-700 hover:bg-blue-600 transition-colors
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {savingProfile ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </>
            ) : profileSaved ? (
              <>
                <Check size={14} />
                Saved
              </>
            ) : (
              <>
                <Save size={14} />
                Save Profile
              </>
            )}
          </motion.button>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
            Preferences
          </p>

          <div>
            <label className="block text-xs text-text-muted mb-1">
              Theme
            </label>

            <select
              value={prefs.theme || 'System'}
              onChange={(event) =>
                setPrefs((current) => ({
                  ...current,
                  theme: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-border px-3 py-2.5
                         text-sm text-text-primary bg-transparent
                         focus:outline-none focus:border-blue-500
                         cursor-pointer"
              style={{
                background: 'var(--surface-elevated)',
              }}
            >
              {['Light', 'Dark', 'System'].map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>

          {[
            {
              key: 'emailNotifs',
              label: 'Email notifications',
            },
            {
              key: 'earningsReminders',
              label: 'Earnings reminders',
            },
            {
              key: 'weeklyDigest',
              label: 'Weekly market summary',
            },
          ].map((preference) => (
            <div
              key={preference.key}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm text-text-primary">
                {preference.label}
              </span>

              <Toggle
                checked={Boolean(prefs[preference.key])}
                onChange={() =>
                  togglePreference(preference.key)
                }
                disabled={savingPreferences}
              />
            </div>
          ))}

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={savingPreferences}
            onClick={handlePreferencesSave}
            className="flex items-center justify-center gap-2 px-5 py-2.5
                       rounded-xl text-sm font-semibold text-white
                       bg-blue-700 hover:bg-blue-600 transition-colors
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {savingPreferences ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </>
            ) : preferencesSaved ? (
              <>
                <Check size={14} />
                Saved
              </>
            ) : (
              <>
                <Save size={14} />
                Save Preferences
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}

// ============================================================
// RESEARCH ACTIVITY
// ============================================================

function ResearchActivity({ activity }) {
  const weekly = activity?.weekly || []

  const maxValue = Math.max(
    ...weekly.map((item) => Number(item.value) || 0),
    1
  )

  const todayIndex =
    new Date().getDay() === 0
      ? 6
      : new Date().getDay() - 1

  const [hovered, setHovered] = useState(null)

  const totalHours = weekly
    .reduce(
      (sum, item) => sum + (Number(item.hours) || 0),
      0
    )
    .toFixed(1)

  const mostActive =
    weekly.length > 0
      ? weekly.reduce((a, b) =>
          Number(a.value) > Number(b.value) ? a : b
        )
      : null

  const totals = activity?.totals || {}

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-border p-7 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <SectionHeader
          title="Research Activity"
          subtitle="Your recent research behaviour."
          icon={BarChart3}
        />

        {mostActive && (
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-text-muted">
              Most active
            </p>

            <p className="text-sm font-bold text-text-primary">
              {mostActive.day}
            </p>
          </div>
        )}
      </div>

      <p className="text-sm text-text-muted mb-6">
        You spent{' '}
        <span className="font-semibold text-text-primary">
          {totalHours}h
        </span>{' '}
        analysing companies this week.
        {typeof activity?.comparisonPercent === 'number' && (
          <>
            {' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {activity.comparisonPercent > 0 ? '+' : ''}
              {activity.comparisonPercent}% vs last week.
            </span>
          </>
        )}
      </p>

      {weekly.length > 0 ? (
        <div className="relative">
          <div className="flex items-end gap-2 h-32 mb-1">
            {weekly.map((day, index) => {
              const isToday = index === todayIndex
              const isHovered = hovered === index

              return (
                <div
                  key={`${day.day}-${index}`}
                  className="flex flex-col items-center gap-1
                             flex-1 cursor-pointer relative h-full"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 4,
                        }}
                        className="absolute -top-8 left-1/2
                                   -translate-x-1/2 pointer-events-none
                                   px-2 py-1 rounded-lg text-[11px]
                                   font-semibold text-white whitespace-nowrap
                                   z-10"
                        style={{
                          background: '#1e293b',
                        }}
                      >
                        {Number(day.hours || 0).toFixed(1)}h
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex-1 w-full flex items-end">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: index * 0.07,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      className="w-full rounded-t-lg origin-bottom"
                      style={{
                        height: `${(Number(day.value || 0) / maxValue) * 100}%`,
                        background: isToday
                          ? '#10B981'
                          : isHovered
                            ? '#3B82F6'
                            : '#2563EB',
                        opacity:
                          isToday || isHovered ? 1 : 0.55,
                        minHeight: 4,
                      }}
                    />
                  </div>

                  <span
                    className={`text-[10px] ${
                      isToday
                        ? 'text-emerald-500 font-bold'
                        : 'text-text-muted'
                    }`}
                  >
                    {day.day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div
          className="h-32 rounded-2xl border border-dashed border-border
                     flex items-center justify-center text-sm text-text-muted"
        >
          No research activity recorded yet.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          {
            label: 'Companies analysed',
            value: totals.companiesAnalysed || 0,
          },
          {
            label: 'Earnings reviewed',
            value: totals.earningsReviewed || 0,
          },
          {
            label: 'Battle comparisons',
            value: totals.battleComparisons || 0,
          },
          {
            label: 'Market briefs read',
            value: totals.marketBriefsRead || 0,
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3 + index * 0.06,
            }}
            className="rounded-2xl border border-border p-4 text-center"
            style={{
              background: 'var(--surface-elevated)',
            }}
          >
            <p className="text-2xl font-bold text-text-primary">
              <AnimatedNumber value={Number(metric.value)} />
            </p>

            <p className="text-xs text-text-muted mt-1 leading-tight">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// ============================================================
// WATCHLIST SNAPSHOT
// ============================================================

function WatchlistSnapshot({ watchlist = [] }) {
  const sparklines = useMemo(() => {
    return Object.fromEntries(
      watchlist.map((stock) => [
        stock.ticker,
        stock.sparkline || [],
      ])
    )
  }, [watchlist])

  const Sparkline = ({ data, positive }) => {
    if (!data?.length) {
      return (
        <div className="w-14 h-6 flex items-center justify-center">
          <span className="text-[9px] text-text-muted">—</span>
        </div>
      )
    }

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const width = 56
    const height = 24

    const points = data.map((value, index) => [
      (index / Math.max(data.length - 1, 1)) * width,
      height - ((value - min) / range) * height,
    ])

    const path = points
      .map(
        (point, index) =>
          `${index === 0 ? 'M' : 'L'}${point[0]},${point[1]}`
      )
      .join(' ')

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
      >
        <path
          d={path}
          fill="none"
          stroke={positive ? '#10B981' : '#EF4444'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-border overflow-hidden shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <div className="p-7 pb-5">
        <SectionHeader
          title="Watchlist Snapshot"
          subtitle="A quick view of your tracked companies."
          icon={Star}
        />
      </div>

      {watchlist.length > 0 ? (
        <div className="divide-y divide-border">
          {watchlist.map((stock, index) => {
            const badge =
              HEALTH_BADGE[stock.health] ||
              HEALTH_BADGE.watch

            return (
              <motion.div
                key={stock.ticker || index}
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.07,
                }}
                whileHover={{
                  backgroundColor:
                    'var(--surface-elevated)',
                }}
                className="flex items-center gap-4 px-7 py-4
                           transition-colors cursor-pointer"
              >
                <div
                  className="w-9 h-9 rounded-xl bg-blue-600/10
                             flex items-center justify-center shrink-0"
                >
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {(stock.ticker || '?').slice(0, 2)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-text-primary">
                    {stock.ticker || '—'}
                  </p>

                  <p className="text-xs text-text-muted truncate">
                    {stock.note || stock.name || 'No note available'}
                  </p>
                </div>

                <div className="hidden sm:block">
                  <Sparkline
                    data={sparklines[stock.ticker]}
                    positive={Boolean(stock.positive)}
                  />
                </div>

                {stock.change && (
                  <span
                    className={`text-sm font-bold flex items-center
                      gap-1 shrink-0 ${
                        stock.positive
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-red-700 dark:text-red-400'
                      }`}
                  >
                    {stock.positive ? (
                      <TrendingUp size={13} />
                    ) : (
                      <TrendingDown size={13} />
                    )}

                    {stock.change}
                  </span>
                )}

                <span
                  className={`text-xs font-semibold rounded-full
                    px-3 py-1 shrink-0 hidden md:inline
                    ${badge.className}`}
                >
                  {badge.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="px-7 pb-7">
          <div
            className="rounded-2xl border border-dashed border-border
                       p-8 text-center text-sm text-text-muted"
          >
            Your watchlist is empty.
          </div>
        </div>
      )}
    </motion.section>
  )
}

// ============================================================
// AI INSIGHTS
// ============================================================

function AIResearchInsights({ insights = [] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-blue-200
                 dark:border-blue-500/30 p-7 shadow-sm"
      style={{
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(16,185,129,0.03) 100%)',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl bg-blue-600/10
                     flex items-center justify-center"
        >
          <Zap size={18} className="text-blue-500" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-text-primary">
            AI Research Insights
          </h2>

          <p className="text-xs text-text-muted">
            Personalised to your activity
          </p>
        </div>

        <motion.div
          animate={{
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="ml-auto w-2 h-2 rounded-full bg-emerald-500"
        />
      </div>

      {insights.length > 0 ? (
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id || index}
              initial={{
                opacity: 0,
                x: -6,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.2 + index * 0.1,
              }}
              className="flex items-start gap-3 p-4 rounded-2xl
                         border border-border"
              style={{
                background: 'var(--surface)',
              }}
            >
              <Zap
                size={14}
                className="text-blue-500 mt-0.5 shrink-0"
              />

              <p className="text-sm text-text-secondary leading-relaxed">
                {typeof insight === 'string'
                  ? insight
                  : insight.text || insight.content}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border border-dashed border-border
                     p-7 text-center text-sm text-text-muted"
        >
          AI insights will appear here as you build your research history.
        </div>
      )}
    </motion.section>
  )
}

// ============================================================
// ACHIEVEMENTS
// ============================================================

function AchievementSection({ achievements = [] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-border p-7 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <SectionHeader
        title="Achievements"
        subtitle="Milestones from your research journey."
        icon={CircleCheck}
      />

      {achievements.length > 0 ? (
        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const unlocked = Boolean(achievement.unlocked)

            return (
              <motion.div
                key={achievement.id || index}
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.09,
                }}
                className={`flex items-start gap-4 ${
                  !unlocked ? 'opacity-45' : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center
                      justify-center shrink-0 ${
                        unlocked
                          ? 'bg-emerald-200 dark:bg-emerald-500/20'
                          : 'bg-surface-elevated'
                      }`}
                  >
                    {unlocked ? (
                      <CircleCheck
                        size={16}
                        className="text-emerald-700 dark:text-emerald-400"
                      />
                    ) : (
                      <CircleCheck
                        size={14}
                        className="text-text-muted"
                      />
                    )}
                  </div>

                  {index < achievements.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1 min-h-[24px]"
                      style={{
                        background: 'var(--border)',
                      }}
                    />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between gap-4 mb-0.5">
                    <p
                      className={`text-sm font-bold ${
                        unlocked
                          ? 'text-text-primary'
                          : 'text-text-muted'
                      }`}
                    >
                      {achievement.title}
                    </p>

                    {achievement.date && (
                      <span
                        className={`text-xs font-semibold ${
                          unlocked
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-text-muted'
                        }`}
                      >
                        {achievement.date}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-text-muted">
                    {achievement.desc ||
                      achievement.description ||
                      ''}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div
          className="rounded-2xl border border-dashed border-border
                     p-7 text-center text-sm text-text-muted"
        >
          No achievements yet. Start researching to unlock them.
        </div>
      )}
    </motion.section>
  )
}

// ============================================================
// SECURITY
// ============================================================

function SecuritySection({ onSignOut }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const updatePasswordField = (field, value) => {
    setPasswords((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handlePasswordChange = async () => {
    setPasswordError('')
    setPasswordSuccess(false)

    if (!passwords.currentPassword) {
      setPasswordError('Enter your current password.')
      return
    }

    if (!passwords.newPassword) {
      setPasswordError('Enter a new password.')
      return
    }

    if (passwords.newPassword.length < 8) {
      setPasswordError(
        'Your new password must be at least 8 characters.'
      )
      return
    }

    if (
      passwords.newPassword !== passwords.confirmPassword
    ) {
      setPasswordError('The new passwords do not match.')
      return
    }

    setSavingPassword(true)

    try {
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })

      setPasswordSuccess(true)

      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      setTimeout(() => {
        setShowPasswordModal(false)
        setPasswordSuccess(false)
      }, 1200)
    } catch (error) {
      setPasswordError(
        error.message || 'Failed to update password.'
      )
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border p-7 shadow-sm"
        style={{ background: 'var(--surface)' }}
      >
        <SectionHeader
          title="Security & Account"
          subtitle="Manage your account security."
          icon={ShieldCheck}
        />

        <div className="space-y-3">
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPasswordModal(true)}
            className="w-full flex items-center gap-3 px-5 py-4
                       rounded-2xl border border-border
                       hover:border-blue-400 hover:bg-blue-50
                       dark:hover:border-blue-500/40
                       dark:hover:bg-blue-500/5 transition-all text-left"
          >
            <div
              className="w-9 h-9 rounded-xl bg-blue-600/10
                         flex items-center justify-center shrink-0"
            >
              <Key
                size={16}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">
                Change Password
              </p>

              <p className="text-xs text-text-muted">
                Update your account password
              </p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-5 py-4
                       rounded-2xl border border-border
                       hover:bg-surface-elevated transition-all text-left"
          >
            <div
              className="w-9 h-9 rounded-xl bg-indigo-500/10
                         flex items-center justify-center shrink-0"
            >
              <Laptop
                size={16}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">
                Connected Devices
              </p>

              <p className="text-xs text-text-muted">
                Manage sessions and logged-in devices
              </p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-5 py-4
                       rounded-2xl border border-red-700/50
                       text-red-600 dark:text-red-400
                       hover:bg-red-950/20
                       transition-all text-left"
          >
            <div
              className="w-9 h-9 rounded-xl bg-red-500/10
                         flex items-center justify-center shrink-0"
            >
              <LogOut
                size={16}
                className="text-red-600 dark:text-red-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Sign Out
              </p>

              <p className="text-xs opacity-70">
                Sign out of this device
              </p>
            </div>
          </motion.button>
        </div>
      </motion.section>

      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center
                       justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowPasswordModal(false)
              }
            }}
          >
            <motion.div
              initial={{
                scale: 0.96,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.96,
                opacity: 0,
              }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-3xl border
                         border-border overflow-hidden shadow-xl"
              style={{
                background: 'var(--surface)',
              }}
            >
              <div
                className="flex items-center justify-between
                           px-6 py-5 border-b border-border"
              >
                <h3 className="text-lg font-bold text-text-primary">
                  Change Password
                </h3>

                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="w-8 h-8 rounded-lg border border-border
                             flex items-center justify-center
                             text-text-muted hover:text-text-primary
                             hover:bg-surface-elevated transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {[
                  {
                    label: 'Current password',
                    key: 'currentPassword',
                  },
                  {
                    label: 'New password',
                    key: 'newPassword',
                  },
                  {
                    label: 'Confirm new password',
                    key: 'confirmPassword',
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs text-text-muted mb-1">
                      {field.label}
                    </label>

                    <input
                      type="password"
                      value={passwords[field.key]}
                      onChange={(event) =>
                        updatePasswordField(
                          field.key,
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-border
                                 px-3 py-2.5 text-sm text-text-primary
                                 bg-transparent focus:outline-none
                                 focus:border-blue-500 transition-colors"
                      style={{
                        background:
                          'var(--surface-elevated)',
                      }}
                    />
                  </div>
                ))}

                {passwordError && (
                  <p className="text-xs text-red-500">
                    {passwordError}
                  </p>
                )}

                {passwordSuccess && (
                  <p className="text-xs text-emerald-500">
                    Password updated successfully.
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswordModal(false)
                    }
                    disabled={savingPassword}
                    className="flex-1 py-2.5 rounded-xl border
                               border-border text-sm font-semibold
                               text-text-primary
                               hover:bg-surface-elevated
                               transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    disabled={savingPassword}
                    className="flex-1 py-2.5 rounded-xl text-sm
                               font-semibold text-white bg-blue-700
                               hover:bg-blue-600 transition-colors
                               disabled:opacity-50
                               flex items-center justify-center gap-2"
                  >
                    {savingPassword ? (
                      <>
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================================
// GUEST GATE
// ============================================================

function GuestGate({ onSignInClick, onSignUpClick }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-border p-10
                 max-w-sm w-full text-center shadow-sm mx-auto"
      style={{
        background: 'var(--surface)',
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl bg-blue-600/10
                   flex items-center justify-center mx-auto mb-5"
      >
        <ShieldCheck
          size={24}
          className="text-blue-600"
        />
      </div>

      <h2 className="text-xl font-bold text-text-primary">
        Sign in to view your profile
      </h2>

      <p className="text-sm text-text-muted mt-2">
        Your research history, achievements, and account
        settings are waiting for you.
      </p>

      <div className="flex flex-col gap-2 mt-6">
        <button
          type="button"
          onClick={onSignUpClick}
          className="w-full py-2.5 rounded-xl text-sm
                     font-semibold text-white bg-blue-700
                     hover:bg-blue-600 transition-colors"
        >
          Create Account
        </button>

        <button
          type="button"
          onClick={onSignInClick}
          className="w-full py-2.5 rounded-xl border border-border
                     text-sm font-semibold text-text-primary
                     hover:bg-surface-elevated transition-colors"
        >
          Sign In
        </button>
      </div>
    </motion.div>
  )
}

// ============================================================
// PAGE ROOT
// ============================================================

export default function Profile({
  isAuthenticated = false,
  user,
  theme,
  onThemeToggle,
  onSignInClick,
  onSignUpClick,
  onSignOut,
  navbarProps,
  sidebarProps,
}) {
  const navigate = useNavigate()

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false)

  const [profile, setProfile] = useState(() =>
    createFallbackProfile(user)
  )

  const [loading, setLoading] = useState(
    Boolean(isAuthenticated)
  )

  const [error, setError] = useState('')

  // ----------------------------------------------------------
  // LOAD PROFILE
  // ----------------------------------------------------------

  const loadProfile = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await getProfile()

      setProfile((current) => ({
        ...current,
        ...data,
        user: {
          ...current.user,
          ...(data?.user || {}),
        },
        stats: {
          ...current.stats,
          ...(data?.stats || {}),
        },
        growth: {
          ...current.growth,
          ...(data?.growth || {}),
        },
        activity: {
          ...current.activity,
          ...(data?.activity || {}),
          totals: {
            ...current.activity.totals,
            ...(data?.activity?.totals || {}),
          },
        },
        preferences: {
          ...current.preferences,
          ...(data?.preferences || {}),
        },
        watchlist: data?.watchlist || [],
        achievements: data?.achievements || [],
        insights: data?.insights || [],
      }))
    } catch (loadError) {
      setError(
        loadError.message ||
        'Unable to load your profile.'
      )
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  // ----------------------------------------------------------
  // UPDATE PROFILE STATE AFTER API RESPONSE
  // ----------------------------------------------------------

  const handleProfileSaved = useCallback((data) => {
    if (!data) return

    setProfile((current) => ({
      ...current,
      ...data,
      user: {
        ...current.user,
        ...(data.user || {}),
      },
      preferences: {
        ...current.preferences,
        ...(data.preferences || {}),
      },
    }))
  }, [])

  // ----------------------------------------------------------
  // AVATAR
  // ----------------------------------------------------------

  const handleAvatarChange = useCallback((avatarUrl) => {
    setProfile((current) => ({
      ...current,
      user: {
        ...current.user,
        avatarUrl,
      },
    }))
  }, [])

  // ----------------------------------------------------------
  // COGNITIVE STATUS
  // ----------------------------------------------------------

  const handleStatusChange = useCallback(
    async (status) => {
      const previousStatus = profile.cognitiveStatus

      setProfile((current) => ({
        ...current,
        cognitiveStatus: status,
      }))

      try {
        const result = await updateCognitiveStatus(status)

        setProfile((current) => ({
          ...current,
          ...result,
          cognitiveStatus:
            result?.cognitiveStatus ||
            result?.status ||
            status,
        }))
      } catch (statusError) {
        setProfile((current) => ({
          ...current,
          cognitiveStatus: previousStatus,
        }))

        console.error(
          'Failed to update cognitive status:',
          statusError
        )

        throw statusError
      }
    },
    [profile.cognitiveStatus]
  )

  // ----------------------------------------------------------
  // SIGN OUT
  // ----------------------------------------------------------

  const handleSignOut = () => {
    onSignOut?.()
    navigate('/')
  }

  // ----------------------------------------------------------
  // NAVBAR / SIDEBAR PROPS
  // ----------------------------------------------------------

  const resolvedNavbarProps = navbarProps ?? {
    isAuthenticated,
    user,
    theme,
    onThemeToggle,
    onSignInClick,
    onSignUpClick,
    onSignOut,
  }

  const resolvedSidebarProps = sidebarProps ?? {
    user,
    isAuthenticated,
    onSignInClick,
    onSignOut: handleSignOut,
    mobileOpen: mobileSidebarOpen,
    onMobileClose: () =>
      setMobileSidebarOpen(false),
  }

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <div
      className="min-h-screen overflow-x-hidden
                 transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Navbar
        {...resolvedNavbarProps}
        onSidebarToggle={() =>
          setMobileSidebarOpen(true)
        }
      />

      <div className="flex min-h-screen">
        <Sidebar {...resolvedSidebarProps} />

        <div className="flex-1 min-w-0">
          {!isAuthenticated ? (
            <main className="pt-20 sm:pt-24 px-4 pb-12">
              <GuestGate
                onSignInClick={onSignInClick}
                onSignUpClick={onSignUpClick}
              />
            </main>
          ) : (
            <main className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-[1360px] mx-auto">
                {loading ? (
                  <div className="grid lg:grid-cols-[400px_minmax(0,1fr)] gap-8">
                    <div className="space-y-4">
                      <LoadingCard className="h-[520px]" />
                    </div>

                    <div className="space-y-6">
                      <LoadingCard />
                      <LoadingCard />
                      <LoadingCard />
                    </div>
                  </div>
                ) : error ? (
                  <ErrorCard
                    message={error}
                    onRetry={loadProfile}
                  />
                ) : (
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <ProfileSidebar
                      profile={profile}
                      onAvatarChange={handleAvatarChange}
                      onStatusChange={handleStatusChange}
                      onEditProfile={() => {
                        document
                          .getElementById(
                            'account-information'
                          )
                          ?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          })
                      }}
                    />

                    <div className="flex-1 min-w-0 space-y-6">
                      <WelcomeHero profile={profile} />

                      <ProfileCompletion
                        percent={
                          profile.profileCompletion ?? 0
                        }
                        tips={
                          profile.completionTips || []
                        }
                      />

                      <div id="account-information">
                        <AccountInformation
                          profile={profile}
                          onProfileSaved={
                            handleProfileSaved
                          }
                        />
                      </div>

                      <ResearchActivity
                        activity={profile.activity}
                      />

                      <WatchlistSnapshot
                        watchlist={
                          profile.watchlist
                        }
                      />

                      <AIResearchInsights
                        insights={
                          profile.insights
                        }
                      />

                      <AchievementSection
                        achievements={
                          profile.achievements
                        }
                      />

                      <SecuritySection
                        onSignOut={handleSignOut}
                      />
                    </div>
                  </div>
                )}
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  )
}

