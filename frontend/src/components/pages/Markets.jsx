import { useMemo, useState } from 'react';

import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'

import MarketOverviewStrip from '../markets/MarketOverviewStrip';
import SearchFilterToolbar from '../markets/SearchFilterToolbar';
import StockDiscoveryList from '../markets/StockDiscoveryList';
import CompanyResearchPanel from '../markets/CompanyResearchPanel';
import MarketMoversSection from '../markets/MarketMoversSection';

import { STOCKS } from '../markets/marketData';
import { enrichStock } from '../markets/companyResearchData';

import '../markets/markets.css';

function normalize(value = '') {
  return value.trim().toLowerCase();
}

function getSearchScore(stock, query) {
  const ticker = normalize(stock.ticker);
  const name = normalize(stock.name);
  const shortName = normalize(stock.shortName);

  if (ticker === query) return 0;
  if (name === query || shortName === query) return 1;
  if (ticker.startsWith(query)) return 2;
  if (name.startsWith(query) || shortName.startsWith(query)) return 3;

  const nameWords = `${name} ${shortName}`.split(/\s+/);

  if (nameWords.some((word) => word.startsWith(query))) return 4;

  if (
    ticker.includes(query) ||
    name.includes(query) ||
    shortName.includes(query)
  ) {
    return 5;
  }

  return Number.POSITIVE_INFINITY;
}

function parseMarketCap(value = '') {
  const numericValue = Number.parseFloat(
    String(value).replace(/[₹$,\s]/g, '')
  );

  if (Number.isNaN(numericValue)) return 0;

  const normalizedValue = String(value).toUpperCase();

  if (normalizedValue.includes('T')) return numericValue * 1_000_000;
  if (normalizedValue.includes('B')) return numericValue * 1_000;
  if (normalizedValue.includes('M')) return numericValue;

  return numericValue;
}

function getVisibleStocks({
  stocks,
  search,
  activeFilter,
  sortBy,
}) {
  const query = normalize(search);

  let result = stocks.filter((stock) => {
    const matchesFilter =
      activeFilter === 'All Stocks' ||
      stock.market === activeFilter ||
      stock.sector === activeFilter;

    if (!matchesFilter) return false;
    if (!query) return true;

    return Number.isFinite(getSearchScore(stock, query));
  });

  if (query) {
    return [...result].sort(
      (a, b) => getSearchScore(a, query) - getSearchScore(b, query)
    );
  }

  switch (sortBy) {
    case 'change':
      result = [...result].sort((a, b) => b.change - a.change);
      break;

    case 'marketCap':
      result = [...result].sort(
        (a, b) =>
          parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap)
      );
      break;

    case 'revenueGrowth':
      result = [...result].sort(
        (a, b) =>
          (b.revenueGrowthRaw ?? 0) - (a.revenueGrowthRaw ?? 0)
      );
      break;

    case 'pe':
      result = [...result].sort(
        (a, b) => (a.peRaw ?? Infinity) - (b.peRaw ?? Infinity)
      );
      break;

    case 'alphabetical':
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    default:
      break;
  }

  return result;
}

export default function Markets(props) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Stocks');
  const [sortBy, setSortBy] = useState('default');
  const [selectedTicker, setSelectedTicker] = useState('NVDA');

  // Session-only watchlist state. This can later be replaced with API state.
  const [watchedTickers, setWatchedTickers] = useState(
    () => new Set()
  );

  const visibleStocks = useMemo(
    () =>
      getVisibleStocks({
        stocks: STOCKS,
        search,
        activeFilter,
        sortBy,
      }),
    [search, activeFilter, sortBy]
  );

  const selectedStock = useMemo(() => {
    const stock =
      STOCKS.find((item) => item.ticker === selectedTicker) ??
      STOCKS[0];

    return enrichStock(stock);
  }, [selectedTicker]);

  function handleSearchChange(value) {
    setSearch(value);

    // Global company search should not be blocked by a previous filter.
    const nextFilter = value.trim()
      ? 'All Stocks'
      : activeFilter;

    if (value.trim() && activeFilter !== 'All Stocks') {
      setActiveFilter('All Stocks');
    }

    const matches = getVisibleStocks({
      stocks: STOCKS,
      search: value,
      activeFilter: nextFilter,
      sortBy,
    });

    // Keep the previous company selected when there are no results.
    if (matches.length > 0) {
      setSelectedTicker(matches[0].ticker);
    }
  }

  function handleSearchSubmit() {
    if (visibleStocks.length > 0) {
      setSelectedTicker(visibleStocks[0].ticker);
    }
  }

  function handleFilterChange(filter) {
    setActiveFilter(filter);

    const matches = getVisibleStocks({
      stocks: STOCKS,
      search,
      activeFilter: filter,
      sortBy,
    });

    if (
      matches.length > 0 &&
      !matches.some((stock) => stock.ticker === selectedTicker)
    ) {
      setSelectedTicker(matches[0].ticker);
    }
  }

  function toggleWatch(ticker) {
    setWatchedTickers((current) => {
      const next = new Set(current);

      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }

      return next;
    });
  }

  return (
    <>
      <Navbar {...props} />
  
      <div
        className="flex w-full"
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        {/* Sidebar */}
        <Sidebar {...props} />
  
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <main className="w-full pt-20 sm:pt-24 pb-16 overflow-x-hidden">
  
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
  
            <div className="markets-page-container">
              <div className="markets-workspace">
  
                <aside className="markets-left">
                  <StockDiscoveryList
                    stocks={visibleStocks}
                    selectedTicker={selectedTicker}
                    onSelect={setSelectedTicker}
                    activeFilter={activeFilter}
                  />
                </aside>
  
                <section className="markets-right">
                  <CompanyResearchPanel
                    stock={selectedStock}
                    isWatching={watchedTickers.has(selectedStock.ticker)}
                    onToggleWatch={() =>
                      toggleWatch(selectedStock.ticker)
                    }
                  />
                </section>
  
              </div>
            </div>
  
            <MarketMoversSection />
  
          </main>
        </div>
      </div>
    </>
  );
}