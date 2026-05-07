import { motion } from 'framer-motion'
import ContinueButton from './ContinueButton'

function Placeholder({ label, index }) {
  // Add a small corner number for editorial feel
  return (
    <div className="placeholder">
      <span className="placeholder__corner placeholder__corner--tl">{String(index + 1).padStart(2, '0')}</span>
      <span className="placeholder__corner placeholder__corner--br">drop here</span>
      <div className="placeholder__inner">
        <div className="placeholder__icon">+</div>
        <div className="placeholder__label">{label || 'photo coming'}</div>
      </div>
      <div className="placeholder__sweep" />
    </div>
  )
}

function MediaItem({ item, index }) {
  const sizeClass = `chapter__media-item chapter__media-item--${item.size || 'md'}`

  if (item.type === 'placeholder' || !item.src) {
    return (
      <div className={sizeClass}>
        <Placeholder label={item.label} index={index} />
      </div>
    )
  }

  if (item.type === 'video') {
    return (
      <div className={sizeClass}>
        <video src={item.src} muted loop playsInline preload="metadata"
          onMouseEnter={e => e.currentTarget.play().catch(() => {})}
          onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
        />
      </div>
    )
  }

  return (
    <div className={sizeClass}>
      <img src={item.src} alt={item.label || ''} loading="lazy" />
    </div>
  )
}

export default function Chapter({ chapter, onCollectClue, collected, onContinue }) {
  return (
    <section className="section">
      <div className="chapter">
        <motion.div className="chapter__text">
          <div className="chapter__meta">
            <span className="chapter__number">{chapter.eyebrow} · {chapter.number}</span>
            <motion.h2
              className="chapter__title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              dangerouslySetInnerHTML={{ __html: chapter.title }}
            />
          </div>

          <motion.div
            className="chapter__body"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {chapter.body.map((p, i) => <p key={i}>{p}</p>)}
          </motion.div>

          {chapter.date && (
            <motion.p
              className="chapter__date"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {chapter.date}
            </motion.p>
          )}

          {chapter.closingLine && (
            <motion.p
              className="chapter__close"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.0 }}
            >
              {chapter.closingLine}
            </motion.p>
          )}

          {chapter.clueLabel && (
            <motion.button
              type="button"
              onClick={onCollectClue}
              disabled={collected}
              className={`chapter__clue ${collected ? 'chapter__clue--collected' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              {collected ? `kept — ${chapter.clueLabel}` : `keep ${chapter.clueLabel}`}
            </motion.button>
          )}
        </motion.div>

        <motion.div
          className="chapter__media"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
        >
          {chapter.media.map((item, i) => (
            <MediaItem key={i} item={item} index={i} />
          ))}
        </motion.div>
      </div>

      <ContinueButton onClick={onContinue} />
    </section>
  )
}
