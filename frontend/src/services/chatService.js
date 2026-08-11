
// src/services/chatService.js

const STORAGE_KEY = 'finlingo_chat_history'

// ------------------------------------------------------------
// Local history helpers
// ------------------------------------------------------------

function readHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeHistory(messages) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    )
  } catch {
    // ignore for now
  }
}

// ------------------------------------------------------------
// Mock AI response
// ------------------------------------------------------------

function getMockResponse(prompt) {
  const text = prompt.toLowerCase()

  if (text.includes('nvidia')) {
    return (
      'NVIDIA’s recent performance has been driven largely by strong demand for AI and data-center infrastructure. A production backend could connect this answer to real earnings reports, filings, and market data.'
    )
  }

  if (text.includes('p/e')) {
    return (
      'The P/E ratio compares a company’s stock price with its earnings per share. It is commonly used to evaluate how expensive or cheap a stock may be relative to its earnings.'
    )
  }

  if (text.includes('apple') || text.includes('microsoft')) {
    return (
      'Apple and Microsoft are both major technology companies, but Apple is more consumer-device focused while Microsoft has significant enterprise software and cloud exposure.'
    )
  }

  return (
    'That is a useful finance question. In the production version, Atlas would combine market data, company fundamentals, financial filings, and relevant news sources to provide a structured answer.'
  )
}

// ------------------------------------------------------------
// Send message
// ------------------------------------------------------------
//
// CURRENT:
// - uses local mock logic
// - stores chat history locally
//
// BACKEND READY:
// Replace the body of this function with:
//   POST /api/chat
// while keeping the same return shape.
//

async function sendMessage(prompt) {
  const userMessage = {
    role: 'user',
    content: prompt,
    timestamp: Date.now(),
  }

  const history = readHistory()

  const assistantMessage = {
    role: 'assistant',
    content: getMockResponse(prompt),
    timestamp: Date.now(),
  }

  writeHistory([
    ...history,
    userMessage,
    assistantMessage,
  ])

  return assistantMessage.content
}

// ------------------------------------------------------------
// Public API
// ------------------------------------------------------------

const chatService = {
  sendMessage,
  getHistory: readHistory,
  clearHistory: () => localStorage.removeItem(STORAGE_KEY),
}

export default chatService

