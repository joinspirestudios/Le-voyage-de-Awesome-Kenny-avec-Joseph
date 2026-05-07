# For Kenny — Year One

An interactive anniversary site. React + Vite, deploys to Vercel in one click.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Where to drop content

Everything lives in `public/media/` so URLs stay simple. **Filenames must use lowercase, hyphens, no spaces, no special characters** (`our-first-staycation.jpg`, not `Our First Staycation!.jpg`).

```
public/media/
├── origin/         ← how you met
├── firsts/         ← first date, first kiss era
├── her-beauty/     ← the chapter just for her
├── adventures/     ← trips, outings (already populated)
├── hard/           ← the difficult moments (already populated)
├── friends/        ← friend video files
├── letter/         ← optional photo for the letter
├── proposal/       ← optional flowers photo (otherwise an SVG renders)
└── audio/          ← background music per chapter
```

## How to add photos and videos to a chapter

Edit `src/data/content.js`. Find the chapter, edit the `media` array.

```js
media: [
  { src: '/media/adventures/our-first-staycation.jpg', size: 'lg', label: 'Our first staycation' },
  { src: '/media/adventures/house-hunting.mp4', type: 'video', size: 'tall', label: 'House hunting' },
  { type: 'placeholder', size: 'md', label: 'photo coming' }
]
```

Sizes: `lg` (full row), `md` (half), `tall` (half, taller), `sm` (third).

For videos: convert `.MOV` to `.mp4` and compress before adding. One liner:

```bash
ffmpeg -i input.MOV -vf "scale=1080:-2" -c:v libx264 -preset slow -crf 24 -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## How to add friend videos

1. Put video files in `public/media/friends/` (e.g. `bola.mp4`).
2. Open `src/data/content.js`, find `export const friends = [`.
3. Add an entry per friend:

```js
export const friends = [
  { name: 'Bola', src: '/media/friends/bola.mp4', poster: '/media/friends/bola-poster.jpg' },
  { name: 'Sarah', src: '/media/friends/sarah.mp4' }
]
```

`poster` is optional — a still frame to show before play. If omitted, a placeholder card shows the name.

## How to add music

1. Drop MP3s in `public/media/audio/`. Recommended: 5–8 tracks.
2. Open `src/data/content.js`, find `audioTracks`. Update the `src` and `title` for each chapter key. The audio swaps automatically as she scrolls.
3. **iOS Safari blocks autoplay until first interaction.** That's why music starts only after she taps "Begin" on the intro.

Track keys (already mapped to sections):
- `intro`, `origin`, `firsts`, `her-beauty`, `adventures`, `hard`, `puzzle`, `friends`, `letter`, `proposal`

## How to edit copy

All chapter text and the letter live in `src/data/content.js`. Edit there, save, and Vite will hot-reload. No component touching needed.

The flower-box question text is in `src/components/Proposal.jsx` (`Will you be my girlfriend?` and the subtitle).

## How to change the puzzle photo

Edit `puzzleImage` in `src/data/content.js`. Use a square or near-square photo of you two — the puzzle is 3×3.

```js
export const puzzleImage = '/media/adventures/selfieeee.jpg'
```

## Deploy to Vercel

```bash
git init
git add .
git commit -m "for kenny"
# push to a new GitHub repo, then import in Vercel
```

In Vercel: framework preset is **Vite**, build command `npm run build`, output `dist`. Environment variables: none needed.

## What renders before content is added

Empty chapters show elegant placeholder cards with grain texture. The site works end-to-end immediately. Replace placeholders chapter by chapter as content arrives.

## Timeline checklist

- [ ] origin photos in `/media/origin/` and entries added
- [ ] firsts photos in `/media/firsts/` and entries added
- [ ] her-beauty photos in `/media/her-beauty/` and entries added
- [ ] adventures: video compressed (already done — `house-hunting.mp4`)
- [ ] hard: HEIC converted (already done) and reviewed
- [ ] friend videos collected and entries added
- [ ] music dropped in `/media/audio/`
- [ ] letter copy reviewed in `content.js`
- [ ] puzzle image confirmed
- [ ] deployed to Vercel
- [ ] tested on her actual iPhone in Safari
