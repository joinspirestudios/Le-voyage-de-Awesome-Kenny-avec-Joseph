import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Inline SVG flower box that "opens" to reveal flowers.
// No image asset required, but Joseph can swap in a real photo if he wants.
function Flowers({ open }) {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="rose" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a32424" />
          <stop offset="60%" stopColor="#5c1a1a" />
          <stop offset="100%" stopColor="#3d1010" />
        </radialGradient>
        <radialGradient id="leaf" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#3d2817" />
          <stop offset="100%" stopColor="#1a0a0a" />
        </radialGradient>
        <linearGradient id="boxFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c3522" />
          <stop offset="100%" stopColor="#2a1610" />
        </linearGradient>
        <linearGradient id="boxLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b4029" />
          <stop offset="100%" stopColor="#3d2817" />
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      {/* Bouquet — revealed when open */}
      <motion.g
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          y: open ? 0 : 30,
          scale: open ? 1 : 0.7
        }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: open ? 0.4 : 0 }}
        style={{ transformOrigin: '200px 220px' }}
      >
        {/* leaves */}
        <ellipse cx="140" cy="200" rx="40" ry="80" fill="url(#leaf)" transform="rotate(-30 140 200)" opacity="0.9" />
        <ellipse cx="260" cy="200" rx="40" ry="80" fill="url(#leaf)" transform="rotate(30 260 200)" opacity="0.9" />
        <ellipse cx="200" cy="170" rx="36" ry="84" fill="url(#leaf)" opacity="0.85" />

        {/* roses cluster */}
        <g>
          <circle cx="160" cy="200" r="36" fill="url(#rose)" />
          <circle cx="160" cy="200" r="20" fill="#3d1010" opacity="0.6" />
          <circle cx="160" cy="200" r="10" fill="#1a0606" opacity="0.7" />

          <circle cx="240" cy="200" r="36" fill="url(#rose)" />
          <circle cx="240" cy="200" r="20" fill="#3d1010" opacity="0.6" />
          <circle cx="240" cy="200" r="10" fill="#1a0606" opacity="0.7" />

          <circle cx="200" cy="170" r="42" fill="url(#rose)" />
          <circle cx="200" cy="170" r="24" fill="#3d1010" opacity="0.6" />
          <circle cx="200" cy="170" r="12" fill="#1a0606" opacity="0.7" />

          <circle cx="180" cy="240" r="30" fill="url(#rose)" />
          <circle cx="180" cy="240" r="16" fill="#3d1010" opacity="0.6" />

          <circle cx="225" cy="245" r="28" fill="url(#rose)" />
          <circle cx="225" cy="245" r="14" fill="#3d1010" opacity="0.6" />
        </g>
      </motion.g>

      {/* Box base (always visible) */}
      <rect x="80" y="240" width="240" height="120" fill="url(#boxFront)" rx="4" />
      <rect x="80" y="240" width="240" height="6" fill="#c9a66b" opacity="0.5" />

      {/* Lid — flips open */}
      <motion.g
        initial={false}
        animate={{ rotateX: open ? -150 : 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: '200px 240px', transformBox: 'fill-box' }}
      >
        <rect x="78" y="220" width="244" height="24" fill="url(#boxLid)" rx="3" />
        <rect x="78" y="220" width="244" height="3" fill="#c9a66b" opacity="0.6" />
        {/* Ribbon detail */}
        <rect x="190" y="220" width="20" height="24" fill="#c9a66b" opacity="0.7" />
      </motion.g>

      {/* Tag */}
      <g opacity="0.7">
        <rect x="140" y="320" width="120" height="34" fill="#f5efe6" opacity="0.95" rx="2" />
        <text x="200" y="342" fontFamily="serif" fontSize="14" fill="#5c1a1a" textAnchor="middle" fontStyle="italic">For Kenny</text>
      </g>
    </svg>
  )
}

function Petals() {
  return (
    <div className="proposal__petals">
      {Array.from({ length: 18 }).map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 8
        const dur = 8 + Math.random() * 10
        const size = 10 + Math.random() * 14
        return (
          <span
            key={i}
            className="petal"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`
            }}
          />
        )
      })}
    </div>
  )
}

export default function Proposal() {
  const [boxOpen, setBoxOpen] = useState(false)
  const [answered, setAnswered] = useState(null) // 'yes' | 'no' | null
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  // After mounting, open the box automatically with a delay
  useEffect(() => {
    const t = setTimeout(() => setBoxOpen(true), 1400)
    return () => clearTimeout(t)
  }, [])

  // Make the "no" button run away when hovered/touched
  const dodgeNo = () => {
    const x = (Math.random() - 0.5) * 300
    const y = (Math.random() - 0.5) * 200
    setNoPosition({ x, y })
  }

  return (
    <section className="section proposal" id="proposal">
      <Petals />

      <motion.div
        className="proposal__box"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="proposal__flowers">
          <Flowers open={boxOpen} />
        </div>

        <motion.h2
          className="proposal__question"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: boxOpen ? 1 : 0, y: boxOpen ? 0 : 16 }}
          transition={{ duration: 1.4, delay: 1.6 }}
        >
          Will you <em>be my girlfriend?</em>
        </motion.h2>

        <motion.p
          className="proposal__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: boxOpen ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
        >
          Properly this time. The way you wanted me to ask.
        </motion.p>

        <motion.div
          className="proposal__choices"
          initial={{ opacity: 0 }}
          animate={{ opacity: boxOpen ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 2.6 }}
        >
          <button
            className="proposal__btn proposal__btn--yes"
            onClick={() => setAnswered('yes')}
          >
            Yes
          </button>
          <motion.button
            className="proposal__btn proposal__btn--no"
            onMouseEnter={dodgeNo}
            onTouchStart={dodgeNo}
            onClick={dodgeNo}
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            No
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {answered === 'yes' && (
          <motion.div
            className="proposal__final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
          >
            <motion.h2
              className="proposal__final-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
            >
              Yes.
            </motion.h2>
            <motion.p
              className="proposal__final-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.2 }}
            >
              Then I'm yours, properly. For year two, and the ones after.
            </motion.p>
            <motion.p
              className="proposal__final-hand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 2.2 }}
            >
              Happy anniversary, fish.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
