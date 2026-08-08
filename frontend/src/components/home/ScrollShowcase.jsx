// src/components/home/ScrollShowcase.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HowItWorks from './HowItWorks.jsx'
import SecuritySection from './SecuritySection.jsx'
import DigestPreview from './DigestPreview.jsx'

const slides = [
  { id: 0, component: HowItWorks, label: 'How It Works' },
  { id: 1, component: SecuritySection, label: 'Security & Trust' },
  { id: 2, component: DigestPreview, label: 'Personalized Digest' },
]

export default function ScrollShowcase() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const containerRef = useRef(null)
  const isScrolling = useRef(false)
  const pauseTimer = useRef(null)

  // ✅ Screen size detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ✅ Intersection Observer
  useEffect(() => {
    const el = containerRef.current
    if (!el || isMobile) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.85)
      },
      { threshold: 0.85 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [isMobile])

  // ✅ Wheel scroll hijacking
  useEffect(() => {
    const el = containerRef.current
    if (!el || isMobile || !isInView) return

    const handleWheel = (e) => {
      const isAtEnd = activeIndex === slides.length - 1
      const isAtStart = activeIndex === 0

      if (isAtEnd && e.deltaY > 0) return
      if (isAtStart && e.deltaY < 0) return

      e.preventDefault()

      if (isScrolling.current) return
      isScrolling.current = true

      if (e.deltaY > 0) {
        setDirection(1)
        setActiveIndex((prev) => Math.min(prev + 1, slides.length - 1))
      } else if (e.deltaY < 0) {
        setDirection(-1)
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }

      // Pause autoplay
      setIsPaused(true)
      clearTimeout(pauseTimer.current)
      pauseTimer.current = setTimeout(() => setIsPaused(false), 5000)

      // Debounce
      setTimeout(() => {
        isScrolling.current = false
      }, 1000)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [isInView, activeIndex, isMobile])

  // ✅ Autoplay (8 seconds)
  useEffect(() => {
    if (isPaused || !isInView || isMobile) return

    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isPaused, isInView, isMobile])

  // ✅ Animation Variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  // ✅ Mobile Layout: Normal vertical stacking
  if (isMobile) {
    return (
      <div className="w-full py-16 space-y-12 px-4">
        {slides.map((slide) => {
          const Component = slide.component
          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl overflow-hidden border border-border"
              style={{ background: 'var(--surface)' }}
            >
              <div className="max-h-[600px] overflow-y-auto">
                <Component />
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // ✅ Desktop/Tablet: Horizontal showcase - NO SCROLL
  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--bg)', height: 'calc(100vh - 96px)' }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 400, damping: 40 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          {/* Premium Card Container */}
          <div
            className="w-full h-full max-w-[1500px] rounded-3xl overflow-hidden shadow-2xl border flex flex-col"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(37,99,235,0.05) 0%, transparent 70%)',
              }}
            />

            {/* Slide Content - Fitted, no scroll */}
            <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center">
              {slides.map((slide, index) => {
                const Component = slide.component
                return (
                  <div
                    key={index}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      visibility: index === activeIndex ? 'visible' : 'hidden',
                    }}
                  >
                    {/* Scale component to fit container */}
                    <div className="w-full h-full overflow-hidden flex flex-col">
                      <Component />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots - Clickable */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2.5 z-50">
        {slides.map((slide, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1)
              setActiveIndex(index)
              setIsPaused(true)
              clearTimeout(pauseTimer.current)
              pauseTimer.current = setTimeout(() => setIsPaused(false), 5000)
            }}
            className="relative flex items-center justify-center transition-all duration-300"
            aria-label={slide.label}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? '28px' : '8px',
                height: '8px',
                background: index === activeIndex ? 'var(--primary)' : 'var(--text-muted)',
                opacity: index === activeIndex ? 1 : 0.3,
              }}
            />
          </motion.button>
        ))}
      </div>

      {/* Slide Label */}
      <div
        className="absolute top-6 right-6 z-50 px-3 py-2 rounded-lg border text-xs font-semibold"
        style={{
          background: 'var(--bg)',
          color: 'var(--text-muted)',
          borderColor: 'var(--border)',
        }}
      >
        {slides[activeIndex].label}
      </div>
    </section>
  )
}