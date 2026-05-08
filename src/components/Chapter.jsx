import { motion } from 'framer-motion'
import ContinueButton from './ContinueButton'

function Placeholder({ label, index }) {
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

function MediaTile({ item, index }) {
  if (item.type === 'placeholder' || !item.src) {
    return (
      <div className="chapter-v__tile">
        <Placeholder label={item.label} index={index} />
      </div>
    )
  }

  if (item.type === 'video') {
    return (
      <div className="chapter-v__tile">
        <video
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={e => e.currentTarget.play().catch(() => {})}
          onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
        />
      </div>
    )
  }

  return (
    <div className="chapter-v__tile">
      <img src={item.src} alt={item.label || ''} loading="lazy" />
    </div>
  )
}

// Video 5 layout: title block centered at top, media grid in horizontal rows below.
export default function Chapter({ chapter, onCollectClue, collected, onContinue }) {
  return (
    <section className="section chapter-v">
      {/* Top text block — centered */}
      <motion.div
        className="chapter-v__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <p className="eyebrow">{chapter.eyebrow} · {chapter.number}</p>
        <h2
          className="chapter-v__title"
          dangerouslySetInnerHTML={{ __html: chapter.title }}
        />

        <div className="chapter-v__body">
          {chapter.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {chapter.date && <p className="chapter-v__date">{chapter.date}</p>}

        {chapter.closingLine && (
          <p className="chapter-v__close">{chapter.closingLine}</p>
        )}

        {chapter.clueLabel && (
          <button
            type="button"
            onClick={onCollectClue}
            disabled={collected}
            className={`chapter__clue ${collected ? 'chapter__clue--collected' : ''}`}
          >
            {collected ? `kept — ${chapter.clueLabel}` : `keep ${chapter.clueLabel}`}
          </button>
        )}
      </motion.div>

      {/* Media grid below — Video 5 reference */}
      <motion.div
        className="chapter-v__grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
      >
        {chapter.media.map((item, i) => (
          <MediaTile key={i} item={item} index={i} />
        ))}
      </motion.div>

      <ContinueButton onClick={onContinue} />
    </section>
  )
}
