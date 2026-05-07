import { motion } from 'framer-motion'
import { introCopy, heroPhotos } from '../data/content'

// SVG hero — three layers in order, bottom to top:
//   1. Black background
//   2. White "Kenny" text — gives the visible white letterforms
//   3. Photos clipped to the same text shape — when a photo fades in, it
//      "replaces" the white inside that letterform with the photo
export default function Intro({ onBegin }) {
  return (
    <section className="section hero">
      <motion.div
        className="hero__svgwrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, ease: [0.65, 0, 0.35, 1] }}
      >
        <svg
          viewBox="0 0 1600 600"
          className="hero__svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="kennyMask">
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                fontFamily="Fraunces, serif"
                fontSize="600"
                fontWeight="600"
                fontStyle="italic"
                letterSpacing="-30"
              >
                Kenny
              </text>
            </clipPath>
          </defs>

          {/* Layer 1 — black background */}
          <rect width="100%" height="100%" fill="#1a0a0a" />

          {/* Layer 2 — visible white text (the base letterforms) */}
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fontFamily="Fraunces, serif"
            fontSize="600"
            fontWeight="600"
            fontStyle="italic"
            letterSpacing="-30"
            fill="#f5efe6"
          >
            Kenny
          </text>

          {/* Layer 3 — photos clipped to text shape, animating in/out
                       on top of the white letters */}
          <g clipPath="url(#kennyMask)">
            {heroPhotos.map((p, i) => (
              <motion.image
                key={i}
                href={p.src}
                xlinkHref={p.src}
                x={`${p.x}%`}
                y={`${p.y}%`}
                width={`${p.w}%`}
                preserveAspectRatio="xMidYMid slice"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 4,
                  delay: p.delay,
                  repeat: Infinity,
                  repeatDelay: Math.max(2, heroPhotos.length * 1.2 - 4),
                  times: [0, 0.15, 0.85, 1],
                  ease: 'easeInOut'
                }}
              />
            ))}
          </g>
        </svg>
      </motion.div>

      <motion.p
        className="hero__sub"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.4 }}
      >
        {introCopy.line}
      </motion.p>

      <motion.button
        type="button"
        onClick={onBegin}
        className="hero__begin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 2.2 }}
      >
        <span>{introCopy.cta}</span>
      </motion.button>

      <motion.p
        className="hero__hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.6, delay: 3.0 }}
      >
        use ← → to navigate
      </motion.p>
    </section>
  )
}
