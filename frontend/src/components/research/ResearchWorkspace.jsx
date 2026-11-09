
import { useCallback, useEffect, useState } from 'react'
import {
  searchCompanies,
  fetchCompanyResearch,
} from '../../services/researchService.js'

import Navbar from '../layout/Navbar.jsx'
import Sidebar from '../layout/Sidebar.jsx'

import ResearchHeader from './ResearchHeader.jsx'
import SearchCommandBar from './SearchCommandBar.jsx'
import CompanyHeroPanel from './CompanyHeroPanel.jsx'
import PriceChart from './PriceChart.jsx'
import InvestmentSnapshotGrid from './InvestmentSnapshotGrid.jsx'
import BusinessOverviewSection from './BusinessOverviewSection.jsx'
import FinancialPerformanceSection from './FinancialPerformanceSection.jsx'
import ValuationSection from './ValuationSection.jsx'
import ProfitabilitySection from './ProfitabilitySection.jsx'
import BalanceSheetHealthSection from './BalanceSheetHealthSection.jsx'
import GrowthTrendsSection from './GrowthTrendsSection.jsx'
import CompetitivePositionSection from './CompetitivePositionSection.jsx'
import RecentCatalystsSection from './RecentCatalystsSection.jsx'
import NewsAndFilingsSection from './NewsAndFilingsSection.jsx'
import PeerComparisonSection from './PeerComparisonSection.jsx'
import AnalystChecklistSection from './AnalystChecklistSection.jsx'
import ResearchActionsFooter from './ResearchActionsFooter.jsx'

