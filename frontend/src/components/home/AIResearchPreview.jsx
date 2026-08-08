// src/components/home/AIResearchPreview.jsx
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Star, StarOff,
  Sparkles, ExternalLink, Shield
} from 'lucide-react'
import { useState } from 'react'
import SectionHeader from '../shared/SectionHeader.jsx'

const kpis = [
  { label: 'Revenue (TTM)', value: '$60.9B',  change: '+122%',      positive: true  },
  { label: 'Net Income',    value: '$29.8B',  change: '+581%',      positive: true  },
  { label: 'Operating Margin', value: '54.1%', change: '+21pp',     positive: true  },
  { label: 'P/E Ratio',    value: '65.2x',   change: 'vs 25x avg', positive: null  },
]

const newsItems = [
  { source: 'Bloomberg', headline: 'NVIDIA H100 demand exceeds supply through 2025',          time: '2h ago' },
  { source: 'Reuters',   headline: 'Jensen Huang signals next-gen Blackwell GPU launch',       time: '5h ago' },
  { source: 'WSJ',       headline: 'NVIDIA overtakes Apple briefly as most valuable company',  time: '1d ago' },
]

const bars = [40, 55, 48, 70, 65, 82, 78, 90, 85, 95, 88, 100]

export default function AIResearchPreview() {
  const [watchlisted, setWatchlisted] = useState(false)

  return (
    <section className="py-24 px-8">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          badge="AI Research Engine"
          title="Deep company intelligence, instantly"
          subtitle="Get SEC-grounded insights, financial metrics, and AI-generated analysis for any publicly traded company."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── Left — Company Snapshot ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border p-6 transition-colors duration-300"
           
            style={{ background: 'var(--surface)' }}
          >
            {/* Company Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">NV</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-lg">NVIDIA Corporation</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-text-muted">NVDA</span>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-xs text-text-muted px-2 py-0.5 rounded-full border border-border">
                      NASDAQ
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setWatchlisted(prev => !prev)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  watchlisted
                    ? 'bg-warning/10 border-warning/30 text-warning'
                    : 'border-border text-text-muted hover:border-warning/30 hover:text-warning'
                }`}
              >
                {watchlisted
                  ? <Star size={14} className="fill-current" />
                  : <StarOff size={14} />
                }
                {watchlisted ? 'Watching' : 'Watch'}
              </button>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-text-primary">$875.40</p>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp size={14} className="text-success" />
                <span className="text-success font-semibold">+$35.88 (4.28%)</span>
                <span className="text-text-muted text-sm">Today</span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {kpis.map(kpi => (
                <div
                  key={kpi.label}
                  className="rounded-xl p-3.5 border border-border transition-colors duration-300"
                  
                  style={{ background: 'var(--surface-elevated)' }}
                >
                  <p className="text-xs text-text-muted mb-1">{kpi.label}</p>
                  <p className="font-bold text-text-primary">{kpi.value}</p>
                  {kpi.positive !== null && (
                    <p className={`text-xs font-medium mt-0.5 ${
                      kpi.positive ? 'text-success' : 'text-error'
                    }`}>
                      {kpi.change}
                    </p>
                  )}
                  {kpi.positive === null && (
                    <p className="text-xs font-medium mt-0.5 text-text-muted">{kpi.change}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Mini Chart */}
            <div>
              <div className="flex justify-between text-xs text-text-muted mb-2">
                <span>12-Month Performance</span>
                <span className="text-success font-semibold">+218%</span>
              </div>
              <div className="flex items-end gap-1 h-16">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="flex-1 rounded-sm origin-bottom"
                    style={{
                      height: `${h}%`,
                      background: i >= bars.length - 3
                        ? 'linear-gradient(180deg, #2563EB, #4F46E5)'
                        : 'rgba(37,99,235,0.25)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right — AI Summary ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border p-6 flex flex-col gap-5 transition-colors duration-300"
            
            style={{ background: 'var(--surface)' }}
          >
            {/* AI Header */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
                <Sparkles size={14} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">AI Research Summary</h4>
                <p className="text-xs text-text-muted">Updated 2 minutes ago</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success font-medium">Live</span>
              </div>
            </div>

            {/* AI Text block */}
            <div
              className="rounded-xl p-4 border transition-colors duration-300"
             
              style={{
                background: 'var(--surface-elevated)',
                borderColor: 'var(--border)',
              }}
            >
              <p className="text-sm text-text-secondary leading-relaxed">
                NVIDIA has undergone a remarkable transformation from a gaming GPU manufacturer to the de facto
                infrastructure provider for the AI revolution. The company's{' '}
                <span className="text-text-primary font-medium">H100 and A100 chips</span> have become
                indispensable for training large language models, with hyperscalers including Microsoft, Google,
                and Amazon committing to billions in GPU purchases.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mt-3">
                Revenue grew <span className="text-success font-semibold">265% YoY</span> in FY2024, with the
                data center segment contributing{' '}
                <span className="text-primary font-medium">83% of total revenue</span>.
                Operating margins expanded from 26% to 54%, reflecting significant operating leverage.
              </p>
            </div>

            {/* News */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
                Recent References
              </h5>
              <div className="space-y-2">
                {newsItems.map(news => (
                  <div
                    key={news.headline}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 cursor-pointer group"
                    
                    style={{ background: 'var(--surface-elevated)' }}
                  >
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md shrink-0 mt-0.5"
                      style={{ background: 'rgba(37,99,235,0.12)', color: '#2563EB' }}
                    >
                      {news.source}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">
                        {news.headline}
                      </p>
                      <p className="text-xs text-text-muted mt-1">{news.time}</p>
                    </div>
                    <ExternalLink
                      size={12}
                      className="text-text-muted shrink-0 group-hover:text-primary transition-colors mt-0.5"
                    />
                  </div>
                ))}
              </div>
            </div>

            
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <Shield size={14} className="text-success" />
              <p className="text-xs text-text-secondary">
                <span className="text-success font-semibold">Grounded answer</span> — sourced from SEC filings,
                earnings calls, and verified financial databases.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}