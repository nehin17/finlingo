
// src/pages/learn/CaseStudyDetailPage.jsx

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  Loader2,
} from 'lucide-react'

export default function CaseStudyDetailPage() {
  const { caseStudyId } = useParams()
  const navigate = useNavigate()

  const [caseStudy, setCaseStudy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchCaseStudy() {
      try {
        setLoading(true)
        setError(null)

        /*
         * Backend contract:
         *
         * GET /api/case-studies/:slug
         *
         * Example:
         * /api/case-studies/nvda-vs-aapl
         *
         * Expected response:
         *
         * {
         *   id: "cs-001",
         *   slug: "nvda-vs-aapl",
         *   title: "...",
         *   description: "...",
         *   difficulty: "Intermediate",
         *   readTime: 12,
         *   color: "#3B82F6",
         *   companies: [...],
         *   objectives: [...],
         *   content: [...]
         * }
         */

        const response = await fetch(
          `/api/case-studies/${encodeURIComponent(caseStudyId)}`
        )

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('CASE_STUDY_NOT_FOUND')
          }

          throw new Error('CASE_STUDY_FETCH_FAILED')
        }

        const data = await response.json()

        if (!cancelled) {
          setCaseStudy(data)
        }
      } catch (err) {
        if (cancelled) return

        if (err.message === 'CASE_STUDY_NOT_FOUND') {
          setError('not-found')
        } else {
          console.error('Failed to load case study:', err)
          setError('server')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    if (caseStudyId) {
      fetchCaseStudy()
    } else {
      setError('not-found')
      setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [caseStudyId])

  /*
   * ----------------------------------------
   * Loading state
   * ----------------------------------------
   */

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={28}
            className="animate-spin"
            style={{ color: 'var(--primary)' }}
          />

          <p
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Loading case study...
          </p>
        </div>
      </main>
    )
  }

  /*
   * ----------------------------------------
   * Error / Not Found
   * ----------------------------------------
   */

  if (!caseStudy || error) {
    const isNotFound = error === 'not-found'

    return (
      <main
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        <div className="text-center max-w-md">
          <div
            className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center"
            style={{
              background: 'var(--surface-elevated)',
            }}
          >
            <AlertCircle
              size={26}
              style={{ color: 'var(--primary)' }}
            />
          </div>

          <h1
            className="text-2xl font-bold mb-3"
            style={{ color: 'var(--text)' }}
          >
            {isNotFound
              ? 'Case Study Not Found'
              : 'Unable to Load Case Study'}
          </h1>

          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: 'var(--text-muted)' }}
          >
            {isNotFound
              ? 'The case study you are looking for does not exist or may have been removed.'
              : 'Something went wrong while loading this case study. Please try again.'}
          </p>

          <div className="flex items-center justify-center gap-3">
            {!isNotFound && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="
                  px-5
                  py-2.5
                  rounded-lg
                  border
                  border-border
                  text-sm
                  font-semibold
                  hover:border-primary
                  hover:text-primary
                  transition-all
                "
              >
                Try Again
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate('/learn')}
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
              Back to Learn Hub
            </button>
          </div>
        </div>
      </main>
    )
  }

  /*
   * ----------------------------------------
   * Normalize backend data
   * ----------------------------------------
   */

  const {
    title = 'Untitled case study',
    description = '',
    difficulty = 'Unknown',
    readTime = null,
    companies = [],
    objectives = [],
    content = [],
    color = '#2563EB',
  } = caseStudy

  const primaryColor =
    companies?.[0]?.color || color

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ----------------------------------------
            Back Button
        ---------------------------------------- */}

        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          type="button"
          onClick={() => navigate('/learn')}
          className="
            flex
            items-center
            gap-2
            mb-8
            text-sm
            font-semibold
            text-primary
            hover:text-primary/80
            transition-colors
          "
        >
          <ArrowLeft size={17} />
          Back to Learn Hub
        </motion.button>

        {/* ----------------------------------------
            Header
        ---------------------------------------- */}

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Metadata */}

          <div className="flex items-center gap-3 flex-wrap mb-5">
            {difficulty && (
              <span
                className="
                  text-xs
                  px-3
                  py-1.5
                  rounded-full
                  font-semibold
                "
                style={{
                  background: `${primaryColor}20`,
                  color: primaryColor,
                }}
              >
                {difficulty}
              </span>
            )}

            {readTime !== null && (
              <span
                className="
                  text-xs
                  px-3
                  py-1.5
                  rounded-full
                  font-semibold
                  flex
                  items-center
                  gap-1.5
                "
                style={{
                  background: 'var(--surface-elevated)',
                  color: 'var(--text-muted)',
                }}
              >
                <Clock size={14} />
                {readTime} min read
              </span>
            )}
          </div>

          {/* Title */}

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-tight
              mb-5
            "
            style={{ color: 'var(--text)' }}
          >
            {title}
          </h1>

          {/* Description */}

          {description && (
            <p
              className="
                text-base
                sm:text-lg
                leading-relaxed
                max-w-3xl
              "
              style={{ color: 'var(--text-secondary)' }}
            >
              {description}
            </p>
          )}

          {/* Companies */}

          {companies.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap mt-6">
              {companies.map((company, index) => {
                if (!company) return null

                const ticker =
                  company.ticker ||
                  company.name ||
                  '?'

                const companyKey =
                  company.id ||
                  company.ticker ||
                  company.name ||
                  index

                const companyColor =
                  company.color ||
                  primaryColor

                return (
                  <div
                    key={companyKey}
                    className="
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                      font-semibold
                      text-white
                    "
                    style={{
                      background: companyColor,
                    }}
                    title={company.name || ticker}
                  >
                    {ticker}

                    {company.name && (
                      <span className="font-normal opacity-80">
                        {' '}— {company.name}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </motion.header>

        {/* ----------------------------------------
            Learning Objectives
        ---------------------------------------- */}

        {objectives.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="
              rounded-xl
              p-6
              sm:p-7
              mb-8
              border
              border-border
            "
            style={{
              background: 'var(--surface)',
            }}
          >
            <h2
              className="
                text-xl
                font-bold
                mb-5
              "
              style={{ color: 'var(--text)' }}
            >
              Learning Objectives
            </h2>

            <ul className="space-y-3">
              {objectives.map((objective, index) => (
                <li
                  key={index}
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      flex-shrink-0
                      mt-0.5
                      font-bold
                    "
                    style={{ color: primaryColor }}
                  >
                    ✓
                  </span>

                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {objective}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* ----------------------------------------
            Case Study Content
            ----------------------------------------
            This section is intentionally driven
            by backend data.

            The backend can eventually return:

            content: [
              {
                id: "...",
                type: "text",
                heading: "...",
                body: "..."
              },
              {
                id: "...",
                type: "metric",
                ...
              },
              {
                id: "...",
                type: "question",
                ...
              }
            ]
        ---------------------------------------- */}

        {content.length > 0 ? (
          <div className="space-y-6">
            {content.map((section, index) => {
              if (!section) return null

              const sectionKey =
                section.id || `section-${index}`

              /*
               * Basic text section.
               *
               * More section types can be added later
               * without changing the API structure.
               */

              if (
                section.type === 'text' ||
                !section.type
              ) {
                return (
                  <motion.section
                    key={sectionKey}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      rounded-xl
                      p-6
                      sm:p-7
                      border
                      border-border
                    "
                    style={{
                      background: 'var(--surface)',
                    }}
                  >
                    {section.heading && (
                      <h2
                        className="
                          text-xl
                          font-bold
                          mb-4
                        "
                        style={{
                          color: 'var(--text)',
                        }}
                      >
                        {section.heading}
                      </h2>
                    )}

                    {section.body && (
                      <p
                        className="
                          text-sm
                          sm:text-base
                          leading-7
                        "
                        style={{
                          color:
                            'var(--text-secondary)',
                        }}
                      >
                        {section.body}
                      </p>
                    )}
                  </motion.section>
                )
              }

              /*
               * Unknown section types are safely ignored.
               *
               * This prevents a new backend content type
               * from crashing the entire page.
               */

              return null
            })}
          </div>
        ) : (
          /* ----------------------------------------
             Content Not Published Yet
          ---------------------------------------- */

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="
              rounded-xl
              p-8
              sm:p-10
              border-2
              border-primary/30
              text-center
            "
            style={{
              background: 'var(--surface)',
            }}
          >
            <div className="flex justify-center mb-5">
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background:
                    'rgba(37, 99, 235, 0.12)',
                }}
              >
                <AlertCircle
                  size={24}
                  style={{
                    color: 'var(--primary)',
                  }}
                />
              </div>
            </div>

            <h2
              className="
                text-xl
                font-bold
                mb-3
              "
              style={{
                color: 'var(--text)',
              }}
            >
              Full Case Study Content Coming Soon
            </h2>

            <p
              className="
                text-sm
                leading-relaxed
                max-w-2xl
                mx-auto
                mb-6
              "
              style={{
                color:
                  'var(--text-secondary)',
              }}
            >
              This case study is currently being
              developed. Comprehensive financial
              analysis, real company data, worked
              examples, and interactive exercises
              will be added here.
            </p>

            <button
              type="button"
              onClick={() => navigate('/learn')}
              className="
                px-6
                py-3
                rounded-lg
                bg-primary
                text-white
                font-semibold
                hover:bg-primary/90
                transition-all
              "
            >
              Explore Other Content
            </button>
          </motion.section>
        )}

        {/* ----------------------------------------
            Footer Tip
        ---------------------------------------- */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="
            rounded-xl
            p-6
            mt-8
            border
            border-border
          "
          style={{
            background:
              'var(--surface-elevated)',
          }}
        >
          <p
            className="
              text-sm
              leading-relaxed
            "
            style={{
              color: 'var(--text-muted)',
            }}
          >
            <strong
              style={{
                color: 'var(--text)',
              }}
            >
              Tip:
            </strong>{' '}
            Use the case study to connect
            financial statements, valuation
            multiples, profitability, cash flow,
            and business fundamentals into one
            investment thesis.
          </p>
        </motion.div>
      </div>
    </main>
  )
}

