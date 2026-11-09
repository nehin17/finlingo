
// src/components/learn/ConceptLibrary.jsx

import { useEffect, useMemo, useState } from 'react'
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

export default function ConceptLibrary() {
  const [concepts, setConcepts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ============================================================
  // LOAD CONCEPTS
  // ============================================================

  useEffect(() => {
    let cancelled = false

    async function fetchConcepts() {
      try {
        setLoading(true)
        setError(null)

        /*
         * Backend contract:
         *
         * GET /api/concepts
         *
         * Expected response:
         *
         * [
         *   {
         *     id: "pe-ratio",
         *     name: "P/E Ratio",
         *     category: "Valuation",
         *     difficulty: "Beginner",
         *     description: "...",
         *     readTime: 8,
         *     color: "#3B82F6",
         *     hasFormula: true,
         *     hasQuiz: true,
         *     formula: {
         *       expression: "...",
         *       variables: [],
         *       interpretation: "...",
         *       example: "..."
         *     }
         *   }
         * ]
         */

        const response = await fetch('/api/concepts')

        if (!response.ok) {
          throw new Error(
            `Failed to load concepts: ${response.status}`
          )
        }

        const data = await response.json()

        /*
         * Some APIs return:
         *
         * [...]
         *
         * Others return:
         *
         * { concepts: [...] }
         *
         * Supporting both makes the frontend slightly
         * more tolerant while the backend is being built.
         */

        const normalizedConcepts = Array.isArray(data)
          ? data
          : Array.isArray(data?.concepts)
            ? data.concepts
            : []

        if (!cancelled) {
          setConcepts(normalizedConcepts)
        }
      } catch (err) {
        if (cancelled) return

        console.error(
          'Failed to load concept library:',
          err
        )

        setError(
          'Unable to load concepts right now. Please try again.'
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchConcepts()

    return () => {
      cancelled = true
    }
  }, [])

  // ============================================================
  // FILTERING
  // ============================================================

  const filteredConcepts = useMemo(() => {
    const normalizedSearch =
      searchQuery.trim().toLowerCase()

    return concepts.filter((concept) => {
      if (!concept) return false

      const name =
        concept.name?.toLowerCase() || ''

      const description =
        concept.description?.toLowerCase() || ''

      const category =
        concept.category || ''

      const matchesCategory =
        selectedCategory === 'All' ||
        category === selectedCategory

      const matchesSearch =
        !normalizedSearch ||
        name.includes(normalizedSearch) ||
        description.includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [
    concepts,
    selectedCategory,
    searchQuery,
  ])

  // ============================================================
  // RETRY
  // ============================================================

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div>
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Concept Library
        </h2>

        {/* ======================================================
            SEARCH BAR
        ====================================================== */}

        <div className="relative mb-6">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-text-muted
            "
          />

          <input
            type="text"
            placeholder="Search concepts, formulas, or financial terms..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-lg
              border
              border-border
              outline-none
              focus:border-primary
              transition-colors
              text-text-primary
              placeholder-text-muted
            "
            style={{
              background: 'var(--surface)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* ======================================================
            CATEGORY FILTERS
        ====================================================== */}

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
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

      {/* ========================================================
          LOADING
      ======================================================== */}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="
                rounded-xl
                p-6
                border
                border-border
                h-[230px]
                animate-pulse
              "
              style={{
                background: 'var(--surface)',
              }}
            />
          ))}
        </div>
      )}

      {/* ========================================================
          ERROR
      ======================================================== */}

      {!loading && error && (
        <div
          className="
            rounded-xl
            p-8
            border
            border-border
            text-center
          "
          style={{
            background: 'var(--surface)',
          }}
        >
          <p className="text-sm text-text-secondary mb-5">
            {error}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="
              px-5
              py-2.5
              rounded-lg
              bg-primary
              text-white
              text-sm
              font-semibold
              hover:bg-primary/90
              transition-all
            "
          >
            Try Again
          </button>
        </div>
      )}

      {/* ========================================================
          CONCEPTS GRID
      ======================================================== */}

      {!loading && !error && (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
        >
          {filteredConcepts.length > 0 ? (
            filteredConcepts.map((concept) => (
              <ConceptCard
                key={
                  concept.id ||
                  concept.slug ||
                  concept.name
                }
                concept={concept}
                isCompleted={Boolean(
                  concept.isCompleted
                )}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-text-muted">
                No concepts found matching your search.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

