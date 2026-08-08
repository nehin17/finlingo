// src/pages/Dashboard.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, TrendingUp, TrendingDown, Sparkles,
  BarChart2, ExternalLink, Star, Filter
} from 'lucide-react'
import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'
import SearchBar from '../shared/SearchBar.jsx'
import Card from '../shared/Card.jsx'

const stockList = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: '$178.42', change: '+1.24%', positive: true, market: 'NASDAQ', sector: 'Technology', pe: '28.4x' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', price: '$875.40', change: '+4.28%', positive: true, market: 'NASDAQ', sector: 'Semiconductors', pe: '65.2x' },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: '$175.21', change: '-1.84%', positive: false, market: 'NASDAQ', sector: 'EV', pe: '42.1x' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: '$415.32', change: '+0.93%', positive: true, market: 'NASDAQ', sector: 'Technology', pe: '36.8x' },
  { ticker: 'AMZN', name: 'Amazon.com', price: '$183.47', change: '+1.58%', positive: true, market: 'NASDAQ', sector: 'E-Commerce', pe: '58.3x' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '$171.90', change: '+0.43%', positive: true, market: 'NASDAQ', sector: 'Technology', pe: '24.7x' },
  { ticker: 'META', name: 'Meta Platforms', price: '$527.14', change: '+2.12%', positive: true, market: 'NASDAQ', sector: 'Social Media', pe: '29.5x' },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway', price: '$408.21', change: '-0.23%', positive: false, market: 'NYSE', sector: 'Conglomerate', pe: '8.2x' },
]

export default function Dashboard(props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(stockList[1])

  const filtered = stockList.filter(s =>
    s.ticker.toLowerCase().includes(query.toLowerCase()) ||
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex bg-bg min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-20">
        <Navbar {...props} />
        <main className="pt-[72px] p-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-text-primary mb-2">Research</h1>
              <p className="text-text-muted">Search and analyze any publicly traded company.</p>
            </div>

            {/* Search */}
            <SearchBar large className="mb-8 max-w-xl" />

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Stock List */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border overflow-hidden" style={{ background: '#111827' }}>
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-text-primary">All Stocks</h3>
                    <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors">
                      <Filter size={12} />
                      Filter
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-[600px]">
                    {filtered.map(stock => (
                      <motion.div
                        key={stock.ticker}
                        onClick={() => setSelected(stock)}
                        whileHover={{ backgroundColor: 'rgba(37,99,235,0.04)' }}
                        className={`flex items-center justify-between px-4 py-3.5 cursor-pointer border-b border-border last:border-0 transition-all duration-150 ${
                          selected.ticker === stock.ticker ? 'bg-primary/6 border-l-2 border-l-primary' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-surface-elevated flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-primary">
                              {stock.ticker.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{stock.ticker}</p>
                            <p className="text-xs text-text-muted">{stock.sector}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-text-primary">{stock.price}</p>
                          <div className={`flex items-center gap-1 justify-end ${stock.positive ? 'text-success' : 'text-error'}`}>
                            {stock.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            <span className="text-xs font-bold">{stock.change}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-3 space-y-5">
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {selected.ticker.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-text-primary">{selected.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-text-muted">{selected.ticker}</span>
                          <div className="w-1 h-1 rounded-full bg-border" />
                          <span className="text-xs text-text-muted px-2 py-0.5 rounded-full border border-border">
                            {selected.market}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text-muted hover:border-warning/30 hover:text-warning transition-all">
                      <Star size={14} />
                      Watch
                    </button>
                  </div>

                  <div className="mb-5">
                    <p className="text-3xl font-bold text-text-primary">{selected.price}</p>
                    <div className={`flex items-center gap-2 mt-1 ${selected.positive ? 'text-success' : 'text-error'}`}>
                      {selected.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span className="font-semibold">{selected.change} Today</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'P/E Ratio', value: selected.pe },
                      { label: 'Sector', value: selected.sector },
                      { label: 'Market', value: selected.market },
                    ].map(item => (
                      <div key={item.label} className="rounded-xl p-3 border border-border" style={{ background: '#0F172A' }}>
                        <p className="text-xs text-text-muted mb-1">{item.label}</p>
                        <p className="font-semibold text-text-primary text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1 h-20 mb-2">
                    {[45, 52, 48, 65, 60, 72, 68, 80, 75, 88, 82, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.03, duration: 0.35 }}
                        className="flex-1 rounded-sm origin-bottom"
                        style={{
                          height: `${h}%`,
                          background: i >= 9
                            ? (selected.positive ? 'rgba(16,185,129,0.6)' : 'rgba(239,68,68,0.6)')
                            : 'rgba(37,99,235,0.25)',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Jan</span><span>Mar</span><span>May</span>
                    <span>Jul</span><span>Sep</span><span>Dec</span>
                  </div>
                </Card>

                {/* AI Insight */}
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Sparkles size={13} className="text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-text-primary">AI Quick Insight</span>
                    <div className="ml-auto w-2 h-2 rounded-full bg-success animate-pulse" />
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selected.ticker} shows strong fundamental momentum with consistent revenue growth
                    and expanding margins. Recent earnings surpassed consensus estimates,
                    with the stock trading at a premium relative to sector peers,
                    reflecting the market's confidence in continued execution.
                  </p>
                  <div className="flex gap-2 mt-3">
                    {['SEC 10-Q', 'Bloomberg'].map(c => (
                      <span
                        key={c}
                        className="text-xs px-2 py-1 rounded-md font-medium"
                        style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB', border: '1px solid rgba(37,99,235,0.2)' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}