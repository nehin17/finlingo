// src/components/pages/Watchlist.jsx

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Star,
  TrendingUp,
  Plus,
  Trash2,
  Bell,
  AlertTriangle,
  CalendarDays,
  BarChart3,
  Swords,
  Activity,
  X,
  ShieldCheck,
  CircleAlert,
  CircleCheck,
  Eye,
  Target,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  Newspaper,
} from 'lucide-react'

import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'

// ─────────────────────────────────────────────────────────────
// DEMO DATA
// Used only when a backend/API is not supplied.
// ─────────────────────────────────────────────────────────────

const demoWatchlist = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '$875.40',
    change: '+4.28%',
    changeNum: 4.28,
    positive: true,
    thesis: 'AI infrastructure leadership',
    sinceAdded: '+11.8%',
    sincePos: true,
    addedDate: 'Dec 2023',
    thesisHealth: 9.2,
    health: 'intact',
    nextAlert: 'Above $900',
    hasAlert: true,
    earningsSoon: false,
    whyMoving: 'AI infrastructure outlook',
    alertType: 'target',
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: '$178.42',
    change: '+1.24%',
    changeNum: 1.24,
    positive: true,
    thesis: 'Services revenue durability',
    sinceAdded: '+3.2%',
    sincePos: true,
    addedDate: 'Jan 2024',
    thesisHealth: 7.1,
    health: 'watch',
    nextAlert: 'Earnings in 12d',
    hasAlert: false,
    earningsSoon: true,
    whyMoving: 'Services resilience',
    alertType: 'earnings',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: '$415.32',
    change: '+0.93%',
    changeNum: 0.93,
    positive: true,
    thesis: 'Azure + Copilot monetisation',
    sinceAdded: '+6.4%',
    sincePos: true,
    addedDate: 'Jan 2024',
    thesisHealth: 8.8,
    health: 'intact',
    nextAlert: 'Monitor cloud guidance',
    hasAlert: false,
    earningsSoon: true,
    whyMoving: 'Azure + Copilot momentum',
    alertType: 'guidance',
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: '$175.21',
    change: '-1.84%',
    changeNum: -1.84,
    positive: false,
    thesis: 'Delivery recovery watch',
    sinceAdded: '-4.9%',
    sincePos: false,
    addedDate: 'Feb 2024',
    thesisHealth: 5.4,
    health: 'review',
    nextAlert: 'Below $210',
    hasAlert: true,
    earningsSoon: false,
    whyMoving: 'Delivery & margin pressure',
    alertType: 'risk',
  },
]

const demoCandidates = [
  {
    ticker: 'AMZN',
    name: 'Amazon.com',
    price: '$183.47',
    change: '+1.58%',
    changeNum: 1.58,
    positive: true,
  },
  {
    ticker: 'META',
    name: 'Meta Platforms',
    price: '$527.14',
    change: '+2.12%',
    changeNum: 2.12,
    positive: true,
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet',
    price: '$171.90',
    change: '+0.43%',
    changeNum: 0.43,
    positive: true,
  },
]

const marketBriefs = [
  {
    ticker: 'NVDA',
    sentiment: 'positive',
    headline:
      'AI infrastructure spending forecasts raised across three major cloud providers.',
  },
  {
    ticker: 'MSFT',
    sentiment: 'positive',
    headline:
      'Azure and Copilot seat adoption continues ahead of consensus estimates.',
  },
  {
    ticker: 'AAPL',
    sentiment: 'neutral',
    headline:
      'Services revenue remains resilient while the hardware upgrade cycle stays softer than expected.',
  },
  {
    ticker: 'TSLA',
    sentiment: 'negative',
    headline:
      'Delivery expectations revised lower and margin pressure continues into the next quarter.',
  },
]

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────

const sentimentConfig = {
  positive: {
    label: 'Positive',
    dotClass: 'bg-green-700',
    textClass: 'text-green-800 dark:text-emerald-400',
  },
  neutral: {
    label: 'Neutral',
    dotClass: 'bg-amber-600',
    textClass: 'text-amber-800 dark:text-amber-400',
  },
  negative: {
    label: 'Negative',
    dotClass: 'bg-red-700',
    textClass: 'text-red-700 dark:text-red-400',
  },
}

const healthStyles = {
  intact: {
    icon: CircleCheck,
    label: 'Intact',
    className:
      'bg-emerald-900 text-emerald-200 border border-emerald-700 hover:bg-emerald-700 hover:text-emerald-100 hover:border-emerald-600',
    indicator: 'bg-emerald-500',
  },
  watch: {
    icon: CircleAlert,
    label: 'Watch',
    className:
      'bg-amber-900 text-amber-200 border border-amber-800 hover:bg-amber-700 hover:text-amber-100 hover:border-amber-600',
    indicator: 'bg-amber-500',
  },
  review: {
    icon: AlertTriangle,
    label: 'Review',
    className:
      'bg-red-900 text-red-200 border border-red-800 hover:bg-red-800 hover:text-red-50 hover:border-red-600',
    indicator: 'bg-red-500',
  },
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function normalizeStock(stock) {
  const changeNum =
    typeof stock.changeNum === 'number'
      ? stock.changeNum
      : Number.parseFloat(
          String(stock.change ?? '0').replace('%', '')
        ) || 0

  return {
    ...stock,
    changeNum,
    positive:
      typeof stock.positive === 'boolean'
        ? stock.positive
        : changeNum >= 0,
    sincePos:
      typeof stock.sincePos === 'boolean'
        ? stock.sincePos
        : !String(stock.sinceAdded ?? '').startsWith('-'),
    thesisHealth:
      typeof stock.thesisHealth === 'number'
        ? stock.thesisHealth
        : 7,
    health: stock.health || 'watch',
    hasAlert: Boolean(stock.hasAlert),
    earningsSoon: Boolean(stock.earningsSoon),
    alertType: stock.alertType || 'target',
    nextAlert: stock.nextAlert || 'No alert set',
  }
}

function formatDateForWatchlist() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

// ─────────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────────

function ChangePill({ value, positive }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-3 py-1
        text-xs font-bold
        border shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${
          positive
            ? `
              bg-emerald-900
              text-emerald-200
              border-emerald-700
              hover:bg-emerald-800
              hover:text-emerald-100
              hover:border-emerald-600
            `
            : `
              bg-red-900
              text-red-200
              border-red-800
              hover:bg-red-800
              hover:text-red-50
              hover:border-red-600
            `
        }
      `}
    >
      <TrendingUp
        size={12}
        className={positive ? '' : 'rotate-180'}
      />

      {value}
    </span>
  )
}

function HealthBadge({ health }) {
  const config = healthStyles[health] || healthStyles.watch
  const Icon = config.icon

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-3 py-1
        text-xs font-semibold
        shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${config.className}
      `}
    >
      <Icon size={12} />
      {config.label}
    </span>
  )
}

