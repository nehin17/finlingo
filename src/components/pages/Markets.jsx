// src/components/pages/Markets.jsx
import { useState, useMemo } from 'react';
import {
  TrendingUp, TrendingDown, Search, Star, ChevronDown,
  Zap, AlertTriangle, Target, BarChart2, FileText,
  Newspaper, Cpu, ShoppingCart, ArrowUpRight, ArrowDownRight,
  Filter, ExternalLink, BookOpen, Swords
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const MARKET_INDICES = [
  { name: 'S&P 500',   value: '+0.84%', positive: true },
  { name: 'NASDAQ',    value: '+1.21%', positive: true },
  { name: 'Dow Jones', value: '-0.12%', positive: false },
  { name: 'NIFTY 50',  value: '+0.66%', positive: true },
  { name: 'SENSEX',    value: '+0.58%', positive: true },
  { name: 'Bitcoin',   value: '+2.10%', positive: true },
  { name: 'Gold',      value: '+0.37%', positive: true },
];

const STOCKS = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    sector: 'AI & Semiconductors',
    exchange: 'NASDAQ',
    market: 'US Market',
    price: 875.40,
    change: 4.28,
    marketCap: '$2.1T',
    pe: 65.2,
    revenueGrowth: 122,
    grossMargin: 73.8,
    operatingMargin: 54.1,
    roe: 88.4,
    initials: 'NV',
    color: '#76b900',
    peers: [
      { ticker: 'NVDA', pe: '65.2x', revenueGrowth: '122%' },
      { ticker: 'AMD',  pe: '42.1x', revenueGrowth: '18%'  },
      { ticker: 'AVGO', pe: '31.5x', revenueGrowth: '21%'  },
    ],
    aiInsight: {
      standout: [
        'Exceptional revenue acceleration driven by AI infrastructure demand',
        'Industry-leading profitability with 73.8% gross margins',
        'Near-monopoly positioning in AI training GPU market',
      ],
      watch: [
        'Valuation premium at 65x P/E relative to semiconductor peers',
        'Data center demand sustainability beyond initial AI buildout',
        'Competitive pressure from AMD MI300X and custom AI chips (Google TPU, AWS Trainium)',
      ],
      takeaway: 'NVDA currently represents a high-growth, high-expectation investment profile with unusually strong profitability metrics for a semiconductor company.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'Q2 FY25 earnings beat consensus estimates by 12%; EPS of $0.68 vs $0.61 expected' },
      { date: 'Jul 2024', text: 'Data center revenue reached $26.3B, a new quarterly record' },
      { date: 'Jun 2024', text: 'Major hyperscale AI infrastructure contracts announced with Microsoft and Google' },
      { date: 'May 2024', text: 'Management raised full-year guidance citing sustained Blackwell architecture demand' },
    ],
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    exchange: 'NASDAQ',
    market: 'US Market',
    price: 227.52,
    change: 0.83,
    marketCap: '$3.5T',
    pe: 32.1,
    revenueGrowth: 8,
    grossMargin: 46.2,
    operatingMargin: 30.4,
    roe: 147.9,
    initials: 'AP',
    color: '#555',
    peers: [
      { ticker: 'AAPL', pe: '32.1x', revenueGrowth: '8%'  },
      { ticker: 'MSFT', pe: '35.2x', revenueGrowth: '16%' },
      { ticker: 'GOOG', pe: '23.4x', revenueGrowth: '14%' },
    ],
    aiInsight: {
      standout: [
        'Unmatched brand loyalty and ecosystem lock-in across 2B+ active devices',
        'Services segment growing at 14% YoY with 75%+ gross margins',
        'Highest ROE in large-cap technology at nearly 148%',
      ],
      watch: [
        'iPhone unit growth plateauing in saturated premium smartphone markets',
        'Regulatory pressure on App Store commission structure in EU and US',
        'China revenue exposure at ~17% of total revenue amid geopolitical tensions',
      ],
      takeaway: 'Apple represents a mature cash-flow machine with services-driven margin expansion, trading at a premium justified primarily by ecosystem stickiness and capital return programs.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'Apple Intelligence AI features announced for iOS 18 across all major product lines' },
      { date: 'Jul 2024', text: 'Services revenue hit $24.2B quarterly, growing 14% YoY' },
      { date: 'Jun 2024', text: 'WWDC 2024 showcased deep OpenAI integration with ChatGPT in Siri' },
      { date: 'May 2024', text: '$110B share buyback program announced, largest in company history' },
    ],
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    sector: 'Technology',
    exchange: 'NASDAQ',
    market: 'US Market',
    price: 441.77,
    change: 1.14,
    marketCap: '$3.3T',
    pe: 35.2,
    revenueGrowth: 16,
    grossMargin: 70.1,
    operatingMargin: 44.6,
    roe: 38.2,
    initials: 'MS',
    color: '#00a4ef',
    peers: [
      { ticker: 'MSFT', pe: '35.2x', revenueGrowth: '16%' },
      { ticker: 'GOOG', pe: '23.4x', revenueGrowth: '14%' },
      { ticker: 'AMZN', pe: '41.2x', revenueGrowth: '11%' },
    ],
    aiInsight: {
      standout: [
        'Azure cloud growing at 29% YoY, gaining market share on AWS',
        'Copilot AI integration across Office 365 creating new enterprise revenue streams',
        '70%+ gross margins reflecting high-value software and cloud mix',
      ],
      watch: [
        'OpenAI partnership cost structure and exclusivity risk as AI ecosystem matures',
        'Azure capacity constraints limiting growth ceiling in near term',
        'Activision Blizzard integration costs weighing on near-term free cash flow',
      ],
      takeaway: 'Microsoft is executing one of the most credible enterprise AI monetization strategies among mega-cap tech, with Azure and Copilot as the primary growth engines.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'Azure AI services revenue crossed $10B annualized run rate' },
      { date: 'Jul 2024', text: 'Copilot for Microsoft 365 reached 1M paid enterprise seats' },
      { date: 'Jun 2024', text: 'Announced $3.3B investment in Wisconsin AI data center infrastructure' },
      { date: 'May 2024', text: 'FY Q3 earnings beat with cloud revenue growing 21% YoY' },
    ],
  },
  {
    ticker: 'META',
    name: 'Meta Platforms',
    sector: 'Technology',
    exchange: 'NASDAQ',
    market: 'US Market',
    price: 512.34,
    change: 2.12,
    marketCap: '$1.3T',
    pe: 26.8,
    revenueGrowth: 27,
    grossMargin: 81.8,
    operatingMargin: 37.9,
    roe: 33.7,
    initials: 'MT',
    color: '#0082fb',
    peers: [
      { ticker: 'META',  pe: '26.8x', revenueGrowth: '27%' },
      { ticker: 'SNAP',  pe: 'N/M',   revenueGrowth: '19%' },
      { ticker: 'PINS',  pe: '29.1x', revenueGrowth: '23%' },
    ],
    aiInsight: {
      standout: [
        'Advertising revenue reaccelerating driven by AI-optimized ad targeting',
        'Llama open-source AI strategy creating developer ecosystem advantage',
        '81.8% gross margins among the highest in large-cap internet',
      ],
      watch: [
        'Reality Labs segment losses exceeding $5B annually with uncertain ROI timeline',
        'Regulatory risk in EU around data privacy and ad targeting practices',
        'Teen engagement trends on Instagram and Facebook versus TikTok',
      ],
      takeaway: 'Meta has successfully pivoted its AI narrative from metaverse skepticism to credible advertising AI leadership, with Llama positioning it as an open-source AI ecosystem player.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'Q2 2024 revenue grew 22% YoY to $39.1B, beating estimates' },
      { date: 'Jul 2024', text: 'Llama 3.1 405B model released, outperforming GPT-4 on key benchmarks' },
      { date: 'Jun 2024', text: 'Meta AI reached 400M monthly active users across platforms' },
      { date: 'May 2024', text: 'Instagram Reels ad revenue grew 35% contributing to overall beat' },
    ],
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'E-Commerce',
    exchange: 'NASDAQ',
    market: 'US Market',
    price: 188.40,
    change: 1.58,
    marketCap: '$1.97T',
    pe: 41.2,
    revenueGrowth: 11,
    grossMargin: 48.0,
    operatingMargin: 9.9,
    roe: 22.1,
    initials: 'AZ',
    color: '#ff9900',
    peers: [
      { ticker: 'AMZN', pe: '41.2x', revenueGrowth: '11%' },
      { ticker: 'JD',   pe: '14.2x', revenueGrowth: '4%'  },
      { ticker: 'SHOP', pe: '72.1x', revenueGrowth: '25%' },
    ],
    aiInsight: {
      standout: [
        'AWS growing at 19% YoY, maintaining 31% cloud market share globally',
        'Advertising segment now a $50B+ annual revenue business at high margins',
        'Operating income margins expanding rapidly after years of infrastructure investment',
      ],
      watch: [
        'E-commerce segment margin compression from same-day delivery cost buildup',
        'Antitrust investigations into marketplace practices and seller fee structures',
        'AWS competitive pressure as Azure gains enterprise AI workload share',
      ],
      takeaway: 'Amazon is transitioning from a low-margin retail business to a high-margin cloud and advertising platform, with AWS and Ads now generating the majority of operating income.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'AWS revenue grew 19% to $26.3B in Q2, re-accelerating growth' },
      { date: 'Jul 2024', text: 'Amazon Ads crossed $12.8B quarterly revenue milestone' },
      { date: 'Jun 2024', text: 'Project Kuiper satellite internet launched first production satellites' },
      { date: 'May 2024', text: 'Prime membership fee increased in several international markets' },
    ],
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Consumer',
    exchange: 'NASDAQ',
    market: 'US Market',
    price: 219.80,
    change: -1.84,
    marketCap: '$699B',
    pe: 58.9,
    revenueGrowth: 2,
    grossMargin: 17.9,
    operatingMargin: 6.3,
    roe: 14.2,
    initials: 'TS',
    color: '#e31937',
    peers: [
      { ticker: 'TSLA', pe: '58.9x', revenueGrowth: '2%'  },
      { ticker: 'F',    pe: '12.1x', revenueGrowth: '6%'  },
      { ticker: 'GM',   pe: '5.8x',  revenueGrowth: '9%'  },
    ],
    aiInsight: {
      standout: [
        'Full Self-Driving (FSD) software represents a high-margin future revenue opportunity',
        'Energy storage business growing at 100%+ YoY, diversifying revenue mix',
        'Supercharger network becoming an industry standard adopted by Ford and GM',
      ],
      watch: [
        'Auto gross margins compressed to 17.9% from 25%+ highs due to price cuts',
        'EV market competition intensifying from BYD in China and legacy OEMs globally',
        'Robotaxi timeline uncertainty with regulatory approvals still pending',
      ],
      takeaway: 'Tesla is increasingly valued as an AI and energy company rather than an automaker, but near-term fundamentals reflect automotive margin pressure and slowing EV growth.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'Robotaxi event scheduled for October 2024 with autonomous vehicle reveal' },
      { date: 'Jul 2024', text: 'Q2 deliveries came in at 443,956 vehicles, beating 439K consensus' },
      { date: 'Jun 2024', text: 'FSD Version 12.5 released with significant autonomy improvements' },
      { date: 'May 2024', text: 'Megapack energy storage revenue grew 157% YoY to $3.0B' },
    ],
  },
  {
    ticker: 'RELIANCE',
    name: 'Reliance Industries',
    sector: 'Energy',
    exchange: 'NSE',
    market: 'Indian Market',
    price: 2941.50,
    change: 0.72,
    marketCap: '₹19.9T',
    pe: 28.4,
    revenueGrowth: 9,
    grossMargin: 22.1,
    operatingMargin: 14.3,
    roe: 11.2,
    initials: 'RL',
    color: '#1a6b3a',
    peers: [
      { ticker: 'RELIANCE', pe: '28.4x', revenueGrowth: '9%' },
      { ticker: 'ONGC',     pe: '8.2x',  revenueGrowth: '4%' },
      { ticker: 'IOC',      pe: '9.1x',  revenueGrowth: '3%' },
    ],
    aiInsight: {
      standout: [
        'Jio Platforms reaching 478M subscribers, driving digital India penetration',
        'Retail segment is India\'s largest with 18,040 stores and growing e-commerce',
        'New Energy business targeting $75B investment in green hydrogen and solar',
      ],
      watch: [
        'O2C segment margins sensitive to global crude oil price volatility',
        'Jio 5G monetization timeline uncertain as ARPU remains low at ~₹182',
        'Retail competition from Amazon India and Flipkart intensifying in e-commerce',
      ],
      takeaway: 'Reliance is a diversified conglomerate transitioning from energy to digital and retail, with Jio and Reliance Retail increasingly driving the investment thesis.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'Jio 5G rollout completed across all Indian districts ahead of schedule' },
      { date: 'Jul 2024', text: 'Q1 FY25 consolidated net profit rose 5% YoY to ₹15,138 crore' },
      { date: 'Jun 2024', text: 'Reliance Retail acquired Shein India license for fashion e-commerce' },
      { date: 'May 2024', text: 'New Energy solar gigafactory in Gujarat commenced production' },
    ],
  },
  {
    ticker: 'BRK.B',
    name: 'Berkshire Hathaway',
    sector: 'Financials',
    exchange: 'NYSE',
    market: 'US Market',
    price: 368.22,
    change: -0.23,
    marketCap: '$803B',
    pe: 21.4,
    revenueGrowth: 6,
    grossMargin: 31.2,
    operatingMargin: 11.8,
    roe: 13.1,
    initials: 'BH',
    color: '#8b6914',
    peers: [
      { ticker: 'BRK.B', pe: '21.4x', revenueGrowth: '6%' },
      { ticker: 'JPM',   pe: '12.8x', revenueGrowth: '9%' },
      { ticker: 'BAC',   pe: '13.2x', revenueGrowth: '5%' },
    ],
    aiInsight: {
      standout: [
        '$277B cash position provides unmatched optionality for large acquisitions',
        'GEICO insurance returning to profitability after operational improvements',
        'Railroad and energy businesses generating stable, compounding cash flows',
      ],
      watch: [
        'Succession planning uncertainty as Warren Buffett approaches 94 years old',
        'Large Apple stake (~$135B) creates concentrated equity portfolio exposure',
        'Reduced acquisition activity suggesting Buffett finds market valuations stretched',
      ],
      takeaway: 'Berkshire Hathaway represents a defensive value holding with unparalleled financial flexibility, though succession concerns and high cash holdings suggest management caution on current market valuations.',
    },
    catalysts: [
      { date: 'Aug 2024', text: 'Berkshire reduced Apple stake by 50%, signaling valuation concerns' },
      { date: 'Jul 2024', text: 'Operating earnings reached $11.6B in Q2 2024, a record high' },
      { date: 'Jun 2024', text: 'BNSF Railroad reported improved operating ratio after cost initiatives' },
      { date: 'May 2024', text: 'Annual meeting confirmed Greg Abel as designated Buffett successor' },
    ],
  },
];

