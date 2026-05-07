import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { puzzleImage } from '../data/content'

const SIZE = 3
const SOLVED = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const BLANK = 8

function neighbors(idx) {
  const r = Math.floor(idx / SIZE), c = idx % SIZE
  const out = []
  if (r > 0) out.push(idx - SIZE)
  if (r < SIZE - 1) out.push(idx + SIZE)
  if (c > 0) out.push(idx - 1)
  if (c < SIZE - 1) out.push(idx + 1)
  return out
}

function isSolved(tiles) { return tiles.every((v, i) => v === i) }

function shuffleWithClues(cluesCollected, totalClues) {
  const ratio = totalClues > 0 ? cluesCollected / totalClues : 0
  const moves = Math.max(3, Math.round(12 - ratio * 9))
  let tiles = [...SOLVED]
  let blank = 8
  for (let i = 0; i < moves; i++) {
    const opts = neighbors(blank)
    const next = opts[Math.floor(Math.random() * opts.length)]
    ;[tiles[blank], tiles[next]] = [tiles[next], tiles[blank]]
    blank = next
  }
  return tiles
}

export default function Puzzle({ cluesCollected = 0, totalClues = 9, onContinue }) {
  const [tiles, setTiles] = useState(() => shuffleWithClues(cluesCollected, totalClues))
  const solved = useMemo(() => isSolved(tiles), [tiles])
  const [showSolvedDelay, setShowSolvedDelay] = useState(false)

  useEffect(() => {
    if (solved) {
      const t = setTimeout(() => setShowSolvedDelay(true), 700)
      return () => clearTimeout(t)
    } else {
      setShowSolvedDelay(false)
    }
  }, [solved])

  const click = (idx) => {
    if (solved) return
    const blankIdx = tiles.indexOf(BLANK)
    if (!neighbors(blankIdx).includes(idx)) return
    const next = [...tiles]
    ;[next[blankIdx], next[idx]] = [next[idx], next[blankIdx]]
    setTiles(next)
  }

  const cluesCopy = cluesCollected === 0
    ? "you didn't keep any of the small things — that's okay, here's the whole picture"
    : cluesCollected === totalClues
    ? "you kept all of them. only a few moves left."
    : `you kept ${cluesCollected} of the small things. that helps.`

  return (
    <section className="section puzzle">
      <motion.div
        className="puzzle__intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow">A small thing</p>
        <h2 className="puzzle__title">Put us back <em>together</em>.</h2>
        <p className="puzzle__sub">
          Tap a tile next to the empty square to slide it. Make the picture whole.
        </p>
        <p className="puzzle__cluecount">{cluesCopy}</p>
      </motion.div>

      <motion.div
        className="puzzle__board"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        {tiles.map((value, idx) => {
          if (value === BLANK && !solved) {
            return <div key={idx} className="puzzle__tile puzzle__tile--blank" />
          }
          const r = Math.floor(value / SIZE)
          const c = value % SIZE
          const inPlace = value === idx
          const style = {
            backgroundImage: `url(${puzzleImage})`,
            backgroundPosition: `${(c / (SIZE - 1)) * 100}% ${(r / (SIZE - 1)) * 100}%`
          }
          return (
            <div
              key={idx}
              className={`puzzle__tile ${inPlace && !solved ? 'puzzle__tile--locked' : ''}`}
              style={style}
              onClick={() => click(idx)}
            />
          )
        })}

        <AnimatePresence>
          {solved && showSolvedDelay && (
            <motion.div
              className="puzzle__solved"
              style={{ backgroundImage: `url(${puzzleImage})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <motion.p
                className="puzzle__solved-line"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              >
                You put us together.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {solved ? (
        <motion.button
          className="puzzle__continue"
          onClick={onContinue}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
        >
          Keep going
        </motion.button>
      ) : (
        <button className="puzzle__shuffle" onClick={() => setTiles(shuffleWithClues(cluesCollected, totalClues))}>
          shuffle again
        </button>
      )}
    </section>
  )
}
