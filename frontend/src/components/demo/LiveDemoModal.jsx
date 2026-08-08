
// src/components/demo/LiveDemoModal.jsx

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Pause, Play, RotateCcw } from 'lucide-react'

import DemoIntro from './DemoIntro'
import DemoNews from './DemoNews'
import DemoChat from './DemoChat'
import DemoBattle from './DemoBattle'
import DemoDigest from './DemoDigest'
import DemoOutro from './DemoOutro'

import { stepDurations, steps } from '../../data/demoStory'

const TOTAL = stepDurations.reduce((a, b) => a + b, 0)

const StepComponents = {
  intro: DemoIntro,
  news: DemoNews,
  chat: DemoChat,
  battle: DemoBattle,
  digest: DemoDigest,
  outro: DemoOutro,
}

export default function LiveDemoModal({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const reset = useCallback(() => {
    setStep(0)
    setElapsed(0)
    setPaused(false)
  }, [])

  // Auto-advance between steps
  useEffect(() => {
    if (!open || paused) return
    if (step >= steps.length - 1) return

    const timer = setTimeout(() => {
      setStep((s) => s + 1)
    }, stepDurations[step])

    return () => clearTimeout(timer)
  }, [open, step, paused])

  // Animate progress bar
  useEffect(() => {
    if (!open || paused) return

    const interval = setInterval(() => {
      setElapsed((e) => Math.min(e + 100, TOTAL))
    }, 100)

    return () => clearInterval(interval)
  }, [open, paused])

  // Sync progress bar when step changes manually
  useEffect(() => {
    let totalBefore = 0

    for (let i = 0; i < step; i++) {
      totalBefore += stepDurations[i]
    }

    setElapsed(totalBefore)
  }, [step])

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(reset, 300)
      return () => clearTimeout(timeout)
    }
  }, [open, reset])

  if (!open) return null

  const CurrentStep = StepComponents[steps[step]]
  const progress = (elapsed / TOTAL) * 100

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: 'rgba(2, 6, 23, 0.82)',
            backdropFilter: 'blur(14px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: '#0F172A',
              border: '1px solid rgba(255,255,255,0.08)',
              maxHeight: '90vh',
            }}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {/* Step Indicators */}
              <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setStep(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === step ? 24 : 8,
                      height: 8,
                      background:
                        i === step
                          ? 'linear-gradient(135deg, #2563EB, #4F46E5)'
                          : i < step
                          ? 'rgba(37,99,235,0.5)'
                          : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  aria-label={paused ? 'Play demo' : 'Pause demo'}
                >
                  {paused ? <Play size={15} /> : <Pause size={15} />}
                </button>

                <button
                  onClick={reset}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  aria-label="Replay demo"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  aria-label="Close demo"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <CurrentStep
                    paused={paused}
                    onNext={() =>
                      setStep((s) => Math.min(s + 1, steps.length - 1))
                    }
                    onReplay={reset}
                    onClose={onClose}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div
              className="h-[3px] w-full shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #2563EB, #4F46E5)',
                }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

