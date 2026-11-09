import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, LoaderCircle, X } from 'lucide-react'

import DemoOrb from '../demo/DemoOrb.jsx'
import chatService from '../../services/chatService.js'

const initialMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      'Hello. I’m Atlas, your FinLingo AI research assistant. I can help you understand companies, markets, financial concepts, and recent performance.',
  },
]

const quickPrompts = [
  'Explain NVIDIA’s recent performance',
  'What is a P/E ratio?',
  'Compare Apple and Microsoft',
]

export default function AIChatPanel({
  onClose,
  getResponse,
}) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef(null)

  // ------------------------------------------------------------
  // Restore chat history from localStorage
  // ------------------------------------------------------------

  useEffect(() => {
    const history = chatService.getHistory()
  
    if (history.length > 0) {
      setMessages([
        initialMessages[0],
        ...history.map((message, index) => ({
          id: `history-${index}`,
          role: message.role,
          content: message.content,
        })),
      ])
    }
  }, [])

  // ------------------------------------------------------------
  // Scroll to newest message
  // ------------------------------------------------------------

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, loading])

  // ------------------------------------------------------------
  // Send message
  // ------------------------------------------------------------

  const sendMessage = async (prompt) => {
    const content = prompt.trim()
    if (!content || loading) return

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = getResponse
        ? await getResponse(content)
        : await chatService.sendMessage(content)
      
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: response || "No response received.",
        },
      ])
    } catch (error) {
      console.error("Chat Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content: 'Error: Could not reach Atlas.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // ------------------------------------------------------------
  // Form submission
  // ------------------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  return (
    <motion.section
      role="dialog"
      aria-modal="false"
      aria-label="FinLingo AI Assistant"

      initial={{
        opacity: 0,
        y: 16,
        scale: 0.97,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      exit={{
        opacity: 0,
        y: 16,
        scale: 0.97,
      }}

      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}

      className="
        flex
        flex-col
        overflow-hidden
        w-[calc(100vw-2rem)]
        sm:w-[380px]
        h-[min(620px,calc(100vh-7rem))]
        rounded-2xl
        sm:rounded-3xl
        border
      "

      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow:
          '0 24px 70px rgba(15, 23, 42, 0.22)',
      }}
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          px-4
          py-3.5
          border-b
          shrink-0
        "
        style={{
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <DemoOrb size={34} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p
                className="font-semibold text-sm truncate"
                style={{
                  color: 'var(--text)',
                }}
              >
                Atlas
              </p>
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-[10px]
                  font-medium
                "
                style={{
                  color: '#16A34A',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#16A34A',
                  }}
                />
                Online
              </span>
            </div>
            <p
              className="text-xs truncate mt-0.5"
              style={{
                color: 'var(--text-muted)',
              }}
            >
              FinLingo AI Research Assistant
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close AI assistant"
          className="
            w-9
            h-9
            rounded-lg
            flex
            items-center
            justify-center
            shrink-0
            transition-colors
          "
          style={{
            color: 'var(--text-muted)',
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background =
              'var(--surface-elevated)'
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background =
              'transparent'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* CONVERSATION */}
      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
          px-4
          py-4
          space-y-4
        "
        aria-live="polite"
      >
        {messages.map((message) => {
          const isUser = message.role === 'user'

          return (
            <motion.div
              key={message.id}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`flex gap-2.5 ${
                isUser
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {!isUser && (
                <DemoOrb
                  size={28}
                  className="mt-0.5"
                />
              )}

              <div
                className="
                  max-w-[84%]
                  rounded-2xl
                  px-3.5
                  py-3
                  text-sm
                  leading-relaxed
                "
                style={
                  isUser
                    ? {
                        color: '#FFFFFF',
                        background:
                          'linear-gradient(135deg, #2563EB, #4F46E5)',
                        borderBottomRightRadius: '6px',
                      }
                    : {
                        color: 'var(--text)',
                        background:
                          'var(--surface-elevated, rgba(148, 163, 184, 0.12))',
                        borderBottomLeftRadius: '6px',
                      }
                }
              >
                {message.content}
              </div>
            </motion.div>
          )
        })}

        {/* LOADING INDICATOR */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="flex items-center gap-2.5"
            >
              <DemoOrb
                size={28}
                animated
              />
              <div
                className="
                  rounded-2xl
                  rounded-bl-md
                  px-3.5
                  py-3
                "
                style={{
                  background:
                    'var(--surface-elevated, rgba(148, 163, 184, 0.12))',
                }}
              >
                <div className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: 'var(--text-muted)',
                    }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: 'var(--text-muted)',
                    }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: 'var(--text-muted)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QUICK PROMPTS */}
        {messages.length === 1 && !loading && (
          <div className="pt-2">
            <p
              className="
                text-xs
                font-medium
                mb-2.5
              "
              style={{
                color: 'var(--text-muted)',
              }}
            >
              Suggested questions
            </p>

            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-xs
                    transition-all
                    duration-150
                  "
                  style={{
                    color: 'var(--text-muted)',
                    borderColor: 'var(--border)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background =
                      'var(--surface-elevated)'
                    event.currentTarget.style.color =
                      'var(--text)'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background =
                      'transparent'
                    event.currentTarget.style.color =
                      'var(--text-muted)'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* MESSAGE COMPOSER */}
      <form
        onSubmit={handleSubmit}
        className="
          p-3
          border-t
          shrink-0
        "
        style={{
          borderColor: 'var(--border)',
        }}
      >
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-3
            py-2
          "
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          <input
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            disabled={loading}
            placeholder="Ask Atlas about finance..."
            aria-label="Ask Atlas a question"
            className="
              min-w-0
              flex-1
              bg-transparent
              outline-none
              text-sm
            "
            style={{
              color: 'var(--text)',
            }}
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              text-white
              transition-all
              duration-150
              disabled:opacity-40
              shrink-0
            "
            style={{
              background:
                'linear-gradient(135deg, #2563EB, #4F46E5)',
            }}
          >
            {loading ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <ArrowUp size={16} />
            )}
          </button>
        </div>

        <p
          className="
            text-[10px]
            text-center
            mt-2
          "
          style={{
            color: 'var(--text-muted)',
          }}
        >
          Atlas provides educational information and does not provide investment advice.
        </p>
      </form>
    </motion.section>
  )
}