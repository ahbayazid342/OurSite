/**
 * Ensures Supabase cloud is reachable and seeds site_content if empty.
 * Usage: node scripts/ensure-cloud.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

function loadEnv(file) {
  const full = path.resolve(file)
  if (!fs.existsSync(full)) return {}
  const out = {}
  for (const line of fs.readFileSync(full, 'utf8').split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue
    const i = line.indexOf('=')
    if (i < 0) continue
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return out
}

const env = { ...loadEnv('.env'), ...process.env }
let url = (env.VITE_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
const key = env.VITE_SUPABASE_ANON_KEY || ''

if (!url || !key) {
  console.error('FAIL: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
  process.exit(1)
}

console.log('URL host:', new URL(url).host)
console.log('Key type:', key.startsWith('eyJ') ? 'legacy_jwt' : key.startsWith('sb_publishable') ? 'publishable' : 'unknown')
console.log('Key length:', key.length)

const supabase = createClient(url, key)

const { data, error } = await supabase
  .from('site_content')
  .select('id, updated_at')
  .eq('id', 'main')
  .maybeSingle()

if (error) {
  console.error('FAIL: Cannot read site_content')
  console.error(error.message)
  console.error('→ Run supabase/setup.sql in Supabase SQL Editor, then retry.')
  if (key.startsWith('sb_publishable')) {
    console.error('→ Also try Legacy anon key (eyJ...) from Supabase → API Keys → Legacy.')
  }
  process.exit(1)
}

if (!data) {
  const { error: upsertError } = await supabase.from('site_content').upsert({
    id: 'main',
    data: {},
    updated_at: new Date().toISOString(),
  })
  if (upsertError) {
    console.error('FAIL: Cannot seed site_content:', upsertError.message)
    process.exit(1)
  }
  console.log('OK: seeded empty site_content row')
} else {
  console.log('OK: site_content row exists, updated_at=', data.updated_at)
}

const { data: full } = await supabase.from('site_content').select('data').eq('id', 'main').maybeSingle()
const payload = full?.data || {}
const photos = Array.isArray(payload.photos) ? payload.photos.length : 0
const trips = Array.isArray(payload.trips) ? payload.trips.length : 0
console.log(`OK: cloud payload photos=${photos} trips=${trips}`)

// Storage probe
const probe = new Blob([Uint8Array.from([1, 2, 3])], { type: 'application/octet-stream' })
const probePath = `diagnostics/probe-${Date.now()}.bin`
const { error: upErr } = await supabase.storage.from('lovebird-media').upload(probePath, probe, {
  upsert: true,
  contentType: 'application/octet-stream',
})
if (upErr) {
  console.error('FAIL: Storage upload:', upErr.message)
  console.error('→ Run supabase/setup.sql (creates lovebird-media bucket + policies).')
  process.exit(1)
}
console.log('OK: storage upload works (lovebird-media)')
await supabase.storage.from('lovebird-media').remove([probePath])
console.log('DONE: Cloud looks ready')
