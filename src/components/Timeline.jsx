import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineEvents, extraClues } from '../data/content'
import ContinueButton from './ContinueButton'

function TimelineEvent({ event, onClick }) {
  return (
    <div className="timeline__event" onClick={() => onClick(event)}>
      <div className={`timeline__card timeline__card--${event.color || 'sand'}`}>
        <span className="timeline__year">{event.year}</span>
        <span className="timeline__cardTitle">{event.title}</span>
        <span className="timeline__cardBody">{event.body}</span>
      </div>
      <div className="timeline__node" />
    </div>
  )
}

export default function Timeline({ onCollectClue, collected, onContinue }) {
  const [active, setActive] = useState(null)

  // Duplicate the events so the auto-scroll loop is seamless
  const looped = [...timelineEvents, ...timelineEvents]

  return (
    <section className="section timeline">
      <motion.div
        className="timeline__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow">Chapter Four · A life</p>
        <h2 className="timeline__title">Kenny — <em>twenty-three years</em></h2>
        <p className="timeline__sub">
          From 2003 to right now. Hover to slow it down. Tap any year to step inside.
        </p>
      </motion.div>

      <motion.div
        className="timeline__rail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      >
        <div className="timeline__track">
          {looped.map((event, i) => (
            <TimelineEvent key={i} event={event} onClick={setActive} />
          ))}
        </div>
      </motion.div>

      <p className="timeline__hint">hover to pause · click any to expand</p>

      {/* Clue button for the timeline page */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
        <motion.button
          type="button"
          onClick={onCollectClue}
          disabled={collected}
          className={`chapter__clue ${collected ? 'chapter__clue--collected' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {collected
            ? `kept — ${extraClues.timeline}`
            : `keep ${extraClues.timeline}`}
        </motion.button>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="timeline-modal"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="timeline-modal__inner"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="timeline-modal__close" onClick={() => setActive(null)}>×</button>
              <span className="timeline-modal__year">{active.year}</span>
              <h3 className="timeline-modal__title">{active.title}</h3>
              <p className="timeline-modal__body">
                {active.body}
                <br /><br />
                <span style={{ color: 'var(--c-gold-soft)', fontSize: '14px', letterSpacing: '0.04em' }}>
                  (we'll write this together as you tell me more.)
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinueButton onClick={onContinue} />
    </section>
  )
}
