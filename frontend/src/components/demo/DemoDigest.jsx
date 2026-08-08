import { motion } from 'framer-motion'

const watchlist = [
  { ticker: 'NVDA', change: '+2.3%', positive: true  },
  { ticker: 'AAPL', change: '+0.8%', positive: true  },
  { ticker: 'MSFT', change: '+1.1%', positive: true  },
  { ticker: 'TSLA', change: '-1.8%', positive: false },
]

export default function DemoDigest() {
  return (
    <div
      className="px-8 py-10 min-h-[480px] flex flex-col gap-6"
      style={{ background: '#0F172A' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-slate-500 text-sm">Good morning, Alex 👋</p>
        <h3 className="text-xl font-bold text-white mt-1">Daily Market Digest</h3>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Market Pulse */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="rounded-xl p-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border:     '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#60A5FA' }}
          >
            Market Pulse
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            S&P 500 opened higher on positive jobs data. Semiconductor stocks lead gains
            while energy stocks lag amid falling oil prices.
          </p>
        </motion.div>

        {/* Watchlist */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="rounded-xl p-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border:     '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#60A5FA' }}
          >
            Your Watchlist
          </p>
          <div className="flex flex-col gap-2">
            {watchlist.map((item, i) => (
              <motion.div
                key={item.ticker}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                className="flex items-center justify-between py-1.5 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <span className="text-sm font-semibold text-white">{item.ticker}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: item.positive ? '#10B981' : '#EF4444' }}
                >
                  {item.change}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Learn Today */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="rounded-xl p-4"
        style={{
          background:  'rgba(79,70,229,0.06)',
          borderLeft:  '3px solid #4F46E5',
          border:      '1px solid rgba(79,70,229,0.16)',
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: '#818CF8' }}
        >
          📚 Learn Today — Gross Margin
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          <span className="text-white font-semibold">Gross Margin</span> — The percentage
          of revenue remaining after direct production costs. Higher gross margins usually
          indicate stronger pricing power and operational efficiency.
        </p>
      </motion.div>
    </div>
  )
}