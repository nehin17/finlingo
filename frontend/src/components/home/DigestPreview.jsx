// src/components/home/DigestPreview.jsx

import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Sparkles,
  Bell,
} from 'lucide-react'

const defaultDigest = {
  userName: 'Alex',
  marketPulse:
    'S&P 500 opened slightly higher on positive jobs data. Semiconductor stocks lead gains (+2.4%), while energy stocks lag amid falling oil prices. Fed meeting minutes are due Thursday.',
  watchlist: [
    { ticker: 'NVDA', change: '+2.3%', positive: true },
    { ticker: 'AAPL', change: '+0.8%', positive: true },
    { ticker: 'MSFT', change: '+1.1%', positive: true },
    { ticker: 'TSLA', change: '-1.8%', positive: false },
  ],
  lesson: {
    title: 'Gross Margin',
    content:
      'Revenue remaining after deducting direct production costs. A higher gross margin means the company retains more per dollar of revenue. Apple’s gross margin is 44% — exceptional for hardware.',
  },
}

export default function DigestPreview({ digest = defaultDigest }) {
  return (
    <section
      className="
        w-full
        h-full
        flex
        flex-col
        items-center
        justify-center
        px-4
        sm:px-8
        lg:px-12
        py-6
      "
      style={{ background: 'transparent' }}
    >
      {/* =====================================================
          SECTION HEADER
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-4xl text-center pt-2 mb-5 sm:mb-6"
      >
        {/* Premium Blue Badge */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            mb-4
            shadow-sm
          "
          style={{
            background:
              'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(59,130,246,0.06))',
            borderColor: 'rgba(37,99,235,0.18)',
            boxShadow: '0 4px 14px rgba(37,99,235,0.08)',
          }}
        >
          <span
            className="
              text-[11px]
              sm:text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
            "
            style={{ color: '#2563EB' }}
          >
            Personalized Intelligence
          </span>
        </div>

        {/* Title */}
        <h2
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            tracking-tight
            mb-3
          "
          style={{ color: 'var(--text)' }}
        >
          Your market, simplified.
        </h2>

        {/* Description */}
        <p
          className="
            max-w-2xl
            mx-auto
            text-sm
            sm:text-base
            leading-relaxed
          "
          style={{ color: 'var(--text-muted)' }}
        >
          A personalized daily briefing that combines market-moving
          events, your watchlist performance, and bite-sized investing
          concepts in one place.
        </p>
      </motion.div>

      {/* =====================================================
          DIGEST PREVIEW CARD
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-3xl"
      >
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 18px 40px rgba(15,23,42,0.10)',
          }}
        >
          {/* Digest Header */}
          <div
            className="
              px-5 py-4
              sm:px-6 sm:py-4
              flex
              items-center
              justify-between
            "
            style={{
              background:
                'linear-gradient(to right, rgba(37,99,235,0.08), transparent)',
              borderBottom: '1px solid var(--border)',
              borderLeft: '3px solid #2563EB',
            }}
          >
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wide font-medium mb-0.5 text-text-muted">
                Good morning
              </p>

              <h3 className="text-base sm:text-lg font-bold text-text-primary">
                {digest.userName} 👋
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Bell size={13} aria-hidden="true" />
              <span>Daily digest</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-5 py-4 sm:px-6 sm:py-5 space-y-4">
            {/* Market Pulse */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles
                  size={14}
                  className="text-primary shrink-0"
                  aria-hidden="true"
                />

                <h4 className="text-sm font-semibold text-text-primary">
                  Market Pulse
                </h4>
              </div>

              <div
                className="rounded-xl px-4 py-3 border"
                style={{
                  background: 'var(--surface-elevated)',
                  borderColor: 'var(--border)',
                }}
              >
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {digest.marketPulse}
                </p>
              </div>
            </div>

            {/* Watchlist */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">
                Your Watchlist
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {digest.watchlist.map((item) => {
                  const TrendIcon = item.positive
                    ? TrendingUp
                    : TrendingDown

                  return (
                    <div
                      key={item.ticker}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg border"
                      style={{
                        background: 'var(--surface-elevated)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <span className="font-bold text-text-primary text-xs sm:text-sm">
                        {item.ticker}
                      </span>

                      <div
                        className={`flex items-center gap-1 ${
                          item.positive
                            ? 'text-success'
                            : 'text-error'
                        }`}
                      >
                        <TrendIcon size={11} aria-hidden="true" />

                        <span className="text-xs font-bold">
                          {item.change}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ background: 'var(--border)' }}
            />

            {/* Learn Today */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen
                  size={14}
                  className="text-secondary shrink-0"
                  aria-hidden="true"
                />

                <h4 className="text-sm font-semibold text-text-primary">
                  Learn Today
                </h4>
              </div>

              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: 'rgba(79,70,229,0.06)',
                  border: '1px solid rgba(79,70,229,0.2)',
                  borderLeft: '3px solid #4F46E5',
                }}
              >
                <p className="text-xs sm:text-sm font-semibold text-text-primary mb-1">
                  {digest.lesson.title}
                </p>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {digest.lesson.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}