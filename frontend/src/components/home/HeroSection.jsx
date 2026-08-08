// src/components/home/HeroSection.jsx
import { motion } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  BarChart2,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import SearchBar from '../shared/SearchBar.jsx'
import Button from '../shared/Button.jsx'

const tickers = ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'AMZN']

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

function AnimatedGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.06 }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#2563EB"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

function DashboardMockup() {
  const bars = [65, 78, 55, 90, 72, 85, 68, 95]

  return (
    <motion.div
      variants={floatVariants}
      initial="initial"
      animate="animate"
      className="relative w-full max-w-md"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'scale(1.2)',
        }}
      />

      {/* Main Card */}
      <div
        className="relative rounded-2xl border p-5 backdrop-blur-sm"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(37,99,235,0.12)' }}
            >
              <span
                className="text-sm font-bold"
                style={{ color: 'var(--primary)' }}
              >
                NV
              </span>
            </div>

            <div>
              <h4
                className="font-bold text-sm"
                style={{ color: 'var(--text)' }}
              >
                NVIDIA Corp.
              </h4>
              <p
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                NVDA • NASDAQ
              </p>
            </div>
          </div>

          <div className="text-right">
            <p
              className="font-bold"
              style={{ color: 'var(--text)' }}
            >
              $875.40
            </p>

            <span
              className="text-xs font-semibold flex items-center gap-1 justify-end"
              style={{ color: 'var(--success)' }}
            >
              <TrendingUp size={11} />
              +4.28%
            </span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Revenue Growth', value: '+122%', color: 'var(--success)' },
            { label: 'Op. Margin', value: '54.1%', color: 'var(--primary)' },
            { label: 'P/E Ratio', value: '65.2x', color: 'var(--warning)' },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg p-2.5 text-center border"
              style={{
                background: 'var(--surface-2)',
                borderColor: 'var(--border)',
              }}
            >
              <p
                className="font-bold text-sm"
                style={{ color: kpi.color }}
              >
                {kpi.value}
              </p>

              <p
                className="text-xs mt-0.5"
                style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                }}
              >
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mini Chart */}
        <div className="mb-4">
          <div className="flex items-end gap-1 h-12">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex-1 rounded-sm origin-bottom"
                style={{
                  height: `${h}%`,
                  background:
                    i === bars.length - 1
                      ? 'linear-gradient(135deg, #2563EB, #4F46E5)'
                      : 'rgba(37,99,235,0.25)',
                }}
              />
            ))}
          </div>
        </div>

        {/* AI Badge */}
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2.5"
          style={{
            background: 'rgba(37,99,235,0.08)',
            border: '1px solid rgba(37,99,235,0.2)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} style={{ color: 'var(--primary)' }} />
            <span
              className="text-xs font-semibold"
              style={{ color: 'var(--primary)' }}
            >
              AI Confidence
            </span>
          </div>

          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden ml-2"
            style={{ background: 'var(--surface-2)' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '87%' }}
              transition={{
                delay: 0.5,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #2563EB, #4F46E5)',
              }}
            />
          </div>

          <span
            className="text-xs font-bold"
            style={{ color: 'var(--primary)' }}
          >
            87%
          </span>
        </div>

        {/* Grounded badge */}
        <div className="flex items-center gap-1.5 mt-3">
          <ShieldCheck size={12} style={{ color: 'var(--success)' }} />
          <span
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Grounded answer — SEC filings + live data
          </span>
        </div>
      </div>

      {/* Floating secondary card */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 1,
        }}
        className="absolute -bottom-10 -left-8 rounded-xl border p-3 backdrop-blur-sm"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-md)',
          width: '160px',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Brain size={12} style={{ color: 'var(--secondary)' }} />
          <span
            className="text-xs font-semibold"
            style={{ color: 'var(--text-muted)' }}
          >
            AI Insight
          </span>
        </div>

        <p
          className="text-xs leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          Data center revenue surged 408% driven by H100 GPU demand.
        </p>
      </motion.div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function HeroSection({ onSignUpClick }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      {/* Background */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ background: 'var(--bg)' }}
      />

      <AnimatedGrid />

      {/* Radial glow */}
      <motion.div
        animate={{
          opacity: [0.35, 0.6, 0.35],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          right: '5%',
          top: '10%',
          background:
            'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-1 max-w-2xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border"
                style={{
                  color: 'var(--primary)',
                  borderColor: 'rgba(37,99,235,0.25)',
                  background: 'rgba(37,99,235,0.06)',
                }}
              >
                <Sparkles size={12} />
                AI-powered market intelligence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-bold leading-[1.08] mb-6 text-balance"
              style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                color: 'var(--text)',
              }}
            >
              Research stocks like a{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                professional analyst
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: 'var(--text-muted)' }}
            >
              Search any company, compare competitors, understand financial
              terms, and get AI-generated insights grounded in real market data
              and SEC filings.
            </motion.p>

            {/* Search */}
            <motion.div variants={itemVariants} className="mb-6">
              <SearchBar large className="w-full max-w-xl" />
            </motion.div>

            {/* Trending Tickers */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                Trending:
              </span>

              {tickers.map((ticker) => (
                <button
                  key={ticker}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 hover:scale-105"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                    background: 'var(--surface)',
                  }}
                >
                  {ticker}
                </button>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Button size="lg" onClick={onSignUpClick}>
                Get started free
                <ArrowRight size={16} />
              </Button>

              <Link to="/dashboard">
                <Button size="lg" variant="secondary">
                  View live demo
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              {[
                { icon: ShieldCheck, text: 'SEC-grounded data' },
                { icon: Brain, text: 'AI-powered insights' },
                { icon: BarChart2, text: 'Real-time markets' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: 'var(--primary)' }} />
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex-shrink-0 w-full lg:w-auto flex justify-center"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}




