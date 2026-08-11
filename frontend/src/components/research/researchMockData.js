// src/components/markets/marketMockData.js
//
// Development-only fixtures. Shape matches marketTypes.js exactly.
// When the backend is wired, delete this file and let marketService
// return the same shape from real endpoints.

const now = Date.now()
const DAY = 24 * 60 * 60 * 1000

function generateChart(days, base, volatility) {
  const out = []
  let price  = base
  for (let i = days; i >= 0; i--) {
    price += (Math.random() - 0.48) * volatility
    out.push({ timestamp: now - i * DAY, price: Math.max(1, +price.toFixed(2)) })
  }
  return out
}

export const MOCK_COMPANY_RESEARCH = {
  company: {
    ticker:       'AAPL',
    name:         'Apple Inc.',
    exchange:     'NASDAQ',
    sector:       'Technology',
    country:      'United States',
    logoUrl:      null,
    price:        224.72,
    change:       1.24,
    changeAmount: 2.75,
    status: {
      label:    'Market Open',
      updated:  new Date().toISOString(),
      timezone: 'EDT',
    },
  },

  snapshot: [
    { label: 'Market Cap',        value: '$3.42T',   sub: 'Large Cap' },
    { label: 'Enterprise Value',  value: '$3.51T',   sub: 'incl. debt' },
    { label: 'P/E Ratio',         value: '31.2x',    tone: 'flat' },
    { label: 'Forward P/E',       value: '28.4x',    tone: 'up' },
    { label: 'Dividend Yield',    value: '0.44%',    sub: 'quarterly' },
    { label: '52W Range',         value: '164 – 237' },
    { label: 'Beta',              value: '1.24' },
    { label: 'Consensus',         value: 'Buy',      tone: 'up' },
  ],

  business: {
    founded:      1976,
    headquarters: 'Cupertino, California',
    ceo:          'Tim Cook',
    employees:    161_000,
    summary:
      'Apple designs, manufactures and markets consumer electronics, software and services. ' +
      'Its flagship products include the iPhone, Mac, iPad, Apple Watch and AirPods. The company ' +
      'has been progressively shifting revenue mix toward its high-margin Services segment which ' +
      'includes the App Store, iCloud, Apple Music, Apple TV+ and advertising.\n\n' +
      'Apple\'s vertically integrated model — silicon, hardware, operating systems and services — ' +
      'creates one of the strongest ecosystem lock-ins in consumer technology and produces ' +
      'industry-leading operating margins.',
    segments: [
      { label: 'iPhone',       share: 52 },
      { label: 'Services',     share: 22 },
      { label: 'Wearables',    share: 10 },
      { label: 'Mac',          share:  8 },
      { label: 'iPad',         share:  8 },
    ],
  },

  chart: generateChart(90, 210, 3.5),

  financials: {
    periods: ['FY20', 'FY21', 'FY22', 'FY23', 'FY24'],
    income: [
      { label: 'Revenue',          format: 'currency', values: [
        { period: 'FY20', value: 274515 }, { period: 'FY21', value: 365817 },
        { period: 'FY22', value: 394328 }, { period: 'FY23', value: 383285 },
        { period: 'FY24', value: 391035 } ] },
      { label: 'Gross Profit',     format: 'currency', values: [
        { period: 'FY20', value: 104956 }, { period: 'FY21', value: 152836 },
        { period: 'FY22', value: 170782 }, { period: 'FY23', value: 169148 },
        { period: 'FY24', value: 180683 } ] },
      { label: 'Operating Income', format: 'currency', values: [
        { period: 'FY20', value:  66288 }, { period: 'FY21', value: 108949 },
        { period: 'FY22', value: 119437 }, { period: 'FY23', value: 114301 },
        { period: 'FY24', value: 123216 } ] },
      { label: 'Net Income',       format: 'currency', values: [
        { period: 'FY20', value:  57411 }, { period: 'FY21', value:  94680 },
        { period: 'FY22', value:  99803 }, { period: 'FY23', value:  96995 },
        { period: 'FY24', value:  93736 } ] },
      { label: 'EPS (Diluted)',    format: 'number',   values: [
        { period: 'FY20', value: 3.28 }, { period: 'FY21', value: 5.61 },
        { period: 'FY22', value: 6.11 }, { period: 'FY23', value: 6.13 },
        { period: 'FY24', value: 6.08 } ] },
    ],
    balance: [
      { label: 'Total Assets',      format: 'currency', values: [
        { period: 'FY20', value: 323888 }, { period: 'FY21', value: 351002 },
        { period: 'FY22', value: 352755 }, { period: 'FY23', value: 352583 },
        { period: 'FY24', value: 364980 } ] },
      { label: 'Total Liabilities', format: 'currency', values: [
        { period: 'FY20', value: 258549 }, { period: 'FY21', value: 287912 },
        { period: 'FY22', value: 302083 }, { period: 'FY23', value: 290437 },
        { period: 'FY24', value: 308030 } ] },
      { label: 'Total Equity',      format: 'currency', values: [
        { period: 'FY20', value:  65339 }, { period: 'FY21', value:  63090 },
        { period: 'FY22', value:  50672 }, { period: 'FY23', value:  62146 },
        { period: 'FY24', value:  56950 } ] },
    ],
    cashFlow: [
      { label: 'Operating Cash Flow', format: 'currency', values: [
        { period: 'FY20', value:  80674 }, { period: 'FY21', value: 104038 },
        { period: 'FY22', value: 122151 }, { period: 'FY23', value: 110543 },
        { period: 'FY24', value: 118254 } ] },
      { label: 'Free Cash Flow',      format: 'currency', values: [
        { period: 'FY20', value:  73365 }, { period: 'FY21', value:  92953 },
        { period: 'FY22', value: 111443 }, { period: 'FY23', value:  99584 },
        { period: 'FY24', value: 108807 } ] },
    ],
  },

  valuation: [
    { metric: 'P/E',           company: '31.2x',  industry: '24.8x', tone: 'worse'   },
    { metric: 'Forward P/E',   company: '28.4x',  industry: '22.1x', tone: 'worse'   },
    { metric: 'PEG Ratio',     company: '2.9',    industry: '1.8',   tone: 'worse'   },
    { metric: 'EV / EBITDA',   company: '23.1x',  industry: '18.4x', tone: 'worse'   },
    { metric: 'Price / Sales', company: '8.8x',   industry: '4.3x',  tone: 'worse'   },
    { metric: 'Price / Book',  company: '58.1x',  industry: '6.2x',  tone: 'worse'   },
    { metric: 'FCF Yield',     company: '3.2%',   industry: '4.1%',  tone: 'neutral' },
  ],

  profitability: [
    { label: 'Gross Margin',     value: 46, benchmark: 40 },
    { label: 'Operating Margin', value: 31, benchmark: 22 },
    { label: 'Net Margin',       value: 24, benchmark: 15 },
    { label: 'ROE',              value: 156, benchmark: 28 },
    { label: 'ROA',              value: 26, benchmark: 10 },
    { label: 'ROIC',             value: 55, benchmark: 18 },
  ],

  balanceSheet: [
    { label: 'Cash & Equivalents', value: '$65.2 B', status: 'good',
      note: 'Substantial liquidity buffer' },
    { label: 'Total Debt',         value: '$106.6 B', status: 'warn',
      note: 'Elevated but well-covered' },
    { label: 'Net Debt',           value: '$41.4 B',  status: 'neutral' },
    { label: 'Current Ratio',      value: '0.87',     status: 'warn',
      note: 'Below 1.0 — monitor working capital' },
    { label: 'Quick Ratio',        value: '0.83',     status: 'warn' },
    { label: 'Debt / Equity',      value: '1.87',     status: 'warn' },
    { label: 'Interest Coverage',  value: '29.1x',    status: 'good',
      note: 'Interest expense easily covered' },
  ],

  growth: [
    { label: 'Revenue Growth', data: [
      { period: 'FY20', value:  5.5 }, { period: 'FY21', value: 33.3 },
      { period: 'FY22', value:  7.8 }, { period: 'FY23', value: -2.8 },
      { period: 'FY24', value:  2.0 } ] },
    { label: 'EPS Growth', data: [
      { period: 'FY20', value: 10.4 }, { period: 'FY21', value: 71.0 },
      { period: 'FY22', value:  8.9 }, { period: 'FY23', value:  0.3 },
      { period: 'FY24', value: -0.8 } ] },
    { label: 'Free Cash Flow', data: [
      { period: 'FY20', value: 22.0 }, { period: 'FY21', value: 26.7 },
      { period: 'FY22', value: 19.9 }, { period: 'FY23', value: -10.6 },
      { period: 'FY24', value:  9.3 } ] },
  ],

  competitivePosition: {
    strengths: [
      { title: 'Ecosystem Lock-in',
        description: 'Deep hardware/software/services integration retains users across price tiers.' },
      { title: 'Brand Power',
        description: 'Premium pricing and industry-leading customer loyalty.' },
      { title: 'Scale Advantages',
        description: 'Supply chain and component negotiation dominance.' },
      { title: 'Services Flywheel',
        description: 'Recurring high-margin revenue grows as installed base expands.' },
    ],
    risks: [
      { title: 'China Concentration',
        description: 'Meaningful revenue and manufacturing exposure to China.' },
      { title: 'Regulatory Pressure',
        description: 'App Store fees and antitrust scrutiny in the EU and US.' },
      { title: 'iPhone Dependency',
        description: 'Over half of revenue still comes from a single product line.' },
      { title: 'AI Transition',
        description: 'Must demonstrate durable Apple Intelligence leadership.' },
    ],
  },

  catalysts: [
    { date: '2024-11-01', type: 'Earnings',
      title: 'Q4 FY24 Beat', impact: 'positive',
      description: 'Services revenue hit an all-time high; iPhone revenue in-line.' },
    { date: '2024-09-09', type: 'Product',
      title: 'iPhone 16 Launch', impact: 'positive',
      description: 'First device generation designed around Apple Intelligence.' },
    { date: '2024-06-10', type: 'Announcement',
      title: 'Apple Intelligence Unveiled', impact: 'positive',
      description: 'On-device generative AI + OpenAI partnership announced at WWDC.' },
    { date: '2024-03-21', type: 'Regulatory',
      title: 'DOJ Antitrust Lawsuit', impact: 'negative',
      description: 'US Department of Justice files antitrust suit over App Store.' },
  ],

  news: [
    { id: 'n1', source: 'Reuters',    date: '2 hours ago',
      headline: 'Apple accelerates AI-server chip development' },
    { id: 'n2', source: 'Bloomberg',  date: '5 hours ago',
      headline: 'iPhone 16 lead times shorten as demand normalises' },
    { id: 'n3', source: 'WSJ',        date: 'Yesterday',
      headline: 'Services revenue projected to cross $100B in FY25' },
    { id: 'n4', source: 'CNBC',       date: '2 days ago',
      headline: 'Apple approves additional $110B in share buybacks' },
  ],

  filings: [
    { label: 'Annual Report (10-K)',        period: 'FY24' },
    { label: 'Quarterly Report (10-Q)',     period: 'Q4 FY24' },
    { label: 'Investor Presentation',       period: 'Nov 2024' },
    { label: 'Earnings Call Transcript',    period: 'Q4 FY24' },
  ],

  peers: [
    { ticker: 'AAPL', name: 'Apple Inc.',       marketCap: 3_420_000_000_000, pe: 31.2, revenueGrowth:  2.0, operatingMargin: 31.5 },
    { ticker: 'MSFT', name: 'Microsoft Corp.',  marketCap: 3_180_000_000_000, pe: 34.8, revenueGrowth: 15.7, operatingMargin: 44.6 },
    { ticker: 'GOOGL',name: 'Alphabet Inc.',    marketCap: 2_140_000_000_000, pe: 24.5, revenueGrowth: 13.5, operatingMargin: 32.1 },
    { ticker: 'META', name: 'Meta Platforms',   marketCap: 1_460_000_000_000, pe: 27.9, revenueGrowth: 21.9, operatingMargin: 42.8 },
    { ticker: 'AMZN', name: 'Amazon.com',       marketCap: 2_050_000_000_000, pe: 43.1, revenueGrowth: 11.0, operatingMargin: 10.5 },
  ],
}

export const MOCK_SEARCH_RESULTS = [
  { ticker: 'AAPL', name: 'Apple Inc.',       exchange: 'NASDAQ', sector: 'Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp.',  exchange: 'NASDAQ', sector: 'Technology' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.',     exchange: 'NASDAQ', sector: 'Semiconductors' },
  { ticker: 'GOOGL',name: 'Alphabet Inc.',    exchange: 'NASDAQ', sector: 'Communication' },
  { ticker: 'AMZN', name: 'Amazon.com',       exchange: 'NASDAQ', sector: 'Consumer' },
  { ticker: 'META', name: 'Meta Platforms',   exchange: 'NASDAQ', sector: 'Communication' },
  { ticker: 'TSLA', name: 'Tesla Inc.',       exchange: 'NASDAQ', sector: 'Automotive' },
]