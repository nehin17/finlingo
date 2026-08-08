import { Lightbulb } from 'lucide-react';

export default function WhyStockMatters({
  companyName,
  content,
}) {
  return (
    <section className="why-stock-matters">
      <span className="why-stock-icon">
        <Lightbulb size={19} aria-hidden="true" />
      </span>

      <div>
        <span className="section-eyebrow">
          Investment Thesis Context
        </span>
        <h2>Why {companyName} Matters</h2>
        <p>{content}</p>
      </div>
    </section>
  );
}