import { Landmark } from 'lucide-react';

export default function FinancialSnapshot({
  financialSnapshot,
}) {
  if (!financialSnapshot) return null;
  const metrics = [
    {
      label: 'Revenue',
      value: financialSnapshot.revenue,
    },
    {
      label: 'Net Income',
      value: financialSnapshot.netIncome,
    },
    {
      label: 'Free Cash Flow',
      value: financialSnapshot.freeCashFlow,
    },
    {
      label: 'Dividend Yield',
      value: financialSnapshot.dividendYield,
    },
  ];

  return (
    <section
      id="financial-snapshot"
      className="financial-snapshot"
    >
      <header className="research-section-header">
        <Landmark size={17} aria-hidden="true" />

        <div>
          <span className="section-eyebrow">
            Financial Quality
          </span>
          <h2>Quick Financial Snapshot</h2>
        </div>
      </header>

      <div className="financial-snapshot-grid">
        {metrics.map((metric) => (
          <article
            className="financial-snapshot-item"
            key={metric.label}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>Trailing twelve months</small>
          </article>
        ))}
      </div>
    </section>
  );
}