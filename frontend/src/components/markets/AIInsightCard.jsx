import {
  AlertTriangle,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
  Target,
} from 'lucide-react';

export default function AIInsightCard({ insight }) {
  return (
    <section
      id="ai-insight"
      className="ai-analyst-note"
    >
      <header className="ai-note-header">
        <div className="ai-note-title">
          <span className="ai-note-icon">
            <Sparkles size={17} aria-hidden="true" />
          </span>

          <div>
            <span className="section-eyebrow">
              FinLingo Intelligence
            </span>
            <h2>AI Analyst Note</h2>
          </div>
        </div>

        <span className="ai-assisted-badge">
          AI Assisted
        </span>
      </header>

      <div className="ai-note-section">
        <h3>
          <BriefcaseBusiness
            size={16}
            aria-hidden="true"
          />
          Business Snapshot
        </h3>

        <p>{insight.businessSnapshot}</p>
      </div>

      <div className="ai-note-grid">
        <div className="ai-note-section">
          <h3>
            <CheckCircle2 size={16} aria-hidden="true" />
            What Is Driving the Stock?
          </h3>

          <ul>
            {insight.drivers.map((driver) => (
              <li key={driver}>{driver}</li>
            ))}
          </ul>
        </div>

        <div className="ai-note-section">
          <h3>
            <AlertTriangle size={16} aria-hidden="true" />
            What Investors Should Monitor
          </h3>

          <ul className="risk-list">
            {insight.monitor.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ai-note-section ai-interpretation">
        <h3>
          <BarChart3 size={16} aria-hidden="true" />
          Fundamental Interpretation
        </h3>

        <p>{insight.fundamentalInterpretation}</p>
      </div>

      <div className="ai-note-conclusion">
        <Target size={18} aria-hidden="true" />

        <div>
          <strong>Analyst-Style Conclusion</strong>
          <p>{insight.conclusion}</p>
        </div>
      </div>

      <footer className="ai-note-disclaimer">
        AI-assisted research should be validated against
        financial statements, company filings, and independent
        analysis.
      </footer>
    </section>
  );
}