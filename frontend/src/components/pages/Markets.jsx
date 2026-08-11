
// src/components/pages/Markets.jsx

import { useMemo, useState } from 'react'

import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'

import MarketOverviewStrip from '../markets/MarketOverviewStrip'
import SearchFilterToolbar from '../markets/SearchFilterToolbar'
import StockDiscoveryList from '../markets/StockDiscoveryList'
import CompanyResearchPanel from '../markets/CompanyResearchPanel'
import MarketMoversSection from '../markets/MarketMoversSection'

import '../markets/markets.css'

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────

function normalize(value = '') {
  return value.trim().toLowerCase()
}

function getSearchScore(stock, query) {
  const ticker = normalize(stock.ticker)
  const name = normalize(stock.name)
  const shortName = normalize(stock.shortName)

  if (ticker === query) return 0
  if (name === query || shortName === query) return 1
  if (ticker.startsWith(query)) return 2
  if (name.startsWith(query) || shortName.startsWith(query)) return 3

  const words = `${name} ${shortName}`.split(/\s+/)

  if (words.some((word) => word.startsWith(query))) {
    return 4
  }

  if (
    ticker.includes(query) ||
    name.includes(query) ||
    shortName.includes(query)
  ) {
    return 5
  }

  return Number.POSITIVE_INFINITY
}

function parseMarketCap(value = '') {
  const number = Number.parseFloat(
    String(value).replace(/[₹$,\s]/g, '')
  )

  if (Number.isNaN(number)) return 0

  const upper = String(value).toUpperCase()

  if (upper.includes('T')) return number * 1_000_000
  if (upper.includes('B')) return number * 1_000
  if (upper.includes('M')) return number

  return number
}

function getVisibleStocks({
  stocks,
  search,
  activeFilter,
  sortBy,
}) {
  const query = normalize(search)

  let result = stocks.filter((stock) => {
    const matchesFilter =
      activeFilter === 'All Stocks' ||
      stock.market === activeFilter ||
      stock.sector === activeFilter

    if (!matchesFilter) return false
    if (!query) return true

    return Number.isFinite(
      getSearchScore(stock, query)
    )
  })

  if (query) {
    return [...result].sort(
      (a, b) =>
        getSearchScore(a, query) -
        getSearchScore(b, query)
    )
  }

  switch (sortBy) {
    case 'change':
      return [...result].sort(
        (a, b) => b.change - a.change
      )

    case 'marketCap':
      return [...result].sort(
        (a, b) =>
          parseMarketCap(b.marketCap) -
          parseMarketCap(a.marketCap)
      )

    case 'revenueGrowth':
      return [...result].sort(
        (a, b) =>
          (b.revenueGrowthRaw ?? 0) -
          (a.revenueGrowthRaw ?? 0)
      )

    case 'pe':
      return [...result].sort(
        (a, b) =>
          (a.peRaw ?? Infinity) -
          (b.peRaw ?? Infinity)
      )

    case 'alphabetical':
      return [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      )

    default:
      return result
  }
}

// ────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────

