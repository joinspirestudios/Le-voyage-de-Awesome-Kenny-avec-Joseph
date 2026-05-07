// All the copy, dates, and media references live here so Joseph can
// edit the words without touching components.

export const chapters = [
  {
    id: 'origin',
    number: 'I',
    title: 'How we found <em>each other</em>',
    eyebrow: 'Chapter One',
    body: [
      "There's a version of every love story where you can pinpoint the exact moment everything changed. Ours has more than one.",
      "Before the first date, before the first kiss, there was something quieter — a feeling that the room got smaller when you walked into it."
    ],
    closingLine: "I knew. I think I always knew.",
    date: 'Before we knew it was beginning',
    media: [
      { type: 'placeholder', size: 'lg', label: 'first photo together' },
      { type: 'placeholder', size: 'md', label: 'screenshot — that first message' },
      { type: 'placeholder', size: 'md', label: 'somewhere early' }
    ],
    reverse: false
  },
  {
    id: 'firsts',
    number: 'II',
    title: 'Our <em>firsts</em>',
    eyebrow: 'Chapter Two',
    body: [
      "I told you I loved you on June 3rd. I didn't kiss you until June 18th. Fifteen days of meaning it before I could prove it.",
      "First date — March 15th. First trip. First time you met my people. First time I met yours. A whole calendar of new things, all of them with you in them."
    ],
    closingLine: "You laughed for ten minutes straight that night. I think that's when I knew.",
    date: '15 March 2025 — 18 June 2025',
    media: [
      { type: 'placeholder', size: 'tall', label: 'first date' },
      { type: 'placeholder', size: 'tall', label: 'first kiss era' },
      { type: 'placeholder', size: 'lg', label: 'first trip' }
    ],
    reverse: true
  },
  {
    id: 'her-beauty',
    number: 'III',
    title: 'Her <em>beauty</em>',
    eyebrow: 'Chapter Three',
    body: [
      "This chapter is just for you. The way you tilt your head when you're thinking. The pineapple. The glasses. The way you look at me when you forget I'm looking back.",
      "I could write a thousand pages here and not finish."
    ],
    closingLine: "The most beautiful thing in any room you walk into is you.",
    date: 'Every single day',
    media: [
      { type: 'placeholder', size: 'tall', label: 'her, soft light' },
      { type: 'placeholder', size: 'tall', label: 'her, golden hour' },
      { type: 'placeholder', size: 'lg', label: 'her, laughing' }
    ],
    reverse: false
  },
  {
    id: 'adventures',
    number: 'IV',
    title: 'The places we <em>went</em>',
    eyebrow: 'Chapter Four',
    body: [
      "House hunting like we already knew. First staycation. The selfies in lobbies you said we didn't need. We needed them.",
      "Every trip a small experiment in being a us. Every trip we passed."
    ],
    closingLine: "You make Sundays feel like something.",
    date: 'A year of small expeditions',
    media: [
      { src: '/media/adventures/our-first-staycation.jpg', size: 'lg', label: 'Our first staycation' },
      { src: '/media/adventures/selfieeee.jpg', size: 'md', label: 'Selfie' },
      { src: '/media/adventures/my-ride-for-life.jpg', size: 'md', label: 'My ride for life' },
      { src: '/media/adventures/house-hunting.mp4', type: 'video', size: 'tall', label: 'House hunting' },
      { src: '/media/adventures/pxl_20251101_125729243.mp.jpg', size: 'tall', label: 'November' }
    ],
    reverse: true
  },
  {
    id: 'hard',
    number: 'V',
    title: 'The <em>hard</em> ones',
    eyebrow: 'Chapter Five',
    body: [
      "There were nights it didn't go well. The first big fight. The first time we didn't know if we were going to make it. The version of us in 2023 that didn't.",
      "And here we are anyway. Bruised, honest, still choosing this. The fights aren't the story. The coming back is."
    ],
    closingLine: "Love isn't the absence of hard nights. It's what happens the morning after.",
    date: 'The ones we don\'t talk about — and the one tonight',
    media: [
      { src: '/media/hard/last-date-2023-1-before-we-broke-up-the-first-time.jpg', size: 'md', label: 'Last date, 2023' },
      { src: '/media/hard/last-date-2023-2-before-we-broke-up-the-first-time.jpg', size: 'md', label: '' },
      { src: '/media/hard/first-relationship-fight.jpg', size: 'tall', label: 'First fight' },
      { src: '/media/hard/first-near-breakup-experience.jpg', size: 'tall', label: 'Near miss' }
    ],
    reverse: false
  }
]

// Friend videos. Joseph drops files into /public/media/friends/ and
// adds entries here. Posters are optional thumbnails.
export const friends = [
  // { name: 'Bola', role: 'Best friend', src: '/media/friends/bola.mp4', poster: '/media/friends/bola-poster.jpg' },
  // Empty for now — placeholders will render until you add entries.
]

export const proposalImage = '/media/proposal/flowers.jpg'

// The puzzle uses a single hero image of the two of you. Replace this
// with your favourite shared photo.
export const puzzleImage = '/media/adventures/selfieeee.jpg'

export const letterCopy = {
  paragraphs: [
    "Tonight we fought. And tonight, after, I sat down and finished this anyway — because the fight didn't change anything I came here to say.",
    "A year ago I didn't know how I'd feel today. I just knew I wanted to find out. And now I know: every version of you I've met this year, I'd choose again. The quiet one. The loud one. The one who doesn't want to talk yet. The one who finally does.",
    "I never asked you properly. I'm asking you now."
  ],
  signoff: "— J."
}

export const introCopy = {
  preName: 'For',
  name: 'Kenny.',
  line: 'A year, written down. Headphones on, please.',
  cta: 'Begin'
}

export const audioTracks = {
  intro: { src: '/media/audio/intro.mp3', title: 'Intro' },
  origin: { src: '/media/audio/origin.mp3', title: 'How we found each other' },
  firsts: { src: '/media/audio/firsts.mp3', title: 'Sabrina Carpenter — Looking at Me' },
  'her-beauty': { src: '/media/audio/her-beauty.mp3', title: 'Ayra Starr — All the Love' },
  adventures: { src: '/media/audio/adventures.mp3', title: 'Davido — La La' },
  hard: { src: '/media/audio/hard.mp3', title: 'A quieter song' },
  puzzle: { src: '/media/audio/puzzle.mp3', title: 'Davido — 1 Milli' },
  friends: { src: '/media/audio/friends.mp3', title: 'Naira Marley — Opotoyi' },
  letter: { src: '/media/audio/letter.mp3', title: 'A song for you' },
  proposal: { src: '/media/audio/proposal.mp3', title: 'Yes' }
}
