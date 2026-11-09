import { motion } from 'framer-motion'
import DemoOrb from './DemoOrb'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.55,
    ease,
  },
})

export default function DemoOutro({
  onReplay = () => {},
  onClose = () => {},
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-8 py-16 min-h-[480px]"
      style={{
        background:
          'radial-gradient(circle at top, rgba(37,99,235,0.18), transparent 60%), #0F172A',
      }}
    >
      {/* Atlas Orb */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <DemoOrb size={96} animated />
      </motion.div>

      {/* Heading */}
      <motion.h2
        {...fadeUp(0.1)}
        className="font-bold text-white mb-4"
        style={{
          fontSize: 'clamp(20px, 3vw, 32px)',
          maxWidth: 520,
        }}
      >
        Research smarter. Learn faster. Invest with confidence.
      </motion.h2>

      {/* Description */}
      <motion.p
        {...fadeUp(0.2)}
        className="text-slate-400 mb-10 leading-relaxed"
        style={{ maxWidth: 420, fontSize: 15 }}
      >
        FinLingo combines real market data, financial education, and AI-assisted
        workflows into one research experience.
      </motion.p>

      {/* Actions */}
      <motion.div
        {...fadeUp(0.3)}
        className="flex flex-wrap gap-4 justify-center"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Finish the demo and get started with FinLingo"
          className="px-8 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          style={{
            background:
              'linear-gradient(135deg, #2563EB, #4F46E5)',
          }}
        >
          Get Started
        </button>

        <button
          type="button"
          onClick={onReplay}
          aria-label="Replay the FinLingo product demo"
          className="px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-slate-900"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: '#E2E8F0',
          }}
        >
          Replay demo
        </button>
      </motion.div>
    </div>
  )
}