// src/components/home/AIResearchPreview.jsx
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Star,
  StarOff,
  Sparkles,
  ExternalLink,
  Shield,
} from 'lucide-react'
import { useState } from 'react'
import SectionHeader from '../shared/SectionHeader.jsx'

const defaultCompany = {
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  exchange: 'NASDAQ',
  price: '$875.40',
  change: '+$35.88 (4.28%)',
  performance: '+218%',
  kpis: [
    { label: 'Revenue (TTM)', value: '$60.9B', change: '+122%', positive: true },
    { label: 'Net Income', value: '$29.8B', change: '+581%', positive: true },
    { label: 'Operating Margin', value: '54.1%', change: '+21pp', positive: true },
    { label: 'P/E Ratio', value: '65.2x', change: 'vs 25x avg', positive: null },
  ],
  news: [
    {
      source: 'Bloomberg',
      headline: 'NVIDIA H100 demand exceeds supply through 2025',
      time: '2h ago',
    },
    {
      source: 'Reuters',
      headline: 'Jensen Huang signals next-gen Blackwell GPU launch',
      time: '5h ago',
    },
    {
      source: 'WSJ',
      headline: 'NVIDIA overtakes Apple briefly as most valuable company',
      time: '1d ago',
    },
  ],
  bars: [40, 55, 48, 70, 65, 82, 78, 90, 85, 95, 88, 100],
  aiSummary: [
    'NVIDIA has evolved from a gaming GPU manufacturer into a leading provider of AI infrastructure.',
    'Data-center revenue continues to drive the majority of growth, supported by hyperscaler demand and expanding operating margins.',
  ],
}

export default function AIResearchPreview({ company = defaultCompany }) {
  const [watchlisted, setWatchlisted] = useState(false)

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="AI Research"
          title="Professional-grade company intelligence"
          description="Fundamentals, market-moving news, and AI-generated research summaries grounded in verified financial sources."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT CARD */}
          <div className="rounded-2xl border border-border p-6" style={{ background: 'var(--surface)' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-text-primary">
                  {company.name}
                </h3>
                <p className="text-sm text-text-muted">
                  {company.ticker} · {company.exchange}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setWatchlisted((prev) => !prev)}
                className="p-2 rounded-xl border border-border"
              >
                {watchlisted ? (
                  <Star size={16} className="fill-current text-yellow-500" />
                ) : (
                  <StarOff size={16} className="text-text-muted" />
                )}
              </button>
            </div>

            <p className="text-3xl font-bold text-text-primary">{company.price}</p>
            <div className="flex items-center gap-2 mt-2 mb-6">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-green-500 text-sm font-semibold">
                {company.change}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {company.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border p-3"
                  style={{ background: 'var(--surface-elevated)' }}
                >
                  <p className="text-xs text-text-muted mb-1">{kpi.label}</p>
                  <p className="font-semibold text-text-primary">{kpi.value}</p>
                  <p className="text-xs text-text-muted mt-1">{kpi.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-2xl border border-border p-6 flex flex-col gap-5" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">AI Research Summary</h4>
                <p className="text-xs text-text-muted">Updated 2 minutes ago</p>
              </div>
            </div>

            <div className="rounded-xl border border-border p-4 space-y-3" style={{ background: 'var(--surface-elevated)' }}>
              {company.aiSummary.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
                Recent References
              </h5>

              <div className="space-y-2">
                {company.news.map((item) => (
                  <div
                    key={item.headline}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border"
                    style={{ background: 'var(--surface-elevated)' }}
                  >
                    <span className="text-xs font-semibold text-primary shrink-0">
                      {item.source}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-secondary">{item.headline}</p>
                      <p className="text-xs text-text-muted mt-1">{item.time}</p>
                    </div>

                    <ExternalLink size={12} className="text-text-muted shrink-0 mt-0.5" />
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
              <Shield size={14} className="text-green-500" />
              <p className="text-xs text-text-secondary">
                Grounded answer — sourced from SEC filings, earnings calls, and verified financial databases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}