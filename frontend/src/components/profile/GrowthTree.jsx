
// src/components/profile/GrowthTree.jsx

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Droplets, TreePine } from 'lucide-react'
import { TREE_THEMES } from './treeThemes.js'
import { STAGE_QUOTES, INACTIVITY_MESSAGES } from './treeQuotes.js'

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function getDaysSinceActive(lastActiveDate) {
  if (!lastActiveDate) return 0

  const last = new Date(lastActiveDate)
  const now = new Date()

  const diff = Math.floor(
    (now - last) / (1000 * 60 * 60 * 24)
  )

  return Math.max(0, diff)
}

function getInactivityLevel(days) {
  if (days === 0) return 'ok'
  if (days <= 1) return 'warning'
  if (days <= 3) return 'drooping'
  if (days <= 6) return 'fading'
  return 'dry'
}

function getStage(progress) {
  if (progress < 5) return 'seed'
  if (progress < 15) return 'sprout'
  if (progress < 30) return 'young'
  if (progress < 50) return 'sapling'
  if (progress < 75) return 'mature'
  return 'blooming'
}

function getStageName(stage) {
  return {
    seed: '🌱 Seed Stage',
    sprout: '🌿 Sprout Stage',
    young: '🪴 Young Plant',
    sapling: '🌳 Sapling Stage',
    mature: '🌲 Mature Tree',
    blooming: '🌸 Blooming Tree',
  }[stage]
}

// ─────────────────────────────────────────────────────────────
// LEAF COMPONENT
// ─────────────────────────────────────────────────────────────

