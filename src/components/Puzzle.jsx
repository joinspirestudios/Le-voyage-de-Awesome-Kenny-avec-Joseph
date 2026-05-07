import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { puzzleImage } from '../data/content'

// Classic 3x3 sliding puzzle. Tile 8 is the blank.
const SIZE = 3
const SOLVED = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const BLANK = 8

function shuffle() {
  // Generate a solvable shuffle by doing N random valid moves from solved
  let tiles = [...SOLVED]
  let blank = 8
  for (let i = 0; i < 80; i++) {
    const moves = neighbors(blank)
    const next = moves[Math.floor(Math.random() * moves.length)]
    ;[tiles[blank], tiles[next]] = [tiles[next], tiles[blank]]
    blank = next
  }
  return tiles
}

function neighbors(idx) {
  const r = Math.floor(idx / SIZE)
  const c = idx % SIZE
  const out = []
  if (r > 0) out.push(idx - SIZE)
  if (r < SIZE - 1) out.push(idx + SIZE)
  if (c > 0) out.push(idx - 1)
  if (c < SIZE - 1) out.push(idx + 1)
  return out
}

function isSolved(tiles) {
  return tiles.every((v, i) => v === i)
}

export default function Puzzle({ onContinue }) {
  const [tiles, setTiles] = useState(() => shuffle())
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

  return (
    <section className="section puzzle" id="puzzle">
      <motion.div
        className="puzzle__intro"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow">A small thing</p>
        <h2 className="puzzle__title">Put us back <em>together</em>.</h2>
        <p className="puzzle__sub">
          Tap the tiles next to the empty square to slide them. Make the picture whole.
        </p>
      </motion.div>

      <motion.div
        className="puzzle__board"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        {tiles.map((value, idx) => {
          if (value === BLANK && !solved) {
            return <div key={idx} className="puzzle__tile puzzle__tile--blank" />
          }
          const r = Math.floor(value / SIZE)
          const c = value % SIZE
          // Each tile shows the part of the image at its "value" position
          const style = {
            backgroundImage: `url(${puzzleImage})`,
            backgroundPosition: `${(c / (SIZE - 1)) * 100}% ${(r / (SIZE - 1)) * 100}%`
          }
          return (
            <div
              key={idx}
              className="puzzle__tile"
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
        <button
          className="puzzle__shuffle"
          onClick={() => setTiles(shuffle())}
        >
          shuffle
        </button>
      )}
    </section>
  )
}
