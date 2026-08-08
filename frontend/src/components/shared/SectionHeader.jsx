// src/components/shared/SectionHeader.jsx
import { motion } from 'framer-motion'

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 mb-4 ${centered ? 'justify-center' : ''}`}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--primary)',
              borderColor: 'rgba(37, 99, 235, 0.25)',
              background: 'rgba(37, 99, 235, 0.08)',
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h2
        className="font-bold leading-tight mb-4 text-balance"
        style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          color: 'var(--text)',
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-balance"
          style={{
            color: 'var(--text-muted)',
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}