
// src/components/pages/Dashboard.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Sparkles,
  Star, Filter,
} from 'lucide-react'

import Sidebar   from '../layout/Sidebar.jsx'
import Navbar    from '../layout/Navbar.jsx'
import SearchBar from '../shared/SearchBar.jsx'
import Card      from '../shared/Card.jsx'

export default function Dashboard({
  isAuthenticated,
  user,
  theme,
  onThemeToggle,
  onSignInClick,
  onSignUpClick,
  onSignOut,
  navbarProps,
  sidebarProps,

  // Backend-ready data
  stocks = [],
  loading = false,
  error = null,
}) {
  const [query, setQuery] = useState('')
  const [selectedTicker, setSelectedTicker] = useState(null)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  /*
   * Backend data is expected to contain numeric values.
   *
   * Example:
   * {
   *   ticker: 'AAPL',
   *   name: 'Apple Inc.',
   *   price: 178.42,
   *   change: 1.24,
   *   positive: true,
   *   market: 'NASDAQ',
   *   sector: 'Technology',
   *   pe: 28.4
   * }
   */

  const filtered = stocks.filter((stock) => {
    const search = query.toLowerCase().trim()

    return (
      stock.ticker?.toLowerCase().includes(search) ||
      stock.name?.toLowerCase().includes(search)
    )
  })

  const selected =
    stocks.find(
      (stock) => stock.ticker === selectedTicker
    ) ?? filtered[0] ?? null

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Navbar
        {...(navbarProps ?? {
          isAuthenticated,
          user,
          theme,
          onThemeToggle,
          onSignInClick,
          onSignUpClick,
          onSignOut,
          onSidebarToggle: () =>
            setMobileSidebarOpen(true),
        })}
      />

      <div className="flex min-h-screen">
        <Sidebar
          {...(sidebarProps ?? {
            user,
            isAuthenticated,
            onSignInClick,
            onSignOut,
            mobileOpen: mobileSidebarOpen,
            onMobileClose: () =>
              setMobileSidebarOpen(false),
            onAccountNavigate: (id) => {
              console.log('Sidebar action:', id)
              setMobileSidebarOpen(false)
            },
          })}
        />

        {/* min-w-0 prevents content from overflowing during sidebar animation */}
        <div className="flex-1 min-w-0">
          <main className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-[1400px] mx-auto">

              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Research
                </h1>

                <p className="text-text-muted">
                  Search and analyse any publicly traded company.
                </p>
              </div>

              {/* Search */}
              <SearchBar
                large
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                className="mb-8 max-w-xl"
              />

              {/* Backend loading state */}
              {loading && (
                <div
                  className="rounded-2xl border border-border p-8 text-center mb-6"
                  style={{
                    background: 'var(--surface)',
                  }}
                >
                  <p className="text-sm text-text-muted">
                    Loading market data...
                  </p>
                </div>
              )}

              {/* Backend error state */}
              {!loading && error && (
                <div
                  className="rounded-2xl border border-border p-8 text-center mb-6"
                  style={{
                    background: 'var(--surface)',
                  }}
                >
                  <p className="text-sm text-error">
                    {typeof error === 'string'
                      ? error
                      : 'Unable to load market data.'}
                  </p>
                </div>
              )}

              {!loading && !error && (
                <div className="grid lg:grid-cols-5 gap-6">

                  {/* Stock List */}
                  <div className="lg:col-span-2">
                    <div
                      className="rounded-2xl border border-border overflow-hidden"
                      style={{
                        background: 'var(--surface)',
                      }}
                    >
                      <div
                        className="px-4 py-3 border-b border-border flex items-center justify-between"
                      >
                        <h3 className="text-sm font-semibold text-text-primary">
                          All Stocks
                        </h3>

                        <button
                          type="button"
                          className="flex items-center gap-1.5 text-xs text-text-muted
                                     hover:text-text-primary transition-colors"
                        >
                          <Filter size={12} />
                          Filter
                        </button>
                      </div>

                      <div className="overflow-y-auto max-h-[600px]">

                        {filtered.length > 0 ? (
                          filtered.map((stock) => (
                            <motion.div
                              key={stock.ticker}
                              onClick={() =>
                                setSelectedTicker(
                                  stock.ticker
                                )
                              }
                              whileHover={{
                                backgroundColor:
                                  'rgba(37,99,235,0.04)',
                              }}
                              className={`flex items-center justify-between px-4 py-3.5 cursor-pointer
                                          border-b border-border last:border-0 transition-all duration-150
                                          ${
                                            selected?.ticker ===
                                            stock.ticker
                                              ? 'bg-primary/6 border-l-2 border-l-primary'
                                              : ''
                                          }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-9 h-9 rounded-xl bg-surface-elevated
                                             flex items-center justify-center shrink-0"
                                >
                                  <span className="text-xs font-bold text-primary">
                                    {stock.ticker?.slice(0, 2)}
                                  </span>
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-text-primary">
                                    {stock.ticker}
                                  </p>

                                  <p className="text-xs text-text-muted">
                                    {stock.sector}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-sm font-semibold text-text-primary">
                                  {stock.price != null
                                    ? `$${Number(stock.price).toFixed(2)}`
                                    : '—'}
                                </p>

                                <div
                                  className={`flex items-center gap-1 justify-end ${
                                    stock.positive
                                      ? 'text-success'
                                      : 'text-error'
                                  }`}
                                >
                                  {stock.positive ? (
                                    <TrendingUp size={10} />
                                  ) : (
                                    <TrendingDown size={10} />
                                  )}

                                  <span className="text-xs font-bold">
                                    {stock.change != null
                                      ? `${stock.change > 0 ? '+' : ''}${stock.change}%`
                                      : '—'}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="px-5 py-10 text-center">
                            <p className="text-sm text-text-muted">
                              No stocks found.
                            </p>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Detail Panel */}
                  <div className="lg:col-span-3 space-y-5">

                    {selected ? (
                      <>
                        <Card className="p-6">
                          <div className="flex items-start justify-between mb-5">

                            <div className="flex items-center gap-4">
                              <div
                                className="w-14 h-14 rounded-2xl bg-primary/15
                                           flex items-center justify-center"
                              >
                                <span className="text-xl font-bold text-primary">
                                  {selected.ticker?.slice(0, 2)}
                                </span>
                              </div>

                              <div>
                                <h2 className="text-xl font-bold text-text-primary">
                                  {selected.name}
                                </h2>

                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm text-text-muted">
                                    {selected.ticker}
                                  </span>

                                  <div className="w-1 h-1 rounded-full bg-border" />

                                  <span className="text-xs text-text-muted px-2 py-0.5 rounded-full border border-border">
                                    {selected.market}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border
                                         text-sm text-text-muted hover:border-warning/30 hover:text-warning transition-all"
                            >
                              <Star size={14} />
                              Watch
                            </button>
                          </div>

                          <div className="mb-5">
                            <p className="text-3xl font-bold text-text-primary">
                              {selected.price != null
                                ? `$${Number(selected.price).toFixed(2)}`
                                : '—'}
                            </p>

                            <div
                              className={`flex items-center gap-2 mt-1 ${
                                selected.positive
                                  ? 'text-success'
                                  : 'text-error'
                              }`}
                            >
                              {selected.positive ? (
                                <TrendingUp size={14} />
                              ) : (
                                <TrendingDown size={14} />
                              )}

                              <span className="font-semibold">
                                {selected.change != null
                                  ? `${selected.change > 0 ? '+' : ''}${selected.change}% Today`
                                  : 'Today'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-6">
                            {[
                              {
                                label: 'P/E Ratio',
                                value:
                                  selected.pe != null
                                    ? `${selected.pe}x`
                                    : '—',
                              },
                              {
                                label: 'Sector',
                                value:
                                  selected.sector ?? '—',
                              },
                              {
                                label: 'Market',
                                value:
                                  selected.market ?? '—',
                              },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className="rounded-xl p-3 border border-border"
                                style={{
                                  background:
                                    'var(--surface-elevated)',
                                }}
                              >
                                <p className="text-xs text-text-muted mb-1">
                                  {item.label}
                                </p>

                                <p className="font-semibold text-text-primary text-sm">
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Backend-provided chart data */}
                          {selected.chartData?.length > 0 && (
                            <>
                              <div className="flex items-end gap-1 h-20 mb-2">
                                {selected.chartData.map(
                                  (point, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{
                                        scaleY: 0,
                                      }}
                                      animate={{
                                        scaleY: 1,
                                      }}
                                      transition={{
                                        delay:
                                          index * 0.03,
                                        duration: 0.35,
                                      }}
                                      className="flex-1 rounded-sm origin-bottom"
                                      style={{
                                        height: `${point.value}%`,
                                        background:
                                          index >=
                                          selected.chartData.length - 3
                                            ? selected.positive
                                              ? 'rgba(16,185,129,0.6)'
                                              : 'rgba(239,68,68,0.6)'
                                            : 'rgba(37,99,235,0.25)',
                                      }}
                                    />
                                  )
                                )}
                              </div>

                              <div className="flex justify-between text-xs text-text-muted">
                                {selected.chartLabels?.map(
                                  (label) => (
                                    <span key={label}>
                                      {label}
                                    </span>
                                  )
                                )}
                              </div>
                            </>
                          )}
                        </Card>

                        {/* AI Insight */}
                        {selected.aiInsight && (
                          <Card className="p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                                <Sparkles
                                  size={13}
                                  className="text-primary"
                                />
                              </div>

                              <span className="text-sm font-semibold text-text-primary">
                                AI Quick Insight
                              </span>

                              <div className="ml-auto w-2 h-2 rounded-full bg-success animate-pulse" />
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed">
                              {selected.aiInsight}
                            </p>

                            {selected.sources?.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {selected.sources.map(
                                  (source) => (
                                    <span
                                      key={source}
                                      className="text-xs px-2 py-1 rounded-md font-medium"
                                      style={{
                                        background:
                                          'rgba(37,99,235,0.1)',
                                        color: '#2563EB',
                                        border:
                                          '1px solid rgba(37,99,235,0.2)',
                                      }}
                                    >
                                      {source}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </Card>
                        )}
                      </>
                    ) : (
                      <Card className="p-10 text-center">
                        <p className="text-sm text-text-muted">
                          Select a company to view its research.
                        </p>
                      </Card>
                    )}

                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

