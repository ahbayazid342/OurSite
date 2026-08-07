import { defaultThemeFonts } from './fonts'
import type { EditableContent } from '../types/content'

export const site = {
  brand: 'LoveBird',
  title: 'Welcome to Our Story',
  bangla: 'A quiet beginning that became forever',
  /** Anniversary month/day used for countdown (1-indexed month) */
  anniversary: { month: 3, day: 22 },
  marriageYear: 2026,
}

export const timeline = [
  {
    date: 'March 14, 2019',
    iso: '2019-03-14',
    title: 'First Meet',
    body: 'একটা সাধারণ দিনে তোমার হাসির সাথে আমার গল্প শুরু। That day the world felt quieter — and somehow brighter.',
  },
  {
    date: 'May 2, 2019',
    iso: '2019-05-02',
    title: 'First Date',
    body: 'Coffee, nerves, and conversations that refused to end. I knew then: I wanted more evenings just like this.',
  },
  {
    date: 'March 22, 2026',
    iso: '2026-03-22',
    title: 'Marriage',
    body: 'Two hearts, one promise. The day we said forever — and meant every word.',
  },
  {
    date: 'August 18, 2023',
    iso: '2023-08-18',
    title: 'Trips',
    body: 'New cities, shared maps, and hand-in-hand sunsets. Every trip became a memory we still smile about.',
  },
  {
    date: 'February 14, 2024',
    iso: '2024-02-14',
    title: 'Special Memories',
    body: 'Rainy movie nights, silly inside jokes, and quiet mornings that feel like home. These are our treasures.',
  },
]

/** Background music playlist (YouTube video IDs) — Bangla romantic songs */
export const backgroundPlaylist = [
  { id: 'JAP_Acr8jUM', title: 'তোমাকে চাই', artist: 'Arijit Singh' },
  { id: 'J2JQQm1h6xQ', title: 'বোঝেনা সে বোঝেনা', artist: 'Arijit Singh' },
  { id: '7gbfDlIs3hg', title: 'তুমি আসবে বলে', artist: 'Nachiketa' },
]

export const defaultEditable: EditableContent = {
  photos: [
    {
      id: 'p1',
      src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80',
      full: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80',
      alt: 'Couple holding hands at sunset',
    },
    {
      id: 'p2',
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
      full: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
      alt: 'Couple walking together',
    },
    {
      id: 'p3',
      src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80',
      full: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80',
      alt: 'Romantic moment with flowers',
    },
    {
      id: 'p4',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
      full: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
      alt: 'Wedding celebration',
    },
    {
      id: 'p5',
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
      full: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
      alt: 'Travel memory',
    },
    {
      id: 'p6',
      src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80',
      full: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80',
      alt: 'Quiet couple moment',
    },
  ],
  songs: [
    {
      id: 's1',
      title: 'তোমাকে চাই',
      artist: 'Arijit Singh — আমাদের গান',
      url: 'https://www.youtube.com/watch?v=JAP_Acr8jUM',
    },
    {
      id: 's2',
      title: 'বোঝেনা সে বোঝেনা',
      artist: 'Arijit Singh — হৃদয়ের গল্প',
      url: 'https://www.youtube.com/watch?v=J2JQQm1h6xQ',
    },
    {
      id: 's3',
      title: 'তুমি আসবে বলে',
      artist: 'Nachiketa — অপেক্ষার সুর',
      url: 'https://www.youtube.com/watch?v=7gbfDlIs3hg',
    },
    {
      id: 's4',
      title: 'তুমি যাকে ভালোবাসো',
      artist: 'Iman Chakraborty — Praktan',
      url: 'https://www.youtube.com/watch?v=UxZ27hDsVLk',
    },
  ],
  dreams: [
    { id: 'd1', text: 'Watch the northern lights together', done: false },
    { id: 'd2', text: 'Build our dream home library corner', done: false },
    { id: 'd3', text: 'Anniversary trip to a quiet beach', done: false },
    { id: 'd4', text: 'Cook a feast from recipes of our childhoods', done: false },
    {
      id: 'd5',
      text: 'Write a book of our story — for us, and maybe for them',
      done: false,
    },
  ],
  notes: [
    {
      id: 'n1',
      body: 'তোমাকে ভালোবাসি — আজ, কাল, আর প্রতিটা মুহূর্তে। You make ordinary days feel like celebrations.',
      from: '— Forever yours',
    },
    {
      id: 'n2',
      body: 'Thank you for being my calm, my laugh, and my favorite person. This story is only beautiful because you are in every page.',
      from: '— Your LoveBird',
    },
    {
      id: 'n3',
      body: 'If I could bottle one feeling forever, it would be the way home feels when you are near.',
      from: '— Always',
    },
  ],
  trips: [
    {
      id: 't1',
      title: 'Cox’s Bazar Escape',
      location: 'Cox’s Bazar, Bangladesh',
      date: 'August 2023',
      story:
        'সমুদ্রের ঢেউ, হাত ধরে হাঁটা, আর সূর্যাস্তের আলোয় আমাদের হাসির ছবি। That trip reminded us how free love can feel — salt air, shared snacks, and quiet talks under the sky.',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80',
      ],
    },
  ],
  theme: { ...defaultThemeFonts },
}

/** Memories keyed by MM-DD for "On This Day" */
export const onThisDayMemories: Record<string, { title: string; body: string }> = {
  '03-14': {
    title: 'The day we met',
    body: 'Years later, I still remember how time slowed when I saw you smile.',
  },
  '05-02': {
    title: 'Our first date',
    body: 'Butterflies, endless talks, and the start of everything.',
  },
  '03-22': {
    title: 'Our wedding day',
    body: 'The promise we made — still the best decision of my life.',
  },
  '02-14': {
    title: 'A day for us',
    body: 'Not just Valentine’s — every day with you feels like a celebration of love.',
  },
  '08-06': {
    title: 'A quiet ordinary magic',
    body: 'Even on regular days, loving you feels extraordinary.',
  },
}

export const fallbackMemory = {
  title: 'A day in our story',
  body: 'No special archive for today — but every day with you is worth remembering. Here’s to us.',
}
