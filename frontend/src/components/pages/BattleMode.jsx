// src/components/pages/BattleMode.jsx

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Swords,
  ChevronDown,
  Sparkles,
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

/*
 * TEMPORARY MOCK DATA
 *
 * Keep this shape aligned with the future /api/battle response.
 * Later, this entire object can be removed and replaced by API data.
 */
const MOCK_COMPANIES = {
  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '$875.40',
    change: '+4.28%',
    positive: true,

    metrics: {
      'Revenue Growth': {
        value: '122%',
        score: 95,
      },
      'Gross Margin': {
        value: '73.8%',
        score: 88,
      },
      'Operating Margin': {
        value: '54.1%',
        score: 92,
      },
      'P/E Ratio': {
        value: '65.2x',
        score: 55,
      },
      ROE: {
        value: '88.4%',
        score: 96,
      },
      'Debt/Equity': {
        value: '0.44',
        score: 78,
      },
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
      'Revenue Growth': {
        value: '2.1%',
        score: 42,
      },
      'Gross Margin': {
        value: '45.2%',
        score: 72,
      },
      'Operating Margin': {
        value: '29.8%',
        score: 75,
      },
      'P/E Ratio': {
        value: '28.4x',
        score: 72,
      },
      ROE: {
        value: '171.1%',
        score: 99,
      },
      'Debt/Equity': {
        value: '1.78',
        score: 55,
      },
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
      'Revenue Growth': {
        value: '17.6%',
        score: 75,
      },
      'Gross Margin': {
        value: '69.4%',
        score: 85,
      },
      'Operating Margin': {
        value: '44.6%',
        score: 88,
      },
      ROE: {
        value: '38.7%',
        score: 80,
      },
      'Debt/Equity': {
        value: '0.31',
        score: 85,
      },
    },

    color: '#10B981',
  },
}

const AVAILABLE_TICKERS = Object.keys(MOCK_COMPANIES)

