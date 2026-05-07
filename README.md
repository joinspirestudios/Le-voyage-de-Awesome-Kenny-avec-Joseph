# For Kenny — Year One

A 12-page interactive anniversary site. Inspired by Blank Studio's restraint:
massive serif type, slow motion, intentional space.

## Architecture

12 pages, no overlap. Keyboard ← → to navigate. No on-screen page counter —
each page has its own subtle "next ↓" arrow at the bottom.

1. **Intro** — Massive italic "Kenny" with photos clipped to letterforms (BLANK reference)
2. **Origin** — How we found each other (chapter)
3. **Firsts** — First date, first kiss, first I-love-you (chapter)
4. **Her Beauty** — Just for her (chapter)
5. **Timeline** — Her life from 2003 to now. Auto-scrolling, hover to pause, click to expand. Built to grow with her.
6. **Adventures** — Where we went (chapter — has real photos + house-hunting video)
7. **Hard** — The fights, the breakup, the coming back (chapter — has real photos)
8. **Puzzle** — 3×3 sliding puzzle. More clues you collected, easier the puzzle.
9. **Friends** — 3D coverflow of friend-video birthday wishes, editorial italic name above active card
10. **Letters** — Sticky-note board of things she wrote
11. **Message** — A long letter from Joseph, with photos orbiting around it
12. **Proposal** — Animated rose box → "Will you be my girlfriend? Properly this time."

## What you need to drop in (`/public/media/`)

```
hero/01.jpg, 02.jpg, 03.jpg, 04.jpg     ← photos that pop through letterforms
origin/                                  ← chapter media (any number, edit content.js)
firsts/                                  ← same
her-beauty/                              ← same
adventures/                              ← already populated
hard/                                    ← already populated
friends/<name>.mp4 + <name>-poster.jpg   ← then add entries to friends[] in content.js
letters/                                 ← scans (set image: "/media/letters/x.jpg" on each note)
proposal/joseph-rose.jpg                 ← falls back to SVG flower box if missing
audio/intro.mp3 ... proposal.mp3         ← one MP3 per page key, crossfades on transition
```

## What to edit (`src/data/content.js`)

Single source of truth. Edit:
- `heroPhotos` — which photos pop through the "Kenny" letters and where on the canvas
- `chapters` — text + media for each chapter (replace `placeholder` items with real `src`)
- `timelineEvents` — Kenny's milestones. Keep adding as years go by.
- `friends` — once you have all video clips
- `herLetters` — her words
- `longMessage` — rewrite in your own voice + drop more orbital photos
- `audioTracks` — the playlist per page

## Running it

```bash
npm install
npm run dev      # local
npm run build    # production into /dist
```

## Deploy

Vercel root directory: project root. Build command: `npm run build`. Output: `dist`.

## Notes

- Music does not autoplay until user clicks "Begin" on the intro (iOS Safari rule).
- Each page transition is `mode="wait"` — no overlap.
- Continue arrow appears at bottom of every page except intro and proposal. Keyboard arrows also work.
- Clue buttons are on every storytelling page. Each clue collected makes the puzzle on page 8 easier.
- Timeline auto-scrolls horizontally; pauses on hover; click any event for a detail modal.
- Long message has up to 8 photos drifting in an elliptical orbit around the centered text.
- Friends coverflow has italic-serif name above the active card (Blank Studio editorial style).
- Test on Kenny's actual iPhone before sharing.

## File map

```
src/
  App.jsx              ← page routing, keyboard nav, clue collection state
  main.jsx
  styles.css           ← all styling
  data/content.js      ← all copy + media references
  components/
    Intro.jsx          ← SVG hero with letter-clipped photos
    Chapter.jsx        ← reusable chapter w/ premium placeholders
    Timeline.jsx       ← auto-scrolling life timeline
    Puzzle.jsx         ← sliding puzzle, clue-aware shuffle
    FriendsAlbum.jsx   ← 3D coverflow + editorial italic name
    Letters.jsx        ← sticky-note board
    LongMessage.jsx    ← orbital photos around centered text
    Proposal.jsx       ← rose box + no-button trap + final yes
    AudioController.jsx
    ContinueButton.jsx ← reusable bottom-of-page next arrow
public/media/          ← all photos / videos / audio go here
```
