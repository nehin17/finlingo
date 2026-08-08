import {
    ChevronDown,
    Search,
    SlidersHorizontal,
  } from 'lucide-react';
  
  const FILTERS = [
    'All Stocks',
    'US Market',
    'Indian Market',
    'Technology',
    'AI & Semiconductors',
    'E-Commerce',
    'Financials',
    'Energy',
    'Consumer',
  ];
  
  const SORT_OPTIONS = [
    { value: 'default', label: 'Most Viewed' },
    { value: 'change', label: 'Daily Change' },
    { value: 'marketCap', label: 'Market Cap' },
    { value: 'revenueGrowth', label: 'Revenue Growth' },
    { value: 'pe', label: 'P/E Ratio' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];
  
  export default function SearchFilterToolbar({
    search,
    onSearchChange,
    onSearchSubmit,
    activeFilter,
    onFilterChange,
    sortBy,
    onSortChange,
  }) {
    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSearchSubmit();
      }
    }
  
    return (
      <section className="market-toolbar">
        <div className="market-toolbar-inner">
          <div className="market-toolbar-primary">
            <label className="market-search">
              <Search aria-hidden="true" size={17} />
  
              <input
                type="search"
                value={search}
                onChange={(event) =>
                  onSearchChange(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Search ticker or company name…"
                aria-label="Search ticker or company name"
              />
            </label>
  
            <label className="market-sort">
              <SlidersHorizontal aria-hidden="true" size={15} />
  
              <select
                value={sortBy}
                onChange={(event) =>
                  onSortChange(event.target.value)
                }
                aria-label="Sort companies"
              >
                {SORT_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
  
              <ChevronDown aria-hidden="true" size={15} />
            </label>
          </div>
  
          <div
            className="market-filter-row"
            aria-label="Market filters"
          >
            {FILTERS.map((filter) => {
              const active = filter === activeFilter;
  
              return (
                <button
                  key={filter}
                  type="button"
                  className={`market-filter-chip ${
                    active ? 'is-active' : ''
                  }`}
                  onClick={() => onFilterChange(filter)}
                  aria-pressed={active}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }