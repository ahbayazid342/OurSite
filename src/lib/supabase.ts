import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() ?? ''
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ?? ''

const looksConfigured =
  Boolean(rawUrl && rawKey) &&
  !rawUrl.includes('YOUR_PROJECT') &&
  !rawKey.includes('YOUR_SUPABASE') &&
  rawUrl.startsWith('https://')

export const isCloudConfigured = looksConfigured

export const supabase: SupabaseClient | null = looksConfigured
  ? createClient(
      rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, ''),
      rawKey,
    )
  : null
