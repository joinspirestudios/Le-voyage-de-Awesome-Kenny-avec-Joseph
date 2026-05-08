import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Intro from './components/Intro'
import Chapter from './components/Chapter'
import SplitChapter from './components/SplitChapter'
import Timeline from './components/Timeline'
import Puzzle from './components/Puzzle'
import FriendsAlbum from './components/FriendsAlbum'
import Letters from './components/Letters'
import LongMessage from './components/LongMessage'
import Proposal from './components/Proposal'
import AudioController from './components/AudioController'
import { chapters, splitChapters, pageOrder, cluePages } from './data/content'

const pageVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 }
}

export default function App() {
  const [pageIdx, setPageIdx] = useState(0)
  const [collectedClues, setCollectedClues] = useState({})

  const current = pageOrder[pageIdx]

  const goNext = useCallback(() => {
    setPageIdx(i => Math.min(i + 1, pageOrder.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setPageIdx(i => Math.max(i - 1, 0))
  }, [])

  const collectClue = useCallback((pageKey) => {
    setCollectedClues(prev => ({ ...prev, [pageKey]: true }))
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') goNext()
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pageIdx])

  const totalCluesAvailable = cluePages.length
  const cluesCollected = Object.keys(collectedClues).length

  const renderPage = () => {
    if (current.kind === 'intro') return <Intro key="intro" onBegin={goNext} />
    if (current.kind === 'chapter') {
      const chapter = chapters[current.index]
      return (
        <Chapter
          key={chapter.id}
          chapter={chapter}
          onCollectClue={() => collectClue(chapter.id)}
          collected={!!collectedClues[chapter.id]}
          onContinue={goNext}
        />
      )
    }
    if (current.kind === 'split') {
      const chapter = splitChapters[current.index]
      return (
        <SplitChapter
          key={chapter.id}
          chapter={chapter}
          onCollectClue={() => collectClue(chapter.id)}
          collected={!!collectedClues[chapter.id]}
          onContinue={goNext}
        />
      )
    }
    if (current.kind === 'timeline') {
      return (
        <Timeline
          key="timeline"
          onCollectClue={() => collectClue('timeline')}
          collected={!!collectedClues['timeline']}
          onContinue={goNext}
        />
      )
    }
    if (current.kind === 'puzzle') {
      return <Puzzle key="puzzle" cluesCollected={cluesCollected} totalClues={totalCluesAvailable} onContinue={goNext} />
    }
    if (current.kind === 'friends') {
      return <FriendsAlbum key="friends" onCollectClue={() => collectClue('friends')} collected={!!collectedClues['friends']} onContinue={goNext} />
    }
    if (current.kind === 'letters') {
      return <Letters key="letters" onCollectClue={() => collectClue('letters')} collected={!!collectedClues['letters']} onContinue={goNext} />
    }
    if (current.kind === 'message') {
      return <LongMessage key="message" onCollectClue={() => collectClue('message')} collected={!!collectedClues['message']} onContinue={goNext} />
    }
    if (current.kind === 'proposal') return <Proposal key="proposal" />
    return null
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.key}
          className="page"
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
            y: { duration: 1.1, ease: [0.65, 0, 0.35, 1] }
          }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <AudioController enabled={pageIdx > 0} pageKey={current.key} />
    </div>
  )
}
