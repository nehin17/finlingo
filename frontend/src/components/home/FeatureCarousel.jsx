// src/components/home/FeatureCarousel.jsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Brain, BarChart2,
  BookOpen, Bell, Sparkles, TrendingUp,
  MessageSquare, Shield
} from 'lucide-react'

const slides = [
  {
    id: 0,
    icon: Brain,
    badge: 'AI Research Assistant',
    heading: 'Ask questions the way investors actually think',
    bullets: [
      'Why did NVIDIA move today?',
      "Summarize Apple's latest quarter",
      'Compare Tesla margins with Ford',
      'What is the P/E ratio for Meta?',
    ],
    visual: 'chat',
  },
  {
    id: 1,
    icon: BarChart2,
    badge: 'Battle Mode',
    heading: 'Compare companies side-by-side',
    bullets: [
      'Visual radar chart comparison',
      'Revenue & margin analysis',
      'AI-generated verdict',
      'Multi-timeframe performance',
    ],
    visual: 'battle',
  },
  {
    id: 2,
    icon: BookOpen,
    badge: 'Financial Education',
    heading: 'Learn finance while you research',
    bullets: [
      'Interactive glossary cards',
      'Contextual term explanations',
      'Track your learning progress',
      'Quiz-based reinforcement',
    ],
    visual: 'learn',
  },
  {
    id: 3,
    icon: Bell,
    badge: 'Daily Digest',
    heading: 'Start every morning with a smarter market briefing',
    bullets: [
      'Personalized market summary',
      'Watchlist overnight changes',
      'Trending sector analysis',
      'Daily finance term of the day',
    ],
    visual: 'digest',
  },
]

// ── Sub-visuals ────────────────────────────────────────────────────────────────

