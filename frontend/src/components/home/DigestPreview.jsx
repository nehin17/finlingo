// src/components/home/DigestPreview.jsx
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BookOpen, Sparkles, Bell } from 'lucide-react'
import SectionHeader from '../shared/SectionHeader.jsx'

const watchlistItems = [
  { ticker: 'NVDA', change: '+2.3%', positive: true,  price: '$875.40' },
  { ticker: 'AAPL', change: '+0.8%', positive: true,  price: '$178.42' },
  { ticker: 'MSFT', change: '+1.1%', positive: true,  price: '$415.32' },
  { ticker: 'TSLA', change: '-1.8%', positive: false, price: '$175.21' },
]

export default function DigestPreview() {
  return (
    // ✅ REMOVED: py-24 px-8
    // Now fits inside the showcase container
    <section
      className="transition-colors duration-300 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-[1200px] w-full">
        {/* ✅ REDUCED: mb-16 to mb-6 */}
        <SectionHeader
          badge="Personalized Digest"
          title="Your intelligent morning briefing"
          subtitle="Start every trading session with a personalized summary of what matters to you — markets, watchlist, and something new to learn."
          className="mb-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          // ✅ REMOVED: max-w-2xl mx-auto - now full width
          className="w-full"
        >
          <div
            className="rounded-2xl border border-border overflow-hidden transition-colors duration-300"
            style={{ background: 'var(--surface)' }}
          >
            {/* ✅ REDUCED: Header padding from py-5 px-6 to py-4 px-5 */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{
                background: 'linear-gradient(to right, rgba(37,99,235,0.08), transparent)',
                borderBottom: '1px solid var(--border)',
                borderLeft: '3px solid #2563EB',
              }}
            >
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-0.5">
                  Good morning
                </p>
                {/* ✅ REDUCED: text-xl to text-lg */}
                <h3 className="text-lg font-bold text-text-primary">Alex 👋</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Bell size={12} />
                <span>Daily digest</span>
              </div>
            </div>

            {/* ✅ REDUCED: p-6 space-y-6 to p-4 space-y-4 */}
            <div className="p-4 space-y-4">

              {/* Market Pulse */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={13} className="text-primary" />
                  <h4 className="text-xs sm:text-sm font-semibold text-text-primary">Market Pulse</h4>
                </div>
                {/* ✅ REDUCED: p-4 to p-3 */}
                <div
                  className="rounded-xl p-3 border transition-colors duration-300"
                  style={{
                    background: 'var(--surface-elevated)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {/* ✅ REDUCED: text-sm to text-xs */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    S&P 500 opened slightly higher on positive jobs data. Semiconductor sector leads gains
                    (+2.4%), while energy stocks lag amid falling oil prices. Fed meeting minutes due Thursday.
                  </p>
                </div>
              </div>

              {/* Watchlist */}
              <div>
                {/* ✅ REDUCED: text-sm mb-3 to text-xs mb-2 */}
                <h4 className="text-xs sm:text-sm font-semibold text-text-primary mb-2">Your Watchlist</h4>
                {/* ✅ REDUCED: gap-2 to gap-1.5 */}
                <div className="grid grid-cols-2 gap-1.5">
                  {watchlistItems.map(item => {
                    const TrendIcon = item.positive ? TrendingUp : TrendingDown
                    return (
                      <div
                        key={item.ticker}
                        // ✅ REDUCED: p-3 to p-2.5
                        className="flex items-center justify-between p-2.5 rounded-lg border border-border transition-colors duration-300"
                        style={{ background: 'var(--surface-elevated)' }}
                      >
                        {/* ✅ REDUCED: text-sm to text-xs */}
                        <span className="font-bold text-text-primary text-xs">
                          {item.ticker}
                        </span>
                        <div className={`flex items-center gap-0.5 ${
                          item.positive ? 'text-success' : 'text-error'
                        }`}>
                          <TrendIcon size={10} />
                          <span className="text-xs font-bold">{item.change}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Divider - ✅ REDUCED: h-px (no change needed) */}
              <div className="h-px bg-border" />

              {/* Learn Today */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={13} className="text-secondary" />
                  {/* ✅ REDUCED: text-sm to text-xs */}
                  <h4 className="text-xs sm:text-sm font-semibold text-text-primary">Learn Today</h4>
                </div>

                {/* ✅ REDUCED: p-4 to p-3 */}
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: 'rgba(79,70,229,0.06)',
                    border: '1px solid rgba(79,70,229,0.2)',
                    borderLeft: '3px solid #4F46E5',
                  }}
                >
                  {/* ✅ REDUCED: text-sm mb-1 to text-xs mb-1 */}
                  <p className="text-xs sm:text-sm font-semibold text-text-primary mb-1">
                    Gross Margin
                  </p>
                  {/* ✅ REDUCED: text-sm to text-xs */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Revenue remaining after deducting direct production costs. A higher gross margin means
                    the company retains more per dollar of revenue. Apple's gross margin is 44% — exceptional for hardware.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}