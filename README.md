# For Kenny — Year One

A 13-page interactive anniversary site. Inspired by Blank Studio's restraint:
massive serif type, slow motion, intentional space.

## Architecture

13 pages, no overlap. Keyboard ← → to navigate. Each page has a subtle "next ↓" arrow at the bottom.

1. **Intro** — 3 portrait videos as triptych behind massive italic "Kenny"
2. **Origin** (Chapter I) — How we found each other (2022 → early 2024)
3. **Firsts** (Chapter II) — Our firsts (2025+)
4. **Her Beauty** (Chapter III) — Split-screen, click-to-swap
5. **Us** (Chapter IV) — Split-screen, click-to-swap
6. **Timeline** — Her life from 2003 to now. Auto-scrolls horizontally.
7. **Adventures** (Chapter V) — Where we went
8. **Hard** (Chapter VI) — The fights, the breakup, the coming back
9. **Puzzle** — 3×3 sliding puzzle. More clues collected, easier the puzzle.
10. **Friends** — 3D coverflow of friend videos (Bolu, Ope so far)
11. **Letters** — Sticky-note board of things she wrote
12. **Message** — A long letter, with photos orbiting around it
13. **Proposal** — Animated rose box → "Will you be my girlfriend? Properly this time."

## Layouts

### Video 5 layout (chapters: Origin, Firsts, Adventures, Hard)
- Title block centered at top: eyebrow + serif title + body paragraphs + closing line + clue button
- **Two horizontally-marqueeing rows of square media tiles below**
- Top row scrolls left, bottom row scrolls right
- **Hover any row to pause it. Click any tile to open fullscreen.**
- Edge fade masks make the marquee feel infinite.

### Video 6 layout (Her Beauty, Us)
- Title block at top
- **Two big full-bleed panels side-by-side**
- **Center thumb strip with all media — scrollable horizontally**
- **Click a thumb to swap it into one of the big panels** (alternates left/right)
- **Click either big panel to open fullscreen.** Active thumbs glow gold.
- Body text below the visual stage, with date + closing line + clue button.

### Lightbox (everywhere)
- Click any image or video tile → opens in fullscreen with a dim backdrop and close button.
- Press Esc, click outside, or hit × to close.

## What's already wired in (`/public/media/`)

```
hero/         3 portrait videos (img-5253, img-5252, img-5250) — playing on Intro
origin/       17 items — 2022/2024 era photos + "her first apartment" video
firsts/       15 items — first date, first kiss video, first marathon, etc.
her-beauty/   18 items — portraits + "in the wind" video
us/           21 items — including "Our Custom Handshake" video, first christmas, marathon
adventures/   18 items — staycation, house hunting, lots of small clips
hard/         9 items  — last dates 2023, first fight (with video)
friends/      Bolu.mp4, Ope-2.mp4 (2 of 4 — remaining 2 pending)
quiet/        14 intimate captioned shots — drives the orbital photos in the long message
proposal/     joseph-rose.jpg (drop in your own; falls back to animated SVG)
audio/        empty (drop one MP3 per page key)
letters/      empty (drop scans + update herLetters[] in content.js)
timeline/     empty (timeline page is text-driven currently)
```

## What you still need to do

- **Re-write the long message** (`longMessage.paragraphs` in `content.js`) in your voice
- **Fill the timeline** (`timelineEvents` in `content.js`) with Kenny's actual milestones
- **Add the remaining 2 friend videos** to `/public/media/friends/` and update `friends[]` in `content.js`
- **Drop letter scans** into `/public/media/letters/` and update `herLetters[]` if you want her actual handwriting visible
- **Drop your "rose-in-mouth" photo** as `/public/media/proposal/joseph-rose.jpg` (otherwise SVG fallback shows)
- **Drop one audio file per page** into `/public/media/audio/` — names match the keys: `intro.mp3`, `origin.mp3`, `firsts.mp3`, `her-beauty.mp3`, `us.mp3`, `timeline.mp3`, `adventures.mp3`, `hard.mp3`, `puzzle.mp3`, `friends.mp3`, `letters.mp3`, `message.mp3`, `proposal.mp3`. Crossfades automatically on page transition.

## Running it

```bash
npm install
npm run dev      # local
npm run build    # production into /dist
```

Vercel: root directory is project root. Build command: `npm run build`. Output: `dist`.

## File map

```
src/
  App.jsx              ← page routing, keyboard nav, clue collection
  main.jsx
  styles.css           ← all styling
  data/content.js      ← all copy + media references (the file you edit most)
  components/
    Intro.jsx          ← Hero with 3 portrait videos + Kenny title
    Chapter.jsx        ← Video 5 layout with marquee rails + lightbox
    SplitChapter.jsx   ← Video 6 layout with click-to-swap thumbs + lightbox
    Lightbox.jsx       ← Shared fullscreen media preview
    Timeline.jsx       ← Auto-scrolling life timeline
    Puzzle.jsx         ← Sliding puzzle, clue-aware shuffle
    FriendsAlbum.jsx   ← 3D coverflow + editorial italic name
    Letters.jsx        ← Sticky-note board
    LongMessage.jsx    ← Orbital photos around centered text
    Proposal.jsx       ← Rose box + no-button trap + final yes
    AudioController.jsx
    ContinueButton.jsx
public/media/          ← all photos / videos / audio (89 MB currently)
```

## Notes

- Music does not autoplay until user clicks "Begin" on the intro (iOS Safari rule).
- Each page transition is `mode="wait"` — no overlap.
- Continue arrow appears at bottom of every page except intro and proposal.
- Test on Kenny's actual iPhone before sharing.
