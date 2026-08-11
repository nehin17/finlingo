// src/components/demo/DemoBattle.jsx

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

// Demo-only showcase data.
// Replace with props or API-driven data if reused elsewhere.

const companies = [
  {
    key: 'NVDA',
    name: 'NVIDIA',
    color: '#2563EB',
  },
  {
    key: 'AMD',
    name: 'AMD',
    color: '#F59E0B',
  },
]

const metrics = [
  {
    label: 'Revenue Growth',
    scores: { NVDA: 88, AMD: 61 },
  },
  {
    label: 'Gross Margin',
    scores: { NVDA: 76, AMD: 54 },
  },
  {
    label: 'AI Market Share',
    scores: { NVDA: 92, AMD: 38 },
  },
  {
    label: 'Free Cash Flow',
    scores: { NVDA: 81, AMD: 59 },
  },
]

export default function DemoBattle() {
  return (
    <div
      className="px-8 py-10 min-h-[480px] flex flex-col gap-6 rounded-3xl"
      style={{ background: '#0F172A' }}
    >
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex items-start justify-between gap-4 flex-wrap"
      >
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: '#F59E0B' }}
          >
            Battle Mode
          </p>

          <h3 className="text-xl font-bold text-white">
            NVIDIA vs AMD
          </h3>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {companies.map((company) => (
            <div
              key={company.key}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: company.color }}
              />

              <span className="text-xs text-slate-400 font-semibold">
                {company.key}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Metrics */}

      <div className="flex flex-col gap-5">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">
                {metric.label}
              </span>

              <div className="flex items-center gap-5">
                {companies.map((company) => (
                  <span
                    key={company.key}
                    className="text-xs font-bold"
                    style={{ color: company.color }}
                  >
                    {metric.scores[company.key]}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {companies.map((company, barIndex) => (
                <div
                  key={company.key}
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                  }}
                  role="progressbar"
                  aria-label={`${company.name} ${metric.label}`}
                  aria-valuenow={metric.scores[company.key]}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${metric.scores[company.key]}%`,
                    }}
                    transition={{
                      delay:
                        index * 0.1 +
                        0.3 +
                        barIndex * 0.08,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-full"
                    style={{ background: company.color }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Verdict */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.5,
        }}
        className="rounded-2xl p-5 mt-2"
        style={{
          background: 'rgba(37,99,235,0.06)',
          border: '1px solid rgba(37,99,235,0.16)',
          borderLeft: '3px solid #2563EB',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles
            size={14}
            style={{ color: '#60A5FA' }}
          />

          <span
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: '#60A5FA' }}
          >
            AI Verdict
          </span>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed">
          NVIDIA currently leads in AI infrastructure scale,
          software ecosystem strength, and profitability. AMD
          remains attractive for valuation-sensitive investors
          seeking exposure to the same long-term AI trend.
        </p>
      </motion.div>
    </div>
  )
}