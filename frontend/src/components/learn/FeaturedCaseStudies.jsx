import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CaseStudyCard from './CaseStudyCard'

const caseStudies = [
  {
    title: 'Why NVIDIA Trades at a Higher P/E Than Apple',
    description:
      'Explore how growth expectations, margin profiles, and AI market opportunity justify different valuation multiples.',
    companies: [
      { ticker: 'NVDA', color: '#3B82F6' },
      { ticker: 'AAPL', color: '#4F46E5' },
    ],
    difficulty: 'Intermediate',
    readTime: 12,
    color: '#3B82F6',
  },
  {
    title: 'Apple vs Microsoft: Understanding ROE',
    description:
      'Compare return on equity across companies and understand how share buybacks and leverage affect this metric.',
    companies: [
      { ticker: 'AAPL', color: '#4F46E5' },
      { ticker: 'MSFT', color: '#10B981' },
    ],
    difficulty: 'Intermediate',
    readTime: 10,
    color: '#10B981',
  },
  {
    title: "Amazon's Cash Flow Paradox",
    description:
      'Learn why high revenue growth can coexist with low accounting profits in investment-heavy business models.',
    companies: [{ ticker: 'AMZN', color: '#FF9900' }],
    difficulty: 'Intermediate',
    readTime: 15,
    color: '#FF9900',
  },
  {
    title: 'Tesla: Growth at What Cost?',
    description:
      'Analyze valuation sustainability when growth rates eventually normalize in mature markets.',
    companies: [{ ticker: 'TSLA', color: '#E82127' }],
    difficulty: 'Advanced',
    readTime: 18,
    color: '#E82127',
  },
]

export default function FeaturedCaseStudies() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -360 : 360,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Featured Case Studies
        </h2>
        <p className="text-base text-text-muted">
          Real-world financial analysis with actual companies from the market.
        </p>
      </div>

      {/* ✅ px-8 instead of negative margins for nav buttons */}
      <div className="relative px-8">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {caseStudies.map((caseStudy, i) => (
            <CaseStudyCard key={i} caseStudy={caseStudy} />
          ))}
        </div>

        {/* ✅ Use left-0 / right-0 instead of -left-4 / -right-4 */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border
                     flex items-center justify-center text-text-muted
                     hover:text-primary hover:border-primary transition-all"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border
                     flex items-center justify-center text-text-muted
                     hover:text-primary hover:border-primary transition-all"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}