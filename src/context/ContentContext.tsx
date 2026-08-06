import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { defaultEditable } from '../data/content'
import { cloudEnabled, loadCloudContent, saveCloudContent } from '../lib/cloud'
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

export type CloudStatus = 'off' | 'loading' | 'synced' | 'syncing' | 'error'

type ContentContextValue = {
  content: EditableContent
  ready: boolean
  cloudStatus: CloudStatus
  cloudError: string | null
  syncToCloud: () => Promise<void>
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
  const [cloudStatus, setCloudStatus] = useState<CloudStatus>(() =>
    cloudEnabled() ? 'loading' : 'off',
  )
  const [cloudError, setCloudError] = useState<string | null>(null)
  const skipCloudSave = useRef(true)
  const saveTimer = useRef<number | null>(null)

  useEffect(() => {
    let alive = true

    async function boot() {
      try {
        if (cloudEnabled()) {
          setCloudStatus('loading')
          const remote = await loadCloudContent()
          if (!alive) return

          if (remote && (remote.trips.length || remote.photos.length || remote.notes.length || remote.songs.length || remote.dreams.length)) {
            setContent(remote)
            await saveContent(remote)
            setCloudStatus('synced')
            setCloudError(null)
          } else {
            const local = await loadContent()
            if (!alive) return
            setContent(local)
            // Seed cloud with local/default if empty
            try {
              const prepared = await saveCloudContent(local)
              if (!alive) return
              setContent(prepared)
              await saveContent(prepared)
              setCloudStatus('synced')
            } catch (err) {
              setCloudStatus('error')
              setCloudError(err instanceof Error ? err.message : 'Cloud sync failed')
            }
          }
        } else {
          const local = await loadContent()
          if (!alive) return
          setContent(local)
          setCloudStatus('off')
        }
      } catch (err) {
        const local = await loadContent()
        if (!alive) return
        setContent(local)
        if (cloudEnabled()) {
          setCloudStatus('error')
          setCloudError(err instanceof Error ? err.message : 'Cloud load failed')
        }
      } finally {
        if (alive) {
          setReady(true)
          // Allow cloud saves after initial load settles
          window.setTimeout(() => {
            skipCloudSave.current = false
          }, 500)
        }
      }
    }

    void boot()
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    void saveContent(content)
  }, [content, ready])

  useEffect(() => {
    if (!ready || !cloudEnabled() || skipCloudSave.current) return

    if (saveTimer.current) window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      setCloudStatus('syncing')
      void saveCloudContent(content)
        .then(async (prepared) => {
          // If images were uploaded, refresh local state with public URLs
          const changed = JSON.stringify(prepared) !== JSON.stringify(content)
          if (changed) {
            skipCloudSave.current = true
            setContent(prepared)
            await saveContent(prepared)
            window.setTimeout(() => {
              skipCloudSave.current = false
            }, 300)
          }
          setCloudStatus('synced')
          setCloudError(null)
        })
        .catch((err) => {
          setCloudStatus('error')
          setCloudError(err instanceof Error ? err.message : 'Cloud save failed')
        })
    }, 900)

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current)
    }
  }, [content, ready])

  const syncToCloud = useCallback(async () => {
    if (!cloudEnabled()) return
    setCloudStatus('syncing')
    try {
      const prepared = await saveCloudContent(content)
      skipCloudSave.current = true
      setContent(prepared)
      await saveContent(prepared)
      setCloudStatus('synced')
      setCloudError(null)
      window.setTimeout(() => {
        skipCloudSave.current = false
      }, 300)
    } catch (err) {
      setCloudStatus('error')
      setCloudError(err instanceof Error ? err.message : 'Cloud sync failed')
    }
  }, [content])

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      ready,
      cloudStatus,
      cloudError,
      syncToCloud,

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
    [content, ready, cloudStatus, cloudError, syncToCloud],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
