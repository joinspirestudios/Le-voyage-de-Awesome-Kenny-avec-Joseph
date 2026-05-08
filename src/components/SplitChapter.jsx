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

function PanelMedia({ item, index, big = false }) {
  if (item.type === 'placeholder' || !item.src) {
    return <Placeholder label={item.label} index={index} />
  }
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        muted
        loop
        autoPlay={big}
        playsInline
        preload="metadata"
      />
    )
  }
  return <img src={item.src} alt={item.label || ''} loading="lazy" />
}

// Video 6 layout: full-bleed split-screen with two big panels side-by-side
// and a thumb strip suspended in the center between them.
export default function SplitChapter({ chapter, onCollectClue, collected, onContinue }) {
  return (
    <section className="section split">
      {/* Title block — minimal, top */}
      <motion.div
        className="split__head"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <p className="eyebrow">{chapter.eyebrow} · {chapter.number}</p>
        <h2
          className="split__title"
          dangerouslySetInnerHTML={{ __html: chapter.title }}
        />
      </motion.div>

      {/* The split-screen visual core */}
      <motion.div
        className="split__stage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      >
        <div className="split__panel split__panel--left">
          <PanelMedia item={chapter.leftPanel} index={0} big />
          {chapter.leftPanel?.caption && (
            <div className="split__caption">
              <span className="split__caption-name">{chapter.leftPanel.caption}</span>
              <span className="split__caption-meta">/ {chapter.id}</span>
            </div>
          )}
        </div>

        {/* Thumb strip — positioned centered, overlapping both panels */}
        <div className="split__thumbs">
          {(chapter.thumbs || []).map((thumb, i) => (
            <motion.div
              key={i}
              className="split__thumb"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 + i * 0.12 }}
            >
              <PanelMedia item={thumb} index={i + 2} />
              <span className="split__thumb-num">{String(i + 1).padStart(2, '0')}</span>
            </motion.div>
          ))}
        </div>

        <div className="split__panel split__panel--right">
          <PanelMedia item={chapter.rightPanel} index={1} big />
          {chapter.rightPanel?.caption && (
            <div className="split__caption">
              <span className="split__caption-name">{chapter.rightPanel.caption}</span>
              <span className="split__caption-meta">/ {chapter.id}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Body block below the visual stage */}
      <motion.div
        className="split__body"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        {chapter.body.map((p, i) => <p key={i}>{p}</p>)}

        {chapter.date && <p className="split__date">{chapter.date}</p>}

        {chapter.closingLine && (
          <p className="split__close">{chapter.closingLine}</p>
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

      <ContinueButton onClick={onContinue} />
    </section>
  )
}
