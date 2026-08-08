import { LayoutList, SearchX } from 'lucide-react';
import { enrichStock } from './companyResearchData';
import StockCard from './StockCard';

export default function StockDiscoveryList({
  stocks,
  selectedTicker,
  onSelect,
  activeFilter,
}) {
  return (
    <section className="stock-discovery-panel">
      <header className="stock-discovery-header">
        <div>
          <span className="section-eyebrow">
            Research Universe
          </span>

          <h2>
            <LayoutList size={17} aria-hidden="true" />
            {activeFilter === 'All Stocks'
              ? 'All Stocks'
              : activeFilter}
          </h2>
        </div>

        <span className="stock-result-count">
          {stocks.length}
        </span>
      </header>

      {stocks.length > 0 ? (
        <div className="stock-discovery-list">
          {stocks.map((baseStock) => {
            const stock = enrichStock(baseStock);

            return (
              <StockCard
                key={stock.ticker}
                stock={stock}
                isSelected={
                  stock.ticker === selectedTicker
                }
                onClick={() => onSelect(stock.ticker)}
              />
            );
          })}
        </div>
      ) : (
        <div className="stock-empty-state" role="status">
          <SearchX size={27} aria-hidden="true" />
          <strong>No companies found</strong>
          <p>
            Try searching by a ticker symbol or full company
            name.
          </p>
        </div>
      )}
    </section>
  );
}