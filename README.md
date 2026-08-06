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
- Add / edit / delete: Trips, Gallery, Songs, Dreams, Love Notes

## Fix: other devices ask for Vercel login

Your production site must be public.

1. Vercel project → **Settings → Deployment Protection**
2. **Vercel Authentication** → turn **OFF**, or set protection to **Standard** (not “All Deployments”)
3. Open only the production URL: `https://our-site-nu.vercel.app`  
   (long preview URLs like `our-site-xxxxx.vercel.app` may still ask for login)

## Fix: gallery images missing on other devices

Images only sync if **cloud is on** on the live site.

1. Vercel → **Settings → Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = `https://vckuugjdkvashwtwrvlk.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = your **legacy anon key** (`eyJ...`) from Supabase → Settings → API Keys → Legacy
3. **Deployments → Redeploy** (important)
4. Open `/admin` on the live site → should say **Cloud synced**
5. On the PC where you uploaded photos: open live `/admin` → **Sync to cloud now**  
   (or re-upload the photos once after cloud works)

Also run `supabase/setup.sql` once in Supabase SQL Editor if you haven’t.

## Cloud sync (no JSON import needed)

So phone + PC share the same trips/photos/notes automatically:

1. Create a free project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → paste & run `supabase/setup.sql`
3. Copy **Project URL** + **anon public key** from Project Settings → API
4. Create a `.env` file (see `.env.example`):

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

5. Restart `npm run dev`
6. On **Vercel**, add the same two env vars → Redeploy

After that, Admin changes sync to the cloud. Open the site on another device → same data. JSON backup is optional only.

## Host / Deploy (free)

### Option A — Vercel (recommended)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `ahbayazid342/OurSite`
3. Add Supabase env vars (above)
4. Click **Deploy**

### Option B — Netlify
1. Import the GitHub repo
2. Build: `npm run build` · Publish: `dist`
3. Add the same env vars

## Personalize (code)

Edit `src/data/content.ts` for brand, timeline, anniversary, On This Day, background music playlist.

## Features

- Landing hero with Bangla subtitle
- Timeline + Trips journal (story + photos)
- Photo gallery, favorite songs, bucket list, love notes
- Anniversary countdown + On This Day
- Admin panel + cloud sync (Supabase)
- Background Bangla music, falling hearts, dark/light mode
