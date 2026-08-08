import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Gauge,
} from 'lucide-react';

import {
  MARKET_BREADTH,
  MARKET_INDICES,
  SECTOR_PERFORMANCE,
} from './marketContextData';

export default function MarketOverviewStrip() {
  return (
    <section className="market-overview">

      {/* Moving market ticker */}
      <div className="market-index-strip">
        <div className="market-index-track">

          {[...MARKET_INDICES, ...MARKET_INDICES].map((index, i) => {
            const positive = index.change >= 0;

            return (
              <article
                className="market-index-item"
                key={`${index.name}-${i}`}
              >
                <div>
                  <span className="market-index-symbol">
                    {index.symbol}
                  </span>

                  <strong>{index.name}</strong>
                </div>

                <div className="market-index-value">
                  <span>{index.value}</span>

                  <span
                    className={
                      positive
                        ? 'market-value-positive'
                        : 'market-value-negative'
                    }
                  >
                    {positive ? (
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowDownRight
                        size={13}
                        aria-hidden="true"
                      />
                    )}

                    {positive ? '+' : ''}
                    {index.change.toFixed(2)}%
                  </span>
                </div>
              </article>
            );
          })}

        </div>
      </div>

      {/* Market context */}
      <div className="market-context-grid">

        <article className="market-context-card">
          <header className="market-context-header">
            <Gauge size={16} aria-hidden="true" />

            <div>
              <h2>Market Breadth</h2>
              <p>Participation across listed equities</p>
            </div>
          </header>

          <div className="market-breadth-grid">
            {MARKET_BREADTH.map((metric) => (
              <div
                className="market-breadth-item"
                key={metric.label}
              >
                <span>{metric.label}</span>

                <strong
                  className={
                    metric.tone === 'positive'
                      ? 'market-value-positive'
                      : 'market-value-negative'
                  }
                >
                  {metric.value}
                </strong>
              </div>
            ))}
          </div>
        </article>

        <article className="market-context-card">
          <header className="market-context-header">
            <BarChart3 size={16} aria-hidden="true" />

            <div>
              <h2>Sector Performance</h2>
              <p>Today's broad sector movement</p>
            </div>
          </header>

          <div className="sector-performance-list">
            {SECTOR_PERFORMANCE.map((sector) => {
              const positive = sector.change >= 0;

              return (
                <div
                  className="sector-performance-item"
                  key={sector.name}
                >
                  <span>{sector.name}</span>

                  <strong
                    className={
                      positive
                        ? 'market-value-positive'
                        : 'market-value-negative'
                    }
                  >
                    {positive ? '+' : ''}
                    {sector.change.toFixed(1)}%
                  </strong>
                </div>
              );
            })}
          </div>
        </article>

      </div>
    </section>
  );
}