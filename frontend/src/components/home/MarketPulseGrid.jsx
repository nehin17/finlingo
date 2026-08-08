// src/components/home/MarketPulseGrid.jsx
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Zap, Eye, Star, Brain } from 'lucide-react'
import SectionHeader from '../shared/SectionHeader.jsx'

const pulseCards = [
  {
    label: 'Top Gainer',
    icon: TrendingUp,
    iconColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.12)',
    ticker: 'NVDA',
    company: 'NVIDIA Corp.',
    price: '$875.40',
    change: '+4.28%',
    positive: true,
    insight: 'Data center revenue hits record $22.6B on AI chip demand surge.',
    bars: [40, 55, 62, 50, 70, 68, 85, 95],
  },
  {
    label: 'Most Active',
    icon: Zap,
    iconColor: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.12)',
    ticker: 'TSLA',
    company: 'Tesla, Inc.',
    price: '$175.21',
    change: '-1.84%',
    positive: false,
    insight: 'Volume 3.2× average after earnings miss on delivery numbers.',
    bars: [80, 65, 90, 55, 70, 45, 60, 50],
  },
  {
    label: 'Watchlist Fav',
    icon: Star,
    iconColor: '#2563EB',
    iconBg: 'rgba(37,99,235,0.12)',
    ticker: 'AAPL',
    company: 'Apple Inc.',
    price: '$178.42',
    change: '+1.24%',
    positive: true,
    insight: 'Services revenue grows 14% YoY, now 22% of total revenue.',
    bars: [55, 58, 62, 65, 60, 68, 72, 78],
  },
  {
    label: 'AI Top Pick',
    icon: Brain,
    iconColor: '#4F46E5',
    iconBg: 'rgba(79,70,229,0.12)',
    ticker: 'MSFT',
    company: 'Microsoft Corp.',
    price: '$415.32',
    change: '+0.93%',
    positive: true,
    insight: 'Copilot AI adoption accelerating — 1M+ enterprise seats added.',
    bars: [60, 65, 62, 70, 68, 72, 75, 80],
  },
]

function MiniBarChart({ bars, positive }) {
  return (
    <div className="h-14 flex items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          className="flex-1 rounded-sm origin-bottom"
          style={{
            height: `${h}%`,
            background: positive
              ? 'rgba(16,185,129,0.5)'
              : 'rgba(239,68,68,0.5)',
          }}
        />
      ))}
    </div>
  )
}

export default function MarketPulseGrid() {
  return (
    <section
      className="py-24 px-8 transition-colors duration-300"
      style={{ background: 'var(--surface-2)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          badge="Market Pulse"
          title="What the market is watching right now"
          subtitle="Real-time movers, unusual activity, and AI-ranked opportunities updated throughout the trading day."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pulseCards.map((card, i) => {
            const Icon = card.icon
            const TrendIcon = card.positive ? TrendingUp : TrendingDown

            return (
              <motion.div
                key={card.ticker}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                  scale: 1.015,
                  borderColor: 'rgba(37, 99, 235, 0.25)',
                  boxShadow:
                    '0 12px 32px rgba(37, 99, 235, 0.12), 0 0 0 1px rgba(37, 99, 235, 0.08)',
                }}
                className="rounded-2xl border p-5 cursor-pointer transition-all duration-300"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Label */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                    style={{ background: card.iconBg }}
                  >
                    <Icon size={12} style={{ color: card.iconColor }} />
                    <span className="text-xs font-semibold" style={{ color: card.iconColor }}>
                      {card.label}
                    </span>
                  </div>

                  <Eye size={14} style={{ color: 'var(--text-muted)' }} />
                </div>

                {/* Ticker */}
                <div className="mb-3">
                  <div className="mb-1">
                    <span
                      className="font-bold text-lg"
                      style={{ color: 'var(--text)' }}
                    >
                      {card.ticker}
                    </span>

                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {card.company}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold" style={{ color: 'var(--text)' }}>
                      {card.price}
                    </span>

                    <div
                      className="flex items-center gap-1 text-sm font-bold"
                      style={{
                        color: card.positive
                          ? 'var(--success)'
                          : 'var(--danger)',
                      }}
                    >
                      <TrendIcon size={12} />
                      <span>{card.change}</span>
                    </div>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="mb-4">
                  <MiniBarChart bars={card.bars} positive={card.positive} />
                </div>

                {/* Insight */}
                <div
                  className="border-t pt-3"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {card.insight}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}