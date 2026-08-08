// src/components/shared/Card.jsx
import { motion } from 'framer-motion'

export default function Card({
  children,
  hover = false,
  className = '',
  padding = 'p-6',
  onClick,
  ...props
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.015,
              borderColor: 'rgba(37, 99, 235, 0.25)',
              boxShadow:
                '0 12px 32px rgba(37, 99, 235, 0.12), 0 0 0 1px rgba(37, 99, 235, 0.08)',
            }
          : {}
      }
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        rounded-2xl border
        ${padding}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text)',
        boxShadow: 'var(--shadow-md)',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}