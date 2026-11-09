
// src/components/learn/AccountGateCard.jsx
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

export default function AccountGateCard({
  title,
  description,
  onSignInClick,
  onSignUpClick,
  variant = 'section',
}) {
  const isInline = variant === 'inline'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={
        isInline
          ? 'inline-flex items-center w-fit max-w-full rounded-xl border border-border px-3 py-2'
          : 'inline-flex items-center w-fit max-w-full rounded-xl border border-border px-5 py-4'
      }
      style={{
        background: 'var(--surface-elevated)',
      }}
    >
      {/* ICON */}
      <div
        className={
          isInline
            ? 'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mr-2.5'
            : 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mr-3'
        }
        style={{
          background: 'var(--surface)',
        }}
      >
        <Lock
          size={isInline ? 14 : 15}
          style={{ color: 'var(--primary)' }}
        />
      </div>

      {/* TEXT */}
      <div className="min-w-0 flex-shrink mr-5">
        <h3
          className={
            'text-sm font-semibold text-text-primary leading-tight'
            
          }
        >
          {title}
        </h3>

        <p
          className={
            isInline
              ? 'text-xs text-text-muted mt-0.5'
              : 'text-xs text-text-muted mt-1'
          }
        >
          {description}
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onSignInClick}
          className="px-3 py-1.5 rounded-lg bg-primary text-white
                     font-semibold text-xs whitespace-nowrap
                     hover:bg-primary/90 transition-all"
        >
          Create Account
        </button>

        <button
          onClick={onSignInClick}
          className="px-3 py-1.5 rounded-lg border border-border
                     text-text-primary font-semibold text-xs
                     whitespace-nowrap hover:border-primary
                     hover:text-primary transition-all"
        >
          Sign In
        </button>
      </div>
    </motion.div>
  )
}

