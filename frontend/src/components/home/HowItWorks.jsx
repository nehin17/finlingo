// src/components/home/HowItWorks.jsx
import { motion } from 'framer-motion'
import { Search, Brain, BarChart2, ArrowRight } from 'lucide-react'
import SectionHeader from '../shared/SectionHeader.jsx'

const steps = [
  {
    icon: Search,
    title: 'Search any company',
    description:
      'Type any ticker or company name. FinLingo instantly retrieves live financials, SEC filings, and recent news.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.10)',
  },
  {
    icon: Brain,
    title: 'Ask the AI assistant',
    description:
      'Ask questions in plain English. Get grounded answers with citations from SEC filings and financial databases.',
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.10)',
  },
  {
    icon: BarChart2,
    title: 'Compare before you invest',
    description:
      'Use Battle Mode to compare companies side-by-side with visual charts and an AI-generated investment verdict.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.10)',
  },
]

export default function HowItWorks() {
  return (
    // ✅ REMOVED: py-24 px-8 + background
    // Now it's just the inner content that fits the showcase
    <section
      className="transition-colors duration-300 w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-[1200px] w-full">
        {/* ✅ REDUCED: mb-16 to mb-8 to fit better */}
        <SectionHeader
          badge="How it works"
          title="Research any stock in three simple steps"
          subtitle="From discovery to comparison, FinLingo turns hours of financial research into a streamlined AI-assisted workflow."
          className="mb-8"
        />

        {/* ✅ REDUCED: gap-8 to gap-6 */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-12 left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-px"
            style={{
              background:
                'linear-gradient(to right, rgba(37,99,235,0.25), rgba(79,70,229,0.25), rgba(16,185,129,0.25))',
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                // ✅ REDUCED: mb-8 to mb-6
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="relative mb-6">
                  {/* ✅ REDUCED: w-24 h-24 to w-20 h-20 */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 border"
                    style={{
                      background: step.bg,
                      borderColor: 'var(--border)',
                    }}
                  >
                    {/* ✅ REDUCED: icon size from 32 to 28 */}
                    <Icon size={28} style={{ color: step.color }} />
                  </div>

                  {/* Step number */}
                  <div
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
                    style={{
                      background: step.color,
                      borderColor: 'var(--bg)',
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                {/* ✅ REDUCED: text-xl to text-lg, mb-3 to mb-2 */}
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {step.title}
                </h3>

                {/* ✅ REDUCED: text-sm and max-w-xs */}
                <p
                  className="leading-relaxed text-xs sm:text-sm max-w-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {step.description}
                </p>

                {/* Mobile arrow */}
                {i < steps.length - 1 && (
                  <div className="md:hidden mt-4">
                    <ArrowRight
                      size={20}
                      className="rotate-90"
                      style={{ color: 'var(--border)' }}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}