import { motion } from 'framer-motion'

export default function ContinueButton({ onClick, label = 'next' }) {
  return (
    <motion.button
      type="button"
      className="continue"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.6 }}
    >
      <span>{label}</span>
      <span className="continue__arrow">↓</span>
    </motion.button>
  )
}
