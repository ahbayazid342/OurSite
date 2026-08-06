import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultEditable } from '../data/content'
import { clearStoredContent, loadContent, saveContent } from '../lib/storage'
import type {
  Dream,
  EditableContent,
  LoveNote,
  Photo,
  Song,
  Trip,
} from '../types/content'
import { uid } from '../types/content'

type ContentContextValue = {
  content: EditableContent
  ready: boolean
  addPhoto: (photo: Omit<Photo, 'id'>) => void
  updatePhoto: (id: string, photo: Partial<Omit<Photo, 'id'>>) => void
  removePhoto: (id: string) => void
  addSong: (song: Omit<Song, 'id'>) => void
  updateSong: (id: string, song: Partial<Omit<Song, 'id'>>) => void
  removeSong: (id: string) => void
  addDream: (text: string) => void
  updateDream: (id: string, patch: Partial<Omit<Dream, 'id'>>) => void
  removeDream: (id: string) => void
  toggleDream: (id: string) => void
  addNote: (note: Omit<LoveNote, 'id'>) => void
  updateNote: (id: string, note: Partial<Omit<LoveNote, 'id'>>) => void
  removeNote: (id: string) => void
  addTrip: (trip: Omit<Trip, 'id'>) => void
  updateTrip: (id: string, trip: Partial<Omit<Trip, 'id'>>) => void
  removeTrip: (id: string) => void
  replaceAll: (next: EditableContent) => void
  resetAll: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<EditableContent>(() =>
    structuredClone(defaultEditable),
  )
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    loadContent().then((data) => {
      if (!alive) return
      setContent(data)
      setReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    void saveContent(content)
  }, [content, ready])

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      ready,

      addPhoto: (photo) =>
        setContent((c) => ({ ...c, photos: [...c.photos, { ...photo, id: uid() }] })),
      updatePhoto: (id, patch) =>
        setContent((c) => ({
          ...c,
          photos: c.photos.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      removePhoto: (id) =>
        setContent((c) => ({ ...c, photos: c.photos.filter((p) => p.id !== id) })),

      addSong: (song) =>
        setContent((c) => ({ ...c, songs: [...c.songs, { ...song, id: uid() }] })),
      updateSong: (id, patch) =>
        setContent((c) => ({
          ...c,
          songs: c.songs.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        })),
      removeSong: (id) =>
        setContent((c) => ({ ...c, songs: c.songs.filter((s) => s.id !== id) })),

      addDream: (text) =>
        setContent((c) => ({
          ...c,
          dreams: [...c.dreams, { id: uid(), text, done: false }],
        })),
      updateDream: (id, patch) =>
        setContent((c) => ({
          ...c,
          dreams: c.dreams.map((d) => (d.id === id ? { ...d, ...patch } : d)),
        })),
      removeDream: (id) =>
        setContent((c) => ({ ...c, dreams: c.dreams.filter((d) => d.id !== id) })),
      toggleDream: (id) =>
        setContent((c) => ({
          ...c,
          dreams: c.dreams.map((d) => (d.id === id ? { ...d, done: !d.done } : d)),
        })),

      addNote: (note) =>
        setContent((c) => ({ ...c, notes: [...c.notes, { ...note, id: uid() }] })),
      updateNote: (id, patch) =>
        setContent((c) => ({
          ...c,
          notes: c.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
        })),
      removeNote: (id) =>
        setContent((c) => ({ ...c, notes: c.notes.filter((n) => n.id !== id) })),

      addTrip: (trip) =>
        setContent((c) => ({ ...c, trips: [{ ...trip, id: uid() }, ...c.trips] })),
      updateTrip: (id, patch) =>
        setContent((c) => ({
          ...c,
          trips: c.trips.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      removeTrip: (id) =>
        setContent((c) => ({ ...c, trips: c.trips.filter((t) => t.id !== id) })),

      replaceAll: (next) => setContent(next),

      resetAll: () => {
        void clearStoredContent()
        setContent(structuredClone(defaultEditable))
      },
    }),
    [content, ready],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
