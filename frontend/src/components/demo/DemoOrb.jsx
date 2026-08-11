import { motion } from 'framer-motion'

export default function DemoOrb({
  size = 80,
  message = null,
  animated = true,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <motion.div
        animate={
          animated
            ? { y: [0, -6, 0] }
            : { y: 0 }
        }
        transition={{
          duration: 3.5,
          ease: 'easeInOut',
          repeat: animated ? Infinity : 0,
        }}
        className="relative flex items-center justify-center rounded-full shrink-0"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 30% 30%, #60A5FA, #2563EB 60%, #1D4ED8)',
          boxShadow:
            '0 0 40px rgba(37,99,235,0.35), 0 0 80px rgba(79,70,229,0.18)',
        }}
      >
        {/* Subtle highlight */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.28), transparent 45%)',
          }}
        />

        {/* Face */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="rounded-full bg-white"
                style={{
                  width: size * 0.07,
                  height: size * 0.07,
                }}
                animate={
                  animated
                    ? { scaleY: [1, 0.2, 1] }
                    : { scaleY: 1 }
                }
                transition={{
                  duration: 3,
                  repeat: animated ? Infinity : 0,
                  delay: i * 0.1,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>

          <div
            className="rounded-full bg-white/70"
            style={{
              width: size * 0.25,
              height: Math.max(3, size * 0.04),
            }}
          />
        </div>

        {/* Floating particles */}
        {[
          { top: '20%', left: '80%' },
          { top: '70%', left: '15%' },
          { top: '10%', left: '40%' },
          { top: '80%', left: '60%' },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              background: 'rgba(255,255,255,0.6)',
              top: particle.top,
              left: particle.left,
            }}
            animate={
              animated
                ? {
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                  }
                : { opacity: 0.6 }
            }
            transition={{
              duration: 2 + i * 0.4,
              repeat: animated ? Infinity : 0,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Optional message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 rounded-xl text-sm text-white/80 text-center max-w-xs"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {message}
        </motion.div>
      )}
    </div>
  )
}