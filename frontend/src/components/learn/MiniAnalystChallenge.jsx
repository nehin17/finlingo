
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, X, ArrowRight, Loader2 } from 'lucide-react'

export default function MiniAnalystChallenge() {
  const [question, setQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [evaluation, setEvaluation] = useState(null)

  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showAnswer, setShowAnswer] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  const [error, setError] = useState('')

  /*
   * ---------------------------------------------------------
   * LOAD QUESTION
   * ---------------------------------------------------------
   */

  const loadQuestion = async () => {
    try {
      setIsLoadingQuestion(true)
      setError('')

      const response = await fetch('/api/analyst-challenges/next', {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Unable to load analyst challenge.')
      }

      const data = await response.json()

      setQuestion(data)
      setUserAnswer('')
      setEvaluation(null)
      setShowAnswer(false)
      setShowComparison(false)
    } catch (err) {
      console.error('Failed to load analyst challenge:', err)
      setError('Unable to load the challenge. Please try again.')
    } finally {
      setIsLoadingQuestion(false)
    }
  }

  /*
   * Load first question when component mounts.
   */

  useEffect(() => {
    loadQuestion()
  }, [])

  /*
   * ---------------------------------------------------------
   * SUBMIT ANSWER
   * ---------------------------------------------------------
   */

  const handleSubmit = async () => {
    if (!question || !userAnswer.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      setError('')

      const response = await fetch(
        `/api/analyst-challenges/${encodeURIComponent(question.id)}/submit`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answer: userAnswer.trim(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Unable to evaluate your answer.')
      }

      const result = await response.json()

      /*
       * AI evaluation returned by backend.
       */

      setEvaluation(result)
      setShowComparison(true)
    } catch (err) {
      console.error('Failed to submit analyst answer:', err)
      setError('Unable to evaluate your answer. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /*
   * ---------------------------------------------------------
   * NEXT QUESTION
   * ---------------------------------------------------------
   *
   * Only available AFTER evaluation exists.
   */

  const handleNextQuestion = async () => {
    if (!evaluation) return

    await loadQuestion()
  }

  /*
   * ---------------------------------------------------------
   * LOADING STATE
   * ---------------------------------------------------------
   */

  if (isLoadingQuestion) {
    return (
      <div
        className="rounded-2xl p-8 border border-border flex items-center justify-center"
        style={{ background: 'var(--surface)' }}
      >
        <div className="flex items-center gap-3 text-text-muted">
          <Loader2 size={20} className="animate-spin" />
          Loading analyst challenge...
        </div>
      </div>
    )
  }

  /*
   * ---------------------------------------------------------
   * ERROR STATE
   * ---------------------------------------------------------
   */

  if (error && !question) {
    return (
      <div
        className="rounded-2xl p-8 border border-border text-center"
        style={{ background: 'var(--surface)' }}
      >
        <p className="text-text-secondary mb-4">{error}</p>

        <button
          type="button"
          onClick={loadQuestion}
          className="px-6 py-3 rounded-lg bg-primary text-white font-semibold
                     hover:bg-primary/90 transition-all"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!question) return null

  return (
    <div>
      {/* ---------------------------------------------------
          SECTION HEADER
      --------------------------------------------------- */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">
          Mini Analyst Challenge
        </h2>

        <p className="text-sm text-text-secondary mt-2">
          Test your analysis skills with real-world comparative evaluation
          exercises.
        </p>
      </div>

      {/* ---------------------------------------------------
          MAIN CHALLENGE CARD
      --------------------------------------------------- */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-8 border border-border"
        style={{ background: 'var(--surface)' }}
      >
        {/* Question number */}

        {question.questionNumber && (
          <p className="text-xs text-primary font-bold uppercase tracking-wide mb-3">
            Challenge {question.questionNumber}
          </p>
        )}

        {/* Question */}

        <div className="mb-8">
          <h3 className="text-lg font-bold text-text-primary mb-4">
            {question.question}
          </h3>

          <p className="text-base text-text-secondary leading-relaxed">
            {question.instructions}
          </p>
        </div>

        {/* -------------------------------------------------
            FINANCIAL DATA TABLE
        ------------------------------------------------- */}

        <div className="mb-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--surface-elevated)' }}>
                <th className="text-left py-4 px-6 font-semibold text-text-primary">
                  Metric
                </th>

                <th className="text-center py-4 px-6 font-semibold text-text-primary">
                  Company A
                </th>

                <th className="text-center py-4 px-6 font-semibold text-text-primary">
                  Company B
                </th>
              </tr>
            </thead>

            <tbody>
              {question.metrics.map((row, index) => (
                <tr
                  key={`${row.metric}-${index}`}
                  className="border-t border-border hover:bg-surface-elevated/20 transition-colors"
                >
                  <td className="py-4 px-6 text-text-primary font-semibold">
                    {row.metric}
                  </td>

                  <td className="text-center py-4 px-6 text-lg font-bold text-primary">
                    {row.companyA}
                  </td>

                  <td className="text-center py-4 px-6 text-lg font-bold text-text-secondary">
                    {row.companyB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------------------------------------------------
            ANSWER BOX
        ------------------------------------------------- */}

        <div className="mb-8">
          <label className="text-base font-semibold text-text-primary block mb-3">
            Your Analysis
          </label>

          <textarea
            value={userAnswer}
            onChange={(event) => setUserAnswer(event.target.value)}
            disabled={Boolean(evaluation) || isSubmitting}
            placeholder="Type your 2–3 sentence analysis here..."
            className="w-full h-28 p-4 rounded-lg border border-border outline-none
                       focus:border-primary transition-colors resize-none
                       disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'var(--surface-elevated)',
              color: 'var(--text-primary)',
            }}
          />

          <div className="flex justify-between mt-2">
            <p className="text-xs text-text-muted">
              {userAnswer.length} characters
            </p>

            <p className="text-xs text-text-muted">
              {userAnswer.trim()
                ? userAnswer.trim().split(/\s+/).length
                : 0}{' '}
              words
            </p>
          </div>
        </div>

        {/* -------------------------------------------------
            ERROR
        ------------------------------------------------- */}

        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/5">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* -------------------------------------------------
            ACTIONS
        ------------------------------------------------- */}

        <div className="flex gap-3 flex-wrap">
          {!evaluation ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!userAnswer.trim() || isSubmitting}
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold
                         hover:bg-primary/90
                         disabled:bg-primary/50
                         disabled:cursor-not-allowed
                         transition-all text-base
                         flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Evaluating...
                </>
              ) : (
                'Submit Analysis'
              )}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowComparison(true)}
                className="px-6 py-3 rounded-lg bg-primary text-white font-semibold
                           hover:bg-primary/90 transition-all text-base"
              >
                View My Evaluation
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={isLoadingQuestion}
                className="px-6 py-3 rounded-lg border border-primary text-primary
                           font-semibold hover:bg-primary/10 transition-all text-base
                           flex items-center gap-2
                           disabled:opacity-50"
              >
                Next Challenge
                <ArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* ---------------------------------------------------
          ANALYST EXPLANATION
      --------------------------------------------------- */}

      {evaluation && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-6 py-3 rounded-lg border border-primary text-primary
                       font-semibold hover:bg-primary/10 transition-all text-base
                       flex items-center gap-2"
          >
            {showAnswer ? 'Hide' : 'Reveal'} Analyst Explanation

            <ChevronDown
              size={18}
              className={`transition-transform ${
                showAnswer ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-6 rounded-lg border border-primary/30"
              style={{ background: 'var(--surface-elevated)' }}
            >
              <h4 className="text-base font-bold text-text-primary mb-3">
                Analyst Explanation
              </h4>

              <p className="text-base text-text-secondary leading-relaxed">
                {evaluation.expertAnalysis}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------
          COMPARISON + SCORE MODAL
      --------------------------------------------------- */}

      {showComparison && evaluation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowComparison(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl p-8 max-w-4xl w-full max-h-[90vh]
                       overflow-y-auto border border-border"
            style={{ background: 'var(--surface)' }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}

            <button
              type="button"
              onClick={() => setShowComparison(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-lg border border-border
                         hover:bg-surface-elevated flex items-center justify-center
                         text-text-muted hover:text-text-primary transition-all"
              aria-label="Close evaluation"
            >
              <X size={20} />
            </button>

            {/* SCORE */}

            <div className="text-center mb-8 pt-2">
              <p className="text-sm text-text-muted uppercase font-semibold tracking-wide">
                Analyst Score
              </p>

              <p className="text-6xl font-bold text-primary mt-2">
                {evaluation.score}
                <span className="text-2xl text-text-muted">/100</span>
              </p>

              {evaluation.grade && (
                <p className="text-lg font-bold text-text-primary mt-2">
                  {evaluation.grade}
                </p>
              )}

              {evaluation.summary && (
                <p className="text-sm text-text-secondary max-w-2xl mx-auto mt-3">
                  {evaluation.summary}
                </p>
              )}
            </div>

            {/* YOUR ANSWER VS EXPERT */}

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                className="rounded-lg border border-border p-6"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <h4 className="text-lg font-bold text-text-primary mb-4">
                  Your Analysis
                </h4>

                <p className="text-base text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {userAnswer}
                </p>
              </div>

              <div
                className="rounded-lg border border-primary/30 p-6"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <h4 className="text-lg font-bold text-text-primary mb-4">
                  Expert Analysis
                </h4>

                <p className="text-base text-text-secondary leading-relaxed">
                  {evaluation.expertAnalysis}
                </p>
              </div>
            </div>

            {/* AI FEEDBACK */}

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                className="rounded-lg border border-border p-6"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <h4 className="text-base font-bold text-text-primary mb-4">
                  What You Did Well
                </h4>

                <ul className="space-y-2">
                  {evaluation.strengths?.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-text-secondary flex gap-2"
                    >
                      <span className="text-primary font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-lg border border-border p-6"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <h4 className="text-base font-bold text-text-primary mb-4">
                  How To Improve
                </h4>

                <ul className="space-y-2">
                  {evaluation.improvements?.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-text-secondary flex gap-2"
                    >
                      <span className="text-primary font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* KEY TAKEAWAYS */}

            {evaluation.keyTakeaways?.length > 0 && (
              <div
                className="p-6 rounded-lg border-l-4 mb-8"
                style={{
                  background: 'var(--surface-elevated)',
                  borderColor: 'var(--primary)',
                }}
              >
                <p className="text-sm text-text-muted font-semibold mb-3 uppercase">
                  Key Takeaways
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  {evaluation.keyTakeaways.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-primary font-bold flex-shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MODAL ACTIONS */}

            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowComparison(false)}
                className="flex-1 px-6 py-3 rounded-lg border border-primary text-primary
                           font-semibold hover:bg-primary/10 transition-all"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex-1 px-6 py-3 rounded-lg bg-primary text-white font-semibold
                           hover:bg-primary/90 transition-all
                           flex items-center justify-center gap-2"
              >
                Next Challenge
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

