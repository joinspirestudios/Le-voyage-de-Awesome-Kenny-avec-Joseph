// All copy, dates, and media references live here. Edit freely.

export const introCopy = {
  preName: 'For',
  name: 'Kenny',
  line: 'A year, written down. Headphones on, please.',
  cta: 'Begin'
}

// Hero photos that "pop" through the letterforms of "Kenny" on the intro.
// x, y are % within the SVG; w is width %. delay staggers the cycle.
// Drop final hero photos into /public/media/hero/ and update src here.
export const heroPhotos = [
  { src: '/media/adventures/selfieeee.jpg',           x: 18, y: 35, w: 22, delay: 0 },
  { src: '/media/adventures/our-first-staycation.jpg', x: 36, y: 50, w: 18, delay: 1.4 },
  { src: '/media/adventures/my-ride-for-life.jpg',     x: 52, y: 30, w: 20, delay: 2.8 },
  { src: '/media/adventures/pxl_20251101_125729243.mp.jpg', x: 70, y: 48, w: 18, delay: 4.0 },
  { src: '/media/adventures/pxl_20251101_154452325.jpg',    x: 28, y: 55, w: 20, delay: 5.2 },
  { src: '/media/adventures/selfieeee.jpg',                  x: 60, y: 38, w: 22, delay: 6.4 },
  { src: '/media/adventures/our-first-staycation.jpg',       x: 44, y: 44, w: 16, delay: 7.6 }
]

// Video 5 layout — text centered at top, media grid below.
// Used for: Origin, Firsts, Adventures, Hard.
export const chapters = [
  {
    id: 'origin',
    number: 'I',
    eyebrow: 'Chapter One',
    title: 'How we found <em>each other</em>',
    body: [
      "There's a version of every love story where you can pinpoint the exact moment everything changed. Ours has more than one.",
      "Before the first date, before the first kiss, there was something quieter — a feeling that the room got smaller when you walked into it."
    ],
    closingLine: "I knew. I think I always knew.",
    date: 'Before we knew it was beginning',
    media: [
      { type: 'placeholder', label: 'first photo together' },
      { type: 'placeholder', label: 'that first message' },
      { type: 'placeholder', label: 'somewhere early' },
      { type: 'placeholder', label: 'a small moment' },
      { type: 'placeholder', label: 'another' },
      { type: 'placeholder', label: 'and another' },
      { type: 'placeholder', label: 'and another' },
      { type: 'placeholder', label: 'and another' }
    ],
    clueLabel: 'a screenshot you sent me'
  },
  {
    id: 'firsts',
    number: 'II',
    eyebrow: 'Chapter Two',
    title: 'Our <em>firsts</em>',
    body: [
      "I told you I loved you on June 3rd. I didn't kiss you until June 18th. Fifteen days of meaning it before I could prove it.",
      "First date — March 15th. First trip. First time you met my people. First time I met yours. A whole calendar of new things, all of them with you in them."
    ],
    closingLine: "You laughed for ten minutes straight that night. I think that's when I knew.",
    date: '15 March 2025 — 18 June 2025',
    media: [
      { type: 'placeholder', label: 'first date' },
      { type: 'placeholder', label: 'first kiss era' },
      { type: 'placeholder', label: 'first trip' },
      { type: 'placeholder', label: 'first I-love-you' },
      { type: 'placeholder', label: '...' },
      { type: 'placeholder', label: '...' },
      { type: 'placeholder', label: '...' },
      { type: 'placeholder', label: '...' }
    ],
    clueLabel: 'a polaroid from the first night'
  },
  {
    id: 'adventures',
    number: 'V',
    eyebrow: 'Chapter Five',
    title: 'The places we <em>went</em>',
    body: [
      "House hunting like we already knew. First staycation. The selfies in lobbies you said we didn't need. We needed them.",
      "Every trip a small experiment in being a us. Every trip we passed."
    ],
    closingLine: "You make Sundays feel like something.",
    date: 'A year of small expeditions',
    media: [
      { src: '/media/adventures/our-first-staycation.jpg', label: 'Our first staycation' },
      { src: '/media/adventures/selfieeee.jpg', label: 'Selfie' },
      { src: '/media/adventures/my-ride-for-life.jpg', label: 'My ride for life' },
      { src: '/media/adventures/house-hunting.mp4', type: 'video', label: 'House hunting' },
      { src: '/media/adventures/pxl_20251101_125729243.mp.jpg', label: 'November' },
      { src: '/media/adventures/pxl_20251101_154452325.jpg', label: 'November' },
      { type: 'placeholder', label: 'add more' },
      { type: 'placeholder', label: 'add more' }
    ],
    clueLabel: 'a ticket stub'
  },
  {
    id: 'hard',
    number: 'VI',
    eyebrow: 'Chapter Six',
    title: 'The <em>hard</em> ones',
    body: [
      "There were nights it didn't go well. The first big fight. The first time we didn't know if we were going to make it. The version of us in 2023 that didn't.",
      "And here we are anyway. Bruised, honest, still choosing this. The fights aren't the story. The coming back is."
    ],
    closingLine: "Love isn't the absence of hard nights. It's what happens the morning after.",
    date: 'The ones we don\'t talk about — and the one tonight',
    media: [
      { src: '/media/hard/last-date-2023-1-before-we-broke-up-the-first-time.jpg', label: 'Last date, 2023' },
      { src: '/media/hard/last-date-2023-2-before-we-broke-up-the-first-time.jpg', label: '' },
      { src: '/media/hard/first-relationship-fight.jpg', label: 'First fight' },
      { src: '/media/hard/first-near-breakup-experience.jpg', label: 'Near miss' },
      { src: '/media/hard/last-date-2023-3-before-we-broke-up-the-first-time.jpg', label: '' },
      { type: 'placeholder', label: 'tonight' },
      { type: 'placeholder', label: 'tomorrow morning' },
      { type: 'placeholder', label: 'and the day after' }
    ],
    clueLabel: 'the morning after'
  }
]

