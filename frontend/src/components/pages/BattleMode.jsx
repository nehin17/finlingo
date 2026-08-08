import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Swords, ChevronDown, Sparkles
} from 'lucide-react'
import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'
import BattleScore from '../battle/BattleScore.jsx'
import Methodology from '../battle/Methodology.jsx'
import CategoryScorecard from '../battle/CategoryScorecard.jsx'
import DetailedComparison from '../battle/DetailedComparison.jsx'
import AnalystSummary from '../battle/AnalystSummary.jsx'
import CompanyStrengths from '../battle/CompanyStrengths.jsx'
import TradeoffSection from '../battle/TradeOff.jsx'
import RiskComparison from '../battle/RiskComparison.jsx'
import FinalVerdict from '../battle/FinalVerdict.jsx'

const companies = {
  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '$875.40',
    change: '+4.28%',
    positive: true,
    metrics: {
      'Revenue Growth': { value: '122%', score: 95 },
      'Gross Margin': { value: '73.8%', score: 88 },
      'Operating Margin': { value: '54.1%', score: 92 },
      'P/E Ratio': { value: '65.2x', score: 55 },
      'ROE': { value: '88.4%', score: 96 },
      'Debt/Equity': { value: '0.44', score: 78 },
    },
    color: '#2563EB',
  },
  AAPL: {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: '$178.42',
    change: '+1.24%',
    positive: true,
    metrics: {
      'Revenue Growth': { value: '2.1%', score: 42 },
      'Gross Margin': { value: '45.2%', score: 72 },
      'Operating Margin': { value: '29.8%', score: 75 },
      'P/E Ratio': { value: '28.4x', score: 72 },
      'ROE': { value: '171.1%', score: 99 },
      'Debt/Equity': { value: '1.78', score: 55 },
    },
    color: '#4F46E5',
  },
  MSFT: {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: '$415.32',
    change: '+0.93%',
    positive: true,
    metrics: {
      'Revenue Growth': { value: '17.6%', score: 75 },
      'Gross Margin': { value: '69.4%', score: 85 },
      'Operating Margin': { value: '44.6%', score: 88 },
      'P/E Ratio': { value: '36.8x', score: 62 },
      'ROE': { value: '38.7%', score: 80 },
      'Debt/Equity': { value: '0.31', score: 85 },
    },
    color: '#10B981',
  },
}

const availableTickers = Object.keys(companies)

