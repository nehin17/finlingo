import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AI_RESPONSE = `NVIDIA gained 4.3% after analysts raised data-center revenue estimates and AI infrastructure demand remained exceptionally strong.

Key drivers:
• Record AI accelerator shipments
• Cloud providers increasing GPU spending
• Gross margin guidance above Wall Street expectations
• Multiple brokerages raised price targets after the earnings call`

const CITATIONS = [
  'SEC 10-Q',
  'Earnings Call',
  'Analyst Consensus',
]

export default function DemoChat({ paused = false }) {
  const [phase, setPhase] = useState(0)

  // 0 = user message
  // 1 = typing indicator
  // 2 = AI response
  // 3 = follow-up question

  const timersRef = useRef([])

  useEffect(() => {
    // Clear any previous timers
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    if (paused) {
      return
    }

    // Restart animation sequence
    setPhase(0)

    timersRef.current = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2600),
    ]

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [paused])

  return (
    <div
      className="px-8 py-10 min-h-[480px] flex flex-col gap-4 rounded-3xl"
      style={{ background: '#0F172A' }}
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg"
            style={{
              background:
                'linear-gradient(135deg, #2563EB, #4F46E5)',
            }}
          >
            AI
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              AI Research Assistant
            </p>

            <p className="text-xs text-slate-400">
              FinLingo Atlas demo
            </p>
          </div>
        </div>

        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            background: 'rgba(16,185,129,0.12)',
            color: '#10B981',
          }}
        >
          Active
        </span>
      </div>

      {/* User message */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div
          className="max-w-[72%] px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white shadow-lg"
          style={{
            background:
              'linear-gradient(135deg, #2563EB, #4F46E5)',
          }}
        >
          Why did NVIDIA surge today?
        </div>
      </motion.div>

      {/* Typing indicator */}

      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-1.5 pl-2 items-center h-8"
          >
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="w-2 h-2 rounded-full"
                style={{ background: '#2563EB' }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.18,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI response */}

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-3"
          >
            <div
              className="max-w-[88%] px-4 py-4 rounded-2xl rounded-bl-sm text-sm text-slate-300 leading-relaxed whitespace-pre-line shadow-lg"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border:
                  '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {AI_RESPONSE}
            </div>

            {/* Citations */}

            <div className="flex flex-wrap gap-2 pl-1">
              {CITATIONS.map((citation, index) => (
                <motion.button
                  key={citation}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.3,
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  style={{
                    background: 'rgba(37,99,235,0.08)',
                    border:
                      '1px solid rgba(37,99,235,0.18)',
                    color: '#60A5FA',
                  }}
                >
                  {citation}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Follow-up message */}

      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-end mt-auto"
          >
            <div
              className="max-w-[72%] px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, #2563EB, #4F46E5)',
              }}
            >
              Compare NVIDIA with AMD
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}