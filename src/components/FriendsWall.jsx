import { useState } from 'react'
import { motion } from 'framer-motion'
import { friends } from '../data/content'

function FriendCard({ friend, onPlay }) {
  return (
    <motion.div
      className="friend-card"
      onClick={() => onPlay(friend)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
    >
      {friend.poster
        ? <img src={friend.poster} alt={friend.name} />
        : <div className="placeholder">{friend.name}</div>
      }
      <div className="friend-card__overlay">
        <span className="friend-card__name">{friend.name}</span>
        <span className="friend-card__role">tap to play</span>
      </div>
    </motion.div>
  )
}

function PlaceholderCard({ index }) {
  const labels = [
    'a friend, coming soon',
    'still recording',
    "she's writing it now",
    'a voice note from far away'
  ]
  return (
    <div className="friend-card">
      <div className="placeholder">{labels[index % labels.length]}</div>
    </div>
  )
}

export default function FriendsWall() {
  const [playing, setPlaying] = useState(null)

  const list = friends.length > 0 ? friends : null

  return (
    <section className="section friends" id="friends">
      <motion.div
        className="friends__head"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow">Chapter Six</p>
        <h2 className="friends__title">The people who <em>love you</em>.</h2>
        <p className="friends__sub">
          Tap any card. They came to say something.
        </p>
      </motion.div>

      <div className="friends__grid">
        {list
          ? list.map((f, i) => <FriendCard key={i} friend={f} onPlay={setPlaying} />)
          : Array.from({ length: 4 }).map((_, i) => <PlaceholderCard key={i} index={i} />)
        }
      </div>

      {playing && (
        <div
          onClick={() => setPlaying(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
            zIndex: 9991, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', cursor: 'pointer'
          }}
        >
          <video
            src={playing.src}
            autoPlay
            controls
            playsInline
            style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '4px' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
