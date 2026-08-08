// src/components/shared/ChatDrawer.jsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, ChevronDown } from 'lucide-react'

const suggestedChips = [
  'Explain P/E ratio',
  'Why is Tesla volatile?',
  'Compare Apple and Microsoft',
  'What is ROE?',
  'Summarize NVDA earnings',
  'What drives oil prices?',
]

const initialMessages = [
  {
    id: 1,
    role: 'ai',
    content: "Hello! I'm PulseBoard AI. Ask me anything about stocks, financial metrics, or market trends. I'll provide insights grounded in real market data and SEC filings.",
    time: 'Just now',
  },
]

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <Sparkles size={12} className="text-primary" />
      </div>
      
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm bg-surface-elevated border border-border">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-text-muted"
            style={{
              animation: 'pulseDot 1.4s infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const aiResponses = [
  "Based on recent SEC filings and market data, **NVIDIA's** revenue grew 265% YoY, driven by surging AI chip demand. The data center segment now accounts for over 80% of total revenue. Key metrics: P/E ratio of 65x, operating margin of 54%. This is exceptional for a semiconductor company. **Sources:** NVDA 10-Q (Q4 2024), Bloomberg Terminal data.",
  "The P/E ratio (Price-to-Earnings) measures how much investors pay for each dollar of earnings. A high P/E suggests high growth expectations. For context: S&P 500 average is ~22x, tech companies often trade at 30-60x, and value stocks typically at 10-15x. **Formula:** Stock Price ÷ Earnings Per Share.",
  "Tesla's volatility stems from several factors: **1)** High retail investor concentration (30% of holders), **2)** Elon Musk's public statements move the stock significantly, **3)** The company spans multiple industries (EVs, energy, AI, robotics), creating uncertainty in valuation models. Current beta: 2.1 (2x more volatile than S&P 500).",
]

export default function ChatDrawer({ onClose }) {
  const [messages, setMessages]       = useState(initialMessages)
  const [input, setInput]             = useState('')
  const [isTyping, setIsTyping]       = useState(false)
  const [responseIndex, setResponseIndex] = useState(0)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
      time: 'Just now',
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: aiResponses[responseIndex % aiResponses.length],
        time: 'Just now',
        citations: ['SEC Filing 10-Q', 'Bloomberg Data', 'Reuters'],
      }
      setMessages(prev => [...prev, aiMsg])
      setResponseIndex(prev => prev + 1)
    }, 2000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      
      className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] border-l border-border z-[100] flex flex-col shadow-2xl transition-colors duration-300"
      style={{
        background: 'var(--surface)',
        color: 'var(--text)',
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <Sparkles size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary text-sm">PulseBoard AI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-text-muted">Online • Grounded answers</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-surface-elevated flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Suggested Chips ──────────────────────────────────────────── */}
      <div className="px-4 py-3 border-b border-border">
        <p className="text-xs text-text-muted mb-2 font-medium">Suggested questions</p>
        <div className="flex flex-wrap gap-2">
          {suggestedChips.slice(0, 4).map(chip => (
            <button
              key={chip}
              onClick={() => sendMessage(chip)}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary hover:border-primary hover:text-primary transition-all duration-150 hover:bg-primary/5"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* ── Messages ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles size={12} className="text-primary" />
              </div>
            )}

            <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm text-white'
                    
                    : 'rounded-bl-sm border border-border text-text-primary'
                }`}
                style={
                  msg.role === 'user'
                    ? { background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)' }
                    : { background: 'var(--surface-elevated)' }
                }
              >
                {msg.content.split('**').map((part, i) =>
                  i % 2 === 1
                    ? <strong key={i} className="font-semibold">{part}</strong>
                    : part
                )}
              </div>

              {msg.citations && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {msg.citations.map(c => (
                    <span
                      key={c}
                      className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ────────────────────────────────────────────────────── */}
      <div className="p-4 border-t border-border">
        
        <div
          className="flex items-end gap-3 p-3 rounded-xl border border-border focus-within:border-primary transition-colors duration-200"
          style={{ background: 'var(--surface-elevated)' }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about any stock or financial term..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none resize-none"
            style={{ maxHeight: '120px' }}
          />
          <motion.button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            whileTap={{ scale: 0.92 }}
            
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 ${
              input.trim()
                ? 'bg-primary text-white hover:bg-primary-hover'
                : 'text-text-muted cursor-not-allowed'
            }`}
            style={!input.trim() ? { background: 'var(--surface)' } : {}}
          >
            <Send size={14} />
          </motion.button>
        </div>
        <p className="text-center text-xs text-text-muted mt-2">
          Grounded in SEC filings & real market data
        </p>
      </div>
    </motion.div>
  )
}