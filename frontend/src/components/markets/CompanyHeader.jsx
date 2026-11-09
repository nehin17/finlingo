import { Star } from 'lucide-react';

export default function CompanyHeader({
  stock,
  isWatching,
  onToggleWatch,
}) {
  if (!stock) return null;

  const ticker = stock.ticker ?? '';
  const logoUrl = stock.logoUrl ?? null;

  const initials =
    stock.initials ??
    (ticker.slice(0, 2).toUpperCase() || '?');

  return (
    <header className="company-header">
      <div className="company-header-left">
        <div className="company-logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${stock.name ?? ticker} logo`}
              onError={(event) => {
                event.currentTarget.style.display = 'none';

                const fallback =
                  event.currentTarget.nextElementSibling;

                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
          ) : null}

          <span
            className="company-logo-fallback"
            style={{
              display: logoUrl ? 'none' : 'flex',
            }}
          >
            {initials}
          </span>
        </div>

        <div>
          <h1>{stock.name ?? ticker}</h1>

          <div className="company-metadata">
            <span className="company-ticker">
              {ticker || 'N/A'}
            </span>

            {stock.exchange && (
              <>
                <span aria-hidden="true">•</span>
                <span>{stock.exchange}</span>
              </>
            )}

            {stock.sector && (
              <>
                <span aria-hidden="true">•</span>
                <span>{stock.sector}</span>
              </>
            )}
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
            ? `Remove ${stock.name ?? ticker} from watchlist`
            : `Add ${stock.name ?? ticker} to watchlist`
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