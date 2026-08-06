# LoveBird — Our Story

A romantic love-story website built with **React**, **Vite**, and **Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Admin panel

Open **http://localhost:5173/admin**

- Default password: `lovebird` (change in `src/data/admin.ts`)
- Add / edit / delete: Gallery, Songs, Dreams, Love Notes
## Storage

Content (trips, gallery, songs, dreams, notes) is saved in your **browser IndexedDB** — it stays after refresh.

Important:
- Clearing browser data can erase it
- Another phone/PC won’t see the same data automatically

Use **Admin → Download backup (.json)** regularly, and **Import backup** to restore.

## Personalize (code)

Edit `src/data/content.ts` for brand, timeline, anniversary, On This Day, background music playlist.

## Features

- Landing hero with Bangla subtitle
- Timeline (First Meet → Special Memories)
- Photo gallery with lightbox
- Favorite songs
- Bucket list (saved in localStorage)
- Love notes
- Anniversary countdown
- On This Day memories
- Optional soft ambient music (Web Audio)
- Falling hearts
- Dark / light mode
