import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { proposalImage } from '../data/content'

function FlowersSVG({ open }) {
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
      </defs>

      <motion.g
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 30, scale: open ? 1 : 0.7 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: open ? 0.4 : 0 }}
        style={{ transformOrigin: '200px 220px' }}
      >
        <ellipse cx="140" cy="200" rx="40" ry="80" fill="url(#leaf)" transform="rotate(-30 140 200)" opacity="0.9" />
        <ellipse cx="260" cy="200" rx="40" ry="80" fill="url(#leaf)" transform="rotate(30 260 200)" opacity="0.9" />
        <ellipse cx="200" cy="170" rx="36" ry="84" fill="url(#leaf)" opacity="0.85" />
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
      </motion.g>

      <rect x="80" y="240" width="240" height="120" fill="url(#boxFront)" rx="4" />
      <rect x="80" y="240" width="240" height="6" fill="#c9a66b" opacity="0.5" />

      <motion.g
        initial={false}
        animate={{ rotateX: open ? -150 : 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: '200px 240px', transformBox: 'fill-box' }}
      >
        <rect x="78" y="220" width="244" height="24" fill="url(#boxLid)" rx="3" />
        <rect x="78" y="220" width="244" height="3" fill="#c9a66b" opacity="0.6" />
        <rect x="190" y="220" width="20" height="24" fill="#c9a66b" opacity="0.7" />
      </motion.g>

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

const trapStages = [
  {
    title: 'Are you <em>sure?</em>',
    sub: "I drew flowers in code for you. I built ten pages. Click again. Carefully.",
    noText: "Yes I'm sure",
    yesText: 'Wait, actually yes',
    yesClass: ''
  },
  {
    title: 'But have you <em>considered</em>:',
    sub: "the pineapple. fish. our handshake. me, kneeling, with a rose in my mouth (technically). all of march fifteenth.",
    noText: "I considered. still no.",
    yesText: 'Okay fine, yes',
    yesClass: 'trap__yes--bigger'
  },
  {
    title: 'Last <em>chance</em>.',
    sub: "I will keep making these screens. I have nowhere else to be. The yes button is right there. It's the bigger one. It's been waiting.",
    noText: 'no thank you',
    yesText: 'YES (obviously)',
    yesClass: 'trap__yes--biggest'
  }
]

function ImageWithFallback({ src, fallback }) {
  const [errored, setErrored] = useState(false)
  if (errored) return fallback
  return (
    <img
      src={src}
      alt="proposal"
      onError={() => setErrored(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}

export default function Proposal() {
  const [boxOpen, setBoxOpen] = useState(false)
  const [trapStage, setTrapStage] = useState(-1)
  const [final, setFinal] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBoxOpen(true), 1400)
    return () => clearTimeout(t)
  }, [])

  const onYes = () => setFinal(true)
  const onNoFromMain = () => setTrapStage(0)
  const onNoFromTrap = () => {
    if (trapStage < trapStages.length - 1) setTrapStage(s => s + 1)
    else setTrapStage(0)
  }

  return (
    <section className="section proposal">
      <Petals />

      <motion.div
        className="proposal__box"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="proposal__hero">
          <ImageWithFallback src={proposalImage} fallback={<FlowersSVG open={boxOpen} />} />
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
          <button className="proposal__btn proposal__btn--yes" onClick={onYes}>Yes</button>
          <button className="proposal__btn proposal__btn--no" onClick={onNoFromMain}>No</button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {trapStage >= 0 && !final && (
          <motion.div
            className="trap"
            key={`trap-${trapStage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="trap__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: trapStages[trapStage].title }}
            />
            <motion.p
              className="trap__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {trapStages[trapStage].sub}
            </motion.p>

            <motion.div
              className="trap__choices"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <button className={`trap__yes ${trapStages[trapStage].yesClass}`} onClick={onYes}>
                {trapStages[trapStage].yesText}
              </button>
              <button
                className={`trap__no ${trapStage >= 1 ? 'trap__no--small' : ''} ${trapStage >= 2 ? 'trap__no--tiny' : ''}`}
                onClick={onNoFromTrap}
              >
                {trapStages[trapStage].noText}
              </button>
            </motion.div>

            {trapStage === trapStages.length - 1 && (
              <motion.p
                className="trap__hand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.6 }}
              >
                (just press the gold one, fish)
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {final && (
          <motion.div
            className="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
          >
            <motion.h2
              className="final__headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            >
              Yes.
            </motion.h2>
            <motion.p
              className="final__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.2 }}
            >
              Then I'm yours, properly. For year two, and the ones after.
            </motion.p>
            <motion.p
              className="final__hand"
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