// Video 6 layout — split-screen with two big panels + center thumb strip.
// Used for: Her Beauty, Us.
export const splitChapters = [
  {
    id: 'her-beauty',
    number: 'III',
    eyebrow: 'Chapter Three',
    title: 'Her <em>beauty</em>',
    body: [
      "This chapter is just for you. The way you tilt your head when you're thinking. The pineapple. The glasses. The way you look at me when you forget I'm looking back."
    ],
    closingLine: "The most beautiful thing in any room you walk into is you.",
    date: 'Every single day',
    leftPanel: { type: 'placeholder', label: 'her, soft light', caption: 'morning' },
    rightPanel: { type: 'placeholder', label: 'her, golden hour', caption: 'evening' },
    thumbs: [
      { type: 'placeholder', label: 'one' },
      { type: 'placeholder', label: 'two' },
      { type: 'placeholder', label: 'three' },
      { type: 'placeholder', label: 'four' },
      { type: 'placeholder', label: 'five' }
    ],
    clueLabel: 'the pineapple'
  },
  {
    id: 'us',
    number: 'IV',
    eyebrow: 'Chapter Four',
    title: 'The shape of <em>us</em>',
    body: [
      "There's a version of me that exists only when you're in the room. Softer. Slower. More honest. I like him better than the one I bring everywhere else.",
      "We made a small private language out of a year — pineapple, fish, the handshake nobody else knows. It's the smallest thing and the biggest one."
    ],
    closingLine: "Whatever this is, it's mine to protect. Ours.",
    date: 'Year one and counting',
    leftPanel: { type: 'placeholder', label: 'us, somewhere quiet', caption: 'just us' },
    rightPanel: { type: 'placeholder', label: 'us, mid-laugh', caption: 'still just us' },
    thumbs: [
      { type: 'placeholder', label: 'one' },
      { type: 'placeholder', label: 'two' },
      { type: 'placeholder', label: 'three' },
      { type: 'placeholder', label: 'four' },
      { type: 'placeholder', label: 'five' }
    ],
    clueLabel: 'a song that\'s ours'
  }
]

// Timeline of Kenny's life. Auto-scrolls horizontally; hover pauses; click opens detail.
export const timelineEvents = [
  { year: 2003, title: 'A girl arrives in Lagos', body: 'You start.', color: 'oxblood' },
  { year: 2008, title: 'First memory', body: '(she will tell you what to put here.)', color: 'sand' },
  { year: 2012, title: 'A school year that mattered', body: '...', color: 'cream' },
  { year: 2016, title: 'A turning point', body: '...', color: 'oxblood' },
  { year: 2019, title: 'A version of you I never met', body: '...', color: 'sand' },
  { year: 2021, title: 'Becoming who you are', body: '...', color: 'cream' },
  { year: 2023, title: 'The first time we tried', body: 'And the first time we ended.', color: 'oxblood' },
  { year: 2025, title: 'We tried again, properly', body: 'March 15. The day everything restarted.', color: 'gold' },
  { year: 2026, title: 'Year one', body: 'Where we are now. Where this site lives.', color: 'gold' },
  { year: '...', title: 'Everything next', body: 'Every win, every line, every "I told you so" — written here, in time.', color: 'cream' }
]

