import {
  ArrowUpRight,
  Newspaper,
} from 'lucide-react';

export default function NewsPreview({ news }) {
  return (
    <section>
      <header className="research-section-header">
        <Newspaper size={16} aria-hidden="true" />

        <div>
          <span className="section-eyebrow">
            Company Developments
          </span>
          <h2>Recent News</h2>
        </div>
      </header>

      {news?.length > 0 ? (
        <div className="news-preview-list">
          {news.map((item) => (
            <button
              type="button"
              className="news-preview-card"
              key={`${item.date}-${item.headline}`}
            >
              <div>
                <div className="news-preview-meta">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>

                <h3>{item.headline}</h3>
              </div>

              <ArrowUpRight
                size={17}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      ) : (
        <p className="news-empty">
          No recent headlines are available for this company.
        </p>
      )}
    </section>
  );
}