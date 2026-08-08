import { motion } from 'framer-motion'
import DemoOrb from './DemoOrb'

const fadeUp = {
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

export default function DemoIntro({ onNext }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-8 py-16 min-h-[480px]"
      style={{
        background: 'radial-gradient(circle at top, rgba(37,99,235,0.18), transparent 60%), #0F172A',
      }}
    >
      <motion.div {...fadeUp} className="mb-8">
        <DemoOrb size={88} />
      </motion.div>

      <motion.span
        {...fadeUp}
        transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
        style={{
          background: 'rgba(37,99,235,0.12)',
          border:     '1px solid rgba(37,99,235,0.3)',
          color:      '#60A5FA',
        }}
      >
        Live Product Tour
      </motion.span>

      <motion.h2
        {...fadeUp}
        transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="font-bold text-white mb-4"
        style={{ fontSize: 'clamp(22px, 3vw, 36px)', maxWidth: 560 }}
      >
        Meet your AI-powered investment research assistant
      </motion.h2>

      <motion.p
        {...fadeUp}
        transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="text-slate-400 mb-10 leading-relaxed"
        style={{ maxWidth: 440, fontSize: 15 }}
      >
        From market-moving news to side-by-side company comparisons in under 60 seconds.
      </motion.p>

      <motion.button
        {...fadeUp}
        transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onClick={onNext}
        className="px-8 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
      >
        Start tour →
      </motion.button>
    </div>
  )
}