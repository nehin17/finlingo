import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Load theme on start
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDarkMode = saved === 'dark'
    setIsDark(isDarkMode)
    
    // Apply theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Toggle theme
  const handleToggle = () => {
    const newDark = !isDark
    setIsDark(newDark)

    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all hover:scale-105"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text-primary)',
      }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}