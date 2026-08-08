import {
    ArrowRight,
    FileSearch,
    FileText,
    Newspaper,
    Sparkles,
    Swords,
  } from 'lucide-react';
  import { Link } from 'react-router-dom';
  
  const ACTIONS = [
    {
      label: 'Financial Statements',
      description: 'Revenue, earnings and cash flow',
      icon: FileText,
      href: '#financial-snapshot',
    },
    {
      label: 'SEC Filings',
      description: 'Review regulatory documents',
      icon: FileSearch,
      type: 'filings',
    },
    {
      label: 'Recent News',
      description: 'Latest company developments',
      icon: Newspaper,
      href: '#recent-news',
    },
    {
      label: 'AI Research Report',
      description: 'Read the structured analyst note',
      icon: Sparkles,
      href: '#ai-insight',
    },
  ];
  
  export default function ResearchActions({ ticker }) {
    return (
      <section className="research-actions">
        <header className="research-section-heading">
          <span className="section-eyebrow">
            Continue Researching
          </span>
          <h2>Research Actions</h2>
        </header>
  
        <div className="research-action-grid">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
  
            if (action.type === 'filings') {
              return (
                <a
                  key={action.label}
                  className="research-action-card"
                  href={`https://www.sec.gov/edgar/search/#/q=${encodeURIComponent(
                    ticker
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="research-action-icon">
                    <Icon size={17} aria-hidden="true" />
                  </span>
  
                  <span>
                    <strong>{action.label}</strong>
                    <small>{action.description}</small>
                  </span>
  
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              );
            }
  
            return (
              <a
                key={action.label}
                className="research-action-card"
                href={action.href}
              >
                <span className="research-action-icon">
                  <Icon size={17} aria-hidden="true" />
                </span>
  
                <span>
                  <strong>{action.label}</strong>
                  <small>{action.description}</small>
                </span>
  
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            );
          })}
        </div>
  
        <Link
          className="battle-mode-action"
          to={`/battle?left=${encodeURIComponent(ticker)}`}
        >
          <Swords size={18} aria-hidden="true" />
          Compare in Battle Mode
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    );
  }