function CompanySelector({ value, onChange, isOpen, setIsOpen, opposite }) {
  const data = companies[value]
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(p => !p)}
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-150 min-w-[240px] ${
          isOpen
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-border/80 bg-surface-elevated/40'
        }`}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${data.color}20` }}
        >
          <span className="text-base font-bold" style={{ color: data.color }}>
            {value.slice(0, 2)}
          </span>
        </div>
        <div className="text-left flex-1">
          <p className="font-bold text-lg text-text-primary">{value}</p>
          <p className="text-sm text-text-muted">{data.name}</p>
        </div>
        <ChevronDown
          size={18}
          className={`text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 rounded-xl border border-border bg-surface-elevated/60 shadow-card z-20 overflow-hidden backdrop-blur-sm">
          {availableTickers
            .filter(t => t !== opposite)
            .map(t => (
              <button
                key={t}
                onClick={() => {
                  onChange(t)
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-surface-elevated transition-colors text-left"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${companies[t].color}20` }}
                >
                  <span className="text-sm font-bold" style={{ color: companies[t].color }}>
                    {t.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold text-text-primary">{t}</p>
                  <p className="text-sm text-text-muted">{companies[t].name}</p>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export default function BattleMode(props) {
  const [left, setLeft] = useState('NVDA')
  const [right, setRight] = useState('AAPL')
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  const leftData = companies[left]
  const rightData = companies[right]

  return (
    <div
      className="flex min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Sidebar {...props} />
      <div className="flex-1 ml-20">
        <Navbar {...props} />

        <main className="pt-24 sm:pt-28 p-8">
          <div className="max-w-[1200px] mx-auto">

            {/* ── Page Header ────────────────────────────────────────── */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Swords size={36} className="text-primary" />
                <h1 className="text-4xl font-bold text-text-primary">Battle Mode</h1>
              </div>
              <p className="text-lg text-text-muted">
                Professional equity research comparison tool.
              </p>
            </div>

            {/* ── Company Selector ───────────────────────────────────── */}
            <div className="flex items-center justify-center gap-8 mb-16">
              <CompanySelector
                value={left}
                onChange={setLeft}
                isOpen={leftOpen}
                setIsOpen={setLeftOpen}
                opposite={right}
              />
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-widest text-text-muted">vs</span>
                <Swords size={20} className="text-border" />
              </div>
              <CompanySelector
                value={right}
                onChange={setRight}
                isOpen={rightOpen}
                setIsOpen={setRightOpen}
                opposite={left}
              />
            </div>

            {/* ── Relative Strength Score ───────────────────────────────── */}
            <BattleScore
              leftCompany={leftData}
              rightCompany={rightData}
              metrics={Object.keys(leftData.metrics)}
            />

            {/* ── Methodology ────────────────────────────────────────── */}
            <Methodology />

            {/* ── Category Scorecards ────────────────────────────────── */}
            <CategoryScorecard leftCompany={leftData} rightCompany={rightData} />

            {/* ── Detailed Metric Comparison ─────────────────────────── */}
            <DetailedComparison leftCompany={leftData} rightCompany={rightData} />

            {/* ── Analyst Summary ────────────────────────────────────── */}
            <AnalystSummary leftCompany={leftData} rightCompany={rightData} />

            {/* ── Where Each Company Wins ───────────────────────────── */}
            <CompanyStrengths leftCompany={leftData} rightCompany={rightData} />

            {/* ── The Trade-Off Section ──────────────────────────────── */}
            <TradeoffSection leftCompany={leftData} rightCompany={rightData} />

            {/* ── Key Risks ──────────────────────────────────────────── */}
            <RiskComparison leftCompany={leftData} rightCompany={rightData} />

            {/* ── Final Verdict ──────────────────────────────────────── */}
            <FinalVerdict leftCompany={leftData} rightCompany={rightData} />

            {/* ── Ask AI About This Battle ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-8 mb-12 border border-border"
              style={{ background: 'var(--surface)' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Research Questions</h3>
              </div>
              <p className="text-lg text-text-muted mb-6">
                Explore contextual research prompts specific to this comparison.
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  `What assumptions would justify ${left}'s ${leftData.metrics['P/E Ratio'].value} P/E multiple?`,
                  `How much revenue growth would ${right} need to close the score gap?`,
                  `Which company appears more resilient during a semiconductor downturn?`,
                  `How sensitive is ${left}'s valuation to slowing AI infrastructure spending?`,
                ].map((prompt, i) => (
                  <button
                    key={i}
                    className="text-base px-4 py-3 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ── Continue Research ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="rounded-2xl p-8 mb-12 border border-border"
              style={{ background: 'var(--surface)' }}
            >
              <h3 className="text-2xl font-bold text-text-primary mb-8">Continue Your Research</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-xl text-text-primary mb-4">{left}</h4>
                  <div className="space-y-3">
                    {['Financials', 'SEC Filings', 'Recent News', 'AI Research'].map(item => (
                      <a
                        key={item}
                        href="#"
                        className="flex items-center gap-2 text-base text-text-muted hover:text-primary transition-colors"
                      >
                        <span className="text-lg">→</span>
                        <span>{item}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-xl text-text-primary mb-4">{right}</h4>
                  <div className="space-y-3">
                    {['Financials', 'SEC Filings', 'Recent News', 'AI Research'].map(item => (
                      <a
                        key={item}
                        href="#"
                        className="flex items-center gap-2 text-base text-text-muted hover:text-primary transition-colors"
                      >
                        <span className="text-lg">→</span>
                        <span>{item}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

           

          </div>
        </main>
      </div>
    </div>
  )
}