import {
    ArrowDownRight,
    ArrowUpRight,
    Clock3,
  } from 'lucide-react';
  
  function formatPrice(stock) {
    const isIndian =
      stock.exchange === 'NSE' || stock.exchange === 'BSE';
  
    return new Intl.NumberFormat(
      isIndian ? 'en-IN' : 'en-US',
      {
        style: 'currency',
        currency: isIndian ? 'INR' : 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(stock.price);
  }
  
  function getStatusTone(label = '') {
    const normalized = label.toLowerCase();
  
    if (
      normalized.includes('pre-market') ||
      normalized.includes('after hours')
    ) {
      return 'informational';
    }
  
    if (normalized.includes('open')) return 'open';
  
    return 'closed';
  }
  
  export default function PriceSection({ stock }) {
    const positive = stock.change >= 0;
    const statusTone = getStatusTone(stock.status.label);
  
    return (
      <section className="company-price-section">
        <div className="company-current-price">
          {formatPrice(stock)}
        </div>
  
        <div className="company-price-context">
          <div
            className={
              positive
                ? 'company-daily-change market-value-positive'
                : 'company-daily-change market-value-negative'
            }
          >
            {positive ? (
              <ArrowUpRight size={19} aria-hidden="true" />
            ) : (
              <ArrowDownRight size={19} aria-hidden="true" />
            )}
  
            {positive ? '+' : ''}
            {stock.change}% Today
          </div>
  
          <div
            className={`market-status-pill status-${statusTone}`}
          >
            <span className="market-status-dot" />
            {stock.status.label}
          </div>
  
          <div className="market-update-time">
            <Clock3 size={13} aria-hidden="true" />
            Updated {stock.status.updated}{' '}
            {stock.status.timezone}
          </div>
        </div>
      </section>
    );
  }