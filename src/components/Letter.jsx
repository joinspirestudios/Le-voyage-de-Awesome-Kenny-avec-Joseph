import { motion } from 'framer-motion'
import { letterCopy } from '../data/content'

export default function Letter() {
  return (
    <section className="section letter" id="letter">
      <motion.div
        className="letter__paper"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="letter__body">
          {letterCopy.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + i * 0.4 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.div
          className="letter__sign"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          {letterCopy.signoff}
        </motion.div>
      </motion.div>
    </section>
  )
}
