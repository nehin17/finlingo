// src/components/learn/LearnHero.jsx
import { motion } from 'framer-motion'
import AccountGateCard from './AccountGateCard'

/* Small presentational stat used in the authenticated hero strip */
function HeroStat({ label, value, caption }) {
  return (
    <div>
      <p className="text-sm text-text-muted mb-1">
        {label}
      </p>

      <p className="text-2xl font-bold text-text-primary">
        {value}
      </p>

      {caption && (
        <p className="text-xs text-text-muted mt-0.5">
          {caption}
        </p>
      )}
    </div>
  )
}

export default function LearnHero({
  progress,
  isAuthenticated,
  onSignInClick,
  onSignUpClick,
}) {
 

  const scrollToPaths = () => {
    document
      .getElementById('learning-paths')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-8 md:p-12 mb-16 border border-border"
      style={{ background: 'var(--surface)' }}
    >
      <h1 className="text-4xl font-bold text-text-primary mb-4">
        Learn Hub
      </h1>

      <p className="text-xl text-text-secondary leading-relaxed mb-3">
        Master financial analysis like an equity research analyst. Learn valuation,
        profitability, cash flow analysis, financial statement interpretation, and
        investment research through structured lessons, real company examples, and
        interactive exercises.
      </p>

      <p className="text-base text-text-muted mb-8 italic">
        Used by aspiring equity researchers, finance students, and long-term investors
        to build practical financial analysis skills.
      </p>

      {isAuthenticated && progress ? (
        <>
          {/* PERSONAL SUMMARY STRIP */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 rounded-xl"
            style={{ background: 'var(--surface-elevated)' }}
          >
            <HeroStat
              label="Progress"
              value={`${progress.overallPercent}%`}
              caption="Complete"
            />

            <HeroStat
              label="Streak"
              value={progress.streakDays}
              caption={progress.streakDays === 1 ? 'Day' : 'Days'}
            />

            <HeroStat
              label="Current Level"
              value={progress.currentLevel}
            />

            <HeroStat
              label="Next Level"
              value={progress.nextLevel}
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={scrollToPaths}
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold
                         hover:bg-primary/90 transition-all text-base"
            >
              Continue Learning
            </button>

            <button
              onClick={scrollToPaths}
              className="px-6 py-3 rounded-lg border border-primary text-primary
                         font-semibold hover:bg-primary/10 transition-all text-base"
            >
              Explore the Research Curriculum
            </button>
          </div>

          {progress.nextLesson && (
            <p className="text-sm text-text-muted mt-4">
              Up next:{' '}
              <span className="text-text-primary font-semibold">
                {progress.nextLesson.lessonName}
              </span>{' '}
              in {progress.nextLesson.pathName}
            </p>
          )}
        </>
      ) : (
        <>
          {/* ACCOUNT CTA */}
          <div className="mb-8">
            <AccountGateCard
              variant="inline"
              title="Save Your Learning Progress"
              description="Sign in to keep your lessons, streak, and skill level synced."
              onSignInClick={onSignInClick}
              onSignUpClick={onSignUpClick}
            />
          </div>

          <button
            onClick={scrollToPaths}
            className="px-6 py-3 rounded-lg border border-primary text-primary
                       font-semibold hover:bg-primary/10 transition-all text-base"
          >
            Explore the Research Curriculum
          </button>
        </>
      )}
    </motion.div>
  )
}