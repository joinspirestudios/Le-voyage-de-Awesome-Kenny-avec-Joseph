import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { friends, extraClues } from '../data/content'
import ContinueButton from './ContinueButton'

const placeholderFriends = [
  { name: 'A friend', role: 'still recording' },
  { name: 'A friend', role: 'sending now' },
  { name: 'A friend', role: 'somewhere far' },
  { name: 'A friend', role: 'writing it down' },
  { name: 'A friend', role: 'in the studio' }
]

export default function FriendsAlbum({ onCollectClue, collected, onContinue }) {
  const list = friends.length > 0 ? friends : placeholderFriends
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(null)

  const go = useCallback((delta) => {
    setActive(a => {
      const next = a + delta
      if (next < 0) return 0
      if (next >= list.length) return list.length - 1
      return next
    })
  }, [list.length])

  // Touch swipe
  useEffect(() => {
    let startX = null
    const onStart = (e) => { startX = e.touches[0].clientX }
    const onEnd = (e) => {
      if (startX === null) return
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      startX = null
    }
    const el = document.querySelector('.coverflow')
    if (!el) return
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [go])

  const cardTransform = (i) => {
    const offset = i - active
    const abs = Math.abs(offset)
    if (abs > 3) return { transform: 'translateX(0) translateZ(-1500px) rotateY(0)', opacity: 0, pointerEvents: 'none' }
    const x = offset * 220
    const z = -abs * 240
    const rotY = -offset * 32
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.5 : 0.2
    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg)`,
      opacity,
      zIndex: 10 - abs
    }
  }

  const activeFriend = list[active] || {}

  return (
    <section className="section friends">
      <motion.div
        className="friends__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow">Chapter Eight</p>
        <h2 className="friends__title">The people who <em>love you</em>.</h2>
      </motion.div>

      {/* Editorial italic name above the active card — Blank Studio style */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <h3 className="friends__active-name">{activeFriend.name}</h3>
          <p className="friends__active-role">{activeFriend.role || 'tap to play'}</p>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="coverflow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.4 }}
      >
        <div className="coverflow__track">
          {list.map((friend, i) => {
            const style = cardTransform(i)
            const isActive = i === active
            return (
              <motion.div
                key={i}
                className="coverflow__card"
                style={style}
                onClick={() => {
                  if (isActive && friend.src) setPlaying(friend)
                  else setActive(i)
                }}
                whileHover={isActive ? { scale: 1.02 } : {}}
              >
                {friend.poster
                  ? <img src={friend.poster} alt={friend.name} />
                  : friend.src
                    ? <video src={friend.src} muted preload="metadata" />
                    : <div className="placeholder">
                        <div className="placeholder__inner">
                          <div className="placeholder__icon">♥</div>
                          <div className="placeholder__label">{friend.name}</div>
                        </div>
                      </div>
                }
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <div className="coverflow__nav">
        <button className="coverflow__btn" onClick={() => go(-1)} disabled={active === 0} aria-label="previous">‹</button>
        <span className="coverflow__counter">{active + 1} / {list.length}</span>
        <button className="coverflow__btn" onClick={() => go(1)} disabled={active === list.length - 1} aria-label="next">›</button>
      </div>

      <p className="coverflow__hint">click side cards to focus · tap centred card to play</p>

      {/* Clue button for friends */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
        <button
          type="button"
          onClick={onCollectClue}
          disabled={collected}
          className={`chapter__clue ${collected ? 'chapter__clue--collected' : ''}`}
        >
          {collected ? `kept — ${extraClues.friends}` : `keep ${extraClues.friends}`}
        </button>
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div
            className="video-modal"
            onClick={() => setPlaying(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <video
              src={playing.src}
              autoPlay
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ContinueButton onClick={onContinue} />
    </section>
  )
}
