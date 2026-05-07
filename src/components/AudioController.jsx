import { useEffect, useRef, useState } from 'react'
import { audioTracks } from '../data/content'

export default function AudioController({ enabled, pageKey }) {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [trackError, setTrackError] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const audio = audioRef.current
    if (!audio) return

    const track = audioTracks[pageKey]
    if (!track) return

    let cancelled = false

    const fadeOut = () => new Promise(resolve => {
      const startVol = audio.volume
      const steps = 12
      let i = 0
      const tick = () => {
        if (cancelled) return resolve()
        i++
        audio.volume = Math.max(0, startVol * (1 - i / steps))
        if (i < steps) setTimeout(tick, 30)
        else resolve()
      }
      tick()
    })

    const fadeIn = () => {
      const target = muted ? 0 : 0.42
      const steps = 18
      let i = 0
      const tick = () => {
        if (cancelled) return
        i++
        audio.volume = Math.min(target, (target * i) / steps)
        if (i < steps) setTimeout(tick, 60)
      }
      tick()
    }

    ;(async () => {
      await fadeOut()
      if (cancelled) return
      audio.src = track.src
      audio.volume = 0
      try {
        await audio.play()
        setTrackError(false)
        fadeIn()
      } catch {
        setTrackError(true)
      }
    })()

    return () => { cancelled = true }
  }, [pageKey, enabled, muted])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    const newMuted = !muted
    setMuted(newMuted)
    audio.volume = newMuted ? 0 : 0.42
    if (!newMuted && audio.paused) {
      try { await audio.play() } catch {}
    }
  }

  if (!enabled) return null

  const label = audioTracks[pageKey]?.title || ''

  return (
    <>
      <audio ref={audioRef} loop preload="auto" />
      <button
        className={`audio ${muted ? 'audio--muted' : ''}`}
        onClick={toggle}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        <span className="audio__dot" />
        <span className="audio__label">
          {trackError ? 'tap to play music' : (muted ? 'muted' : label)}
        </span>
      </button>
    </>
  )
}
