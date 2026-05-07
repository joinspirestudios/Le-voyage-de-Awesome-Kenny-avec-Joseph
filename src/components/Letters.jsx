import { motion } from 'framer-motion'
import { herLetters, extraClues } from '../data/content'
import ContinueButton from './ContinueButton'

function Note({ letter, index }) {
  const colorClass = `note--${letter.color || 'sand'}`
  const tilt = letter.tilt ?? ((index % 2 === 0) ? -3 : 3)

  if (letter.image) {
    return (
      <motion.div
        className={`note note--image`}
        style={{ transform: `rotate(${tilt}deg)` }}
        initial={{ opacity: 0, y: 30, rotate: tilt - 6 }}
        animate={{ opacity: 1, y: 0, rotate: tilt }}
        transition={{ duration: 1.2, delay: 0.1 * index, ease: [0.65, 0, 0.35, 1] }}
        whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
      >
        <img src={letter.image} alt={`Letter ${letter.id}`} />
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`note ${colorClass}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      initial={{ opacity: 0, y: 30, rotate: tilt - 6 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ duration: 1.2, delay: 0.1 * index, ease: [0.65, 0, 0.35, 1] }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
    >
      <div>{letter.excerpt}</div>
      <div className="note__date">{letter.date}</div>
    </motion.div>
  )
}

export default function Letters({ onCollectClue, collected, onContinue }) {
  return (
    <section className="section letters">
      <motion.div
        className="letters__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow">Chapter Nine</p>
        <h2 className="letters__title">Everything <em>you</em> wrote me.</h2>
        <p className="letters__sub">
          I kept all of them. Every voice note, every napkin, every text I screenshot before you could change your mind.
        </p>
      </motion.div>

      <div className="letters__board">
        {herLetters.map((letter, i) => (
          <Note key={letter.id} letter={letter} index={i} />
        ))}
      </div>

      <button
        type="button"
        onClick={onCollectClue}
        disabled={collected}
        className={`chapter__clue ${collected ? 'chapter__clue--collected' : ''}`}
      >
        {collected ? `kept — ${extraClues.letters}` : `keep ${extraClues.letters}`}
      </button>

      <ContinueButton onClick={onContinue} />
    </section>
  )
}