function CompanySelector({
  value,
  onChange,
  isOpen,
  setIsOpen,
  opposite,
}) {
  const company = MOCK_COMPANIES[value]

  function handleToggle() {
    setIsOpen((previous) => !previous)
  }

  function handleSelect(ticker) {
    onChange(ticker)
    setIsOpen(false)
  }

  return (
    <div className="relative min-w-[240px]">
      <button
        type="button"
        onClick={handleToggle}
        className={`
          flex w-full items-center gap-3
          rounded-2xl border px-6 py-4
          transition-all duration-150
          ${
            isOpen
              ? 'border-primary bg-primary/10'
              : 'border-border bg-surface-elevated/40 hover:border-border/80'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `${company.color}20`,
          }}
        >
          <span
            className="text-base font-bold"
            style={{
              color: company.color,
            }}
          >
            {value.slice(0, 2)}
          </span>
        </div>

        <div className="min-w-0 text-left">
          <p className="font-bold text-text-primary">
            {value}
          </p>

          <p className="truncate text-sm text-text-muted">
            {company.name}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`
            ml-auto shrink-0 text-text-muted
            transition-transform
            ${isOpen ? 'rotate-180' : ''}
          `}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute left-0 right-0 top-full z-50 mt-2
            overflow-hidden rounded-xl
            border border-border
            bg-surface-elevated
            shadow-card
            backdrop-blur-sm
          "
          role="listbox"
          aria-label="Choose company"
        >
          {AVAILABLE_TICKERS
            .filter((ticker) => ticker !== opposite)
            .map((ticker) => {
              const option = MOCK_COMPANIES[ticker]

              return (
                <button
                  key={ticker}
                  type="button"
                  role="option"
                  aria-selected={ticker === value}
                  onClick={() => handleSelect(ticker)}
                  className="
                    flex w-full items-center gap-3
                    px-4 py-4
                    text-left
                    transition-colors
                    hover:bg-surface-elevated
                  "
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: `${option.color}20`,
                    }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: option.color,
                      }}
                    >
                      {ticker.slice(0, 2)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-base font-semibold text-text-primary">
                      {ticker}
                    </p>

                    <p className="truncate text-sm text-text-muted">
                      {option.name}
                    </p>
                  </div>
                </button>
              )
            })}
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

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  /*
   * TEMPORARY:
   * This is where the backend response will eventually be stored.
   *
   * Example future shape:
   *
   * GET /api/battle?left=NVDA&right=AAPL
   *
   * {
   *   leftCompany: {...},
   *   rightCompany: {...},
   *   metrics: {...},
   *   categoryScores: {...},
   *   risks: [...],
   *   verdict: {...}
   * }
   */
  const [battleData, setBattleData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /*
   * TEMPORARY MOCK FALLBACK
   *
   * This keeps the frontend working while the backend
   * is being developed separately.
   */
  useEffect(() => {
    setLoading(true)
    setError(null)

    const timer = setTimeout(() => {
      setBattleData({
        leftCompany: MOCK_COMPANIES[left],
        rightCompany: MOCK_COMPANIES[right],
      })

      setLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [left, right])

  const leftData =
    battleData?.leftCompany ?? MOCK_COMPANIES[left]

  const rightData =
    battleData?.rightCompany ?? MOCK_COMPANIES[right]

  const metricKeys = useMemo(
    () => Object.keys(leftData.metrics),
    [leftData]
  )

  function handleLeftChange(ticker) {
    setLeft(ticker)

    if (ticker === right) {
      setRight(left)
    }

    setLeftOpen(false)
    setRightOpen(false)
  }

  function handleRightChange(ticker) {
    setRight(ticker)

    if (ticker === left) {
      setLeft(right)
    }

    setLeftOpen(false)
    setRightOpen(false)
  }

  function handleNavbarSidebarToggle() {
    if (props.onSidebarToggle) {
      props.onSidebarToggle()
      return
    }

    setMobileSidebarOpen(true)
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Navbar
        {...props}
        onSidebarToggle={handleNavbarSidebarToggle}
      />

      <div className="flex w-full">
        <Sidebar
          isAuthenticated={props.isAuthenticated}
          user={props.user}
          onSignInClick={props.onSignInClick}
          onSignOut={props.onSignOut}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
          onAccountNavigate={(id) => {
            console.log('Sidebar action:', id)
            setMobileSidebarOpen(false)
          }}
        />

        <main
          className="
            min-h-screen min-w-0 flex-1
            px-4 pb-12 pt-20
            sm:px-6 sm:pt-24
            lg:px-8
          "
        >
          <div className="mx-auto w-full max-w-[1200px]">

            {/* PAGE HEADER */}

            <div className="mb-16 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <Swords
                  size={36}
                  className="text-primary"
                  aria-hidden="true"
                />

                <h1 className="text-4xl font-bold text-text-primary">
                  Battle Mode
                </h1>
              </div>

              <p className="text-lg text-text-muted">
                Professional equity research comparison tool.
              </p>
            </div>

            {/* COMPANY SELECTORS */}

            <div className="
              mb-16 flex
              flex-col items-center justify-center gap-5
              md:flex-row md:gap-8
            ">
              <CompanySelector
                value={left}
                onChange={handleLeftChange}
                isOpen={leftOpen}
                setIsOpen={(value) => {
                  setLeftOpen(value)
                  setRightOpen(false)
                }}
                opposite={right}
              />

              <div className="flex flex-col items-center gap-2">
                <span className="
                  text-sm font-bold uppercase
                  tracking-widest text-text-muted
                ">
                  vs
                </span>

                <Swords
                  size={20}
                  className="text-border"
                  aria-hidden="true"
                />
              </div>

              <CompanySelector
                value={right}
                onChange={handleRightChange}
                isOpen={rightOpen}
                setIsOpen={(value) => {
                  setRightOpen(value)
                  setLeftOpen(false)
                }}
                opposite={left}
              />
            </div>

            {/* LOADING */}

            {loading && (
              <div
                className="
                  mb-8 rounded-xl border border-border
                  bg-surface p-4 text-center
                  text-sm text-text-muted
                "
                role="status"
              >
                Updating comparison…
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div
                className="
                  mb-8 rounded-xl border border-border
                  bg-surface p-4 text-center
                  text-sm text-text-muted
                "
                role="alert"
              >
                {error}
              </div>
            )}

            {/* SCORE */}

            <BattleScore
              leftCompany={leftData}
              rightCompany={rightData}
              metrics={metricKeys}
            />

            <Methodology />

            <CategoryScorecard
              leftCompany={leftData}
              rightCompany={rightData}
            />

            <DetailedComparison
              leftCompany={leftData}
              rightCompany={rightData}
            />

            <AnalystSummary
              leftCompany={leftData}
              rightCompany={rightData}
            />

            <CompanyStrengths
              leftCompany={leftData}
              rightCompany={rightData}
            />

            <TradeoffSection
              leftCompany={leftData}
              rightCompany={rightData}
            />

            <RiskComparison
              leftCompany={leftData}
              rightCompany={rightData}
            />

            <FinalVerdict
              leftCompany={leftData}
              rightCompany={rightData}
            />

            {/* RESEARCH QUESTIONS */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="
                mb-12 rounded-2xl
                border border-border
                p-6 sm:p-8
              "
              style={{
                background: 'var(--surface)',
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="
                  flex h-10 w-10 items-center
                  justify-center rounded-xl bg-primary/15
                ">
                  <Sparkles
                    size={20}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="
                  text-xl font-bold
                  text-text-primary sm:text-2xl
                ">
                  Research Questions
                </h3>
              </div>

              <p className="
                mb-6 text-base text-text-muted sm:text-lg
              ">
                Explore contextual research prompts specific
                to this comparison.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  `What assumptions would justify ${left}'s ${leftData.metrics['P/E Ratio']?.value ?? 'current'} P/E multiple?`,
                  `How much revenue growth would ${right} need to close the score gap?`,
                  `Which company appears more resilient during a semiconductor downturn?`,
                  `How sensitive is ${left}'s valuation to slowing AI infrastructure spending?`,
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="
                      rounded-lg border border-border
                      px-4 py-3 text-left text-sm
                      text-text-muted
                      transition-all
                      hover:border-primary
                      hover:text-primary
                      sm:text-base
                    "
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CONTINUE RESEARCH */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="
                mb-12 rounded-2xl
                border border-border
                p-6 sm:p-8
              "
              style={{
                background: 'var(--surface)',
              }}
            >
              <h3 className="
                mb-8 text-xl font-bold
                text-text-primary sm:text-2xl
              ">
                Continue Your Research
              </h3>

              <div className="grid gap-8 md:grid-cols-2">

                {[leftData, rightData].map((company) => (
                  <div key={company.ticker}>
                    <h4 className="
                      mb-4 text-xl font-semibold
                      text-text-primary
                    ">
                      {company.ticker}
                    </h4>

                    <div className="space-y-3">
                      <a
                        href={`/markets/${encodeURIComponent(company.ticker)}`}
                        className="
                          block text-base text-text-muted
                          transition-colors
                          hover:text-primary
                        "
                      >
                        → Financials
                      </a>

                      <a
                        href={`https://www.sec.gov/edgar/search/#/q=${encodeURIComponent(
                          company.ticker
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          block text-base text-text-muted
                          transition-colors
                          hover:text-primary
                        "
                      >
                        → SEC Filings
                      </a>

                      <a
                        href={`/markets/${encodeURIComponent(company.ticker)}#recent-news`}
                        className="
                          block text-base text-text-muted
                          transition-colors
                          hover:text-primary
                        "
                      >
                        → Recent News
                      </a>

                      <a
                        href={`/markets/${encodeURIComponent(company.ticker)}#ai-insight`}
                        className="
                          block text-base text-text-muted
                          transition-colors
                          hover:text-primary
                        "
                      >
                        → AI Research
                      </a>
                    </div>
                  </div>
                ))}

              </div>
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  )
}