function Leaf({
  cx,
  cy,
  rx,
  ry,
  fill,
  transform,
  delay = 0,
  swayAmount = 2,
  wiltLevel = 'ok',
}) {
  const animation =
    wiltLevel === 'dry'
      ? {
          y: [0, 4, 7],
          rotate: [0, 8, 15],
          opacity: [0.6, 0.45, 0.35],
        }
      : wiltLevel === 'fading'
        ? {
            y: [0, 2, 4],
            rotate: [0, 5, 9],
            opacity: [0.72, 0.62, 0.55],
          }
        : wiltLevel === 'drooping'
          ? {
              y: [0, 1, 2],
              rotate: [0, 3, 5],
              opacity: [0.8, 0.72, 0.68],
            }
          : {
              y: [0, -swayAmount, 0],
              rotate: [-swayAmount, swayAmount, -swayAmount],
              opacity: [0.85, 1, 0.85],
            }

  return (
    <motion.ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={fill}
      transform={transform}
      animate={animation}
      transition={{
        duration: 3 + delay * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// FALLING PARTICLES
// ─────────────────────────────────────────────────────────────

function FallingParticle({
  color,
  startX,
  delay,
  wilt = false,
}) {
  return (
    <motion.ellipse
      cx={startX}
      cy={10}
      rx={wilt ? 2 : 3}
      ry={wilt ? 3 : 5}
      fill={color}
      initial={{
        x: 0,
        y: 0,
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        x: [
          0,
          -8 - Math.random() * 8,
          -15 - Math.random() * 7,
        ],
        y: [0, 28, 52],
        opacity: wilt
          ? [0, 0.35, 0]
          : [0, 0.9, 0],
        rotate: [0, 45, 100],
      }}
      transition={{
        duration: wilt ? 6 : 4.5 + delay,
        repeat: Infinity,
        repeatDelay: wilt
          ? 4 + delay
          : 2 + delay * 1.2,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// WATERING CAN ANIMATION
// ─────────────────────────────────────────────────────────────

function WateringSequence({
  isWatering,
  themeColor,
}) {
  return (
    <AnimatePresence>
      {isWatering && (
        <motion.div
          initial={{
            x: 80,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: 80,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="absolute top-4 right-2 z-30 flex flex-col items-center"
        >
          {/* Watering can */}
          <motion.div
            animate={{
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            {/* Can body */}
            <div
              className="w-8 h-6 rounded-md border-2"
              style={{
                borderColor: themeColor,
                background: 'var(--surface-elevated)',
              }}
            />

            {/* Handle */}
            <div
              className="absolute -top-2 left-1 w-6 h-4 rounded-full border-2 border-b-0"
              style={{
                borderColor: themeColor,
              }}
            />

            {/* Nozzle */}
            <div
              className="absolute top-4 -left-5 w-5 h-1.5 rounded-full rotate-[-18deg]"
              style={{
                background: themeColor,
              }}
            />
          </motion.div>

          {/* Water droplets */}
          <div className="flex gap-1 mt-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  y: [0, 14, 24],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: 'easeIn',
                }}
                className="w-1 h-2 rounded-full"
                style={{
                  background: themeColor,
                }}
              />
            ))}
          </div>

          {/* Growth badge */}
          <motion.div
            initial={{
              opacity: 0,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: -4,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
            className="mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
            style={{
              background: themeColor,
            }}
          >
            +Growth
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────
// TREE STAGE SVGS
// ─────────────────────────────────────────────────────────────

function SeedSVG({ theme }) {
  const t = TREE_THEMES[theme]

  return (
    <motion.svg
      width="140"
      height="150"
      viewBox="0 0 140 150"
      fill="none"
      animate={{
        y: [0, -1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Glow */}
      <motion.circle
        cx="70"
        cy="118"
        r="18"
        fill={t.glow}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soil */}
      <ellipse
        cx="70"
        cy="128"
        rx="30"
        ry="7"
        fill={t.soil}
        opacity="0.75"
      />

      {/* Pot */}
      <path
        d="M48 126 L92 126 L86 146 L54 146 Z"
        fill={t.pot}
        opacity="0.9"
      />

      {/* Seed */}
      <motion.ellipse
        cx="70"
        cy="116"
        rx="7"
        ry="10"
        fill={t.leaves[0]}
        opacity="0.9"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Sparkles */}
      {[
        [-8, -6],
        [8, -8],
        [-4, -14],
        [6, -4],
      ].map(([dx, dy], i) => (
        <motion.circle
          key={i}
          cx={70 + dx}
          cy={116 + dy}
          r="1.5"
          fill={t.leaves[1]}
          opacity="0.7"
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.svg>
  )
}

function SproutSVG({ theme }) {
  const t = TREE_THEMES[theme]

  return (
    <motion.svg
      width="140"
      height="150"
      viewBox="0 0 140 150"
      fill="none"
      animate={{
        rotate: [0, 0.8, -0.8, 0],
        y: [0, -2, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.circle
        cx="70"
        cy="100"
        r="22"
        fill={t.glow}
        animate={{
          opacity: [0.04, 0.1, 0.04],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Soil */}
      <ellipse
        cx="70"
        cy="129"
        rx="28"
        ry="6"
        fill={t.soil}
        opacity="0.7"
      />

      {/* Pot */}
      <path
        d="M50 126 L90 126 L85 146 L55 146 Z"
        fill={t.pot}
        opacity="0.9"
      />

      {/* Stem */}
      <path
        d="M70 128 C70 112 70 98 70 82"
        stroke={t.trunk}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Left leaf */}
      <Leaf
        cx={59}
        cy={88}
        rx={8}
        ry={13}
        fill={t.leaves[1]}
        transform="rotate(-35 59 88)"
        delay={0}
      />

      {/* Right leaf */}
      <Leaf
        cx={81}
        cy={78}
        rx={8}
        ry={13}
        fill={t.leaves[2]}
        transform="rotate(35 81 78)"
        delay={0.5}
      />
    </motion.svg>
  )
}

function YoungSVG({ theme, wiltLevel }) {
  const t = TREE_THEMES[theme]

  return (
    <motion.svg
      width="140"
      height="150"
      viewBox="0 0 140 150"
      fill="none"
      animate={{
        rotate:
          wiltLevel === 'dry'
            ? [-2, -3, -2]
            : [0, 1, -1, 0],
        y:
          wiltLevel === 'dry'
            ? [3, 5, 3]
            : [0, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.circle
        cx="70"
        cy="80"
        r="30"
        fill={t.glow}
        animate={{
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Soil */}
      <ellipse
        cx="70"
        cy="132"
        rx="31"
        ry="6"
        fill={t.soil}
        opacity="0.7"
      />

      {/* Trunk */}
      <path
        d="M64 132 C66 110 67 91 70 72 C72 91 76 110 76 132"
        fill={t.trunk}
      />

      {/* Branches */}
      <path
        d="M69 91 Q55 82 45 72"
        stroke={t.trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M71 91 Q86 82 96 71"
        stroke={t.trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <Leaf
        cx={44}
        cy={68}
        rx={10}
        ry={14}
        fill={t.leaves[0]}
        transform="rotate(-35 44 68)"
        delay={0}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={96}
        cy={67}
        rx={10}
        ry={14}
        fill={t.leaves[1]}
        transform="rotate(35 96 67)"
        delay={0.5}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={58}
        cy={54}
        rx={10}
        ry={14}
        fill={t.leaves[2]}
        transform="rotate(-20 58 54)"
        delay={0.9}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={82}
        cy={53}
        rx={10}
        ry={14}
        fill={t.leaves[3]}
        transform="rotate(20 82 53)"
        delay={1.2}
        wiltLevel={wiltLevel}
      />
    </motion.svg>
  )
}

function SaplingSVG({ theme, wiltLevel }) {
  const t = TREE_THEMES[theme]

  return (
    <motion.svg
      width="140"
      height="150"
      viewBox="0 0 140 150"
      fill="none"
      animate={{
        rotate:
          wiltLevel === 'dry'
            ? [-3, -4, -3]
            : wiltLevel === 'fading'
              ? [-1.5, -2.5, -1.5]
              : [0, 1.2, -1.2, 0],
        y:
          wiltLevel === 'dry'
            ? [3, 5, 3]
            : wiltLevel === 'fading'
              ? [1, 3, 1]
              : [0, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.circle
        cx="70"
        cy="65"
        r="36"
        fill={t.glow}
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.06, 0.14, 0.06],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
      />

      {/* Soil */}
      <ellipse
        cx="70"
        cy="136"
        rx="34"
        ry="6"
        fill={t.soil}
        opacity="0.7"
      />

      {/* Trunk */}
      <path
        d="M61 136 C62 112 65 87 70 57 C75 87 78 112 79 136 Z"
        fill={t.trunk}
      />

      {/* Side branches */}
      <path
        d="M68 91 Q50 78 37 68"
        stroke={t.trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M72 91 Q91 77 104 65"
        stroke={t.trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <Leaf
        cx={35}
        cy={65}
        rx={11}
        ry={15}
        fill={t.leaves[0]}
        transform="rotate(-45 35 65)"
        delay={0}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={105}
        cy={62}
        rx={11}
        ry={15}
        fill={t.leaves[1]}
        transform="rotate(45 105 62)"
        delay={0.5}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={48}
        cy={45}
        rx={11}
        ry={15}
        fill={t.leaves[2]}
        transform="rotate(-25 48 45)"
        delay={0.9}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={92}
        cy={42}
        rx={11}
        ry={15}
        fill={t.leaves[3]}
        transform="rotate(25 92 42)"
        delay={1.2}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={61}
        cy={28}
        rx={10}
        ry={14}
        fill={t.leaves[0]}
        transform="rotate(-12 61 28)"
        delay={0.4}
        wiltLevel={wiltLevel}
      />

      <Leaf
        cx={80}
        cy={27}
        rx={10}
        ry={14}
        fill={t.leaves[1]}
        transform="rotate(12 80 27)"
        delay={0.7}
        wiltLevel={wiltLevel}
      />
    </motion.svg>
  )
}

function MatureSVG({ theme, wiltLevel }) {
  const t = TREE_THEMES[theme]

  return (
    <motion.svg
      width="140"
      height="150"
      viewBox="0 0 140 150"
      fill="none"
      animate={
        wiltLevel === 'dry'
          ? {
              rotate: [-3, -4.5, -3],
              y: [2, 5, 2],
            }
          : wiltLevel === 'fading'
            ? {
                rotate: [-1.5, -2.5, -1.5],
                y: [1, 3, 1],
              }
            : wiltLevel === 'drooping'
              ? {
                  rotate: [-0.5, -1.5, -0.5],
                  y: [0, 1, 0],
                }
              : {
                  rotate: [0, 1.5, -1.5, 0],
                  y: [0, -2, 0],
                }
      }
      transition={{
        duration: wiltLevel === 'dry' ? 5 : 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.circle
        cx="70"
        cy="55"
        r="40"
        fill={t.glow}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.07, 0.16, 0.07],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
      />

      {/* Soil */}
      <ellipse
        cx="70"
        cy="138"
        rx="36"
        ry="6"
        fill={t.soil}
        opacity="0.7"
      />

      {/* Trunk */}
      <path
        d="M59 138 C61 110 64 82 70 53 C76 82 79 110 81 138 Z"
        fill={t.trunk}
      />

      {/* Branches */}
      <path
        d="M68 103 Q49 87 34 75"
        stroke={t.trunk}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M72 103 Q91 87 106 73"
        stroke={t.trunk}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M68 84 Q52 70 42 57"
        stroke={t.trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M72 82 Q88 67 99 54"
        stroke={t.trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Dense canopy */}
      {[
        {
          cx: 33,
          cy: 75,
          rx: 13,
          ry: 18,
          fi: 0,
          rot: '-45 33 75',
          delay: 0,
        },
        {
          cx: 107,
          cy: 72,
          rx: 13,
          ry: 18,
          fi: 1,
          rot: '45 107 72',
          delay: 0.5,
        },
        {
          cx: 43,
          cy: 53,
          rx: 12,
          ry: 16,
          fi: 2,
          rot: '-25 43 53',
          delay: 0.9,
        },
        {
          cx: 98,
          cy: 50,
          rx: 12,
          ry: 16,
          fi: 3,
          rot: '25 98 50',
          delay: 1.3,
        },
        {
          cx: 55,
          cy: 31,
          rx: 11,
          ry: 15,
          fi: 0,
          rot: '-12 55 31',
          delay: 0.4,
        },
        {
          cx: 85,
          cy: 30,
          rx: 11,
          ry: 15,
          fi: 1,
          rot: '12 85 30',
          delay: 0.7,
        },
        {
          cx: 70,
          cy: 22,
          rx: 11,
          ry: 15,
          fi: 2,
          rot: '',
          delay: 0.2,
        },
      ].map((leaf, i) => (
        <Leaf
          key={i}
          cx={leaf.cx}
          cy={leaf.cy}
          rx={leaf.rx}
          ry={leaf.ry}
          fill={t.leaves[leaf.fi]}
          transform={`rotate(${leaf.rot})`}
          delay={leaf.delay}
          swayAmount={2.5 + i * 0.2}
          wiltLevel={wiltLevel}
        />
      ))}

      {/* Falling leaves */}
      {[48, 62, 76, 90, 104].map((x, i) => (
        <FallingParticle
          key={i}
          color={t.leaves[i % t.leaves.length]}
          startX={x}
          delay={i * 0.8}
          wilt={
            wiltLevel === 'dry' ||
            wiltLevel === 'fading'
          }
        />
      ))}
    </motion.svg>
  )
}

function BloomingSVG({ theme, wiltLevel }) {
  const t = TREE_THEMES[theme]

  return (
    <motion.svg
      width="140"
      height="150"
      viewBox="0 0 140 150"
      fill="none"
      animate={
        wiltLevel === 'dry'
          ? {
              rotate: [-3, -4, -3],
              y: [3, 5, 3],
            }
          : wiltLevel === 'fading'
            ? {
                rotate: [-1.5, -2.5, -1.5],
                y: [1, 3, 1],
              }
            : {
                rotate: [0, 1.5, -1.5, 0],
                y: [0, -3, 0],
              }
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Large glow */}
      <motion.circle
        cx="70"
        cy="50"
        r="48"
        fill={t.glow}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.22, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Soil */}
      <ellipse
        cx="70"
        cy="139"
        rx="37"
        ry="6"
        fill={t.soil}
        opacity="0.7"
      />

      {/* Main trunk */}
      <path
        d="M59 139 C61 112 65 83 70 46 C75 83 79 112 81 139 Z"
        fill={t.trunk}
      />

      {/* Branches */}
      {[
        'M70 100 Q50 90 34 82',
        'M70 86 Q90 78 106 70',
        'M70 72 Q52 62 40 52',
        'M70 62 Q88 52 100 44',
        'M70 50 Q58 38 46 30',
        'M70 46 Q82 36 94 28',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={t.trunk}
          strokeWidth={3 - i * 0.3}
          strokeLinecap="round"
        />
      ))}

      {/* Full canopy */}
      {[
        {
          cx: 32,
          cy: 78,
          rx: 13,
          ry: 18,
          fi: 0,
          rot: '-50 32 78',
          delay: 0,
        },
        {
          cx: 108,
          cy: 66,
          rx: 13,
          ry: 18,
          fi: 1,
          rot: '46 108 66',
          delay: 0.5,
        },
        {
          cx: 38,
          cy: 48,
          rx: 12,
          ry: 16,
          fi: 2,
          rot: '-25 38 48',
          delay: 0.9,
        },
        {
          cx: 102,
          cy: 40,
          rx: 12,
          ry: 16,
          fi: 3,
          rot: '26 102 40',
          delay: 1.3,
        },
        {
          cx: 52,
          cy: 26,
          rx: 11,
          ry: 15,
          fi: 0,
          rot: '-12 52 26',
          delay: 0.4,
        },
        {
          cx: 88,
          cy: 24,
          rx: 11,
          ry: 15,
          fi: 1,
          rot: '14 88 24',
          delay: 0.7,
        },
        {
          cx: 70,
          cy: 16,
          rx: 10,
          ry: 14,
          fi: 2,
          rot: '',
          delay: 0.2,
        },
        {
          cx: 60,
          cy: 36,
          rx: 9,
          ry: 12,
          fi: 3,
          rot: '',
          delay: 1,
        },
        {
          cx: 80,
          cy: 34,
          rx: 9,
          ry: 12,
          fi: 0,
          rot: '',
          delay: 0.6,
        },
      ].map((leaf, i) => (
        <Leaf
          key={i}
          cx={leaf.cx}
          cy={leaf.cy}
          rx={leaf.rx}
          ry={leaf.ry}
          fill={t.leaves[leaf.fi]}
          transform={
            leaf.rot
              ? `rotate(${leaf.rot})`
              : undefined
          }
          delay={leaf.delay}
          swayAmount={3 + i * 0.2}
          wiltLevel={wiltLevel}
        />
      ))}

      {/* Falling petals/leaves */}
      {[30, 44, 58, 72, 86, 100, 114].map(
        (x, i) => (
          <FallingParticle
            key={i}
            color={t.leaves[i % t.leaves.length]}
            startX={x}
            delay={i * 0.6}
            wilt={
              wiltLevel === 'dry' ||
              wiltLevel === 'fading'
            }
          />
        )
      )}
    </motion.svg>
  )
}

// ─────────────────────────────────────────────────────────────
// TREE SWITCHER
// ─────────────────────────────────────────────────────────────

function TreeSVG({
  stage,
  theme,
  wiltLevel,
}) {
  const props = {
    theme,
    wiltLevel,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${stage}-${theme}-${wiltLevel}`}
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity:
            wiltLevel === 'dry'
              ? 0.85
              : wiltLevel === 'fading'
                ? 0.92
                : 1,

          scale:
            wiltLevel === 'dry'
              ? 0.94
              : wiltLevel === 'fading'
                ? 0.97
                : 1,

          rotate:
            wiltLevel === 'dry'
              ? -4
              : wiltLevel === 'fading'
                ? -2
                : wiltLevel === 'drooping'
                  ? -1
                  : 0,

          y:
            wiltLevel === 'dry'
              ? 5
              : wiltLevel === 'fading'
                ? 3
                : wiltLevel === 'drooping'
                  ? 1
                  : 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.92,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
        className="flex justify-center origin-bottom"
      >
        {stage === 'seed' && (
          <SeedSVG {...props} />
        )}

        {stage === 'sprout' && (
          <SproutSVG {...props} />
        )}

        {stage === 'young' && (
          <YoungSVG {...props} />
        )}

        {stage === 'sapling' && (
          <SaplingSVG {...props} />
        )}

        {stage === 'mature' && (
          <MatureSVG {...props} />
        )}

        {stage === 'blooming' && (
          <BloomingSVG {...props} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────
// CELEBRATION OVERLAY
// ─────────────────────────────────────────────────────────────

function CelebrationOverlay({
  show,
  onDone,
}) {
  useEffect(() => {
    if (!show) return

    const timer = setTimeout(
      onDone,
      3200
    )

    return () => clearTimeout(timer)
  }, [show, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl z-50 pointer-events-none"
          style={{
            background:
              'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 14,
            }}
            className="text-center px-6 text-white"
          >
            <div className="text-5xl mb-3">
              🌳
            </div>

            <div className="text-xl font-bold mb-2">
              Tree Complete!
            </div>

            <p className="text-sm text-white/80">
              Your FinLingo tree has fully bloomed.
            </p>

            <p className="text-sm text-white/80">
              A new seedling awaits.
            </p>
          </motion.div>

          {/* Confetti */}
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: [
                  '#22C55E',
                  '#2563EB',
                  '#F9A8D4',
                  '#FCD34D',
                  '#7DD3FC',
                ][i % 5],
                left: `${10 + i * 7}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, 40, 80],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.12,
                ease: 'easeIn',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────
// THEME SELECTOR
// ─────────────────────────────────────────────────────────────

function ThemeSelector({
  selected,
  onChange,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Object.values(TREE_THEMES).map(
        (t) => (
          <motion.button
            key={t.id}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200 ${
              selected === t.id
                ? 'border-blue-400 text-text-primary shadow-sm'
                : 'border-border text-text-muted hover:border-blue-300'
            }`}
            style={{
              background:
                selected === t.id
                  ? 'var(--surface-elevated)'
                  : 'transparent',
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: t.dot,
              }}
            />

            {t.name}
          </motion.button>
        )
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function GrowthTree({
  progress = 0,
  streak = 0,
  totalResearchDays = 0,
  lastActiveDate = null,
  completedTrees = 0,

  // Watering eligibility
  lastWateredStreak = 0,
  canWater = false,
  waterMessage = '',

  onWater,
}) {
  // ───────────────────────────────────────────────────────────
  // STATE
  // ───────────────────────────────────────────────────────────

  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem(
          'fl_tree_theme'
        ) || 'classic'
      )
    } catch {
      return 'classic'
    }
  })

  const [isWatering, setIsWatering] =
    useState(false)

  const [showCelebrate, setShowCelebrate] =
    useState(false)

  const [waterFlash, setWaterFlash] =
    useState(false)

  const prevProgress =
    useRef(progress)

  // ───────────────────────────────────────────────────────────
  // DERIVED STATE
  // ───────────────────────────────────────────────────────────

  const stage = getStage(progress)

  const daysMissed =
    getDaysSinceActive(lastActiveDate)

  const wiltLevel =
    getInactivityLevel(daysMissed)

  const quote =
    STAGE_QUOTES[stage]

  const inactMsg =
    INACTIVITY_MESSAGES[wiltLevel]

  const currentTheme =
    TREE_THEMES[theme] ??
    TREE_THEMES.classic

  // The actual eligibility rule.
  //
  // A user can only water once their streak has
  // increased beyond the streak they last watered at.
  const streakEligible =
    streak > lastWateredStreak

  const wateringAllowed =
    canWater && streakEligible

  // ───────────────────────────────────────────────────────────
  // TREE COMPLETION
  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (
      prevProgress.current < 100 &&
      progress >= 100
    ) {
      setShowCelebrate(true)
    }

    prevProgress.current = progress
  }, [progress])

  // ───────────────────────────────────────────────────────────
  // THEME
  // ───────────────────────────────────────────────────────────

  const handleThemeChange = (id) => {
    setTheme(id)

    try {
      localStorage.setItem(
        'fl_tree_theme',
        id
      )
    } catch {
      // Ignore localStorage errors.
    }
  }

  // ───────────────────────────────────────────────────────────
  // WATERING
  // ───────────────────────────────────────────────────────────

  const handleWater = () => {
    if (
      isWatering ||
      !wateringAllowed
    ) {
      return
    }

    setIsWatering(true)
    setWaterFlash(true)

    // Parent is responsible for updating
    // lastWateredStreak after successful watering.
    onWater?.()

    const flashTimer = setTimeout(() => {
      setWaterFlash(false)
    }, 1000)

    const wateringTimer = setTimeout(() => {
      setIsWatering(false)
    }, 2800)

    return () => {
      clearTimeout(flashTimer)
      clearTimeout(wateringTimer)
    }
  }

  // ───────────────────────────────────────────────────────────
  // BUTTON MESSAGE
  // ───────────────────────────────────────────────────────────

  const getWaterButtonText = () => {
    if (isWatering) {
      return 'Watering…'
    }

    if (wateringAllowed) {
      return 'Water your tree'
    }

    return 'Complete a research session'
  }

  const getWaterHelpText = () => {
    if (waterMessage) {
      return waterMessage
    }

    if (!streakEligible) {
      return 'Complete another research session to unlock watering.'
    }

    if (!canWater) {
      return 'Complete a research session to grow your tree.'
    }

    return ''
  }

  const waterHelpText =
    getWaterHelpText()

  // ───────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.2,
      }}
      className="rounded-3xl border border-border p-5 mt-5 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, rgba(37,99,235,0.05) 0%, rgba(16,185,129,0.04) 100%)',
      }}
    >
      {/* Celebration overlay */}
      <CelebrationOverlay
        show={showCelebrate}
        onDone={() =>
          setShowCelebrate(false)
        }
      />

      {/* ─────────────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────────────── */}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-text-primary">
            FinLingo Growth
          </h3>

          <p className="text-xs text-text-muted mt-0.5">
            Your investing discipline grows
            with every session.
          </p>
        </div>

        <div className="flex items-center gap-1 text-orange-500 shrink-0">
          <Flame size={13} />

          <span className="text-xs font-semibold">
            {streak}-day streak
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          TREE
      ───────────────────────────────────────────────────── */}

      <div
        className={`relative transition-all duration-700 ${
          waterFlash
            ? 'brightness-110'
            : ''
        }`}
      >
        <TreeSVG
          stage={stage}
          theme={theme}
          wiltLevel={wiltLevel}
        />

        <WateringSequence
          isWatering={isWatering}
          themeColor={
            currentTheme.dot
          }
        />
      </div>

      {/* ─────────────────────────────────────────────────────
          STAGE
      ───────────────────────────────────────────────────── */}

      <div className="text-center mb-3">
        <span className="text-xs font-bold text-text-primary">
          {getStageName(stage)}
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────
          PROGRESS
      ───────────────────────────────────────────────────── */}

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">
            Research discipline
          </span>

          <span className="font-semibold text-text-primary">
            {Math.round(
              Math.min(
                Math.max(progress, 0),
                100
              )
            )}
            %
          </span>
        </div>

        <div
          className="h-2 rounded-full overflow-hidden"
          style={{
            background:
              'var(--border)',
          }}
        >
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${Math.min(
                Math.max(progress, 0),
                100
              )}%`,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
            }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #2563EB, ${currentTheme.dot})`,
            }}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          STATS
      ───────────────────────────────────────────────────── */}

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs mb-4">
        <div className="flex items-center gap-1 text-text-muted">
          <Flame
            size={12}
            className="text-orange-400"
          />

          <span>
            <span className="font-bold text-text-primary">
              {streak}
            </span>{' '}
            day streak
          </span>
        </div>

        {completedTrees > 0 && (
          <div className="flex items-center gap-1 text-text-muted">
            <TreePine
              size={12}
              className="text-emerald-500"
            />

            <span>
              <span className="font-bold text-text-primary">
                {completedTrees}
              </span>{' '}
              completed{' '}
              {completedTrees === 1
                ? 'tree'
                : 'trees'}
            </span>
          </div>
        )}

        {totalResearchDays > 0 && (
          <div className="text-text-muted">
            <span className="font-bold text-text-primary">
              {totalResearchDays}
            </span>{' '}
            research days
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────
          WATER BUTTON
      ───────────────────────────────────────────────────── */}

      <div className="flex flex-col items-center mb-3">
        <motion.button
          type="button"
          whileHover={
            wateringAllowed &&
            !isWatering
              ? { y: -1 }
              : {}
          }
          whileTap={
            wateringAllowed &&
            !isWatering
              ? { scale: 0.96 }
              : {}
          }
          onClick={handleWater}
          disabled={
            isWatering ||
            !wateringAllowed
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
            wateringAllowed
              ? 'border-border text-text-primary hover:border-blue-400 hover:bg-blue-50 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/5'
              : 'border-border text-text-muted cursor-not-allowed opacity-75'
          }`}
          style={{
            background:
              'var(--surface-elevated)',
          }}
        >
          <Droplets
            size={13}
            className={
              wateringAllowed
                ? 'text-blue-500'
                : 'text-text-muted'
            }
          />

          {getWaterButtonText()}
        </motion.button>

        {waterHelpText && (
          <AnimatePresence mode="wait">
            <motion.p
              key={waterHelpText}
              initial={{
                opacity: 0,
                y: 3,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -3,
              }}
              className="text-[10px] text-text-muted text-center mt-2 max-w-xs leading-relaxed"
            >
              {waterHelpText}
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────
          THEME SELECTOR
      ───────────────────────────────────────────────────── */}

      <ThemeSelector
        selected={theme}
        onChange={handleThemeChange}
      />

      {/* ─────────────────────────────────────────────────────
          INACTIVITY MESSAGE
      ───────────────────────────────────────────────────── */}

      <AnimatePresence>
        {inactMsg && (
          <motion.p
            initial={{
              opacity: 0,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 4,
            }}
            className="text-[11px] text-amber-600 dark:text-amber-400 text-center mt-3 leading-relaxed"
          >
            {inactMsg}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────
          STAGE QUOTE
      ───────────────────────────────────────────────────── */}

      <p className="text-[11px] text-text-muted text-center mt-2 italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </motion.div>
  )
}

