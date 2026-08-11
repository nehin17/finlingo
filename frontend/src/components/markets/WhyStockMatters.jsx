import { Lightbulb } from 'lucide-react';

export default function WhyStockMatters({
  companyName,
  content,
}) {
  return (
    <section className="why-stock-matters">
      <div className="why-stock-matters-icon">
        <Lightbulb size={18} aria-hidden="true" />
      </div>

      <div>
        <span className="section-eyebrow">
          Investment Thesis Context
        </span>

        <h2>
          Why {companyName} Matters
        </h2>

        <p>
          {content ||
            'Investment thesis information is currently unavailable.'}
        </p>
      </div>
    </section>
  );
}