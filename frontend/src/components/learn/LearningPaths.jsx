// src/components/learn/LearningPaths.jsx
import LearningPathCard from './LearningPathCard'

/**
 * PUBLIC CURRICULUM DATA ONLY.
 * No `progress` field lives here — personal completion is looked up
 * from the authenticated user's progress.pathProgress map by `id`.
 */
const paths = [
  {
    id: 'valuation-fundamentals',
    name: 'Valuation Fundamentals',
    level: 'Beginner',
    lessons: 8,
    time: '45 min',
    color: '#3B82F6',
    topics: [
      'P/E Ratio',
      'EV/EBITDA',
      'Price-to-Book',
      'PEG Ratio',
      'DCF Basics',
      'Terminal Value',
      'Comparable Companies',
      'Valuation Pitfalls',
    ],
  },
  {
    id: 'financial-statements',
    name: 'Reading Financial Statements',
    level: 'Beginner',
    lessons: 12,
    time: '1h 20m',
    color: '#10B981',
    topics: [
      'Income Statement',
      'Revenue Recognition',
      'Gross Profit',
      'Operating Expenses',
      'Balance Sheet Structure',
      'Assets vs Liabilities',
      'Equity',
      'Cash Flow Statement',
      'Working Capital',
      'Financial Statement Connections',
      'Common Accounting Red Flags',
      'Mini Case Study',
    ],
  },
  {
    id: 'cash-flow-mastery',
    name: 'Cash Flow Mastery',
    level: 'Intermediate',
    lessons: 6,
    time: '55 min',
    color: '#8B5CF6',
    topics: [
      'Operating Cash Flow',
      'Free Cash Flow',
      'Capital Expenditures',
      'Cash Conversion Cycle',
      'Working Capital Dynamics',
      'Cash Flow Quality',
    ],
  },
  {
    id: 'moats-competitive-advantage',
    name: 'Competitive Advantage & Moats',
    level: 'Intermediate',
    lessons: 5,
    time: '40 min',
    color: '#EC4899',
    topics: [
      'Pricing Power',
      'Network Effects',
      'Switching Costs',
      'Brand Moats',
      'Capital Efficiency',
    ],
  },
]

export default function LearningPaths({ progress }) {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Structured Learning Paths
        </h2>
        <p className="text-base text-text-muted">
          Master financial analysis through curated learning tracks designed for
          different skill levels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paths.map((path) => (
          <LearningPathCard
            key={path.id}
            path={path}
            /* undefined when logged out → card renders public metadata only */
            pathProgress={progress?.pathProgress?.[path.id]}
          />
        ))}
      </div>
    </div>
  )
}