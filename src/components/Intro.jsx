import { motion } from 'framer-motion'
import { introCopy } from '../data/content'

export default function Intro({ onBegin }) {
  return (
    <section className="section intro">
      <motion.div
        initial={{ opacity: 0, letterSpacing: '0.4em' }}
        animate={{ opacity: 1, letterSpacing: '-0.03em' }}
        transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
        className="intro__name"
      >
        {introCopy.preName} <em>{introCopy.name}</em>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="intro__line"
      >
        {introCopy.line}
      </motion.p>

      <motion.button
        type="button"
        onClick={onBegin}
        className="intro__begin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 2.4 }}
      >
        <span>{introCopy.cta}</span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.6, delay: 3.2 }}
        className="intro__hint"
      >
        scroll slowly
      </motion.p>
    </section>
  )
}