function ChatVisual() {
  const messages = [
    { role: 'user', text: 'Why did NVIDIA surge today?' },
    { role: 'ai',   text: 'NVIDIA jumped +4.28% driven by strong AI chip orders. The data center segment hit a record $22.6B in quarterly revenue, beating estimates by 18%.' },
    { role: 'user', text: "Summarize Apple's latest quarter" },
  ]

  return (
    <div className="space-y-3">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
              msg.role === 'user'
                ? 'text-white rounded-br-sm'
               
                : 'text-text-primary border border-border rounded-bl-sm'
            }`}
            style={
              msg.role === 'user'
                ? { background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }
                : { background: 'var(--surface-elevated)' }
            }
          >
            {msg.text}
          </div>
        </motion.div>
      ))}

      {/* Typing dots */}
      <div className="flex gap-1 pl-2">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Citation chips */}
      <div className="flex flex-wrap gap-2 mt-3">
        {['SEC 10-Q', 'Bloomberg', 'Reuters'].map(c => (
          <span
            key={c}
            className="text-xs px-2 py-1 rounded-md font-medium"
            style={{
              background: 'rgba(37,99,235,0.1)',
              color: '#2563EB',
              border: '1px solid rgba(37,99,235,0.2)',
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

function BattleVisual() {
  const companies = [
    { name: 'AAPL', color: '#2563EB' },
    { name: 'MSFT', color: '#4F46E5' },
  ]
  const metrics = [
    { label: 'Revenue Growth', aapl: 72, msft: 88 },
    { label: 'Profit Margin',  aapl: 85, msft: 80 },
    { label: 'R&D Investment', aapl: 60, msft: 90 },
    { label: 'Market Share',   aapl: 78, msft: 75 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {companies.map(c => (
          <div key={c.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
            <span className="text-xs text-text-muted font-medium">{c.name}</span>
          </div>
        ))}
      </div>

      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex justify-between mb-1">
            <span className="text-xs text-text-muted">{m.label}</span>
          </div>
          <div className="flex gap-1.5">
            {[{ score: m.aapl, color: '#2563EB' }, { score: m.msft, color: '#4F46E5' }].map((bar, bi) => (
              <div key={bi} className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.score}%` }}
                  transition={{ delay: i * 0.1 + 0.3 + bi * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: bar.color }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div
        className="rounded-xl p-3 mt-4"
        style={{
          background: 'rgba(37,99,235,0.08)',
          border: '1px solid rgba(37,99,235,0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={12} className="text-primary" />
          <span className="text-xs font-semibold text-primary">AI Verdict</span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Microsoft leads in cloud growth (+28% YoY) while Apple maintains superior margins (25.3%).
          Both are strong long-term holds.
        </p>
      </div>
    </div>
  )
}

function LearnVisual() {
  const terms = [
    { term: 'P/E Ratio',     desc: 'Price relative to earnings',   color: '#2563EB' },
    { term: 'ROE',           desc: 'Return on equity efficiency',   color: '#4F46E5' },
    { term: 'Free Cash Flow', desc: 'Cash after capital expenses',  color: '#10B981' },
    { term: 'EBITDA',        desc: 'Earnings before deductions',    color: '#F59E0B' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {terms.map((t, i) => (
        <motion.div
          key={t.term}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -3, scale: 1.03 }}
          className="rounded-xl p-3.5 cursor-pointer border border-border transition-all duration-200"
          
          style={{ background: 'var(--surface-elevated)' }}
        >
          <div
            className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center"
            style={{ background: `${t.color}20` }}
          >
            <BookOpen size={14} style={{ color: t.color }} />
          </div>
          <p className="text-sm font-semibold text-text-primary mb-0.5">{t.term}</p>
          <p className="text-xs text-text-muted">{t.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

function DigestVisual() {
  return (
    <div
      className="rounded-xl border border-border overflow-hidden transition-colors duration-300"
      
      style={{ background: 'var(--surface-elevated)' }}
    >
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted">Good morning</p>
          <p className="font-semibold text-text-primary text-sm">Market Briefing</p>
        </div>
        <span className="text-xs text-text-muted">Today</span>
      </div>
      <div className="p-4 space-y-3">
        {[
          { label: 'S&P 500',          value: '+0.84%', positive: true  },
          { label: 'NVDA (Watchlist)', value: '+4.28%', positive: true  },
          { label: 'TSLA (Watchlist)', value: '-1.84%', positive: false },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between py-1">
            <span className="text-sm text-text-secondary">{item.label}</span>
            <span className={`text-sm font-semibold ${
              item.positive ? 'text-success' : 'text-error'
            }`}>
              {item.value}
            </span>
          </div>
        ))}
        <div
          className="mt-3 rounded-lg p-3"
          style={{
            background: 'rgba(37,99,235,0.06)',
            borderLeft: '3px solid #2563EB',
          }}
        >
          <p className="text-xs font-semibold text-primary mb-1">📚 Today's Term</p>
          <p className="text-xs text-text-secondary">
            <strong className="text-text-primary">Gross Margin</strong> — Revenue remaining after
            direct production costs.
          </p>
        </div>
      </div>
    </div>
  )
}

const visuals = {
  chat:   ChatVisual,
  battle: BattleVisual,
  learn:  LearnVisual,
  digest: DigestVisual,
}

// ── Main carousel ──────────────────────────────────────────────────────────────

export default function FeatureCarousel() {
  const [active, setActive]       = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((index) => {
    setDirection(index > active ? 1 : -1)
    setActive(index)
  }, [active])

  const next = useCallback(() => goTo((active + 1) % slides.length), [active, goTo])
  const prev = useCallback(() => goTo((active - 1 + slides.length) % slides.length), [active, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide  = slides[active]
  const Visual = visuals[slide.visual]

  return (
    <section className="py-24 px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

       {/* Tab buttons */}
<div className="flex flex-wrap justify-center gap-3 mb-16">
  {slides.map((s, i) => {
    const Icon = s.icon

    return (
      <button
        key={s.id}
        onClick={() => goTo(i)}
        onMouseEnter={(e) => {
          if (active !== i) {
            e.currentTarget.style.background =
              'linear-gradient(135deg, #020617, #0F172A)'
            e.currentTarget.style.color = '#ffffff'
            e.currentTarget.style.borderColor = '#1E293B'
          }
        }}
        onMouseLeave={(e) => {
          if (active !== i) {
            e.currentTarget.style.background = 'var(--surface)'
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.borderColor = 'var(--border)'
          }
        }}
        className={`
          flex items-center gap-2
          px-4 py-2.5
          rounded-xl
          text-sm font-medium
          border
          transition-all duration-300
          ${active === i ? 'text-white border-transparent shadow-lg' : ''}
        `}
        style={
          active === i
            ? {
                background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.25)',
              }
            : {
                background: 'var(--surface)',
                color: 'var(--text-muted)',
                borderColor: 'var(--border)',
              }
        }
      >
        <Icon size={15} />
        {s.badge}
      </button>
    )
  })}
</div>
        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, x: -24 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 * direction }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-5"
                style={{
                  color: '#2563EB',
                  borderColor: 'rgba(37,99,235,0.3)',
                  background: 'rgba(37,99,235,0.08)',
                }}
              >
                <slide.icon size={12} />
                {slide.badge}
              </span>

              <h2
                className="font-bold text-text-primary leading-tight mb-6 text-balance"
                style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
              >
                {slide.heading}
              </h2>

              <ul className="space-y-3">
                {slide.bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 text-text-secondary"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    {bullet}
                  </motion.li>
                ))}
              </ul>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all duration-150"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === active
                          ? 'w-6 h-2 bg-primary'
                          : 'w-2 h-2 bg-border hover:bg-text-muted'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all duration-150"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right — Visual panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`visual-${active}`}
              initial={{ opacity: 0, x: 24 * direction, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24 * direction, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border p-6 transition-colors duration-300"
              
              style={{ background: 'var(--surface)' }}
            >
              <Visual />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}