// src/components/shared/SearchBar.jsx
import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const suggestions = [
  { ticker: 'AAPL',  name: 'Apple Inc.',             change: '+1.2%', positive: true  },
  { ticker: 'NVDA',  name: 'NVIDIA Corporation',      change: '+3.4%', positive: true  },
  { ticker: 'TSLA',  name: 'Tesla, Inc.',             change: '-0.8%', positive: false },
  { ticker: 'MSFT',  name: 'Microsoft Corporation',   change: '+0.9%', positive: true  },
  { ticker: 'AMZN',  name: 'Amazon.com, Inc.',        change: '+1.5%', positive: true  },
  { ticker: 'GOOGL', name: 'Alphabet Inc.',           change: '+0.4%', positive: true  },
  { ticker: 'META',  name: 'Meta Platforms',          change: '+2.1%', positive: true  },
]

export default function SearchBar({ large = false, className = '' }) {
  const [query, setQuery]     = useState('')
  const [focused, setFocused] = useState(false)

  const filtered = query.length > 0
    ? suggestions.filter(s =>
        s.ticker.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions.slice(0, 4)

  const showDropdown = focused && (query.length > 0 || focused)

  return (
    <div className={`relative ${className}`}>
      
      <div
        className={`
          flex items-center gap-3 rounded-xl border transition-all duration-200
          ${large ? 'px-5 py-4' : 'px-4 py-2.5'}
          ${focused
            ? 'border-primary shadow-glow'
            : 'border-border hover:border-text-muted'
          }
        `}
        style={{
          background: focused ? 'var(--surface-elevated)' : 'var(--surface)',
        }}
      >
        <Search
          size={large ? 20 : 16}
          className={`shrink-0 transition-colors duration-200 ${
            focused ? 'text-primary' : 'text-text-muted'
          }`}
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search Apple, Tesla, Nvidia..."
          className={`
            flex-1 bg-transparent outline-none text-text-primary placeholder-text-muted
            ${large ? 'text-base' : 'text-sm'}
          `}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Dropdown ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            
            className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border shadow-card z-50 overflow-hidden transition-colors duration-200"
            style={{ background: 'var(--surface)' }}
          >
            <div className="p-2">
              {query === '' && (
                <p className="text-xs text-text-muted px-3 py-2 font-medium uppercase tracking-wide">
                  Popular
                </p>
              )}
              {filtered.map(s => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors duration-150"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    setQuery(s.ticker)
                    setFocused(false)
                  }}
                >
                  <div className="flex items-center gap-3">
                    
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      style={{ background: 'var(--surface-elevated)' }}
                    >
                      <span className="text-xs font-bold text-primary">
                        {s.ticker.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{s.ticker}</p>
                      <p className="text-xs text-text-muted">{s.name}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${
                    s.positive ? 'text-success' : 'text-error'
                  }`}>
                    {s.change}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}