// Friend videos
export const friends = [
  // { name: 'Bola', src: '/media/friends/bola.mp4', poster: '/media/friends/bola-poster.jpg', role: 'Best friend' },
]

export const herLetters = [
  { id: 1, excerpt: 'placeholder — drop a scan or paste an excerpt', date: '2025', color: 'sand', tilt: -4 },
  { id: 2, excerpt: 'her words, in her hand', date: '2025', color: 'cream', tilt: 3 },
  { id: 3, excerpt: 'kept on your nightstand', date: '2025', color: 'oxblood', tilt: -2 },
  { id: 4, excerpt: 'add as many as you have', date: '2025', color: 'sand', tilt: 5 }
]

export const longMessage = {
  eyebrow: 'For Kenny — read slowly',
  title: 'Everything I should have said <em>out loud</em>',
  paragraphs: [
    "I'm not good at saying things in the moment. You've noticed. Half the things I feel about you only ever make it to a notes app at 2 a.m., and even then I delete the soft parts before morning.",
    "So this is me saying them properly, in the place I'm best — written down, taking my time, knowing you'll read it more than once.",
    "You changed the texture of my year. I notice things now I didn't notice before. I make decisions differently. There's a small voice in the back of my head that asks what you'd think, and I'm grateful for it — it makes me a person I like better.",
    "Tonight didn't go the way either of us wanted. And I sat down after, and I kept building. Because none of it changes what I came here to say, and none of it changes that I'd choose this — choose you — again.",
    "A year in, knowing what I know now, all of it: yes."
  ],
  signoff: '— Always, J.',
  orbitPhotos: [
    '/media/adventures/selfieeee.jpg',
    '/media/adventures/our-first-staycation.jpg',
    '/media/adventures/my-ride-for-life.jpg',
    '/media/adventures/pxl_20251101_125729243.mp.jpg',
    '/media/adventures/pxl_20251101_154452325.jpg',
    '/media/adventures/selfieeee.jpg',
    '/media/adventures/our-first-staycation.jpg',
    '/media/adventures/my-ride-for-life.jpg'
  ]
}

export const audioTracks = {
  intro: { src: '/media/audio/intro.mp3', title: 'Intro' },
  origin: { src: '/media/audio/origin.mp3', title: 'How we found each other' },
  firsts: { src: '/media/audio/firsts.mp3', title: 'Sabrina Carpenter — Looking at Me' },
  'her-beauty': { src: '/media/audio/her-beauty.mp3', title: 'Ayra Starr — All the Love' },
  us: { src: '/media/audio/us.mp3', title: 'Ours' },
  timeline: { src: '/media/audio/timeline.mp3', title: 'Her years' },
  adventures: { src: '/media/audio/adventures.mp3', title: 'Davido — La La' },
  hard: { src: '/media/audio/hard.mp3', title: 'A quieter song' },
  puzzle: { src: '/media/audio/puzzle.mp3', title: 'Davido — 1 Milli' },
  friends: { src: '/media/audio/friends.mp3', title: 'Naira Marley — Opotoyi' },
  letters: { src: '/media/audio/letters.mp3', title: 'Her words' },
  message: { src: '/media/audio/message.mp3', title: 'Mine' },
  proposal: { src: '/media/audio/proposal.mp3', title: 'Yes' }
}

// Page order — 13 pages now, with Us inserted after Her Beauty.
export const pageOrder = [
  { key: 'intro', kind: 'intro' },
  { key: 'origin', kind: 'chapter', index: 0 },
  { key: 'firsts', kind: 'chapter', index: 1 },
  { key: 'her-beauty', kind: 'split', index: 0 },
  { key: 'us', kind: 'split', index: 1 },
  { key: 'timeline', kind: 'timeline' },
  { key: 'adventures', kind: 'chapter', index: 2 },
  { key: 'hard', kind: 'chapter', index: 3 },
  { key: 'puzzle', kind: 'puzzle' },
  { key: 'friends', kind: 'friends' },
  { key: 'letters', kind: 'letters' },
  { key: 'message', kind: 'message' },
  { key: 'proposal', kind: 'proposal' }
]

// Pages where a clue can be collected
export const cluePages = ['origin', 'firsts', 'her-beauty', 'us', 'timeline', 'adventures', 'hard', 'friends', 'letters', 'message']

export const extraClues = {
  timeline: 'a year that wasn\'t mine to keep',
  friends: 'something a friend said',
  letters: 'a line you wrote me',
  message: 'the part that made you cry'
}

export const puzzleImage = '/media/adventures/selfieeee.jpg'
export const proposalImage = '/media/proposal/joseph-rose.jpg'
