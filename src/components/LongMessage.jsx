import { motion } from 'framer-motion'
import { longMessage } from '../data/content'

export default function LongMessage() {
  return (
    <section className="section message">
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
            transition={{ duration: 1.2, delay: 0.6 + i * 0.5, ease: [0.65, 0, 0.35, 1] }}
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
    </section>
  )
}
