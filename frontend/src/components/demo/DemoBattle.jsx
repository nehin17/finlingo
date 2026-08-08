import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const metrics = [
  { label: 'Revenue Growth',  nvda: 88, amd: 61 },
  { label: 'Gross Margin',    nvda: 76, amd: 54 },
  { label: 'AI Market Share', nvda: 92, amd: 38 },
  { label: 'Free Cash Flow',  nvda: 81, amd: 59 },
]

const companies = [
  { name: 'NVDA', color: '#2563EB' },
  { name: 'AMD',  color: '#F59E0B' },
]

export default function DemoBattle() {
  return (
    <div
      className="px-8 py-10 min-h-[480px] flex flex-col gap-6"
      style={{ background: '#0F172A' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#F59E0B' }}
          >
            Battle Mode
          </span>
          <h3 className="text-xl font-bold text-white mt-1">NVIDIA vs AMD</h3>
        </div>

        <div className="flex gap-4">
          {companies.map(c => (
            <div key={c.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: c.color }}
              />
              <span className="text-xs text-slate-400 font-semibold">{c.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="flex flex-col gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs text-slate-400">{m.label}</span>
              <div className="flex gap-4">
                <span className="text-xs font-bold" style={{ color: '#2563EB' }}>
                  {m.nvda}
                </span>
                <span className="text-xs font-bold" style={{ color: '#F59E0B' }}>
                  {m.amd}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { score: m.nvda, color: '#2563EB' },
                { score: m.amd,  color: '#F59E0B' },
              ].map((bar, bi) => (
                <div
                  key={bi}
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.score}%` }}
                    transition={{
                      delay:    i * 0.1 + 0.3 + bi * 0.08,
                      duration: 0.7,
                      ease:     [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-full"
                    style={{ background: bar.color }}
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
        transition={{ delay: 0.7, duration: 0.5 }}
        className="rounded-xl p-4"
        style={{
          background:   'rgba(37,99,235,0.06)',
          border:       '1px solid rgba(37,99,235,0.16)',
          borderLeft:   '3px solid #2563EB',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} style={{ color: '#60A5FA' }} />
          <span className="text-xs font-bold" style={{ color: '#60A5FA' }}>
            AI Verdict
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          NVIDIA currently leads in AI infrastructure scale, software ecosystem strength,
          and profitability. AMD remains attractive for valuation-sensitive investors
          seeking exposure to the same long-term AI trend.
        </p>
      </motion.div>
    </div>
  )
}