import type { EditableContent } from '../types/content'
import { defaultEditable } from '../data/content'

export function normalizeContent(
  parsed: Partial<EditableContent> | null,
): EditableContent {
  const base = structuredClone(defaultEditable)
  if (!parsed) return base
  return {
    photos: Array.isArray(parsed.photos) ? parsed.photos : base.photos,
    songs: Array.isArray(parsed.songs) ? parsed.songs : base.songs,
    dreams: Array.isArray(parsed.dreams) ? parsed.dreams : base.dreams,
    notes: Array.isArray(parsed.notes) ? parsed.notes : base.notes,
    trips: Array.isArray(parsed.trips) ? parsed.trips : base.trips,
  }
}
