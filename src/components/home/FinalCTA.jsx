// src/components/home/FinalCTA.jsx
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import Button from '../shared/Button.jsx'
import { Link } from 'react-router-dom'

export default function FinalCTA({ onSignUpClick }) {
  return (
    <section className="relative overflow-hidden py-32 px-8 flex items-center justify-center min-h-[480px]">

      {/* ── Background layers ──────────────────────────────────────────── */}
     
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ background: 'var(--bg)' }}
      />

      
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Animated rings — rgba primary tints work in both themes */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10 pointer-events-none"
          style={{
            width:  `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}

      {/* ── Content ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border"
            style={{
              color: '#2563EB',
              borderColor: 'rgba(37,99,235,0.3)',
              background: 'rgba(37,99,235,0.06)',
            }}
          >
            <Sparkles size={12} />
            Start researching today
          </span>
        </div>

        <h2
          className="font-bold text-text-primary leading-tight mb-6"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          Your next investment decision deserves better tools
        </h2>

        <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Join PulseBoard to search companies, compare competitors, learn financial concepts,
          and get AI-powered insights grounded in real market data and SEC filings.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={onSignUpClick}>
            Create free account
            <ArrowRight size={18} />
          </Button>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary">
              Explore live demo
              <ChevronRight size={18} />
            </Button>
          </Link>
        </div>

        <p className="text-xs text-text-muted mt-6">
          No credit card required • Free forever for basic research
        </p>
      </motion.div>
    </section>
  )
}