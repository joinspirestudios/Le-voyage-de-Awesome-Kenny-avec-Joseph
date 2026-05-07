# For Kenny — Year One

An interactive anniversary site. React + Vite, deploys to Vercel.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. To preview on her iPhone over the same Wi-Fi:

```bash
npm run dev -- --host
```

then open the network URL it prints.

## How it works now (rebuilt)

**Page-by-page navigation, no overlap.** Only one page mounts at a time. Cinematic fade + lift transition between them. Navigation: ← → arrow keys, or the prev / next pill at the bottom of the screen.

**Page order:**
1. Intro — *For Kenny.*
2. Origin
3. Firsts
4. Her Beauty
5. Adventures
6. Hard
7. Puzzle (uses any clues she collected during chapters to pre-solve tiles)
8. Friends — 3D coverflow album, drag / arrows / tap centred card to play
9. Letters — sticky-note board of letters she's written you
10. Long Message — your letter to her
11. Proposal — flowers, the question, escalating "no"-button trap, final yes screen

**Clue collection.** Each chapter has a small "keep" button (e.g. *keep the pineapple*). When she taps it, the clue is collected. The more she keeps, the easier the puzzle is when she gets to it. If she keeps all 5, the puzzle solves in ~3 moves.

## Where to drop content

```
public/media/
├── origin/         ← chapter 1 photos
├── firsts/         ← chapter 2
├── her-beauty/     ← chapter 3
├── adventures/     ← already populated
├── hard/           ← already populated
├── friends/        ← friend video files (.mp4) and posters (.jpg)
├── letters/        ← scans / photos of her handwritten letters
├── proposal/       ← optional photo to swap in for the SVG flowers
└── audio/          ← background music per page (one mp3 per page key)
```

Filename rules: lowercase, hyphens, no spaces, no special characters.

## Editing copy

Everything lives in **`src/data/content.js`**. Edit the file, save, Vite hot-reloads.

- `chapters[]` — title, eyebrow, body paragraphs, closing line, date, media list, clue label
- `herLetters[]` — sticky notes (image scan or typed excerpt)
- `longMessage` — your letter to her
- `friends[]` — friend video entries
- `audioTracks` — file path and display title per page
- `pageOrder` — page sequence (only edit if you want to reorder or remove pages)
- `puzzleImage` — the photo the puzzle uses
- `proposalImage` — your "rose in mouth" photo when you generate it

## How to add photos / videos to a chapter

In `chapters[]`, edit the `media` array:

```js
media: [
  { src: '/media/origin/first-photo.jpg', size: 'lg', label: 'first photo' },
  { src: '/media/origin/clip.mp4', type: 'video', size: 'tall', label: '...' },
  { type: 'placeholder', size: 'md', label: 'photo coming' }
]
```

Sizes: `lg` (full row), `tall` (half, taller), `md` (half), `sm` (third).

## How to add friend videos

1. Put files in `public/media/friends/` — e.g. `bola.mp4`, `bola-poster.jpg`.
2. Add to `friends[]`:

```js
export const friends = [
  { name: 'Bola', role: 'Best friend', src: '/media/friends/bola.mp4', poster: '/media/friends/bola-poster.jpg' },
  { name: 'Sarah', role: 'University', src: '/media/friends/sarah.mp4' }
]
```

If `friends[]` is empty, placeholder cards still render so the 3D rotation works.

## How to add letters

In `herLetters[]`:

```js
{ id: 1, image: '/media/letters/letter-01.jpg', date: 'Apr 2025', tilt: -3 }       // photo of a letter
{ id: 2, excerpt: '...you make me brave', date: 'Jun 2025', color: 'sand', tilt: 3 } // typed excerpt
```

Colors: `sand`, `cream`, `oxblood`. Tilt is in degrees (-6 to 6 looks natural).

## How to add music

1. Drop MP3s in `public/media/audio/` (e.g. `intro.mp3`, `origin.mp3`, etc.).
2. Update `src` paths in `audioTracks` if you use different filenames.
3. Music starts only after she taps **Begin** (iOS autoplay policy).
4. Each page crossfades to the next track. Send individual files — don't pre-mix.

## Compress big videos

For any `.MOV` over ~10 MB:

```bash
ffmpeg -i input.MOV -vf "scale=1080:-2" -c:v libx264 -preset slow -crf 24 \
  -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## Deploy to Vercel

```bash
git init
git add .
git commit -m "for kenny"
# create a private GitHub repo, push, then in Vercel: New Project → Import
```

Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`. No env vars needed.

## Final checklist

- [ ] Origin photos added
- [ ] Firsts photos added
- [ ] Her Beauty photos added
- [ ] Friend videos collected and added
- [ ] Letter scans/excerpts added
- [ ] Long message reviewed in `content.js`
- [ ] Audio files (one per page key)
- [ ] Proposal photo (your rose-in-mouth shot) when ready
- [ ] Puzzle image confirmed
- [ ] Deployed to Vercel
- [ ] Tested on her iPhone in Safari
