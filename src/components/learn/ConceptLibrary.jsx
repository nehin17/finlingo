import { useState } from 'react'
import { Search } from 'lucide-react'
import ConceptCard from './ConceptCard'

const categories = [
  'All',
  'Valuation',
  'Profitability',
  'Cash Flow',
  'Efficiency',
  'Leverage',
  'Accounting',
  'Risk',
  'Growth',
  'Advanced',
]

const concepts = [
  {
    name: 'P/E Ratio',
    category: 'Valuation',
    difficulty: 'Beginner',
    description: "Measures how much investors are paying for each unit of a company's earnings.",
    readTime: 8,
    color: '#3B82F6',
    hasFormula: true,
    hasQuiz: true,
  },
  {
    name: 'EV/EBITDA',
    category: 'Valuation',
    difficulty: 'Intermediate',
    description:
      'Enterprise value relative to earnings before interest, taxes, depreciation, and amortization.',
    readTime: 10,
    color: '#3B82F6',
    hasFormula: true,
    hasQuiz: true,
  },
  {
    name: 'Free Cash Flow',
    category: 'Cash Flow',
    difficulty: 'Beginner',
    description:
      'Cash a company can distribute to investors after maintaining and expanding its asset base.',
    readTime: 9,
    color: '#8B5CF6',
    hasFormula: true,
    hasQuiz: true,
  },
  {
    name: 'EBITDA',
    category: 'Profitability',
    difficulty: 'Beginner',
    description:
      'Earnings before interest, taxes, depreciation, and amortization—a measure of operating profitability.',
    readTime: 7,
    color: '#10B981',
    hasFormula: true,
    hasQuiz: false,
  },
  {
    name: 'ROE (Return on Equity)',
    category: 'Efficiency',
    difficulty: 'Intermediate',
    description:
      'Measures how efficiently a company uses shareholder capital to generate profits.',
    readTime: 10,
    color: '#EC4899',
    hasFormula: true,
    hasQuiz: true,
  },
  {
    name: 'Gross Margin',
    category: 'Profitability',
    difficulty: 'Beginner',
    description: 'Percentage of revenue remaining after deducting cost of goods sold.',
    readTime: 6,
    color: '#10B981',
    hasFormula: true,
    hasQuiz: false,
  },
  {
    name: 'Debt-to-Equity',
    category: 'Leverage',
    difficulty: 'Beginner',
    description:
      "Ratio comparing a company's total debt to total equity—indicates financial leverage.",
    readTime: 7,
    color: '#F59E0B',
    hasFormula: true,
    hasQuiz: true,
  },
  {
    name: 'Operating Margin',
    category: 'Profitability',
    difficulty: 'Intermediate',
    description: 'Operating income as a percentage of revenue—shows operational efficiency.',
    readTime: 8,
    color: '#10B981',
    hasFormula: true,
    hasQuiz: false,
  },
  {
    name: 'PEG Ratio',
    category: 'Valuation',
    difficulty: 'Intermediate',
    description: 'P/E ratio divided by expected growth rate—accounts for growth in valuation.',
    readTime: 9,
    color: '#3B82F6',
    hasFormula: true,
    hasQuiz: true,
  },
  {
    name: 'DCF Valuation',
    category: 'Valuation',
    difficulty: 'Advanced',
    description: 'Discounted cash flow model—values a company based on future cash generation.',
    readTime: 20,
    color: '#3B82F6',
    hasFormula: true,
    hasQuiz: true,
  },
]

export default function ConceptLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConcepts = concepts.filter((concept) => {
    const matchesCategory = selectedCategory === 'All' || concept.category === selectedCategory
    const matchesSearch =
      concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Concept Library</h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search concepts, formulas, or financial terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border outline-none focus:border-primary transition-colors text-text-primary placeholder-text-muted"
            style={{
              background: 'var(--surface)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'border border-border text-text-muted hover:text-text-primary hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConcepts.length > 0 ? (
          filteredConcepts.map((concept, i) => (
            <ConceptCard key={i} concept={concept} isCompleted={false} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-text-muted">No concepts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}