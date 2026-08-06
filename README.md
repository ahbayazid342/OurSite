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
## Host / Deploy (free)

### Option A — Vercel (recommended)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `ahbayazid342/OurSite`
3. Click **Deploy** (framework: Vite is auto-detected)

Live URL will look like: `https://our-site.vercel.app`  
Admin: `https://our-site.vercel.app/admin`

### Option B — Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) **or** import the GitHub repo
2. Build command: `npm run build` · Publish folder: `dist`

`vercel.json` and `netlify.toml` are already in the repo for SPA `/admin` routing.

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
