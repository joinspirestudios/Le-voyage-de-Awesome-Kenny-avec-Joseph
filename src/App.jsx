import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import Chapter from './components/Chapter'
import Puzzle from './components/Puzzle'
import FriendsWall from './components/FriendsWall'
import Letter from './components/Letter'
import Proposal from './components/Proposal'
import AudioController from './components/AudioController'
import { chapters } from './data/content'

export default function App() {
  const [started, setStarted] = useState(false)
  const journeyRef = useRef(null)

  const begin = () => {
    setStarted(true)
    // give the journey a moment to mount, then scroll into view
    setTimeout(() => {
      journeyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  const scrollToProposal = () => {
    document.getElementById('friends')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Split chapters: first three before puzzle, rest after.
  // Order: origin → firsts → her-beauty → [puzzle] → adventures → hard → friends → letter → proposal
  const beforePuzzle = chapters.filter(c => ['origin', 'firsts', 'her-beauty'].includes(c.id))
  const afterPuzzle = chapters.filter(c => ['adventures', 'hard'].includes(c.id))

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!started && <Intro key="intro" onBegin={begin} />}
      </AnimatePresence>

      {started && (
        <motion.div
          ref={journeyRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {beforePuzzle.map(c => <Chapter key={c.id} chapter={c} />)}

          <Puzzle onContinue={scrollToProposal} />

          {afterPuzzle.map(c => <Chapter key={c.id} chapter={c} />)}

          <FriendsWall />

          <Letter />

          <Proposal />
        </motion.div>
      )}

      <AudioController enabled={started} />
    </div>
  )
}
