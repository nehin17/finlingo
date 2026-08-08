import { motion } from 'framer-motion'

export default function DemoOrb({ size = 80, message = null }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle at 30% 30%, #60A5FA, #2563EB 60%, #1D4ED8)',
          boxShadow: '0 0 40px rgba(37,99,235,0.35), 0 0 80px rgba(79,70,229,0.18)',
        }}
      >
        {/* Face */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-2">
            {[0, 1].map(i => (
              <motion.div
                key={i}
                className="rounded-full bg-white"
                style={{ width: size * 0.07, height: size * 0.07 }}
                animate={{ scaleY: [1, 0.2, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>
          <div
            className="rounded-full bg-white/70"
            style={{ width: size * 0.25, height: size * 0.04 }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:      4,
              height:     4,
              background: 'rgba(255,255,255,0.6)',
              top:  `${[20, 70, 10, 80][i]}%`,
              left: `${[80, 15, 40, 60][i]}%`,
            }}
            animate={{
              y:       [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2 + i * 0.4,
              repeat:   Infinity,
              delay:    i * 0.3,
            }}
          />
        ))}
      </motion.div>

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