import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import DemoOrb from './DemoOrb'

export default function DemoNews({ onNext }) {
  return (
    <div className="px-8 py-12 min-h-[480px] flex flex-col justify-center gap-10"
      style={{ background: '#0F172A' }}
    >
      {/* Header badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: '#10B981' }}
        />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: '#10B981' }}
        >
          Breaking Market News
        </span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left — headline */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold text-white mb-4"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.2 }}
          >
            NVIDIA jumps 4.3% after earnings
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="text-slate-400 leading-relaxed"
            style={{ fontSize: 15 }}
          >
            Analysts raise data-center revenue estimates as AI infrastructure demand
            remains exceptionally strong heading into the next fiscal quarter.
          </motion.p>
        </div>

        {/* Right — market card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-6 flex flex-col gap-3"
          style={{
            background:  'rgba(16,185,129,0.06)',
            border:      '1px solid rgba(16,185,129,0.2)',
            boxShadow:   '0 0 24px rgba(16,185,129,0.12)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.15)' }}
            >
              <TrendingUp size={18} style={{ color: '#10B981' }} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">NASDAQ</p>
              <p className="font-bold text-white text-lg">NVDA</p>
            </div>
          </div>

          <div>
            <p
              className="font-bold text-white"
              style={{ fontSize: 36, letterSpacing: '-0.04em' }}
            >
              $875.40
            </p>
            <motion.p
              className="text-sm font-bold mt-1"
              style={{ color: '#10B981' }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ▲ +4.3% today
            </motion.p>
          </div>

          <div
            className="rounded-lg px-3 py-2 text-xs"
            style={{
              background: 'rgba(16,185,129,0.08)',
              color:      '#10B981',
            }}
          >
            Market open · Data center revenue +18% vs estimates
          </div>
        </motion.div>
      </div>

      {/* Orb CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <DemoOrb size={48} />
        <div
          className="px-4 py-2.5 rounded-xl text-sm text-slate-300"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border:     '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Let's find out why the stock moved.
        </div>
      </motion.div>
    </div>
  )
}