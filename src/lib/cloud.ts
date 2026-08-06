import type { EditableContent, Photo, Trip } from '../types/content'
import { uid } from '../types/content'
import { normalizeContent } from './normalize'
import { isCloudConfigured, supabase } from './supabase'

const ROW_ID = 'main'
const BUCKET = 'lovebird-media'

function dataUrlToBlob(dataUrl: string): { blob: Blob; ext: string } {
  const [header, base64] = dataUrl.split(',')
  const mime = /data:(.*?);base64/.exec(header)?.[1] ?? 'image/jpeg'
  const ext = mime.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg'
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return { blob: new Blob([bytes], { type: mime }), ext }
}

async function uploadDataUrl(dataUrl: string, folder: string): Promise<string> {
  if (!supabase) return dataUrl
  const { blob, ext } = dataUrlToBlob(dataUrl)
  const path = `${folder}/${uid()}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    cacheControl: '3600',
    upsert: false,
    contentType: blob.type,
  })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

async function ensureRemoteUrl(url: string, folder: string): Promise<string> {
  if (!url.startsWith('data:')) return url
  return uploadDataUrl(url, folder)
}

/** Upload any embedded base64 images so the cloud payload stays small */
export async function prepareContentForCloud(
  content: EditableContent,
): Promise<EditableContent> {
  if (!supabase) return content

  const photos: Photo[] = []
  for (const photo of content.photos) {
    const src = await ensureRemoteUrl(photo.src, 'gallery')
    const full = photo.full.startsWith('data:')
      ? await ensureRemoteUrl(photo.full, 'gallery')
      : photo.full === photo.src
        ? src
        : await ensureRemoteUrl(photo.full, 'gallery')
    photos.push({ ...photo, src, full })
  }

  const trips: Trip[] = []
  for (const trip of content.trips) {
    const images: string[] = []
    for (const img of trip.images) {
      images.push(await ensureRemoteUrl(img, 'trips'))
    }
    trips.push({ ...trip, images })
  }

  return { ...content, photos, trips }
}

export async function loadCloudContent(): Promise<EditableContent | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('site_content')
    .select('data')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error) throw error
  if (!data?.data) return null
  const raw = data.data as Partial<EditableContent>
  // Empty seed row `{}` means nothing saved yet
  if (!raw.photos && !raw.songs && !raw.dreams && !raw.notes && !raw.trips) return null
  return normalizeContent(raw)
}

export async function saveCloudContent(content: EditableContent): Promise<EditableContent> {
  if (!supabase) throw new Error('Cloud is not configured')

  const prepared = await prepareContentForCloud(content)
  const { error } = await supabase.from('site_content').upsert({
    id: ROW_ID,
    data: prepared,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
  return prepared
}

export function cloudEnabled() {
  return isCloudConfigured
}