function CompanyCircle({ ticker, health = 'intact' }) {
  const indicator =
    healthStyles[health]?.indicator || 'bg-emerald-500'

  return (
    <div className="relative shrink-0">
      <motion.div
        whileHover={{
          scale: 1.06,
          rotate: 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        className="
          w-10 h-10 rounded-xl
          flex items-center justify-center
          bg-blue-700
          border border-emerald-700
          text-white
          shadow-sm
          shadow-emerald-900/20
        "
      >
        <span className="text-xs font-bold">
          {ticker.slice(0, 2)}
        </span>
      </motion.div>

      <span
        className={`
          absolute
          -right-0.5
          -bottom-0.5
          w-2.5
          h-2.5
          rounded-full
          border-2
          border-[var(--surface)]
          ${indicator}
        `}
      />
    </div>
  )
}

function AlertTypeIcon({ type }) {
  if (type === 'earnings') {
    return <CalendarDays size={14} />
  }

  if (type === 'risk') {
    return <AlertTriangle size={14} />
  }

  if (type === 'guidance') {
    return <Activity size={14} />
  }

  return <Target size={14} />
}

// ─────────────────────────────────────────────────────────────
// ACTION BUTTONS
// ─────────────────────────────────────────────────────────────

function RowActions({
  stock,
  openResearch,
  removeItem,
  toggleAlert,
  busy,
}) {
  return (
    <div
      className="
        flex items-center
        justify-end
        gap-1
      "
    >
      <button
        type="button"
        disabled={busy}
        onClick={(event) => {
          event.stopPropagation()
          openResearch(stock.ticker)
        }}
        className="
          w-9 h-9 rounded-xl
          flex items-center justify-center
          text-text-muted
          opacity-0 pointer-events-none
          group-hover:opacity-100
          group-hover:pointer-events-auto
          hover:text-emerald-400
          hover:bg-emerald-950
          hover:-translate-y-0.5
          transition-all duration-200
          disabled:opacity-40
        "
        aria-label={`Research ${stock.ticker}`}
        title="Open research"
      >
        <ArrowUpRight size={15} />
      </button>

      <button
        type="button"
        disabled={busy}
        onClick={(event) => {
          event.stopPropagation()
          removeItem(stock.ticker)
        }}
        className="
          w-9 h-9 rounded-xl
          flex items-center justify-center
          text-text-muted
          opacity-0 pointer-events-none
          group-hover:opacity-100
          group-hover:pointer-events-auto
          hover:text-red-300
          hover:bg-red-950
          hover:-translate-y-0.5
          transition-all duration-200
          disabled:opacity-40
        "
        aria-label={`Remove ${stock.ticker}`}
        title="Remove from watchlist"
      >
        <Trash2 size={15} />
      </button>

      <button
        type="button"
        disabled={busy}
        onClick={(event) => {
          event.stopPropagation()
          toggleAlert(stock.ticker)
        }}
        className={`
          w-9 h-9 rounded-xl
          flex items-center justify-center
          border
          transition-all duration-200
          disabled:opacity-40
          ${
            stock.hasAlert
              ? `
                bg-amber-950
                text-amber-300
                border-amber-800
                hover:bg-amber-800
                hover:text-amber-100
                hover:border-amber-600
                hover:-translate-y-0.5
              `
              : `
                bg-transparent
                text-text-muted
                border-transparent
                hover:text-amber-300
                hover:bg-amber-950
                hover:border-amber-800
                hover:-translate-y-0.5
              `
          }
        `}
        aria-label={
          stock.hasAlert
            ? `Disable alert for ${stock.ticker}`
            : `Enable alert for ${stock.ticker}`
        }
        title={
          stock.hasAlert
            ? 'Disable alert'
            : 'Enable alert'
        }
      >
        <Bell
          size={15}
          className={
            stock.hasAlert ? 'fill-current' : ''
          }
        />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Watchlist({
  isAuthenticated,
  user,
  theme,
  onThemeToggle,
  onSignInClick,
  onSignUpClick,
  onSignOut,
  navbarProps,
  sidebarProps,

  // Optional backend adapter.
  //
  // Expected shape:
  //
  // watchlistApi={{
  //   getWatchlist: async ({ user }) => [...],
  //   addToWatchlist: async ({ ticker, user }) => stock,
  //   removeFromWatchlist: async ({ ticker, user }) => {},
  //   toggleAlert: async ({ ticker, enabled, user }) => stock,
  // }}
  //
  watchlistApi,
}) {
  const navigate = useNavigate()

  const [watchlist, setWatchlist] = useState(
    () => demoWatchlist.map(normalizeStock)
  )

  const [showAdd, setShowAdd] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false)

  const [loading, setLoading] = useState(
    Boolean(watchlistApi?.getWatchlist)
  )

  const [busyTicker, setBusyTicker] = useState(null)

  const [error, setError] = useState('')

  // ─────────────────────────────────────────────────────────
  // LOAD WATCHLIST
  // ─────────────────────────────────────────────────────────

  const loadWatchlist = useCallback(async () => {
    if (!watchlistApi?.getWatchlist) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const result =
        await watchlistApi.getWatchlist({
          user,
        })

      const items = Array.isArray(result)
        ? result
        : result?.watchlist || []

      setWatchlist(items.map(normalizeStock))
    } catch (err) {
      console.error(
        'Failed to load watchlist:',
        err
      )

      setError(
        err?.message ||
          'Unable to load your watchlist.'
      )
    } finally {
      setLoading(false)
    }
  }, [watchlistApi, user])

  useEffect(() => {
    loadWatchlist()
  }, [loadWatchlist])

  // ─────────────────────────────────────────────────────────
  // DERIVED VALUES
  // ─────────────────────────────────────────────────────────

  const gainers = useMemo(
    () =>
      watchlist.filter(
        (stock) => stock.positive
      ).length,
    [watchlist]
  )

  const needsReview = useMemo(
    () =>
      watchlist.filter(
        (stock) => stock.health === 'review'
      ).length,
    [watchlist]
  )

  const activeAlerts = useMemo(
    () =>
      watchlist.filter(
        (stock) => stock.hasAlert
      ).length,
    [watchlist]
  )

  const bestPerformer = useMemo(() => {
    if (!watchlist.length) return null

    return [...watchlist].sort(
      (a, b) => b.changeNum - a.changeNum
    )[0]
  }, [watchlist])

  const upcomingEarnings = useMemo(
    () =>
      watchlist.filter(
        (stock) => stock.earningsSoon
      ).length,
    [watchlist]
  )

  const averageMove = useMemo(() => {
    if (!watchlist.length) {
      return '0.00'
    }

    const average =
      watchlist.reduce(
        (sum, stock) =>
          sum + Math.abs(stock.changeNum),
        0
      ) / watchlist.length

    return average.toFixed(2)
  }, [watchlist])

  // ─────────────────────────────────────────────────────────
  // ACTIONS
  // ─────────────────────────────────────────────────────────

  const removeItem = async (ticker) => {
    const previous = watchlist

    // Optimistic UI update.
    setWatchlist((current) =>
      current.filter(
        (stock) => stock.ticker !== ticker
      )
    )

    setBusyTicker(ticker)
    setError('')

    try {
      if (watchlistApi?.removeFromWatchlist) {
        await watchlistApi.removeFromWatchlist({
          ticker,
          user,
        })
      }
    } catch (err) {
      console.error(
        'Failed to remove watchlist item:',
        err
      )

      // Roll back if backend fails.
      setWatchlist(previous)

      setError(
        err?.message ||
          `Unable to remove ${ticker} from your watchlist.`
      )
    } finally {
      setBusyTicker(null)
    }
  }

  const toggleAlert = async (ticker) => {
    const stock = watchlist.find(
      (item) => item.ticker === ticker
    )

    if (!stock) return

    const previous = watchlist
    const enabled = !stock.hasAlert

    const updatedNextAlert = enabled
      ? stock.nextAlert === 'No alert set'
        ? 'Price alert enabled'
        : stock.nextAlert
      : 'No alert set'

    // Optimistic update.
    setWatchlist((current) =>
      current.map((item) =>
        item.ticker === ticker
          ? {
              ...item,
              hasAlert: enabled,
              nextAlert: updatedNextAlert,
            }
          : item
      )
    )

    setBusyTicker(ticker)
    setError('')

    try {
      if (watchlistApi?.toggleAlert) {
        const result =
          await watchlistApi.toggleAlert({
            ticker,
            enabled,
            user,
          })

        // Backend can return the updated stock.
        if (result) {
          const updatedStock =
            normalizeStock(
              result?.stock || result
            )

          if (updatedStock.ticker) {
            setWatchlist((current) =>
              current.map((item) =>
                item.ticker === ticker
                  ? {
                      ...item,
                      ...updatedStock,
                    }
                  : item
              )
            )
          }
        }
      }
    } catch (err) {
      console.error(
        'Failed to toggle alert:',
        err
      )

      setWatchlist(previous)

      setError(
        err?.message ||
          `Unable to update the alert for ${ticker}.`
      )
    } finally {
      setBusyTicker(null)
    }
  }

  const addItem = async (candidate) => {
    if (
      watchlist.some(
        (stock) =>
          stock.ticker === candidate.ticker
      )
    ) {
      return
    }

    const fallbackStock = normalizeStock({
      ...candidate,
      changeNum:
        candidate.changeNum ??
        Number.parseFloat(
          String(candidate.change).replace(
            '%',
            ''
          )
        ),
      thesis: 'Added to watchlist',
      sinceAdded: '0.0%',
      sincePos: true,
      addedDate: formatDateForWatchlist(),
      thesisHealth: 7,
      health: 'watch',
      nextAlert: 'No alert set',
      hasAlert: false,
      earningsSoon: false,
      whyMoving: 'Market movement',
      alertType: 'target',
    })

    const previous = watchlist

    // Optimistic update.
    setWatchlist((current) => [
      ...current,
      fallbackStock,
    ])

    setBusyTicker(candidate.ticker)
    setError('')

    try {
      if (watchlistApi?.addToWatchlist) {
        const result =
          await watchlistApi.addToWatchlist({
            ticker: candidate.ticker,
            user,
          })

        // Backend can return the canonical stock.
        if (result) {
          const returnedStock =
            normalizeStock(
              result?.stock || result
            )

          if (returnedStock.ticker) {
            setWatchlist((current) =>
              current.map((item) =>
                item.ticker ===
                candidate.ticker
                  ? {
                      ...item,
                      ...returnedStock,
                    }
                  : item
              )
            )
          }
        }
      }

      setShowAdd(false)
    } catch (err) {
      console.error(
        'Failed to add watchlist item:',
        err
      )

      setWatchlist(previous)

      setError(
        err?.message ||
          `Unable to add ${candidate.ticker} to your watchlist.`
      )
    } finally {
      setBusyTicker(null)
    }
  }

  const openResearch = (ticker) => {
    navigate(
      `/markets?ticker=${encodeURIComponent(
        ticker
      )}`
    )
  }

  const openAlertReview = () => {
    const alertStock = watchlist.find(
      (stock) => stock.hasAlert
    )

    if (alertStock) {
      openResearch(alertStock.ticker)
      return
    }

    navigate('/markets')
  }

  // ─────────────────────────────────────────────────────────
  // RESOLVED NAVBAR / SIDEBAR PROPS
  // ─────────────────────────────────────────────────────────

  const resolvedNavbarProps =
    navbarProps ?? {
      isAuthenticated,
      user,
      theme,
      onThemeToggle,
      onSignInClick,
      onSignUpClick,
      onSignOut,
      onSidebarToggle: () =>
        setMobileSidebarOpen(true),
    }

  const resolvedSidebarProps =
    sidebarProps ?? {
      user,
      isAuthenticated,
      onSignInClick,
      onSignOut,
      mobileOpen: mobileSidebarOpen,
      onMobileClose: () =>
        setMobileSidebarOpen(false),
    }

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────

  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        transition-colors duration-300
      "
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
          <main className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-10">
            <div className="max-w-[1200px] mx-auto space-y-7">

              {/* ───────────────────────────────────────────
                  ERROR
              ─────────────────────────────────────────── */}

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    className="
                      flex items-start
                      gap-3
                      rounded-2xl
                      border border-red-800
                      bg-red-950/60
                      px-4 py-3
                      text-sm
                      text-red-200
                    "
                  >
                    <AlertTriangle
                      size={17}
                      className="mt-0.5 shrink-0"
                    />

                    <p className="flex-1">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setError('')
                      }
                      className="
                        text-red-300
                        hover:text-white
                      "
                      aria-label="Dismiss error"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ───────────────────────────────────────────
                  HERO
              ─────────────────────────────────────────── */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  rounded-3xl
                  border
                  p-6 sm:p-8 lg:p-9
                  shadow-sm
                "
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div
                  className="
                    flex flex-col
                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                    gap-7
                  "
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        whileHover={{
                          scale: 1.04,
                          rotate: -2,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 20,
                        }}
                        className="
                          w-12 h-12 rounded-2xl
                          bg-blue-100
                          dark:bg-blue-900/30
                          flex items-center
                          justify-center shrink-0
                          border border-blue-200
                        "
                      >
                        <Star
                          size={24}
                          className="
                            text-blue-700
                            dark:text-blue-400
                            fill-blue-700
                            dark:fill-blue-400
                          "
                        />
                      </motion.div>

                      <div>
                        <h1
                          className="
                            text-3xl font-bold
                            text-text-primary
                          "
                        >
                          Watchlist
                        </h1>

                        <p
                          className="
                            text-text-muted
                            mt-0.5
                          "
                        >
                          Monitor positions · Track thesis
                          integrity · Act quickly
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        flex flex-wrap
                        items-center
                        gap-x-5 gap-y-2
                        text-sm
                        text-text-muted
                        mt-5
                      "
                    >
                      <div className="flex items-center gap-2">
                        <Eye size={14} />
                        {watchlist.length} companies
                        tracked
                      </div>

                      <div className="flex items-center gap-2">
                        <Target size={14} />
                        {gainers} advancing today
                      </div>

                      <div
                        className="
                          flex items-center gap-2
                          font-semibold
                          text-emerald-700
                          dark:text-emerald-400
                        "
                      >
                        <span className="relative flex h-2 w-2">
                          <span
                            className="
                              absolute inline-flex
                              h-full w-full
                              rounded-full
                              bg-emerald-500
                              opacity-60
                              animate-ping
                            "
                          />

                          <span
                            className="
                              relative inline-flex
                              h-2 w-2
                              rounded-full
                              bg-emerald-600
                              dark:bg-emerald-400
                            "
                          />
                        </span>

                        <ShieldCheck size={14} />

                        Monitoring active
                      </div>
                    </div>
                  </div>

                  <div
                    className="
                      flex flex-col
                      sm:flex-row
                      lg:flex-col
                      items-stretch
                      sm:items-end
                      lg:items-end
                      gap-3
                      shrink-0
                    "
                  >
                    <div
                      className="
                        hidden sm:flex
                        items-center
                        gap-3
                        px-4 py-3
                        rounded-2xl
                        border border-border
                        bg-surface-elevated/40
                      "
                    >
                      <div
                        className="
                          w-8 h-8
                          rounded-xl
                          bg-emerald-500/10
                          flex items-center
                          justify-center
                        "
                      >
                        <Activity
                          size={15}
                          className="
                            text-emerald-600
                            dark:text-emerald-400
                          "
                        />
                      </div>

                      <div>
                        <p
                          className="
                            text-xs font-semibold
                            text-text-primary
                          "
                        >
                          Markets monitored
                        </p>

                        <p
                          className="
                            text-[11px]
                            text-text-muted
                            mt-0.5
                          "
                        >
                          {loading
                            ? 'Syncing...'
                            : 'Monitoring active'}
                        </p>
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() =>
                        setShowAdd(true)
                      }
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="
                        flex items-center
                        justify-center
                        gap-2
                        px-5 py-3
                        rounded-xl
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        bg-blue-700
                        border border-emerald-700
                        hover:bg-emerald-700
                        hover:border-emerald-600
                        hover:shadow-md
                        hover:shadow-emerald-900/20
                        transition-all
                        duration-200
                      "
                    >
                      <Plus size={16} />
                      Add Company
                    </motion.button>
                  </div>
                </div>
              </motion.section>

              {/* ───────────────────────────────────────────
                  QUICK ACTIONS
              ─────────────────────────────────────────── */}

              <section className="grid sm:grid-cols-3 gap-4">
                <motion.button
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  onClick={() =>
                    navigate('/markets')
                  }
                  className="
                    rounded-2xl
                    border border-border
                    p-5
                    text-left
                    hover:border-blue-700/60
                    hover:bg-blue-50
                    dark:hover:bg-blue-950/20
                    transition-all
                    duration-200
                    shadow-sm
                    group
                  "
                  style={{
                    background:
                      'var(--surface)',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-blue-100
                        dark:bg-blue-900/30
                        flex items-center
                        justify-center
                        mb-4
                      "
                    >
                      <BarChart3
                        size={18}
                        className="
                          text-blue-700
                          dark:text-blue-400
                        "
                      />
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="
                        text-text-primary
                        transition-transform
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>

                  <p
                    className="
                      text-sm font-bold
                      text-text-primary
                      mb-1
                    "
                  >
                    Open Markets
                  </p>

                  <p
                    className="
                      text-xs
                      text-text-muted
                      leading-relaxed
                    "
                  >
                    Continue detailed company research
                  </p>
                </motion.button>

                <motion.button
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  transition={{
                    delay: 0.07,
                  }}
                  onClick={() =>
                    navigate('/battle')
                  }
                  className="
                    rounded-2xl
                    border border-border
                    p-5
                    text-left
                    hover:border-emerald-700/60
                    hover:bg-emerald-950/20
                    transition-all
                    duration-200
                    shadow-sm
                    group
                  "
                  style={{
                    background:
                      'var(--surface)',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-emerald-500/10
                        flex items-center
                        justify-center
                        mb-4
                      "
                    >
                      <Swords
                        size={18}
                        className="
                          text-emerald-700
                          dark:text-emerald-400
                        "
                      />
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="
                        text-text-muted
                        group-hover:text-emerald-500
                        transition-colors
                      "
                    />
                  </div>

                  <p
                    className="
                      text-sm font-bold
                      text-text-primary
                      mb-1
                    "
                  >
                    Compare Leaders
                  </p>

                  <p
                    className="
                      text-xs
                      text-text-muted
                      leading-relaxed
                    "
                  >
                    Launch NVDA vs MSFT in Battle Mode
                  </p>
                </motion.button>

                <motion.button
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  transition={{
                    delay: 0.14,
                  }}
                  onClick={openAlertReview}
                  className="
                    rounded-2xl
                    border border-border
                    p-5
                    text-left
                    hover:border-amber-700/60
                    hover:bg-amber-950/20
                    transition-all
                    duration-200
                    shadow-sm
                    group
                  "
                  style={{
                    background:
                      'var(--surface)',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-amber-500/10
                        flex items-center
                        justify-center
                        mb-4
                      "
                    >
                      <Bell
                        size={18}
                        className="
                          text-amber-600
                          dark:text-amber-400
                        "
                      />
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="
                        text-text-muted
                        group-hover:text-amber-500
                        transition-colors
                      "
                    />
                  </div>

                  <p
                    className="
                      text-sm font-bold
                      text-text-primary
                      mb-1
                    "
                  >
                    Review Alerts
                  </p>

                  <p
                    className="
                      text-xs
                      text-text-muted
                      leading-relaxed
                    "
                  >
                    Check {activeAlerts} active price
                    triggers
                  </p>
                </motion.button>
              </section>

              {/* ───────────────────────────────────────────
                  SUMMARY CARDS
              ─────────────────────────────────────────── */}

              <section
                className="
                  grid grid-cols-2
                  lg:grid-cols-4
                  gap-4
                "
              >
                {[
                  {
                    label: 'Needs Review',
                    value: needsReview,
                    suffix:
                      needsReview === 1
                        ? 'stock'
                        : 'stocks',
                    icon: AlertTriangle,
                    iconBg:
                      'rgba(239,68,68,0.10)',
                    iconColor: '#EF4444',
                  },
                  {
                    label: 'Best Performer',
                    value:
                      bestPerformer?.ticker ??
                      '—',
                    suffix:
                      bestPerformer?.change ??
                      '',
                    icon: TrendingUp,
                    iconBg:
                      'rgba(16,185,129,0.10)',
                    iconColor: '#10B981',
                  },
                  {
                    label: 'Upcoming Earnings',
                    value: upcomingEarnings,
                    suffix:
                      upcomingEarnings === 1
                        ? 'company'
                        : 'companies',
                    icon: CalendarDays,
                    iconBg:
                      'rgba(245,158,11,0.10)',
                    iconColor: '#F59E0B',
                  },
                  {
                    label: 'Avg. Daily Change',
                    value: `${averageMove}%`,
                    suffix:
                      'average move today',
                    icon: Activity,
                    iconBg:
                      'rgba(16,185,129,0.10)',
                    iconColor: '#10B981',
                  },
                ].map((card, index) => {
                  const Icon = card.icon

                  return (
                    <motion.div
                      key={card.label}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      className="
                        rounded-2xl
                        border border-border
                        p-5
                        shadow-sm
                        transition-shadow
                        duration-200
                        hover:shadow-md
                      "
                      style={{
                        background:
                          'var(--surface)',
                      }}
                    >
                      <div
                        className="
                          flex items-center
                          justify-between
                          mb-3
                        "
                      >
                        <p
                          className="
                            text-xs font-semibold
                            uppercase
                            tracking-wide
                            text-text-muted
                          "
                        >
                          {card.label}
                        </p>

                        <div
                          className="
                            w-9 h-9
                            rounded-xl
                            flex items-center
                            justify-center
                          "
                          style={{
                            background:
                              card.iconBg,
                          }}
                        >
                          <Icon
                            size={16}
                            style={{
                              color:
                                card.iconColor,
                            }}
                          />
                        </div>
                      </div>

                      <p
                        className="
                          text-2xl
                          font-bold
                          text-text-primary
                          leading-tight
                        "
                      >
                        {card.value}
                      </p>

                      <p
                        className="
                          text-xs
                          text-text-muted
                          mt-1
                        "
                      >
                        {card.suffix}
                      </p>
                    </motion.div>
                  )
                })}
              </section>

              {/* ───────────────────────────────────────────
                  SNAPSHOT
              ─────────────────────────────────────────── */}

              <section
                className="
                  rounded-3xl
                  border border-border
                  p-6
                  shadow-sm
                "
                style={{
                  background:
                    'var(--surface)',
                }}
              >
                <div
                  className="
                    flex flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                  "
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h2
                        className="
                          text-base font-bold
                          text-text-primary
                        "
                      >
                        Watchlist Snapshot
                      </h2>

                      <span
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          px-2 py-1
                          rounded-full
                          bg-emerald-500/10
                          text-emerald-700
                          dark:text-emerald-400
                        "
                      >
                        Today
                      </span>
                    </div>

                    <p
                      className="
                        text-sm
                        text-text-muted
                        mt-1
                      "
                    >
                      {gainers} of {watchlist.length}{' '}
                      tracked companies are advancing.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p
                        className="
                          text-xs
                          text-text-muted
                        "
                      >
                        Advancing
                      </p>

                      <p
                        className="
                          text-lg
                          font-bold
                          text-emerald-700
                          dark:text-emerald-400
                        "
                      >
                        {watchlist.length
                          ? Math.round(
                              (gainers /
                                watchlist.length) *
                                100
                            )
                          : 0}
                        %
                      </p>
                    </div>

                    <div
                      className="
                        w-28 sm:w-40
                        h-2
                        rounded-full
                        bg-surface-elevated
                        overflow-hidden
                      "
                    >
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${
                            watchlist.length
                              ? (gainers /
                                  watchlist.length) *
                                100
                              : 0
                          }%`,
                        }}
                        transition={{
                          duration: 0.7,
                        }}
                        className="
                          h-full
                          rounded-full
                          bg-emerald-600
                        "
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ───────────────────────────────────────────
                  WHAT CHANGED
              ─────────────────────────────────────────── */}

              <section
                className="
                  rounded-3xl
                  border border-border
                  overflow-hidden
                  shadow-sm
                "
                style={{
                  background:
                    'var(--surface)',
                }}
              >
                <div
                  className="
                    px-6 py-5
                    border-b border-border
                    flex items-center
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h2
                        className="
                          text-lg font-bold
                          text-text-primary
                        "
                      >
                        What Changed Today
                      </h2>

                      <Newspaper
                        size={16}
                        className="
                          text-emerald-600
                          dark:text-emerald-400
                        "
                      />
                    </div>

                    <p
                      className="
                        text-sm
                        text-text-muted
                        mt-0.5
                      "
                    >
                      Market brief updates for your
                      tracked companies
                    </p>
                  </div>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      font-semibold
                      px-2.5 py-1
                      rounded-full
                      bg-emerald-950
                      text-emerald-300
                      border border-blue-700
                    "
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="
                          absolute
                          inline-flex
                          h-full w-full
                          rounded-full
                          bg-emerald-400
                          opacity-60
                          animate-ping
                        "
                      />

                      <span
                        className="
                          relative
                          inline-flex
                          h-1.5 w-1.5
                          rounded-full
                          bg-emerald-400
                        "
                      />
                    </span>

                    Live
                  </span>
                </div>

                <div className="divide-y divide-border">
                  {marketBriefs.map(
                    (brief, index) => {
                      const config =
                        sentimentConfig[
                          brief.sentiment
                        ]

                      return (
                        <motion.button
                          type="button"
                          key={brief.ticker}
                          initial={{
                            opacity: 0,
                            x: -8,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          whileHover={{
                            x: 4,
                          }}
                          transition={{
                            delay:
                              index * 0.07,
                          }}
                          onClick={() =>
                            openResearch(
                              brief.ticker
                            )
                          }
                          className="
                            w-full
                            px-6 py-4
                            flex items-start
                            gap-4
                            text-left
                            hover:bg-surface-elevated/40
                            transition-all
                            duration-200
                            group
                          "
                        >
                          <span
                            className={`
                              mt-2
                              w-2 h-2
                              rounded-full
                              flex-shrink-0
                              ${config.dotClass}
                              ${
                                index === 0
                                  ? 'animate-pulse'
                                  : ''
                              }
                            `}
                          />

                          <span
                            className="
                              text-sm font-bold
                              text-emerald-700
                              dark:text-emerald-400
                              flex-shrink-0
                              w-12
                            "
                          >
                            {brief.ticker}
                          </span>

                          <div className="flex-1 min-w-0">
                            <p
                              className="
                                text-sm
                                text-text-secondary
                                leading-relaxed
                              "
                            >
                              {brief.headline}
                            </p>

                            <div
                              className="
                                flex items-center
                                gap-2 mt-2
                              "
                            >
                              <span
                                className={`
                                  text-[11px]
                                  font-semibold
                                  ${config.textClass}
                                `}
                              >
                                {config.label}
                              </span>

                              <span className="text-text-muted">
                                ·
                              </span>

                              <span
                                className="
                                  text-[11px]
                                  text-text-muted
                                "
                              >
                                View research
                              </span>

                              <ArrowUpRight
                                size={12}
                                className="
                                  text-text-muted
                                  group-hover:text-emerald-500
                                  transition-colors
                                "
                              />
                            </div>
                          </div>
                        </motion.button>
                      )
                    }
                  )}
                </div>
              </section>

              {/* ───────────────────────────────────────────
                  TRACKED COMPANIES
              ─────────────────────────────────────────── */}

              <section
                className="
                  rounded-3xl
                  border border-border
                  overflow-hidden
                  shadow-sm
                "
                style={{
                  background:
                    'var(--surface)',
                }}
              >
                <div
                  className="
                    px-6 py-5
                    border-b border-border
                  "
                >
                  <h2
                    className="
                      text-lg font-bold
                      text-text-primary
                    "
                  >
                    Tracked Companies
                  </h2>

                  <p
                    className="
                      text-sm
                      text-text-muted
                      mt-0.5
                    "
                  >
                    Select a company to continue your
                    research
                  </p>
                </div>

                {loading ? (
                  <div className="p-10">
                    <div className="space-y-4 animate-pulse">
                      {[1, 2, 3, 4].map(
                        (item) => (
                          <div
                            key={item}
                            className="
                              h-14
                              rounded-xl
                              bg-surface-elevated
                            "
                          />
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* DESKTOP TABLE */}

                    <div
                      className="
                        hidden lg:block
                        overflow-x-auto
                      "
                    >
                      <table
                        className="
                          w-full
                          min-w-[1080px]
                          border-collapse
                        "
                      >
                        <thead
                          className="
                            border-b border-border
                            text-xs uppercase
                            tracking-wide
                            text-text-muted
                          "
                          style={{
                            background:
                              'var(--surface-elevated)',
                          }}
                        >
                          <tr>
                            <th className="text-left px-6 py-3 font-semibold">
                              Company
                            </th>

                            <th className="text-left px-6 py-3 font-semibold">
                              Thesis
                            </th>

                            <th className="text-left px-6 py-3 font-semibold">
                              Health
                            </th>

                            <th className="text-right px-6 py-3 font-semibold">
                              Today
                            </th>

                            <th className="text-right px-6 py-3 font-semibold">
                              Since Added
                            </th>

                            <th className="text-left px-6 py-3 font-semibold">
                              Why It's Moving
                            </th>

                            <th className="text-left px-6 py-3 font-semibold">
                              Alert
                            </th>

                            <th className="text-right px-6 py-3 font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                          <AnimatePresence>
                            {watchlist.map(
                              (stock) => (
                                <motion.tr
                                  key={
                                    stock.ticker
                                  }
                                  layout
                                  initial={{
                                    opacity: 0,
                                  }}
                                  animate={{
                                    opacity: 1,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    x: -24,
                                  }}
                                  whileHover={{
                                    x: 2,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                  }}
                                  onClick={() =>
                                    openResearch(
                                      stock.ticker
                                    )
                                  }
                                  className="
                                    group
                                    cursor-pointer
                                    hover:bg-surface-elevated/40
                                    transition-all
                                    duration-200
                                    align-middle
                                  "
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <CompanyCircle
                                        ticker={
                                          stock.ticker
                                        }
                                        health={
                                          stock.health
                                        }
                                      />

                                      <div>
                                        <p
                                          className="
                                            font-bold
                                            text-emerald-700
                                            dark:text-emerald-400
                                            group-hover:text-emerald-500
                                            transition-colors
                                          "
                                        >
                                          {
                                            stock.ticker
                                          }
                                        </p>

                                        <p
                                          className="
                                            text-xs
                                            text-text-muted
                                          "
                                        >
                                          {
                                            stock.name
                                          }
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td
                                    className="
                                      px-6 py-4
                                      max-w-[220px]
                                    "
                                  >
                                    <p
                                      className="
                                        text-sm
                                        text-text-secondary
                                        truncate
                                      "
                                    >
                                      {
                                        stock.thesis
                                      }
                                    </p>

                                    <p
                                      className="
                                        text-xs
                                        text-text-muted
                                        mt-0.5
                                      "
                                    >
                                      Thesis health ·{' '}
                                      {Number(
                                        stock.thesisHealth
                                      ).toFixed(1)}
                                      /10
                                    </p>
                                  </td>

                                  <td className="px-6 py-4">
                                    <HealthBadge
                                      health={
                                        stock.health
                                      }
                                    />
                                  </td>

                                  <td className="px-6 py-4 text-right">
                                    <ChangePill
                                      value={
                                        stock.change
                                      }
                                      positive={
                                        stock.positive
                                      }
                                    />
                                  </td>

                                  <td className="px-6 py-4 text-right">
                                    <ChangePill
                                      value={
                                        stock.sinceAdded
                                      }
                                      positive={
                                        stock.sincePos
                                      }
                                    />
                                  </td>

                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="
                                          w-7 h-7
                                          rounded-lg
                                          flex items-center
                                          justify-center
                                          bg-emerald-500/10
                                          text-emerald-600
                                          dark:text-emerald-400
                                          shrink-0
                                        "
                                      >
                                        <TrendingUp
                                          size={13}
                                          className={
                                            stock.positive
                                              ? ''
                                              : 'rotate-180'
                                          }
                                        />
                                      </span>

                                      <span
                                        className="
                                          text-xs
                                          font-medium
                                          text-text-secondary
                                          whitespace-nowrap
                                        "
                                      >
                                        {
                                          stock.whyMoving
                                        }
                                      </span>
                                    </div>
                                  </td>

                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`
                                          w-7 h-7
                                          rounded-lg
                                          flex items-center
                                          justify-center
                                          shrink-0
                                          ${
                                            stock.hasAlert
                                              ? `
                                                bg-amber-500/10
                                                text-amber-600
                                                dark:text-amber-400
                                              `
                                              : `
                                                bg-surface-elevated
                                                text-text-muted
                                              `
                                          }
                                        `}
                                      >
                                        <AlertTypeIcon
                                          type={
                                            stock.alertType
                                          }
                                        />
                                      </span>

                                      <p
                                        className="
                                          text-xs
                                          text-text-secondary
                                          whitespace-nowrap
                                        "
                                      >
                                        {
                                          stock.nextAlert
                                        }
                                      </p>
                                    </div>
                                  </td>

                                  <td className="px-6 py-4">
                                    <RowActions
                                      stock={
                                        stock
                                      }
                                      openResearch={
                                        openResearch
                                      }
                                      removeItem={
                                        removeItem
                                      }
                                      toggleAlert={
                                        toggleAlert
                                      }
                                      busy={
                                        busyTicker ===
                                        stock.ticker
                                      }
                                    />
                                  </td>
                                </motion.tr>
                              )
                            )}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>

                    {/* MOBILE */}

                    <div
                      className="
                        lg:hidden
                        divide-y divide-border
                      "
                    >
                      <AnimatePresence>
                        {watchlist.map(
                          (stock) => (
                            <motion.div
                              key={
                                stock.ticker
                              }
                              layout
                              initial={{
                                opacity: 0,
                                y: -8,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                x: -24,
                                height: 0,
                              }}
                              onClick={() =>
                                openResearch(
                                  stock.ticker
                                )
                              }
                              className="
                                p-4
                                cursor-pointer
                                hover:bg-surface-elevated/40
                                transition-all
                                duration-200
                                group
                              "
                            >
                              <div className="flex items-start gap-3">
                                <CompanyCircle
                                  ticker={
                                    stock.ticker
                                  }
                                  health={
                                    stock.health
                                  }
                                />

                                <div className="flex-1 min-w-0">
                                  <div
                                    className="
                                      flex items-center
                                      justify-between
                                      gap-3 mb-1
                                    "
                                  >
                                    <div>
                                      <span
                                        className="
                                          font-bold
                                          text-emerald-700
                                          dark:text-emerald-400
                                        "
                                      >
                                        {
                                          stock.ticker
                                        }
                                      </span>

                                      <p
                                        className="
                                          text-xs
                                          text-text-muted
                                        "
                                      >
                                        {
                                          stock.name
                                        }
                                      </p>
                                    </div>

                                    <ChangePill
                                      value={
                                        stock.change
                                      }
                                      positive={
                                        stock.positive
                                      }
                                    />
                                  </div>

                                  <p
                                    className="
                                      text-xs
                                      text-text-muted
                                      truncate mb-3
                                    "
                                  >
                                    {
                                      stock.thesis
                                    }
                                  </p>

                                  <div
                                    className="
                                      flex items-center
                                      gap-2 flex-wrap
                                    "
                                  >
                                    <HealthBadge
                                      health={
                                        stock.health
                                      }
                                    />

                                    <ChangePill
                                      value={
                                        stock.sinceAdded
                                      }
                                      positive={
                                        stock.sincePos
                                      }
                                    />
                                  </div>

                                  <div
                                    className="
                                      flex items-center
                                      gap-2 mt-3
                                    "
                                  >
                                    <span
                                      className="
                                        w-6 h-6
                                        rounded-lg
                                        flex items-center
                                        justify-center
                                        bg-emerald-500/10
                                        text-emerald-600
                                        dark:text-emerald-400
                                      "
                                    >
                                      <TrendingUp
                                        size={12}
                                        className={
                                          stock.positive
                                            ? ''
                                            : 'rotate-180'
                                        }
                                      />
                                    </span>

                                    <span
                                      className="
                                        text-xs
                                        text-text-muted
                                      "
                                    >
                                      {
                                        stock.whyMoving
                                      }
                                    </span>
                                  </div>

                                  <div
                                    className="
                                      flex items-center
                                      gap-2 mt-2
                                      text-text-muted
                                    "
                                  >
                                    <AlertTypeIcon
                                      type={
                                        stock.alertType
                                      }
                                    />

                                    <span
                                      className="
                                        text-xs
                                      "
                                    >
                                      {
                                        stock.nextAlert
                                      }
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="
                                    flex items-center
                                    gap-1
                                    shrink-0
                                  "
                                >
                                  <button
                                    type="button"
                                    disabled={
                                      busyTicker ===
                                      stock.ticker
                                    }
                                    onClick={(
                                      event
                                    ) => {
                                      event.stopPropagation()
                                      toggleAlert(
                                        stock.ticker
                                      )
                                    }}
                                    className={`
                                      w-8 h-8
                                      rounded-lg
                                      flex items-center
                                      justify-center
                                      border
                                      transition-all
                                      disabled:opacity-40
                                      ${
                                        stock.hasAlert
                                          ? `
                                            bg-amber-950
                                            text-amber-300
                                            border-amber-800
                                          `
                                          : `
                                            text-text-muted
                                            border-transparent
                                            hover:text-amber-300
                                            hover:bg-amber-950
                                            hover:border-amber-800
                                          `
                                      }
                                    `}
                                    aria-label={
                                      stock.hasAlert
                                        ? `Disable alert for ${stock.ticker}`
                                        : `Enable alert for ${stock.ticker}`
                                    }
                                  >
                                    <Bell
                                      size={14}
                                      className={
                                        stock.hasAlert
                                          ? 'fill-current'
                                          : ''
                                      }
                                    />
                                  </button>

                                  <button
                                    type="button"
                                    disabled={
                                      busyTicker ===
                                      stock.ticker
                                    }
                                    onClick={(
                                      event
                                    ) => {
                                      event.stopPropagation()
                                      removeItem(
                                        stock.ticker
                                      )
                                    }}
                                    className="
                                      w-8 h-8
                                      rounded-lg
                                      flex items-center
                                      justify-center
                                      text-text-muted
                                      hover:text-red-300
                                      hover:bg-red-950
                                      transition-all
                                      disabled:opacity-40
                                    "
                                    aria-label={`Remove ${stock.ticker}`}
                                  >
                                    <Trash2
                                      size={14}
                                    />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}

                {/* EMPTY STATE */}

                {!loading &&
                  watchlist.length === 0 && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        px-6 py-16
                        text-center
                      "
                    >
                      <div
                        className="
                          w-12 h-12
                          rounded-2xl
                          bg-blue-700
                          border border-emerald-700
                          mx-auto mb-4
                          flex items-center
                          justify-center
                          shadow-sm
                        "
                      >
                        <Star
                          size={22}
                          className="
                            text-white
                            fill-white
                          "
                        />
                      </div>

                      <h3
                        className="
                          text-base font-bold
                          text-text-primary
                        "
                      >
                        Your watchlist is empty
                      </h3>

                      <p
                        className="
                          text-sm
                          text-text-muted
                          mt-1 mb-5
                        "
                      >
                        Add a company to start tracking
                        it.
                      </p>

                      <motion.button
                        type="button"
                        whileHover={{
                          y: -2,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={() =>
                          setShowAdd(true)
                        }
                        className="
                          flex items-center
                          justify-center
                          gap-2
                          px-5 py-3
                          rounded-xl
                          text-sm
                          font-semibold
                          text-white
                          bg-blue-700
                          hover:bg-emerald-700
                          border border-emerald-700
                          transition-all
                          mx-auto
                        "
                      >
                        <Plus size={16} />
                        Add Company
                      </motion.button>
                    </motion.div>
                  )}
              </section>

              {/* ───────────────────────────────────────────
                  PORTFOLIO FOCUS
              ─────────────────────────────────────────── */}

              <section
                className="
                  rounded-3xl
                  border border-border
                  overflow-hidden
                  shadow-sm
                "
                style={{
                  background:
                    'var(--surface)',
                }}
              >
                <div
                  className="
                    px-6 py-5
                    border-b border-border
                  "
                >
                  <h2
                    className="
                      text-lg font-bold
                      text-text-primary
                    "
                  >
                    Portfolio Focus
                  </h2>

                  <p
                    className="
                      text-sm
                      text-text-muted
                      mt-0.5
                    "
                  >
                    Structured insights across your
                    watchlist
                  </p>
                </div>

                <div
                  className="
                    grid md:grid-cols-3
                    divide-y
                    md:divide-y-0
                    md:divide-x
                    divide-border
                  "
                >
                  <motion.button
                    type="button"
                    onClick={() =>
                      openResearch('NVDA')
                    }
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      p-6
                      text-left
                      transition-colors
                      hover:bg-surface-elevated/20
                      group
                    "
                  >
                    <div
                      className="
                        flex items-center
                        gap-2 mb-4
                      "
                    >
                      <span
                        className="
                          w-2 h-2
                          rounded-full
                          bg-emerald-600
                        "
                      />

                      <h3
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wide
                          text-emerald-700
                          dark:text-emerald-400
                        "
                      >
                        Highest Conviction
                      </h3>
                    </div>

                    <div
                      className="
                        flex items-center
                        justify-between
                        mb-2
                      "
                    >
                      <p
                        className="
                          text-sm
                          font-bold
                          text-text-primary
                        "
                      >
                        NVDA · MSFT
                      </p>

                      <ArrowUpRight
                        size={15}
                        className="
                          text-text-muted
                          group-hover:text-emerald-500
                          transition-colors
                        "
                      />
                    </div>

                    <p
                      className="
                        text-sm
                        text-text-secondary
                        leading-relaxed
                      "
                    >
                      Strongest AI-driven earnings momentum
                      across the watchlist.
                    </p>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        mt-4
                        text-xs
                        font-semibold
                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      View companies
                      <ArrowRight size={12} />
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() =>
                      openResearch('NVDA')
                    }
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      p-6
                      text-left
                      transition-colors
                      hover:bg-surface-elevated/20
                      group
                    "
                  >
                    <div
                      className="
                        flex items-center
                        gap-2 mb-4
                      "
                    >
                      <span
                        className="
                          w-2 h-2
                          rounded-full
                          bg-amber-500
                        "
                      />

                      <h3
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wide
                          text-amber-700
                          dark:text-amber-400
                        "
                      >
                        Valuation Watch
                      </h3>
                    </div>

                    <div
                      className="
                        flex items-center
                        justify-between
                        mb-2
                      "
                    >
                      <p
                        className="
                          text-sm
                          font-bold
                          text-text-primary
                        "
                      >
                        NVDA
                      </p>

                      <ArrowUpRight
                        size={15}
                        className="
                          text-text-muted
                          group-hover:text-amber-500
                          transition-colors
                        "
                      />
                    </div>

                    <p
                      className="
                        text-sm
                        text-text-secondary
                        leading-relaxed
                      "
                    >
                      Expectation risk is elevated heading
                      into the next earnings cycle.
                    </p>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        mt-4
                        text-xs
                        font-semibold
                        text-amber-700
                        dark:text-amber-400
                      "
                    >
                      Review valuation
                      <ArrowRight size={12} />
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() =>
                      openResearch('TSLA')
                    }
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      p-6
                      text-left
                      transition-colors
                      hover:bg-surface-elevated/20
                      group
                    "
                  >
                    <div
                      className="
                        flex items-center
                        gap-2 mb-4
                      "
                    >
                      <span
                        className="
                          w-2 h-2
                          rounded-full
                          bg-red-600
                        "
                      />

                      <h3
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wide
                          text-red-700
                          dark:text-red-400
                        "
                      >
                        Monitor Closely
                      </h3>
                    </div>

                    <div
                      className="
                        flex items-center
                        justify-between
                        mb-2
                      "
                    >
                      <p
                        className="
                          text-sm
                          font-bold
                          text-text-primary
                        "
                      >
                        TSLA
                      </p>

                      <ArrowUpRight
                        size={15}
                        className="
                          text-text-muted
                          group-hover:text-red-500
                          transition-colors
                        "
                      />
                    </div>

                    <p
                      className="
                        text-sm
                        text-text-secondary
                        leading-relaxed
                      "
                    >
                      Delivery and margin risks remain
                      elevated.
                    </p>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        mt-4
                        text-xs
                        font-semibold
                        text-red-700
                        dark:text-red-400
                      "
                    >
                      Open TSLA
                      <ArrowRight size={12} />
                    </span>
                  </motion.button>
                </div>
              </section>

              {/* ───────────────────────────────────────────
                  FOOTER
              ─────────────────────────────────────────── */}

              <div
                className="
                  flex flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-2
                  px-1
                  text-[11px]
                  text-text-muted
                "
              >
                <div className="flex items-center gap-2">
                  <Clock3 size={12} />
                  {loading
                    ? 'Synchronising watchlist...'
                    : 'Watchlist synced'}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="
                      w-1.5 h-1.5
                      rounded-full
                      bg-emerald-500
                    "
                  />

                  Monitoring {watchlist.length}{' '}
                  companies
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          ADD COMPANY MODAL
      ───────────────────────────────────────────────────── */}

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0 z-[100]
              flex items-center
              justify-center p-4
              bg-black/70
              backdrop-blur-sm
            "
            onClick={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setShowAdd(false)
              }
            }}
          >
            <motion.div
              initial={{
                scale: 0.94,
                opacity: 0,
                y: 8,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.96,
                opacity: 0,
                y: 6,
              }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 28,
              }}
              className="
                w-full max-w-md
                rounded-3xl
                border border-border
                overflow-hidden
                shadow-xl
              "
              style={{
                background:
                  'var(--surface)',
              }}
            >
              <div
                className="
                  flex items-start
                  justify-between
                  p-6
                  border-b border-border
                "
              >
                <div>
                  <h3
                    className="
                      text-xl font-bold
                      text-text-primary
                    "
                  >
                    Add Company
                  </h3>

                  <p
                    className="
                      text-sm
                      text-text-muted
                      mt-1
                    "
                  >
                    Add another stock to your research
                    watchlist.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAdd(false)
                  }
                  className="
                    w-9 h-9
                    rounded-xl
                    flex items-center
                    justify-center
                    text-text-muted
                    hover:text-text-primary
                    hover:bg-surface-elevated
                    transition-all
                  "
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 space-y-3">
                {demoCandidates
                  .filter(
                    (candidate) =>
                      !watchlist.some(
                        (stock) =>
                          stock.ticker ===
                          candidate.ticker
                      )
                  )
                  .map((candidate) => (
                    <motion.button
                      type="button"
                      key={candidate.ticker}
                      disabled={
                        busyTicker ===
                        candidate.ticker
                      }
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.99,
                      }}
                      onClick={() =>
                        addItem(candidate)
                      }
                      className="
                        w-full
                        flex items-center
                        justify-between
                        p-4
                        rounded-2xl
                        border border-border
                        hover:border-emerald-700
                        hover:bg-emerald-950/20
                        hover:shadow-sm
                        transition-all
                        duration-200
                        text-left
                        disabled:opacity-50
                      "
                    >
                      <div
                        className="
                          flex items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            w-10 h-10
                            rounded-xl
                            flex items-center
                            justify-center
                            bg-blue-700
                            text-white
                            border border-emerald-700
                            shadow-sm
                          "
                        >
                          <span className="text-xs font-bold">
                            {candidate.ticker.slice(
                              0,
                              2
                            )}
                          </span>
                        </div>

                        <div>
                          <p
                            className="
                              font-semibold
                              text-sm
                              text-emerald-700
                              dark:text-emerald-400
                            "
                          >
                            {candidate.ticker}
                          </p>

                          <p
                            className="
                              text-xs
                              text-text-muted
                            "
                          >
                            {candidate.name}
                          </p>
                        </div>
                      </div>

                      <div
                        className="
                          flex items-center
                          gap-3
                        "
                      >
                        <ChangePill
                          value={
                            candidate.change
                          }
                          positive={
                            candidate.positive
                          }
                        />

                        {busyTicker ===
                        candidate.ticker ? (
                          <span
                            className="
                              w-4 h-4
                              rounded-full
                              border-2
                              border-text-muted
                              border-t-transparent
                              animate-spin
                            "
                          />
                        ) : (
                          <Plus
                            size={16}
                            className="
                              text-text-muted
                            "
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}

                {demoCandidates.every(
                  (candidate) =>
                    watchlist.some(
                      (stock) =>
                        stock.ticker ===
                        candidate.ticker
                    )
                ) && (
                  <p
                    className="
                      text-sm
                      text-text-muted
                      text-center
                      py-8
                    "
                  >
                    All available stocks are already on
                    your watchlist.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}