const TOP_GAINERS = [
  { ticker: 'NVDA', name: 'NVIDIA Corp.',      change: '+4.28%' },
  { ticker: 'META', name: 'Meta Platforms',    change: '+2.12%' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.',   change: '+1.58%' },
];

const TOP_LOSERS = [
  { ticker: 'TSLA',  name: 'Tesla Inc.',          change: '-1.84%' },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway',  change: '-0.23%' },
  { ticker: 'XOM',   name: 'Exxon Mobil Corp.',   change: '-0.41%' },
];

const FILTERS = [
  'All Stocks', 'US Market', 'Indian Market',
  'Technology', 'AI & Semiconductors', 'E-Commerce',
  'Financials', 'Energy', 'Consumer',
];

const SORT_OPTIONS = [
  { value: 'default',         label: 'Most Viewed'     },
  { value: 'change',          label: 'Daily Change'    },
  { value: 'marketCap',       label: 'Market Cap'      },
  { value: 'revenueGrowth',   label: 'Revenue Growth'  },
  { value: 'pe',              label: 'P/E Ratio'       },
  { value: 'alphabetical',    label: 'Alphabetical'    },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatPrice(price, exchange) {
  if (exchange === 'NSE' || exchange === 'BSE') {
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function getInitialsBg(color) {
  return color;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function MarketStrip() {
  return (
    <div style={{
      width: '100%',
      height: '70px',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        padding: '0 24px',
        minWidth: 'max-content',
      }}>
        {MARKET_INDICES.map((item, idx) => (
          <div key={item.name} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0 20px',
            borderRight: idx < MARKET_INDICES.length - 1 ? '1px solid var(--border)' : 'none',
            gap: '2px',
          }}>
            <span style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontWeight: '500',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {item.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {item.positive
                ? <ArrowUpRight size={13} color="var(--success)" strokeWidth={2.5} />
                : <ArrowDownRight size={13} color="var(--danger)" strokeWidth={2.5} />
              }
              <span style={{
                fontSize: '13px',
                fontWeight: '700',
                color: item.positive ? 'var(--success)' : 'var(--danger)',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchFilterBar({
  search, setSearch,
  activeFilter, setActiveFilter,
  sortBy, setSortBy,
}) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 24px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Row 1: Search + Sort */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{
            position: 'relative',
            flex: 1,
            maxWidth: '420px',
          }}>
            <Search size={15} style={{
              position: 'absolute',
              left: '13px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }} />
            <input
              type="text"
              placeholder="Search ticker or company name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '38px',
                paddingRight: '14px',
                paddingTop: '9px',
                paddingBottom: '9px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontSize: '13.5px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Sort */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                appearance: 'none',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontSize: '13px',
                padding: '9px 36px 9px 14px',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: '500',
              }}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{
              position: 'absolute',
              right: '11px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* Row 2: Filter chips */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: '2px',
        }}>
          {FILTERS.map(f => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  flexShrink: 0,
                  padding: '5px 14px',
                  borderRadius: '20px',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                  background: isActive ? 'var(--primary)' : 'var(--surface)',
                  color: isActive ? '#fff' : 'var(--text)',
                  fontSize: '12.5px',
                  fontWeight: isActive ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 8px rgba(var(--primary-rgb, 59,130,246), 0.25)' : 'none',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StockCard({ stock, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isPositive = stock.change >= 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '16px 18px',
        borderRadius: '14px',
        cursor: 'pointer',
        border: isSelected
          ? '1px solid var(--primary)'
          : `1px solid ${hovered ? 'var(--primary)' : 'var(--border)'}`,
        background: isSelected
          ? 'color-mix(in srgb, var(--primary) 8%, var(--surface))'
          : hovered ? 'var(--surface-hover)' : 'transparent',
        borderLeft: isSelected ? '3px solid var(--primary)' : undefined,
        boxShadow: isSelected
          ? '0 4px 16px rgba(0,0,0,0.08)'
          : hovered ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.18s ease',
        position: 'relative',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: stock.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          opacity: 0.9,
        }}>
          <span style={{ color: '#fff', fontSize: '11px', fontWeight: '700', letterSpacing: '0.03em' }}>
            {stock.initials}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '13.5px',
            fontWeight: '700',
            color: 'var(--text)',
            letterSpacing: '0.02em',
          }}>
            {stock.ticker}
          </div>
          <div style={{
            fontSize: '11.5px',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {stock.name}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontSize: '13.5px',
            fontWeight: '700',
            color: 'var(--text)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {formatPrice(stock.price, stock.exchange)}
          </div>
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: isPositive ? 'var(--success)' : 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '2px',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {isPositive
              ? <ArrowUpRight size={12} strokeWidth={2.5} />
              : <ArrowDownRight size={12} strokeWidth={2.5} />
            }
            {isPositive ? '+' : ''}{stock.change}%
          </div>
        </div>
      </div>

      {/* Sector pill */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          background: 'var(--surface-hover)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '2px 8px',
          fontWeight: '500',
        }}>
          {stock.sector}
        </span>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          background: 'var(--surface-hover)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '2px 8px',
          fontWeight: '500',
        }}>
          {stock.exchange}
        </span>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div style={{
      background: 'var(--surface-hover)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    }}>
      <span style={{
        fontSize: '10.5px',
        color: 'var(--text-muted)',
        fontWeight: '600',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{
        fontSize: '22px',
        fontWeight: '700',
        color: 'var(--text)',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.1,
      }}>
        {value}
      </span>
    </div>
  );
}

function AIInsightCard({ insight }) {
  return (
    <div style={{
      background: 'color-mix(in srgb, var(--primary) 6%, var(--surface))',
      border: '1px solid color-mix(in srgb, var(--primary) 30%, var(--border))',
      borderRadius: '18px',
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Zap size={16} color="var(--primary)" strokeWidth={2.5} />
        <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)' }}>
          AI Quick Insight
        </span>
        <span style={{
          fontSize: '10px',
          fontWeight: '600',
          color: 'var(--primary)',
          background: 'color-mix(in srgb, var(--primary) 14%, transparent)',
          border: '1px solid color-mix(in srgb, var(--primary) 35%, transparent)',
          borderRadius: '20px',
          padding: '2px 9px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          AI Assisted
        </span>
      </div>

      {/* What stands out */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{
          fontSize: '11.5px',
          fontWeight: '700',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <TrendingUp size={12} strokeWidth={2.5} />
          What stands out
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {insight.standout.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
              <div style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--success)',
                marginTop: '7px',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.55 }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* What investors should watch */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{
          fontSize: '11.5px',
          fontWeight: '700',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <AlertTriangle size={12} strokeWidth={2.5} />
          What investors should watch
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {insight.watch.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
              <div style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--danger)',
                marginTop: '7px',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.55 }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'color-mix(in srgb, var(--primary) 20%, var(--border))',
        margin: '4px 0 16px',
      }} />

      {/* Takeaway */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Target size={15} color="var(--primary)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{
          fontSize: '13px',
          color: 'var(--text)',
          lineHeight: 1.65,
          fontStyle: 'italic',
          margin: 0,
        }}>
          {insight.takeaway}
        </p>
      </div>
    </div>
  );
}

function PeerSnapshot({ peers }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <BarChart2 size={15} color="var(--text-muted)" strokeWidth={2} />
        <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
          Quick Peer Snapshot
        </span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--surface-hover)' }}>
            {['Company', 'P/E Ratio', 'Revenue Growth'].map(h => (
              <th key={h} style={{
                padding: '10px 20px',
                textAlign: h === 'Company' ? 'left' : 'right',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderBottom: '1px solid var(--border)',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {peers.map((row, i) => (
            <tr key={row.ticker} style={{
              background: i === 0 ? 'color-mix(in srgb, var(--primary) 5%, transparent)' : 'transparent',
              borderBottom: i < peers.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <td style={{ padding: '12px 20px' }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: i === 0 ? '700' : '500',
                  color: i === 0 ? 'var(--primary)' : 'var(--text)',
                }}>
                  {row.ticker}
                </span>
              </td>
              <td style={{
                padding: '12px 20px',
                textAlign: 'right',
                fontSize: '13px',
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--text)',
                fontWeight: '500',
              }}>
                {row.pe}
              </td>
              <td style={{
                padding: '12px 20px',
                textAlign: 'right',
                fontSize: '13px',
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--text)',
                fontWeight: '500',
              }}>
                {row.revenueGrowth}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecentCatalysts({ catalysts }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
      }}>
        <Newspaper size={15} color="var(--text-muted)" strokeWidth={2} />
        <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
          Recent Catalysts
        </span>
      </div>
      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '5px',
          top: '8px',
          bottom: '8px',
          width: '1px',
          background: 'var(--border)',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {catalysts.map((c, i) => (
            <div key={i} style={{ position: 'relative', paddingBottom: i < catalysts.length - 1 ? '18px' : '0' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '-21px',
                top: '6px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: 'var(--primary)',
                border: '2px solid var(--surface)',
                boxSizing: 'border-box',
              }} />
              <div style={{
                background: 'var(--surface-hover)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '12px 14px',
              }}>
                <span style={{
                  fontSize: '10.5px',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  {c.date}
                </span>
                <span style={{
                  fontSize: '13px',
                  color: 'var(--text)',
                  lineHeight: 1.5,
                }}>
                  {c.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResearchActions({ ticker }) {
  const secondary = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text)',
    fontSize: '13px',
    fontWeight: '600',
    padding: '10px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    transition: 'all 0.18s ease',
    whiteSpace: 'nowrap',
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '14px',
      }}>
        <BookOpen size={15} color="var(--text-muted)" strokeWidth={2} />
        <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
          Research Actions
        </span>
      </div>
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        <button style={secondary} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          <FileText size={14} strokeWidth={2} />
          Financial Statements
        </button>
        <button style={secondary} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          <ExternalLink size={14} strokeWidth={2} />
          SEC Filings
        </button>
        <button style={secondary} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          <Newspaper size={14} strokeWidth={2} />
          Recent News
        </button>
        <button style={secondary} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          <Zap size={14} strokeWidth={2} />
          AI Research Report
        </button>
        {/* Primary CTA */}
        <button style={{
          background: 'var(--primary)',
          border: '1px solid var(--primary)',
          borderRadius: '10px',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '700',
          padding: '10px 18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          transition: 'opacity 0.18s ease',
          whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <Swords size={14} strokeWidth={2} />
          Compare in Battle Mode
        </button>
      </div>
    </div>
  );
}

function MarketMoversSection() {
  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '32px 24px 48px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '20px',
      }}>
        <TrendingUp size={16} color="var(--text-muted)" strokeWidth={2} />
        <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
          Market Movers
        </h2>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          background: 'var(--surface-hover)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '1px 8px',
          marginLeft: '2px',
        }}>
          Today
        </span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {/* Gainers */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '18px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <TrendingUp size={14} color="var(--success)" strokeWidth={2.5} />
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text)' }}>
              Top Gainers
            </span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {TOP_GAINERS.map((item, i) => (
              <div key={item.ticker} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '11px 20px',
                borderBottom: i < TOP_GAINERS.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                    {item.ticker}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {item.name}
                  </div>
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--success)',
                  fontVariantNumeric: 'tabular-nums',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}>
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Losers */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '18px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <TrendingDown size={14} color="var(--danger)" strokeWidth={2.5} />
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text)' }}>
              Top Losers
            </span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {TOP_LOSERS.map((item, i) => (
              <div key={item.ticker} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '11px 20px',
                borderBottom: i < TOP_LOSERS.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                    {item.ticker}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {item.name}
                  </div>
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--danger)',
                  fontVariantNumeric: 'tabular-nums',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}>
                  <ArrowDownRight size={13} strokeWidth={2.5} />
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COMPANY RESEARCH PANEL ──────────────────────────────────────────────────

function CompanyResearchPanel({ stock }) {
  const [watched, setWatched] = useState(false);
  const isPositive = stock.change >= 0;

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: '22px',
      border: '1px solid var(--border)',
      overflow: 'hidden',
    }}>
      {/* Inner scroll container */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* 3.1 Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', margin: '0 0 6px' }}>
              {stock.name}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              {[stock.ticker, stock.exchange, stock.sector].map((tag, i) => (
                <span key={i} style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: i === 0 ? 'var(--primary)' : 'var(--text-muted)',
                  background: i === 0
                    ? 'color-mix(in srgb, var(--primary) 12%, transparent)'
                    : 'var(--surface-hover)',
                  border: `1px solid ${i === 0 ? 'color-mix(in srgb, var(--primary) 30%, transparent)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  padding: '3px 10px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setWatched(w => !w)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              borderRadius: '10px',
              border: watched
                ? '1px solid color-mix(in srgb, var(--primary) 50%, transparent)'
                : '1px solid var(--border)',
              background: watched
                ? 'color-mix(in srgb, var(--primary) 10%, var(--surface))'
                : 'var(--surface)',
              color: watched ? 'var(--primary)' : 'var(--text)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              flexShrink: 0,
            }}
          >
            <Star
              size={14}
              strokeWidth={2}
              fill={watched ? 'var(--primary)' : 'none'}
              color={watched ? 'var(--primary)' : 'var(--text-muted)'}
            />
            {watched ? 'Watching' : 'Watch'}
          </button>
        </div>

        {/* 3.2 Price Section */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontSize: '42px',
              fontWeight: '800',
              color: 'var(--text)',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
            }}>
              {formatPrice(stock.price, stock.exchange)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingBottom: '4px' }}>
            <div style={{
              fontSize: '17px',
              fontWeight: '700',
              color: isPositive ? 'var(--success)' : 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {isPositive ? <ArrowUpRight size={18} strokeWidth={2.5} /> : <ArrowDownRight size={18} strokeWidth={2.5} />}
              {isPositive ? '+' : ''}{stock.change}% Today
            </div>
            <span style={{
              fontSize: '11.5px',
              fontWeight: '600',
              color: 'var(--success)',
              background: 'color-mix(in srgb, var(--success) 12%, transparent)',
              border: '1px solid color-mix(in srgb, var(--success) 28%, transparent)',
              borderRadius: '20px',
              padding: '2px 10px',
              width: 'fit-content',
            }}>
              Market Open
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)' }} />

        {/* 3.3 Metrics Grid */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)', marginBottom: '14px' }}>
            Key Metrics
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}
            className="metrics-grid"
          >
            <MetricCard label="Market Cap"       value={stock.marketCap} />
            <MetricCard label="P/E Ratio"        value={`${stock.pe}x`} />
            <MetricCard label="Revenue Growth"   value={`${stock.revenueGrowth}%`} />
            <MetricCard label="Gross Margin"     value={`${stock.grossMargin}%`} />
            <MetricCard label="Operating Margin" value={`${stock.operatingMargin}%`} />
            <MetricCard label="ROE"              value={`${stock.roe}%`} />
          </div>
        </div>

        {/* 3.4 AI Insight */}
        <AIInsightCard insight={stock.aiInsight} />

        {/* 3.5 Peer Snapshot */}
        <PeerSnapshot peers={stock.peers} />

        {/* 3.6 Catalysts */}
        <RecentCatalysts catalysts={stock.catalysts} />

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)' }} />

        {/* 3.7 Research Actions */}
        <ResearchActions ticker={stock.ticker} />

      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Markets() {
  const [search, setSearch]             = useState('');
  const [activeFilter, setActiveFilter] = useState('All Stocks');
  const [sortBy, setSortBy]             = useState('default');
  const [selectedTicker, setSelectedTicker] = useState('NVDA');

  // Filter
  const filtered = useMemo(() => {
    let list = STOCKS;

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(s =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q)
      );
    }

    // Filter chip
    if (activeFilter !== 'All Stocks') {
      list = list.filter(s =>
        s.sector === activeFilter ||
        s.market === activeFilter
      );
    }

    // Sort
    switch (sortBy) {
      case 'change':       list = [...list].sort((a, b) => b.change - a.change); break;
      case 'pe':           list = [...list].sort((a, b) => a.pe - b.pe); break;
      case 'revenueGrowth':list = [...list].sort((a, b) => b.revenueGrowth - a.revenueGrowth); break;
      case 'alphabetical': list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return list;
  }, [search, activeFilter, sortBy]);

  const selectedStock = STOCKS.find(s => s.ticker === selectedTicker) || STOCKS[0];

  // Auto-select first when filter changes
  const handleFilterChange = (f) => {
    setActiveFilter(f);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Scoped styles */}
      <style>{`
        @media (max-width: 767px) {
          .markets-workspace {
            flex-direction: column !important;
          }
          .markets-left-panel {
            width: 100% !important;
          }
          .markets-right-panel {
            width: 100% !important;
          }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .markets-left-panel {
            width: 35% !important;
            min-width: 260px !important;
          }
          .markets-right-panel {
            width: 65% !important;
          }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        input::placeholder { color: var(--text-muted); opacity: 0.8; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1. Market Strip */}
      <MarketStrip />

      {/* 2. Toolbar */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={handleFilterChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* 3. Main Workspace */}
      <div style={{
        flex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '24px 24px 0',
        boxSizing: 'border-box',
      }}>
        <div
          className="markets-workspace"
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Panel */}
          <div
            className="markets-left-panel"
            style={{
              width: '33%',
              minWidth: '280px',
              flexShrink: 0,
              position: 'sticky',
              top: '120px',
              maxHeight: 'calc(100vh - 140px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '22px',
              padding: '20px',
            }}>
              {/* Panel header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
                    {activeFilter === 'All Stocks' ? 'All Stocks' : activeFilter}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {filtered.length} compan{filtered.length === 1 ? 'y' : 'ies'}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '5px 10px',
                }}>
                  <Filter size={12} strokeWidth={2} />
                  Filter
                </div>
              </div>

              {/* Stock list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filtered.length === 0 ? (
                  <div style={{
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '13.5px',
                  }}>
                    No companies match your search.
                  </div>
                ) : (
                  filtered.map(stock => (
                    <StockCard
                      key={stock.ticker}
                      stock={stock}
                      isSelected={stock.ticker === selectedTicker}
                      onClick={() => setSelectedTicker(stock.ticker)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div
            className="markets-right-panel"
            style={{ flex: 1, minWidth: 0 }}
          >
            <CompanyResearchPanel stock={selectedStock} />
          </div>
        </div>
      </div>

      {/* 4. Market Movers */}
      <MarketMoversSection />
    </div>
  );
}