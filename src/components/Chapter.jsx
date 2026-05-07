import { motion } from 'framer-motion'

function MediaItem({ item }) {
  const sizeClass = `chapter__media-item chapter__media-item--${item.size || 'md'}`

  if (item.type === 'placeholder' || !item.src) {
    return (
      <div className={sizeClass}>
        <div className="placeholder">{item.label || 'photo coming'}</div>
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

export default function Chapter({ chapter }) {
  const cls = `chapter ${chapter.reverse ? 'chapter--reverse' : ''}`

  const fadeIn = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-15%' },
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
  }

  return (
    <section className="section" id={chapter.id}>
      <div className={cls}>
        <motion.div className="chapter__text" {...fadeIn}>
          <div className="chapter__meta">
            <span className="chapter__number">{chapter.eyebrow} · {chapter.number}</span>
            <h2
              className="chapter__title"
              dangerouslySetInnerHTML={{ __html: chapter.title }}
            />
          </div>

          <div className="chapter__body">
            {chapter.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {chapter.date && <p className="chapter__date">{chapter.date}</p>}

          {chapter.closingLine && (
            <p className="chapter__close">{chapter.closingLine}</p>
          )}
        </motion.div>

        <motion.div
          className="chapter__media"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        >
          {chapter.media.map((item, i) => (
            <MediaItem key={i} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
