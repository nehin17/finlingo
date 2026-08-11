
// src/components/learn/CaseStudyCard.jsx

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CaseStudyCard({ caseStudy }) {
  if (!caseStudy) return null

  const {
    id,
    slug,
    title = 'Untitled case study',
    description = '',
    companies = [],
    difficulty = 'Unknown',
    readTime = null,
    color = '#2563EB',
  } = caseStudy

  /*
   * ROUTING
   *
   * The backend should provide either:
   *
   * slug: "nvda-vs-aapl"
   *
   * or:
   *
   * id: "cs-001"
   *
   * Slug is preferred because it gives us readable URLs.
   */
  const identifier = slug || id

  const caseStudyPath = identifier
    ? `/learn/case-studies/${encodeURIComponent(identifier)}`
    : null

  /*
   * The entire card is clickable.
   *
   * We keep the exact same dimensions so the cards do not
   * resize based on the amount of content.
   */
  const card = (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={caseStudyPath ? { y: -2 } : undefined}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        w-[340px]
        h-[280px]
        flex-shrink-0
        rounded-xl
        p-6
        border
        border-border
        transition-all
        duration-300
        group
        flex
        flex-col
        hover:border-primary/50
        hover:shadow-lg
      "
      style={{
        background: 'var(--surface)',
        cursor: caseStudyPath ? 'pointer' : 'default',
      }}
    >
      {/* =========================================
          COMPANIES
      ========================================= */}

      <div
        className="
          flex
          items-center
          gap-2
          h-10
          mb-5
          flex-shrink-0
        "
      >
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
            `company-${index}`

          const companyColor =
            company.color || color

          return (
            <div
              key={companyKey}
              className="
                w-10
                h-10
                rounded-lg
                flex
                items-center
                justify-center
                text-xs
                font-bold
                text-white
                shrink-0
              "
              style={{
                background: companyColor,
              }}
              title={company.name || ticker}
              aria-label={company.name || ticker}
            >
              {ticker}
            </div>
          )
        })}
      </div>

      {/* =========================================
          TITLE
      ========================================= */}

      <h3
        className="
          text-lg
          font-bold
          text-text-primary
          mb-3
          leading-snug
          line-clamp-2
          group-hover:text-primary
          transition-colors
          duration-200
        "
      >
        {title}
      </h3>

      {/* =========================================
          DESCRIPTION
      ========================================= */}

      <p
        className="
          text-sm
          text-text-secondary
          leading-relaxed
          line-clamp-2
        "
      >
        {description}
      </p>

      {/* =========================================
          METADATA
          mt-auto guarantees the divider remains
          aligned across every card.
      ========================================= */}

      <div
        className="
          mt-auto
          flex
          items-center
          justify-between
          pt-4
          border-t
          border-border
          flex-shrink-0
        "
      >
        <div className="flex items-center gap-3">
          {/* Difficulty */}

          <span
            className="
              text-xs
              px-3
              py-1
              rounded-full
              font-semibold
              whitespace-nowrap
            "
            style={{
              background: `${color}20`,
              color,
            }}
          >
            {difficulty}
          </span>

          {/* Read time */}

          {readTime !== null && (
            <span
              className="
                text-xs
                px-3
                py-1
                rounded-full
                font-semibold
                whitespace-nowrap
              "
              style={{
                background: 'var(--surface-elevated)',
                color: 'var(--text-muted)',
              }}
            >
              {readTime} min
            </span>
          )}
        </div>

        {/* Arrow */}

        <ArrowRight
          size={16}
          className="
            shrink-0
            text-text-muted
            group-hover:text-primary
            group-hover:translate-x-1
            transition-all
            duration-200
          "
          aria-hidden="true"
        />
      </div>
    </motion.article>
  )

  /*
   * If the backend record has no identifier,
   * don't create a broken link.
   */
  if (!caseStudyPath) {
    if (import.meta.env.DEV) {
      console.warn(
        'CaseStudyCard: case study is missing both slug and id.',
        caseStudy
      )
    }

    return card
  }

  /*
   * React Router handles client-side navigation.
   */
  return (
    <Link
      to={caseStudyPath}
      className="
        block
        flex-shrink-0
        w-[340px]
        h-[280px]
        rounded-xl
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary/40
        focus-visible:ring-offset-2
      "
      aria-label={`Open case study: ${title}`}
    >
      {card}
    </Link>
  )
}

