const METRICS = [
    {
      key: 'marketCap',
      label: 'Market Cap',
      description: 'Total equity market value',
    },
    {
      key: 'pe',
      label: 'P/E Ratio',
      description: 'Price relative to earnings',
    },
    {
      key: 'revenueGrowth',
      label: 'Revenue Growth',
      description: 'Year-over-year sales growth',
    },
    {
      key: 'grossMargin',
      label: 'Gross Margin',
      description: 'Profit after direct costs',
    },
    {
      key: 'operatingMargin',
      label: 'Operating Margin',
      description: 'Profitability from operations',
    },
    {
      key: 'roe',
      label: 'Return on Equity',
      description: 'Shareholder capital efficiency',
    },
  ];
  
  export default function KeyMetricsGrid({ stock }) {
    return (
      <section id="key-fundamentals">
        <header className="research-section-heading">
          <span className="section-eyebrow">
            Valuation & Profitability
          </span>
          <h2>Key Fundamentals</h2>
        </header>
  
        <div className="fundamental-metrics-grid">
          {METRICS.map((metric) => (
            <article
              className="fundamental-metric-card"
              key={metric.key}
            >
              <span>{metric.label}</span>
              <strong>{stock[metric.key]}</strong>
              <small>{metric.description}</small>
            </article>
          ))}
        </div>
      </section>
    );
  }