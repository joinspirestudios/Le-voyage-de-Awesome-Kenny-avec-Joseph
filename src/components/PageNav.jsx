import { motion } from 'framer-motion'

export default function PageNav({ pageIdx, total, onNext, onPrev, currentKey }) {
  return (
    <motion.div
      className="pagenav"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <button
        className="pagenav__btn"
        onClick={onPrev}
        disabled={pageIdx === 0}
        aria-label="previous"
      >‹</button>

      <span className="pagenav__counter">{pageIdx} / {total - 1}</span>

      <button
        className="pagenav__btn"
        onClick={onNext}
        disabled={pageIdx === total - 1}
        aria-label="next"
      >›</button>
    </motion.div>
  )
}
