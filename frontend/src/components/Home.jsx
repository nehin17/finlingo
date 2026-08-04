const tickers = [
  { symbol: 'AAPL', price: '228.40', change: '+1.21%', up: true },
  { symbol: 'TSLA', price: '261.10', change: '+3.00%', up: true },
  { symbol: 'NVDA', price: '134.90', change: '-0.60%', up: false },
  { symbol: 'MSFT', price: '441.20', change: '+0.44%', up: true },
]

const features = [
  { title: 'Research', desc: 'Live prices and AI summaries grounded in real filings.' },
  { title: 'Battle mode', desc: 'Put two companies head to head across key metrics.' },
  { title: 'Know your terms', desc: 'Tap any word you don\'t know. Every lookup is saved.' },
  { title: 'Ask finance buddy', desc: 'A chat assistant that only answers from real data.' },
]

const news = [
  { tag: 'Earnings', headline: 'Chipmakers rally as data-center demand estimates rise' },
  { tag: 'Macro', headline: 'Central bank signals rates likely to hold steady' },
  { tag: 'EV & Auto', headline: 'Delivery numbers beat estimates, shares climb' },
]

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-eyebrow">Live market intelligence, explained</div>
        <h1>Understand markets,<br />not just numbers.</h1>
        <p>Research any public company with live data, AI summaries, and a glossary that teaches you as you read.</p>
        <div className="hero-search">
          <input type="text" placeholder="Search AAPL, Tesla, Nvidia..." />
          <button className="btn btn-primary">Research</button>
        </div>
      </section>

      <div className="ticker-row">
        {tickers.map((t) => (
          <div className="ticker-card" key={t.symbol}>
            <div className="tk">{t.symbol}</div>
            <div className="px">${t.price}</div>
            <div className={t.up ? 'chg up' : 'chg down'}>
              {t.up ? '▲' : '▼'} {t.change}
            </div>
          </div>
        ))}
      </div>

      <section className="section">
        <h2>One platform, four ways to understand a company</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Today's news</h2>
        <div className="news-grid">
          {news.map((n) => (
            <div className="news-card" key={n.headline}>
              <span className="news-tag">{n.tag}</span>
              <p>{n.headline}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="signup-banner">
        <div>
          <h3>Track companies, save your learning</h3>
          <p>Create a free account for watchlists and a personalized digest.</p>
        </div>
        <button className="btn">Create free account</button>
      </div>
    </div>
  )
}

export default Home