export default function ResearchWorkspace({
  initialTicker = 'AAPL',

  // Shared app/auth props
  isAuthenticated,
  user,
  theme,
  onThemeToggle,
  onSignInClick,
  onSignUpClick,
  onSignOut,

  // Shared Navbar/Sidebar props
  navbarProps,
  sidebarProps,
}) {
  const [ticker, setTicker] = useState(initialTicker)
  const [research, setResearch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [suggestions, setSuggestions] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [recent, setRecent] = useState([])

  const [watched, setWatched] = useState(new Set())

  // =========================================================
  // LOAD COMPANY DATA
  // =========================================================

  useEffect(() => {
    let alive = true

    setLoading(true)
    setError(null)

    fetchCompanyResearch(ticker)
      .then((data) => {
        if (alive) {
          setResearch(data)
        }
      })
      .catch((e) => {
        if (alive) {
          setError(
            e?.message || 'Failed to load research'
          )
        }
      })
      .finally(() => {
        if (alive) {
          setLoading(false)
        }
      })

    return () => {
      alive = false
    }
  }, [ticker])

  // =========================================================
  // DEBOUNCED COMPANY SEARCH
  // =========================================================

  const handleQuery = useCallback((q) => {
    if (!q) {
      setSuggestions([])
      return
    }

    setSearchLoading(true)

    const timer = setTimeout(async () => {
      try {
        const results = await searchCompanies(q)
        setSuggestions(results)
      } catch (error) {
        console.error(
          'Company search failed:',
          error
        )
        setSuggestions([])
      } finally {
        setSearchLoading(false)
      }
    }, 180)

    return () => clearTimeout(timer)
  }, [])

  // =========================================================
  // COMPANY SELECTION
  // =========================================================

  const handleSelect = (nextTicker) => {
    setTicker(nextTicker)

    setRecent((prev) => {
      const filtered = prev.filter(
        (item) => item.ticker !== nextTicker
      )

      const hit = suggestions.find(
        (item) => item.ticker === nextTicker
      )

      return hit
        ? [hit, ...filtered].slice(0, 6)
        : prev
    })
  }

  // =========================================================
  // WATCHLIST
  // =========================================================

  const isWatched = watched.has(
    research?.company?.ticker
  )

  const toggleWatch = () => {
    const currentTicker =
      research?.company?.ticker

    if (!currentTicker) return

    setWatched((current) => {
      const next = new Set(current)

      if (next.has(currentTicker)) {
        next.delete(currentTicker)
      } else {
        next.add(currentTicker)
      }

      return next
    })
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--bg)',
        color: 'var(--text-primary)',
      }}
    >
      {/* =====================================================
          SHARED NAVBAR
          ===================================================== */}

      <Navbar
        {...(navbarProps ?? {
          isAuthenticated,
          user,
          theme,
          onThemeToggle,
          onSignInClick,
          onSignUpClick,
          onSignOut,
        })}
      />

      <div className="flex min-h-screen">

        {/* ===================================================
            SHARED SIDEBAR
            =================================================== */}

        <Sidebar
          {...(sidebarProps ?? {
            user,
            isAuthenticated,
            onSignInClick,
            onSignOut,
          })}
        />

        {/* ===================================================
            RESEARCH CONTENT
            =================================================== */}

        <main className="flex-1 min-w-0 pt-20 sm:pt-24">
          <div className="px-4 sm:px-6 lg:px-8 pb-10">
            <div className="max-w-[1360px] mx-auto space-y-5">

              {/* Research Header */}

              <ResearchHeader />

              {/* Search */}

              <SearchCommandBar
                suggestions={suggestions}
                recent={recent}
                loading={searchLoading}
                onQuery={handleQuery}
                onSelect={handleSelect}
              />

              {/* Error */}

              {error && (
                <div
                  className="rounded-2xl border border-red-500/40
                             bg-red-500/10 text-red-500
                             p-4 text-sm"
                >
                  {error}
                </div>
              )}

              {/* Company Hero */}

              <CompanyHeroPanel
                company={research?.company}
                loading={loading}
                isWatched={isWatched}
                onWatch={toggleWatch}
              />

              {/* Price Chart + Investment Snapshot */}

              <div className="grid lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <PriceChart
                    chart={research?.chart}
                    loading={loading}
                  />
                </div>

                <div>
                  <InvestmentSnapshotGrid
                    snapshot={research?.snapshot}
                    loading={loading}
                  />
                </div>
              </div>

              {/* Business Overview */}

              <BusinessOverviewSection
                business={research?.business}
                company={research?.company}
                loading={loading}
              />

              {/* Financial Performance */}

              <FinancialPerformanceSection
                financials={research?.financials}
                loading={loading}
              />

              {/* Valuation + Profitability */}

              <div className="grid lg:grid-cols-2 gap-5">
                <ValuationSection
                  valuation={research?.valuation}
                  loading={loading}
                />

                <ProfitabilitySection
                  profitability={research?.profitability}
                  loading={loading}
                />
              </div>

              {/* Balance Sheet + Growth */}

              <div className="grid lg:grid-cols-2 gap-5">
                <BalanceSheetHealthSection
                  balanceSheet={research?.balanceSheet}
                  loading={loading}
                />

                <GrowthTrendsSection
                  growth={research?.growth}
                  loading={loading}
                />
              </div>

              {/* Competitive Position */}

              <CompetitivePositionSection
                competitivePosition={
                  research?.competitivePosition
                }
                loading={loading}
              />

              {/* Catalysts + News */}

              <div className="grid lg:grid-cols-2 gap-5">
                <RecentCatalystsSection
                  catalysts={research?.catalysts}
                  loading={loading}
                />

                <NewsAndFilingsSection
                  news={research?.news}
                  filings={research?.filings}
                  loading={loading}
                />
              </div>

              {/* Peer Comparison */}

              <PeerComparisonSection
                peers={research?.peers}
                selectedTicker={
                  research?.company?.ticker
                }
                loading={loading}
              />

              {/* Analyst Checklist */}

              <AnalystChecklistSection />

              {/* Footer Actions */}

              <ResearchActionsFooter
                isWatched={isWatched}
                onWatch={toggleWatch}
                onCompare={() => {}}
                onExport={() => {}}
                onShare={() => {}}
                onBattle={() => {}}
              />

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

