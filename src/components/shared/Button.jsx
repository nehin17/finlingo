// src/components/shared/Button.jsx
import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variants = {
    primary: {
      className: 'text-white font-semibold rounded-xl inline-flex items-center justify-center gap-2 shadow-sm',
      style: {
        background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
        boxShadow: '0 8px 20px rgba(37, 99, 235, 0.18)',
      },
    },

    secondary: {
      className: 'font-semibold rounded-xl inline-flex items-center justify-center gap-2 border shadow-sm',
      style: {
        background: 'var(--surface)',
        color: 'var(--text)',
        borderColor: 'var(--border)',
      },
    },

    ghost: {
      className: 'font-medium rounded-xl inline-flex items-center justify-center gap-2',
      style: {
        background: 'transparent',
        color: 'var(--text-muted)',
      },
    },
  }

  const current = variants[variant]

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -1, scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={`
        ${current.className}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500/30
        ${className}
      `}
      style={current.style}
      {...props}
    >
      {children}
    </motion.button>
  )
}