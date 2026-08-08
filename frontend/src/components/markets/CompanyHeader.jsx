import { Star } from 'lucide-react';

export default function CompanyHeader({
  stock,
  isWatching,
  onToggleWatch,
}) {
  return (
    <header className="company-header">
      <div className="company-header-identity">
        <div className="company-title-row">
          <CompanyLogo stock={stock} />

          <div>
            <h1>{stock.name}</h1>

            <div className="company-metadata">
              <span className="company-ticker">
                {stock.ticker}
              </span>
              <span aria-hidden="true">•</span>
              <span>{stock.exchange}</span>
              <span aria-hidden="true">•</span>
              <span>{stock.sector}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`watch-button ${
          isWatching ? 'is-watching' : ''
        }`}
        onClick={onToggleWatch}
        aria-pressed={isWatching}
        aria-label={
          isWatching
            ? `Remove ${stock.name} from watchlist`
            : `Add ${stock.name} to watchlist`
        }
      >
        <Star
          size={16}
          fill={isWatching ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        {isWatching ? 'Watching' : 'Watch'}
      </button>
    </header>
  );
}

function CompanyLogo({ stock }) {
  return (
    <div className="company-header-logo">
      {stock.logoUrl ? (
        <img
          src={stock.logoUrl}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none';
            event.currentTarget.nextElementSibling.style.display =
              'flex';
          }}
        />
      ) : null}

      <span
        className="company-logo-fallback"
        style={{
          display: stock.logoUrl ? 'none' : 'flex',
        }}
      >
        {stock.initials ?? stock.ticker.slice(0, 2)}
      </span>
    </div>
  );
}