export default function Markets({
  isAuthenticated,
  user,
  theme,
  onThemeToggle,
  onSignInClick,
  onSignUpClick,
  onSignOut,
  navbarProps,
  sidebarProps,

  // Backend/API data
  stocks = [],
  companyResearch = {},
  loading = false,
  error = null,
}) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] =
    useState('All Stocks')

  const [sortBy, setSortBy] =
    useState('default')

  const [selectedTicker, setSelectedTicker] =
    useState(null)

  const [watchedTickers, setWatchedTickers] =
    useState(() => new Set())

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false)

  const visibleStocks = useMemo(
    () =>
      getVisibleStocks({
        stocks,
        search,
        activeFilter,
        sortBy,
      }),
    [stocks, search, activeFilter, sortBy]
  )

  /*
   * If nothing has been selected yet, use the first
   * backend-provided stock.
   */
  const selectedStock = useMemo(() => {
    const stock =
      stocks.find(
        (item) => item.ticker === selectedTicker
      ) ?? visibleStocks[0] ?? stocks[0]

    if (!stock) return null

    /*
     * The backend can provide the enriched research
     * information separately. We merge it here so the
     * existing CompanyResearchPanel can keep receiving
     * one stock object.
     */
    return {
      ...stock,
      ...(companyResearch[stock.ticker] ?? {}),
    }
  }, [
    stocks,
    visibleStocks,
    selectedTicker,
    companyResearch,
  ])

  function handleSearchChange(value) {
    setSearch(value)

    const nextFilter = value.trim()
      ? 'All Stocks'
      : activeFilter

    if (
      value.trim() &&
      activeFilter !== 'All Stocks'
    ) {
      setActiveFilter('All Stocks')
    }

    const matches = getVisibleStocks({
      stocks,
      search: value,
      activeFilter: nextFilter,
      sortBy,
    })

    if (matches.length > 0) {
      setSelectedTicker(matches[0].ticker)
    }
  }

  function handleSearchSubmit() {
    if (visibleStocks.length > 0) {
      setSelectedTicker(
        visibleStocks[0].ticker
      )
    }
  }

  function handleFilterChange(filter) {
    setActiveFilter(filter)

    const matches = getVisibleStocks({
      stocks,
      search,
      activeFilter: filter,
      sortBy,
    })

    if (
      matches.length > 0 &&
      !matches.some(
        (stock) =>
          stock.ticker === selectedTicker
      )
    ) {
      setSelectedTicker(matches[0].ticker)
    }
  }

  function toggleWatch(ticker) {
    setWatchedTickers((current) => {
      const next = new Set(current)

      if (next.has(ticker)) {
        next.delete(ticker)
      } else {
        next.add(ticker)
      }

      return next
    })
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >

      {/* NAVBAR */}

      <Navbar
        {...(navbarProps ?? {
          isAuthenticated,
          user,
          theme,
          onThemeToggle,
          onSignInClick,
          onSignUpClick,
          onSignOut,
          onSidebarToggle: () =>
            setMobileSidebarOpen(true),
        })}
      />

      {/* SIDEBAR + CONTENT */}

      <div className="flex w-full">

        <Sidebar
          {...(sidebarProps ?? {
            user,
            isAuthenticated,
            onSignInClick,
            onSignOut,
            mobileOpen: mobileSidebarOpen,
            onMobileClose: () =>
              setMobileSidebarOpen(false),
          })}
        />

        {/* MAIN CONTENT */}

        <main
          className="
            flex-1
            min-w-0
            min-h-screen
            pt-20
            sm:pt-24
            px-4
            sm:px-6
            lg:px-8
            pb-16
          "
        >
          <div className="w-full max-w-[1400px] mx-auto space-y-6">

            <MarketOverviewStrip />

            <SearchFilterToolbar
              search={search}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Backend loading state */}

            {loading && (
              <div className="markets-page-container">
                <div className="markets-workspace">
                  <div className="markets-left">
                    <div className="p-6 text-center text-text-muted">
                      Loading market data...
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backend error state */}

            {!loading && error && (
              <div className="markets-page-container">
                <div className="markets-workspace">
                  <div className="p-6 text-center text-error">
                    {typeof error === 'string'
                      ? error
                      : 'Unable to load market data.'}
                  </div>
                </div>
              </div>
            )}

            {/* Market data */}

            {!loading && !error && (
              <div className="markets-page-container">
                <div className="markets-workspace">

                  <aside className="markets-left">
                    <StockDiscoveryList
                      stocks={visibleStocks}
                      selectedTicker={
                        selectedStock?.ticker ??
                        selectedTicker
                      }
                      onSelect={setSelectedTicker}
                      activeFilter={activeFilter}
                    />
                  </aside>

                  <section className="markets-right">
                    {selectedStock ? (
                      <CompanyResearchPanel
                        stock={selectedStock}
                        isWatching={watchedTickers.has(
                          selectedStock.ticker
                        )}
                        onToggleWatch={() =>
                          toggleWatch(
                            selectedStock.ticker
                          )
                        }
                      />
                    ) : (
                      <div className="p-8 text-center text-text-muted">
                        No company selected.
                      </div>
                    )}
                  </section>

                </div>
              </div>
            )}

            <MarketMoversSection />

          </div>
        </main>
      </div>
    </div>
  )
}

