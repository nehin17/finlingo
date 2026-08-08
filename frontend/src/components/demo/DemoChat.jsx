import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const aiResponse = `NVIDIA gained 4.3% after analysts raised data-center revenue estimates and AI infrastructure demand remained exceptionally strong.

Key drivers:
• Record AI accelerator shipments
• Cloud providers increasing GPU spending
• Gross margin guidance above Wall Street expectations
• Multiple brokerages raised price targets after the earnings call`

const citations = ['SEC 10-Q', 'Earnings Call', 'Analyst Consensus']

export default function DemoChat({paused}) {
  const [phase, setPhase] = useState(0)
  // 0 = user msg, 1 = typing, 2 = ai response, 3 = follow-up

  useEffect(() => {
    if (paused) return
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [paused])

  return (
    <div
      className="px-8 py-10 min-h-[480px] flex flex-col gap-4"
      style={{ background: '#0F172A' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
        >
          <span className="text-white text-xs font-bold">AI</span>
        </div>
        <span className="text-sm font-semibold text-white">AI Research Assistant</span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}
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
          className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
        >
          Why did NVIDIA surge today?
        </div>
      </motion.div>

      {/* Typing indicator */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-1.5 pl-2 items-center"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: '#2563EB' }}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <div
              className="max-w-[85%] px-4 py-3.5 rounded-2xl rounded-bl-sm text-sm text-slate-300 leading-relaxed whitespace-pre-line"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border:     '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {aiResponse}
            </div>

            {/* Citations */}
            <div className="flex flex-wrap gap-2 pl-1">
              {citations.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    background: 'rgba(37,99,235,0.08)',
                    border:     '1px solid rgba(37,99,235,0.18)',
                    color:      '#60A5FA',
                  }}
                >
                  {c}
                </motion.span>
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
            className="flex justify-end"
          >
            <div
              className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
            >
              Compare NVIDIA with AMD
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}