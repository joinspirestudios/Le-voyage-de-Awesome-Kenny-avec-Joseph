import { motion } from 'framer-motion'
import { longMessage, extraClues } from '../data/content'
import ContinueButton from './ContinueButton'

// Place N polaroid-style photos in a ring around the center of the page.
// Each one slowly orbits and bobs. Slightly tilted for a tossed-on-a-table feel.
function OrbitPhoto({ src, index, total }) {
  const angle = (index / total) * 2 * Math.PI
  const radius = 38 // % from center — gives the orbit shape
  const x = 50 + radius * Math.cos(angle)
  const y = 50 + radius * Math.sin(angle) * 0.7 // squish vertically for landscape pages
  const tilt = ((index * 137) % 24) - 12 // pseudo-random consistent tilt
  const orbitDur = 60 + (index % 3) * 8

  // Each photo orbits slowly and bobs independently
  return (
    <motion.div
      className={src ? 'orbit-photo' : 'orbit-photo orbit-photo--placeholder'}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${tilt}deg)`
      }}
      animate={{
        rotate: [tilt, tilt + 4, tilt - 3, tilt],
        y: [0, -10, 6, 0]
      }}
      transition={{
        duration: orbitDur / 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.4
      }}
    >
      {src
        ? <img src={src} alt="" loading="lazy" />
        : <span>a photo of us</span>
      }
    </motion.div>
  )
}

export default function LongMessage({ onCollectClue, collected, onContinue }) {
  const photos = longMessage.orbitPhotos || []

  return (
    <section className="section message">
      {/* Orbital photo layer behind the text */}
      <div className="message__orbit">
        {photos.map((src, i) => (
          <OrbitPhoto key={i} src={src} index={i} total={photos.length} />
        ))}
      </div>

      <div className="message__content">
        <motion.div
          className="message__head"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        >
          <p className="eyebrow">{longMessage.eyebrow}</p>
          <h2
            className="message__title"
            dangerouslySetInnerHTML={{ __html: longMessage.title }}
          />
        </motion.div>

        <div className="message__body">
          {longMessage.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.5 }}
            >
              {p}
            </motion.p>
          ))}

          <motion.div
            className="message__signoff"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6 + longMessage.paragraphs.length * 0.5 }}
          >
            {longMessage.signoff}
          </motion.div>
        </div>

        <button
          type="button"
          onClick={onCollectClue}
          disabled={collected}
          className={`chapter__clue ${collected ? 'chapter__clue--collected' : ''}`}
        >
          {collected ? `kept — ${extraClues.message}` : `keep ${extraClues.message}`}
        </button>
      </div>

      <ContinueButton onClick={onContinue} />
    </section>
  )
}
