import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Intro from './components/Intro'
import Chapter from './components/Chapter'
import Puzzle from './components/Puzzle'
import FriendsAlbum from './components/FriendsAlbum'
import Letters from './components/Letters'
import LongMessage from './components/LongMessage'
import Proposal from './components/Proposal'
import AudioController from './components/AudioController'
import PageNav from './components/PageNav'
import { chapters, pageOrder } from './data/content'

const pageVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 }
}

export default function App() {
  const [pageIdx, setPageIdx] = useState(0)
  const [collectedClues, setCollectedClues] = useState({}) // chapterId -> true
  const [direction, setDirection] = useState(1)

  const current = pageOrder[pageIdx]

  const goNext = useCallback(() => {
    setDirection(1)
    setPageIdx(i => Math.min(i + 1, pageOrder.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setPageIdx(i => Math.max(i - 1, 0))
  }, [])

  const goTo = useCallback((key) => {
    const idx = pageOrder.findIndex(p => p.key === key)
    if (idx >= 0) {
      setDirection(idx > pageIdx ? 1 : -1)
      setPageIdx(idx)
    }
  }, [pageIdx])

  const collectClue = useCallback((chapterId) => {
    setCollectedClues(prev => ({ ...prev, [chapterId]: true }))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') goNext()
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  // Reset scroll on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pageIdx])

  const totalCluesAvailable = chapters.length
  const cluesCollected = Object.keys(collectedClues).length

  const renderPage = () => {
    if (current.kind === 'intro') {
      return <Intro key="intro" onBegin={goNext} />
    }
    if (current.kind === 'chapter') {
      const chapter = chapters[current.index]
      return (
        <Chapter
          key={chapter.id}
          chapter={chapter}
          onCollectClue={() => collectClue(chapter.id)}
          collected={!!collectedClues[chapter.id]}
        />
      )
    }
    if (current.kind === 'puzzle') {
      return (
        <Puzzle
          key="puzzle"
          cluesCollected={cluesCollected}
          totalClues={totalCluesAvailable}
          onContinue={goNext}
        />
      )
    }
    if (current.kind === 'friends') return <FriendsAlbum key="friends" />
    if (current.kind === 'letters') return <Letters key="letters" />
    if (current.kind === 'message') return <LongMessage key="message" />
    if (current.kind === 'proposal') return <Proposal key="proposal" />
    return null
  }

  const showNav = pageIdx > 0 && current.kind !== 'proposal'

  return (
    <div className="app">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
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

      {showNav && (
        <PageNav
          pageIdx={pageIdx}
          total={pageOrder.length}
          onNext={goNext}
          onPrev={goPrev}
          currentKey={current.key}
        />
      )}

      <AudioController enabled={pageIdx > 0} pageKey={current.key} />
    </div>
  )
}
