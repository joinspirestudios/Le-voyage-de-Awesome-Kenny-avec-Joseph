import { useEffect, useRef, useState } from 'react'
import { audioTracks } from '../data/content'

// Detects which chapter section is in view via IntersectionObserver,
// fades into the appropriate track. Tap the pill to mute/unmute.
export default function AudioController({ enabled }) {
  const audioRef = useRef(null)
  const [currentKey, setCurrentKey] = useState('intro')
  const [muted, setMuted] = useState(false)
  const [trackError, setTrackError] = useState(false)

  // Watch all sections with ids and detect which is most visible
  useEffect(() => {
    if (!enabled) return

    const sections = Object.keys(audioTracks)
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        let best = null
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (best && best.isIntersecting && best.target.id !== currentKey) {
          setCurrentKey(best.target.id)
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    )

    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [enabled, currentKey])

  // When track key changes, fade out, swap source, fade in
  useEffect(() => {
    if (!enabled) return
    const audio = audioRef.current
    if (!audio) return

    const track = audioTracks[currentKey]
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
      const target = muted ? 0 : 0.45
      const steps = 16
      let i = 0
      const tick = () => {
        if (cancelled) return
        i++
        audio.volume = Math.min(target, (target * i) / steps)
        if (i < steps) setTimeout(tick, 50)
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
      } catch (err) {
        // Autoplay blocked — user needs interaction. Show muted state.
        setTrackError(true)
      }
    })()

    return () => { cancelled = true }
  }, [currentKey, enabled, muted])

  // Toggle mute
  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    const newMuted = !muted
    setMuted(newMuted)
    audio.volume = newMuted ? 0 : 0.45
    if (!newMuted && audio.paused) {
      try { await audio.play() } catch {}
    }
  }

  if (!enabled) return null

  const label = audioTracks[currentKey]?.title || ''

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
