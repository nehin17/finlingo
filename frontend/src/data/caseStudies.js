// src/data/caseStudies.js

export const caseStudies = [
    {
      id: 'nvda-vs-aapl',
      slug: 'nvda-vs-aapl',
  
      title: 'Why NVIDIA Trades at a Higher P/E Than Apple',
  
      description:
        'Explore how growth expectations, margin profiles, and AI market opportunity justify different valuation multiples.',
  
      companies: [
        {
          ticker: 'NVDA',
          name: 'NVIDIA Corporation',
          color: '#3B82F6',
        },
        {
          ticker: 'AAPL',
          name: 'Apple Inc.',
          color: '#4F46E5',
        },
      ],
  
      difficulty: 'Intermediate',
      readTime: 12,
      color: '#3B82F6',
  
      objectives: [
        'Understand how revenue growth rates influence valuation multiples',
        'Compare profitability metrics across different business models',
        'Analyze market expectations priced into stock valuations',
        'Build a comparative investment thesis',
      ],
    },
  
    {
      id: 'apple-vs-microsoft-roe',
      slug: 'apple-vs-microsoft-roe',
  
      title: 'Apple vs Microsoft: Understanding ROE',
  
      description:
        'Compare return on equity across companies and understand how share buybacks and leverage affect this metric.',
  
      companies: [
        {
          ticker: 'AAPL',
          name: 'Apple Inc.',
          color: '#4F46E5',
        },
        {
          ticker: 'MSFT',
          name: 'Microsoft Corporation',
          color: '#10B981',
        },
      ],
  
      difficulty: 'Intermediate',
      readTime: 10,
      color: '#10B981',
  
      objectives: [
        'Understand return on equity and its components',
        'Analyze how leverage affects ROE',
        'Compare capital allocation strategies',
        'Evaluate earnings quality across technology companies',
      ],
    },
  
    {
      id: 'amazon-cash-flow-paradox',
      slug: 'amazon-cash-flow-paradox',
  
      title: "Amazon's Cash Flow Paradox",
  
      description:
        'Learn why high revenue growth can coexist with low accounting profits in investment-heavy business models.',
  
      companies: [
        {
          ticker: 'AMZN',
          name: 'Amazon.com Inc.',
          color: '#FF9900',
        },
      ],
  
      difficulty: 'Intermediate',
      readTime: 15,
      color: '#FF9900',
  
      objectives: [
        'Understand the difference between accounting earnings and cash flow',
        'Analyze capital expenditure strategies',
        'Evaluate free cash flow quality',
        'Assess long-term business sustainability',
      ],
    },
  
    {
      id: 'tesla-growth-sustainability',
      slug: 'tesla-growth-sustainability',
  
      title: 'Tesla: Growth at What Cost?',
  
      description:
        'Analyze valuation sustainability when growth rates eventually normalize in mature markets.',
  
      companies: [
        {
          ticker: 'TSLA',
          name: 'Tesla Inc.',
          color: '#E82127',
        },
      ],
  
      difficulty: 'Advanced',
      readTime: 18,
      color: '#E82127',
  
      objectives: [
        'Analyze high-growth company valuation frameworks',
        'Understand growth rate normalization scenarios',
        'Evaluate competitive dynamics in emerging markets',
        'Build sensitivity analyses for valuation assumptions',
      ],
    },
  ]