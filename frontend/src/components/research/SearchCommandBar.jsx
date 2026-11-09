
// src/components/research/SearchCommandBar.jsx

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, CornerDownLeft, Clock3 } from 'lucide-react'

export default function SearchCommandBar({
  suggestions = [],
  loading = false,
  recent = [],
  onQuery,
  onSelect,
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const inputRef = useRef(null)
  const wrapRef = useRef(null)

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handleKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Click outside closes palette
  useEffect(() => {
    const handleClick = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Debounced API-ready query callback
  useEffect(() => {
    const timer = setTimeout(() => {
      onQuery?.(query.trim())
    }, 250)

    return () => clearTimeout(timer)
  }, [query, onQuery])

  const items = useMemo(() => {
    return query.trim() ? suggestions : recent
  }, [query, suggestions, recent])

  const handleSelect = (ticker) => {
    onSelect?.(ticker)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border shadow-sm transition-all duration-200 focus-within:border-primary/50 focus-within:shadow-md"
        style={{ background: 'var(--surface-elevated)' }}
      >
        <Search size={17} className="text-text-muted shrink-0" />

        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search company, ticker, sector, or keyword…"
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border border-border bg-surface text-[11px] font-medium text-text-muted">
          ⌘K
        </div>
      </div>

      <AnimatePresence>
        {open && (items.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-40 left-0 right-0 mt-2 rounded-2xl border border-border shadow-2xl overflow-hidden backdrop-blur-xl"
            style={{ background: 'var(--surface)' }}
          >
            <div className="px-4 py-2 border-b border-border text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              {query.trim() ? 'Search results' : 'Recent searches'}
            </div>

            {loading && (
              <div className="px-4 py-4 text-sm text-text-muted flex items-center gap-2">
                <Clock3 size={14} />
                Searching market database…
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="px-4 py-4 text-sm text-text-muted">
                No matching companies found.
              </div>
            )}

            {!loading &&
              items.map((item) => (
                <button
                  key={item.ticker}
                  type="button"
                  onClick={() => handleSelect(item.ticker)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface-elevated transition-colors duration-150"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
                      {item.ticker.slice(0, 2)}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {item.ticker}
                        <span className="text-text-muted font-normal">
                          {' '}· {item.name}
                        </span>
                      </p>

                      <p className="text-[11px] text-text-muted truncate">
                        {item.exchange} · {item.sector}
                      </p>
                    </div>
                  </div>

                  <CornerDownLeft
                    size={13}
                    className="text-text-muted shrink-0"
                  />
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

