import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';

function formatPrice(price, exchange) {
  const isIndian = exchange === 'NSE' || exchange === 'BSE';

  return new Intl.NumberFormat(
    isIndian ? 'en-IN' : 'en-US',
    {
      style: 'currency',
      currency: isIndian ? 'INR' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(price);
}

export default function StockCard({
  stock,
  isSelected,
  onClick,
}) {
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    setLogoFailed(false);
  }, [stock.ticker]);

  const positive = stock.change >= 0;
  const showLogo = stock.logoUrl && !logoFailed;

  return (
    <button
      type="button"
      className={`stock-discovery-card ${
        isSelected ? 'is-selected' : ''
      }`}
      onClick={onClick}
      aria-pressed={isSelected}
    >
      <div className="stock-card-main">
        <div className="stock-card-logo">
          {showLogo ? (
            <img
              src={stock.logoUrl}
              alt=""
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span>
              {stock.initials ?? stock.ticker.slice(0, 2)}
            </span>
          )}
        </div>

        <div className="stock-card-identity">
          <strong>{stock.ticker}</strong>
          <span>{stock.shortName ?? stock.name}</span>
        </div>

        <div className="stock-card-price">
          <strong>
            {formatPrice(stock.price, stock.exchange)}
          </strong>

          <span
            className={
              positive
                ? 'market-value-positive'
                : 'market-value-negative'
            }
          >
            {positive ? (
              <ArrowUpRight size={13} aria-hidden="true" />
            ) : (
              <ArrowDownRight size={13} aria-hidden="true" />
            )}

            {positive ? '+' : ''}
            {stock.change}%
          </span>
        </div>
      </div>

      <div className="stock-card-footer">
        <span>{stock.sector}</span>
        <span>Market Cap: {stock.marketCap}</span>
      </div>
    </button>
  );
}