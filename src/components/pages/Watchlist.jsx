// src/pages/Watchlist.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, TrendingUp, TrendingDown,
  Plus, Trash2, Bell, BarChart2
} from 'lucide-react'
import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'

const initialWatchlist = [
  {
    ticker: 'NVDA', name: 'NVIDIA Corp.', price: '$875.40',
    change: '+4.28%', positive: true, sector: 'Semiconductors',
    pe: '65.2x', note: 'AI chip supercycle play',
  },
  {
    ticker: 'AAPL', name: 'Apple Inc.', price: '$178.42',
    change: '+1.24%', positive: true, sector: 'Technology',
    pe: '28.4x', note: 'Services revenue growth',
  },
  {
    ticker: 'MSFT', name: 'Microsoft Corp.', price: '$415.32',
    change: '+0.93%', positive: true, sector: 'Technology',
    pe: '36.8x', note: 'Azure cloud + Copilot AI',
  },
  {
    ticker: 'TSLA', name: 'Tesla Inc.', price: '$175.21',
    change: '-1.84%', positive: false, sector: 'EV',
    pe: '42.1x', note: 'Watching for Q2 deliveries',
  },
]

const addCandidates = [
  { ticker: 'AMZN', name: 'Amazon.com',    price: '$183.47', change: '+1.58%', positive: true, sector: 'E-Commerce' },
  { ticker: 'META', name: 'Meta Platforms', price: '$527.14', change: '+2.12%', positive: true, sector: 'Social Media' },
  { ticker: 'GOOGL', name: 'Alphabet',     price: '$171.90', change: '+0.43%', positive: true, sector: 'Technology' },
]

export default function Watchlist(props) {
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const [showAdd, setShowAdd]     = useState(false)

  const removeItem = (ticker) =>
    setWatchlist(prev => prev.filter(s => s.ticker !== ticker))

  const addItem = (item) => {
    if (!watchlist.find(s => s.ticker === item.ticker)) {
      setWatchlist(prev => [
        ...prev,
        { ...item, pe: 'N/A', note: 'Added to watchlist' },
      ])
    }
    setShowAdd(false)
  }

  const totalGain = watchlist.filter(s =>  s.positive).length
  const totalLoss = watchlist.filter(s => !s.positive).length

  return (
    
    <div
      className="flex min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      
      <Sidebar {...props} />

      <div className="flex-1 ml-20">
        <Navbar {...props} />

        <main className="pt-[72px] p-8">
          <div className="max-w-[1100px] mx-auto">

            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Star size={26} className="text-warning fill-warning" />
                  <h1 className="text-3xl font-bold text-text-primary">Watchlist</h1>
                </div>
                <p className="text-text-muted">
                  Track your favorite companies and get AI insights.
                </p>
              </div>
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
              >
                <Plus size={16} />
                Add Stock
              </button>
            </div>

            {/* ── Stats bar ────────────────────────────────────────────── */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Tracked',   value: watchlist.length, color: '#2563EB' },
                { label: 'Gaining Today',   value: totalGain,        color: '#10B981' },
                { label: 'Declining Today', value: totalLoss,        color: '#EF4444' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border p-5"
                  style={{ background: 'var(--surface)' }}
                >
                  <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Watchlist Table ──────────────────────────────────────── */}
            <div
              className="rounded-2xl border border-border overflow-hidden"
              style={{ background: 'var(--surface)' }}
            >
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">Tracked Companies</h3>
              </div>

              <div className="divide-y divide-border">
                <AnimatePresence>
                  {watchlist.map(stock => {
                    const TrendIcon = stock.positive ? TrendingUp : TrendingDown
                    return (
                      <motion.div
                        key={stock.ticker}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-6 px-6 py-4 hover:bg-surface-elevated/30 transition-colors group"
                      >
                        {/* Company */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-primary">
                              {stock.ticker.slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-text-primary">{stock.ticker}</p>
                            <p className="text-xs text-text-muted truncate">{stock.name}</p>
                          </div>
                        </div>

                        {/* Note */}
                        <div className="hidden md:block flex-1">
                          <p className="text-xs text-text-muted italic">{stock.note}</p>
                        </div>

                        {/* Price */}
                        <div className="text-right shrink-0">
                          <p className="font-bold text-text-primary">{stock.price}</p>
                          <div className={`flex items-center gap-1 justify-end ${
                            stock.positive ? 'text-success' : 'text-error'
                          }`}>
                            <TrendIcon size={11} />
                            <span className="text-xs font-bold">{stock.change}</span>
                          </div>
                        </div>

                        {/* Sector */}
                        <div className="hidden sm:block shrink-0">
                          <span className="text-xs px-2.5 py-1 rounded-full border border-border text-text-muted">
                            {stock.sector}
                          </span>
                        </div>

                        {/* P/E */}
                        <div className="hidden lg:block shrink-0">
                          <p className="text-xs text-text-muted">P/E</p>
                          <p className="text-sm font-semibold text-text-primary">{stock.pe}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all">
                            <Bell size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(stock.ticker)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-error hover:bg-error/10 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {watchlist.length === 0 && (
                  <div className="text-center py-16">
                    <Star size={32} className="mx-auto mb-3 text-text-muted opacity-40" />
                    <p className="text-text-muted text-sm">
                      Your watchlist is empty. Add stocks to start tracking.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Add Modal ────────────────────────────────────────────── */}
            <AnimatePresence>
              {showAdd && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onClick={e => e.target === e.currentTarget && setShowAdd(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-md rounded-2xl border border-border p-6"
                    style={{ background: 'var(--surface)' }}
                  >
                    <h3 className="font-bold text-text-primary text-lg mb-4">
                      Add to Watchlist
                    </h3>
                    <div className="space-y-3">
                      {addCandidates
                        .filter(c => !watchlist.find(w => w.ticker === c.ticker))
                        .map(candidate => (
                          <div
                            key={candidate.ticker}
                            className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/4 transition-all cursor-pointer"
                            onClick={() => addItem(candidate)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                                <span className="text-xs font-bold text-primary">
                                  {candidate.ticker.slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-text-primary text-sm">
                                  {candidate.ticker}
                                </p>
                                <p className="text-xs text-text-muted">{candidate.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-sm font-bold ${
                                candidate.positive ? 'text-success' : 'text-error'
                              }`}>
                                {candidate.change}
                              </span>
                              <Plus size={16} className="text-text-muted" />
                            </div>
                          </div>
                        ))
                      }
                      {addCandidates.every(c => watchlist.find(w => w.ticker === c.ticker)) && (
                        <p className="text-center text-text-muted text-sm py-4">
                          All available stocks are in your watchlist.
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </main>
      </div>
    </div>
  )
}