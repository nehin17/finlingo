// src/components/home/SecuritySection.jsx
import { motion } from 'framer-motion'
import { Shield, FileText, BookOpen } from 'lucide-react'
import SectionHeader from '../shared/SectionHeader.jsx'

const trustCards = [
  {
    icon: Shield,
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.12)',
    title: 'Secure Authentication',
    description:
      'Enterprise-grade security with Firebase Authentication, OAuth 2.0 support, and encrypted session management.',
    features: ['Firebase Auth', 'OAuth 2.0', 'Session management', '2FA support'],
  },
  {
    icon: FileText,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)',
    title: 'Grounded Research',
    description:
      'Every AI answer is grounded in real data — SEC filings, financial metrics, earnings calls, and verified news sources.',
    features: ['SEC EDGAR filings', 'Financial metrics', 'Earnings calls', 'News verification'],
  },
  {
    icon: BookOpen,
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.12)',
    title: 'Learn as You Research',
    description:
      'FinLingo explains complex financial concepts in plain English as you explore. No finance degree required.',
    features: ['Interactive glossary', 'Quiz tracking', 'Learning history', 'Personalized path'],
  },
]

export default function SecuritySection() {
  return (
    // ✅ REMOVED: py-24 px-8 + hardcoded background
    // Now it fits inside the showcase container
    <section
      className="transition-colors duration-300 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* ✅ REDUCED: Shield watermark opacity from 0.04 to 0.02 */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ opacity: 0.02 }}
      >
        <Shield size={180} style={{ color: 'var(--primary)' }} />
      </div>

      <div className="max-w-[1400px] w-full relative z-10">
        {/* ✅ REDUCED: mb-16 to mb-8 */}
        <SectionHeader
          badge="Security & Trust"
          title="Built on transparency and security"
          subtitle="Your data is protected and every insight is traceable to its source. No black boxes, no guesswork."
          className="mb-8"
        />

        {/* ✅ REDUCED: gap-6 to gap-4 */}
        <div className="grid md:grid-cols-3 gap-4">
          {trustCards.map((card, i) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -2,
                  borderColor: card.color,
                  boxShadow: `0 12px 28px ${card.color}20`,
                }}
                // ✅ REDUCED: p-6 to p-4
                className="rounded-2xl border p-4 cursor-default transition-all duration-300"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* ✅ REDUCED: Icon size and spacing */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: card.bg }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>

                {/* ✅ REDUCED: Title size and spacing */}
                <h3
                  className="font-bold text-sm sm:text-base mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {card.title}
                </h3>

                {/* ✅ REDUCED: Description text size and spacing */}
                <p
                  className="text-xs sm:text-sm leading-relaxed mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {card.description}
                </p>

                {/* ✅ REDUCED: Features spacing and size */}
                <ul className="space-y-1.5">
                  {card.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: card.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}