
// src/components/learn/ConceptCard.jsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BookMarked, CheckCircle, X } from 'lucide-react'

export default function ConceptCard({ concept, isCompleted = false }) {
  // Defensive guard
  if (!concept) return null

  const [showFormula, setShowFormula] = useState(false)

  // ============================================================
  // BACKEND-READY NORMALIZATION
  // ============================================================
  //
  // The backend can provide:
  //
  // {
  //   id: "pe-ratio",
  //   name: "P/E Ratio",
  //   description: "...",
  //   category: "Valuation",
  //   difficulty: "Intermediate",
  //   readTime: 8,
  //   color: "#2563EB",
  //   hasFormula: true,
  //   hasQuiz: true,
  //   formula: {
  //     expression: "P/E = Share Price ÷ EPS",
  //     variables: [...],
  //     interpretation: "...",
  //     example: "..."
  //   }
  // }
  //
  // No concept-specific data is hardcoded here.
  // ============================================================

  const {
    id = null,
    name = 'Untitled concept',
    description = '',
    category = 'Finance',
    difficulty = 'Unknown',
    readTime = null,
    color = '#2563EB',
    hasFormula = false,
    hasQuiz = false,
    formula = null,
  } = concept

  // Support either:
  // formula.expression
  // OR formula.formula
  //
  // This gives the backend some flexibility while the API evolves.
  const formulaExpression =
    formula?.expression ||
    formula?.formula ||
    null

  const hasUsableFormula =
    hasFormula &&
    formula &&
    formulaExpression

  const variables = Array.isArray(formula?.variables)
    ? formula.variables
    : []

  const interpretation =
    formula?.interpretation || ''

  const example =
    formula?.example || ''

  // ============================================================
  // FORMULA MODAL
  // ============================================================

  const openFormula = (event) => {
    event.stopPropagation()

    if (!hasUsableFormula) return

    setShowFormula(true)
  }

  const closeFormula = () => {
    setShowFormula(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-xl
        p-6
        border
        border-border
        hover:border-primary/50
        hover:shadow-lg
        transition-all
        cursor-pointer
        group
      "
      style={{
        background: 'var(--surface)',
      }}
      data-concept-id={id || undefined}
    >
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-text-primary">
          {name}
        </h3>

        {isCompleted && (
          <CheckCircle
            size={20}
            className="text-primary shrink-0"
            aria-label="Completed"
          />
        )}
      </div>

      {/* ========================================================
          TAGS
      ======================================================== */}

      <div className="flex gap-2 mb-4 flex-wrap">
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
          style={{
            background: `${color}20`,
            color,
          }}
        >
          {category}
        </span>

        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
          style={{
            background: 'var(--surface-elevated)',
            color: 'var(--text-muted)',
          }}
        >
          {difficulty}
        </span>
      </div>

      {/* ========================================================
          DESCRIPTION
      ======================================================== */}

      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        {description}
      </p>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <div className="flex gap-3 pt-4 border-t border-border flex-wrap">
        {/* Read Time */}

        {readTime !== null && (
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Clock size={14} />
            {readTime} min
          </div>
        )}

        {/* Formula */}

        {hasFormula && (
          <button
            type="button"
            onClick={openFormula}
            disabled={!hasUsableFormula}
            className="
              flex
              items-center
              gap-1
              text-xs
              text-primary
              font-semibold
              hover:text-primary/80
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <BookMarked size={14} />
            Formula
          </button>
        )}

        {/* Quiz */}

        {hasQuiz && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()

              /*
               * Backend-ready:
               *
               * Eventually this can navigate to:
               *
               * /learn/concepts/:id/quiz
               *
               * or trigger a quiz component using concept.id.
               */
              console.log(
                'Quiz requested for concept:',
                id
              )
            }}
            className="
              flex
              items-center
              gap-1
              text-xs
              text-primary
              font-semibold
              hover:text-primary/80
              transition-colors
            "
          >
            <CheckCircle size={14} />
            Quiz
          </button>
        )}
      </div>

      {/* ========================================================
          FORMULA MODAL
      ======================================================== */}

      <AnimatePresence>
        {showFormula && hasUsableFormula && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              bg-black/50
              flex
              items-center
              justify-center
              p-4
              z-50
            "
            onClick={closeFormula}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="
                relative
                rounded-2xl
                p-8
                max-w-2xl
                w-full
                max-h-[90vh]
                overflow-y-auto
                border
                border-border
              "
              style={{
                background: 'var(--surface)',
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* Close Button */}

              <button
                type="button"
                onClick={closeFormula}
                aria-label="Close formula"
                className="
                  absolute
                  top-4
                  right-4
                  w-10
                  h-10
                  rounded-lg
                  border
                  border-border
                  hover:bg-surface-elevated
                  flex
                  items-center
                  justify-center
                  text-text-muted
                  hover:text-text-primary
                  transition-all
                "
              >
                <X size={20} />
              </button>

              {/* Modal Title */}

              <h3 className="text-2xl font-bold text-text-primary mb-6">
                {name}
              </h3>

              {/* Formula */}

              <div
                className="
                  mb-8
                  p-6
                  rounded-lg
                  border
                  border-primary/30
                "
                style={{
                  background: 'var(--surface-elevated)',
                }}
              >
                <p className="text-xs text-text-muted font-semibold mb-3 uppercase">
                  Formula
                </p>

                <p className="text-lg font-bold text-primary font-mono">
                  {formulaExpression}
                </p>
              </div>

              {/* Variable Definitions */}

              {variables.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-text-primary mb-4">
                    Variable Definitions
                  </h4>

                  <div className="space-y-3">
                    {variables.map((variable, index) => {
                      if (!variable) return null

                      const variableName =
                        variable.name ||
                        variable.label ||
                        'Variable'

                      const variableDescription =
                        variable.description || ''

                      return (
                        <div
                          key={
                            variable.id ||
                            variable.name ||
                            index
                          }
                          className="
                            p-4
                            rounded-lg
                            border
                            border-border
                          "
                          style={{
                            background:
                              'var(--surface-elevated)',
                          }}
                        >
                          <p className="font-semibold text-text-primary mb-1">
                            {variableName}
                          </p>

                          <p className="text-sm text-text-secondary">
                            {variableDescription}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Interpretation */}

              {interpretation && (
                <div
                  className="
                    mb-8
                    p-6
                    rounded-lg
                    border-l-4
                  "
                  style={{
                    background:
                      'var(--surface-elevated)',
                    borderColor: color,
                  }}
                >
                  <p className="text-sm text-text-muted font-semibold mb-2 uppercase">
                    Interpretation
                  </p>

                  <p className="text-base text-text-secondary leading-relaxed">
                    {interpretation}
                  </p>
                </div>
              )}

              {/* Practical Example */}

              {example && (
                <div
                  className="
                    p-6
                    rounded-lg
                    border
                    border-border
                    mb-8
                  "
                  style={{
                    background:
                      'var(--surface-elevated)',
                  }}
                >
                  <p className="text-sm text-text-muted font-semibold mb-3 uppercase">
                    Practical Example
                  </p>

                  <p className="text-base text-text-secondary leading-relaxed">
                    {example}
                  </p>
                </div>
              )}

              {/* Close */}

              <button
                type="button"
                onClick={closeFormula}
                className="
                  w-full
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
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

