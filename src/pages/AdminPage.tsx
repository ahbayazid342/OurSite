import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { ADMIN_PASSWORD } from '../data/admin'
import { downloadBackup, parseBackupFile } from '../lib/storage'
import type { LoveNote, Photo, Song, Trip } from '../types/content'

const AUTH_KEY = 'lovebird-admin-auth'
type Tab = 'trips' | 'gallery' | 'songs' | 'dreams' | 'notes'

const tabs: { id: Tab; label: string }[] = [
  { id: 'trips', label: 'Trips' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'songs', label: 'Songs' },
  { id: 'dreams', label: 'Dreams' },
  { id: 'notes', label: 'Notes' },
]

const fieldClass =
  'w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-rose dark:bg-dark-paper-soft'
const btnPrimary =
  'rounded-full bg-gradient-to-br from-rose-deep to-rose px-4 py-2 text-sm font-medium text-paper'
const btnGhost =
  'rounded-full border border-line px-3 py-1.5 text-sm text-muted hover:text-ink'
const btnDanger =
  'rounded-full border border-rose/40 px-3 py-1.5 text-sm text-rose hover:bg-rose hover:text-paper'

export function AdminPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === '1',
  )
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('trips')

  const login = (e: FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthed(true)
      setError('')
      return
    }
    setError('Wrong password. Try again.')
  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
    setPassword('')
  }

  if (!authed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-[0_24px_60px_rgba(90,30,45,0.12)]"
        >
          <p className="mb-1 font-display text-3xl font-bold">LoveBird Admin</p>
          <p className="mb-5 text-sm text-muted">Enter password to manage your story.</p>
          <label className="mb-1 block text-xs tracking-wide text-muted uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${fieldClass} mb-3`}
            placeholder="••••••••"
            autoFocus
          />
          {error && <p className="mb-3 text-sm text-rose">{error}</p>}
          <button type="submit" className={`${btnPrimary} w-full`}>
            Login
          </button>
          <Link to="/" className="mt-4 block text-center text-sm text-muted hover:text-rose">
            ← Back to site
          </Link>
          <p className="mt-4 text-center text-xs text-muted">
            Default password: <code className="text-rose">lovebird</code>
          </p>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-display text-2xl font-bold">Admin Panel</p>
            <CloudStatusLine />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/" className={btnGhost}>
              View site
            </Link>
            <button type="button" onClick={logout} className={btnGhost}>
              Logout
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 pb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                tab === t.id
                  ? 'bg-rose text-paper'
                  : 'bg-paper-soft text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {tab === 'trips' && <TripsAdmin />}
        {tab === 'gallery' && <GalleryAdmin />}
        {tab === 'songs' && <SongsAdmin />}
        {tab === 'dreams' && <DreamsAdmin />}
        {tab === 'notes' && <NotesAdmin />}

        <ResetSection />
      </main>
    </div>
  )
}

function CloudStatusLine() {
  const { cloudStatus, cloudError, syncToCloud } = useContent()

  if (cloudStatus === 'off') {
    return (
      <p className="text-xs text-muted">
        Cloud off · add Supabase keys in <code>.env</code> for multi-device sync
      </p>
    )
  }

  const label =
    cloudStatus === 'synced'
      ? 'Cloud synced — all devices share the same data'
      : cloudStatus === 'syncing'
        ? 'Syncing to cloud…'
        : cloudStatus === 'loading'
          ? 'Loading from cloud…'
          : `Cloud error: ${cloudError ?? 'unknown'}`

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className={`text-xs ${cloudStatus === 'error' ? 'text-rose' : 'text-muted'}`}>{label}</p>
      {(cloudStatus === 'error' || cloudStatus === 'synced') && (
        <button type="button" className="text-xs text-rose underline" onClick={() => void syncToCloud()}>
          Sync now
        </button>
      )}
    </div>
  )
}

function ResetSection() {
  const { content, resetAll, replaceAll, cloudStatus, syncToCloud } = useContent()
  const [msg, setMsg] = useState('')

  const onImport = async (file?: File | null) => {
    if (!file) return
    try {
      const next = await parseBackupFile(file)
      replaceAll(next)
      setMsg('Backup restored successfully ✓')
    } catch {
      setMsg('Could not read that backup file.')
    }
  }

  return (
    <div className="mt-10 grid gap-4">
      <div className="rounded-2xl border border-line bg-white p-4">
        <p className="mb-1 text-sm font-medium">Cloud sync</p>
        {cloudStatus === 'off' ? (
          <p className="mb-3 text-sm text-muted">
            JSON import লাগবে না যদি cloud চালু করো। Free Supabase প্রজেক্ট বানিয়ে{' '}
            <code className="text-rose">.env</code> এ URL + anon key দাও — তারপর phone/PC সব জায়গায়
            একই trips, photos, notes দেখাবে। Setup: <code>supabase/setup.sql</code> + README.
          </p>
        ) : (
          <p className="mb-3 text-sm text-muted">
            Admin থেকে যা সেভ করো সেটা cloud-এ যায়। অন্য ডিভাইসে সাইট খুললেই একই ডাটা আসবে —
            JSON import লাগে না।
          </p>
        )}
        {cloudStatus !== 'off' && (
          <button
            type="button"
            className={btnPrimary}
            onClick={() => {
              void syncToCloud().then(() => setMsg('Cloud sync done ✓'))
            }}
          >
            Sync to cloud now
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-white p-4">
        <p className="mb-1 text-sm font-medium">Optional local backup</p>
        <p className="mb-3 text-sm text-muted">
          Extra safety copy for your PC (optional when cloud is on).
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={btnGhost}
            onClick={() => {
              downloadBackup(content)
              setMsg('Backup downloaded ✓')
            }}
          >
            Download backup (.json)
          </button>
          <label className={`${btnGhost} cursor-pointer`}>
            Import backup
            <input
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                void onImport(e.target.files?.[0])
                e.target.value = ''
              }}
            />
          </label>
        </div>
        {msg && <p className="mt-3 text-sm text-rose">{msg}</p>}
      </div>

      <div className="rounded-2xl border border-dashed border-line p-4">
        <p className="mb-2 text-sm font-medium">Danger zone</p>
        <p className="mb-3 text-sm text-muted">
          Reset gallery, songs, dreams, notes & trips back to the original demo content.
        </p>
        <button
          type="button"
          className={btnDanger}
          onClick={() => {
            if (confirm('Reset all editable content to defaults?')) resetAll()
          }}
        >
          Reset to defaults
        </button>
      </div>
    </div>
  )
}

function GalleryAdmin() {
  const { content, addPhoto, updatePhoto, removePhoto } = useContent()
  const [editing, setEditing] = useState<Photo | null>(null)
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')

  useEffect(() => {
    if (editing) {
      setUrl(editing.src)
      setAlt(editing.alt)
    }
  }, [editing])

  const readFile = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const onFile = async (file?: File | null) => {
    if (!file) return
    if (file.size > 2_500_000) {
      alert('Please keep images under ~2.5MB for browser storage.')
      return
    }
    const dataUrl = await readFile(file)
    setUrl(dataUrl)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    const payload = {
      src: url.trim(),
      full: url.trim(),
      alt: alt.trim() || 'Our memory',
    }
    if (editing) {
      updatePhoto(editing.id, payload)
      setEditing(null)
    } else {
      addPhoto(payload)
    }
    setUrl('')
    setAlt('')
  }

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-semibold">
        {editing ? 'Edit photo' : 'Add photo'}
      </h2>
      <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-line bg-white p-4">
        <div>
          <label className="mb-1 block text-xs text-muted uppercase">Image URL</label>
          <input
            value={url.startsWith('data:') ? '' : url}
            onChange={(e) => setUrl(e.target.value)}
            className={fieldClass}
            placeholder="https://… or upload below"
          />
          {url.startsWith('data:') && (
            <p className="mt-1 text-xs text-muted">Uploaded image ready ✓</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted uppercase">Or upload from device</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
            className="text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted uppercase">Caption / alt</label>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className={fieldClass}
            placeholder="Our first trip…"
          />
        </div>
        {url && (
          <img src={url} alt="Preview" className="h-36 w-full rounded-xl object-cover" />
        )}
        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}>
            {editing ? 'Save photo' : 'Add photo'}
          </button>
          {editing && (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setEditing(null)
                setUrl('')
                setAlt('')
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="grid gap-3 sm:grid-cols-2">
        {content.photos.map((photo) => (
          <li
            key={photo.id}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <img src={photo.src} alt={photo.alt} className="h-40 w-full object-cover" />
            <div className="flex items-center justify-between gap-2 p-3">
              <p className="truncate text-sm text-muted">{photo.alt}</p>
              <div className="flex shrink-0 gap-1">
                <button type="button" className={btnGhost} onClick={() => setEditing(photo)}>
                  Edit
                </button>
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() => {
                    if (confirm('Delete this photo?')) removePhoto(photo.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SongsAdmin() {
  const { content, addSong, updateSong, removeSong } = useContent()
  const [editing, setEditing] = useState<Song | null>(null)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (editing) {
      setTitle(editing.title)
      setArtist(editing.artist)
      setUrl(editing.url)
    }
  }, [editing])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return
    const payload = { title: title.trim(), artist: artist.trim(), url: url.trim() }
    if (editing) {
      updateSong(editing.id, payload)
      setEditing(null)
    } else {
      addSong(payload)
    }
    setTitle('')
    setArtist('')
    setUrl('')
  }

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-semibold">
        {editing ? 'Edit song' : 'Add song'}
      </h2>
      <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-line bg-white p-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClass}
          placeholder="Song title"
          required
        />
        <input
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className={fieldClass}
          placeholder="Artist / note"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={fieldClass}
          placeholder="YouTube URL (https://www.youtube.com/watch?v=…)"
          required
        />
        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}>
            {editing ? 'Save song' : 'Add song'}
          </button>
          {editing && (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setEditing(null)
                setTitle('')
                setArtist('')
                setUrl('')
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="grid gap-3">
        {content.songs.map((song) => (
          <li
            key={song.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4"
          >
            <div className="min-w-0">
              <p className="font-medium">{song.title}</p>
              <p className="truncate text-sm text-muted">{song.artist}</p>
              <a
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-rose break-all"
              >
                {song.url}
              </a>
            </div>
            <div className="flex gap-1">
              <button type="button" className={btnGhost} onClick={() => setEditing(song)}>
                Edit
              </button>
              <button
                type="button"
                className={btnDanger}
                onClick={() => {
                  if (confirm('Delete this song?')) removeSong(song.id)
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function DreamsAdmin() {
  const { content, addDream, updateDream, removeDream } = useContent()
  const [text, setText] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addDream(text.trim())
    setText('')
  }

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-semibold">Add dream</h2>
      <form onSubmit={submit} className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-line bg-white p-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`${fieldClass} min-w-[220px] flex-1`}
          placeholder="New bucket-list dream…"
          required
        />
        <button type="submit" className={btnPrimary}>
          Add dream
        </button>
      </form>

      <ul className="grid gap-3">
        {content.dreams.map((dream) => (
          <li
            key={dream.id}
            className="rounded-2xl border border-line bg-white p-4"
          >
            {editId === dream.id ? (
              <div className="grid gap-2">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className={fieldClass}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={btnPrimary}
                    onClick={() => {
                      if (editText.trim()) updateDream(dream.id, { text: editText.trim() })
                      setEditId(null)
                    }}
                  >
                    Save
                  </button>
                  <button type="button" className={btnGhost} onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={dream.done ? 'text-muted line-through' : ''}>{dream.text}</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => {
                      setEditId(dream.id)
                      setEditText(dream.text)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => {
                      if (confirm('Delete this dream?')) removeDream(dream.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

function NotesAdmin() {
  const { content, addNote, updateNote, removeNote } = useContent()
  const [editing, setEditing] = useState<LoveNote | null>(null)
  const [body, setBody] = useState('')
  const [from, setFrom] = useState('— Forever yours')

  useEffect(() => {
    if (editing) {
      setBody(editing.body)
      setFrom(editing.from)
    }
  }, [editing])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return
    const payload = { body: body.trim(), from: from.trim() || '— Forever yours' }
    if (editing) {
      updateNote(editing.id, payload)
      setEditing(null)
    } else {
      addNote(payload)
    }
    setBody('')
    setFrom('— Forever yours')
  }

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-semibold">
        {editing ? 'Edit note' : 'Add love note'}
      </h2>
      <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-line bg-white p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`${fieldClass} min-h-28`}
          placeholder="Write your love note…"
          required
        />
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={fieldClass}
          placeholder="— From"
        />
        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}>
            {editing ? 'Save note' : 'Add note'}
          </button>
          {editing && (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setEditing(null)
                setBody('')
                setFrom('— Forever yours')
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="grid gap-3">
        {content.notes.map((note) => (
          <li key={note.id} className="rounded-2xl border border-line bg-white p-4">
            <p className="mb-2 font-display text-lg italic">{note.body}</p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted">{note.from}</p>
              <div className="flex gap-1">
                <button type="button" className={btnGhost} onClick={() => setEditing(note)}>
                  Edit
                </button>
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() => {
                    if (confirm('Delete this note?')) removeNote(note.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

async function readImageFile(file: File) {
  if (file.size > 2_500_000) {
    throw new Error('Please keep images under ~2.5MB for browser storage.')
  }
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function TripsAdmin() {
  const { content, addTrip, updateTrip, removeTrip } = useContent()
  const [editing, setEditing] = useState<Trip | null>(null)
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [story, setStory] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (editing) {
      setTitle(editing.title)
      setLocation(editing.location)
      setDate(editing.date)
      setStory(editing.story)
      setImages(editing.images)
    }
  }, [editing])

  const resetForm = () => {
    setEditing(null)
    setTitle('')
    setLocation('')
    setDate('')
    setStory('')
    setImages([])
    setImageUrl('')
  }

  const addImageUrl = () => {
    const url = imageUrl.trim()
    if (!url) return
    setImages((prev) => [...prev, url])
    setImageUrl('')
  }

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return
    try {
      const next: string[] = []
      for (const file of Array.from(files)) {
        next.push(await readImageFile(file))
      }
      setImages((prev) => [...prev, ...next])
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not upload image')
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !story.trim()) return
    const payload = {
      title: title.trim(),
      location: location.trim(),
      date: date.trim(),
      story: story.trim(),
      images,
    }
    if (editing) {
      updateTrip(editing.id, payload)
    } else {
      addTrip(payload)
    }
    resetForm()
  }

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-semibold">
        {editing ? 'Edit trip' : 'Add trip story'}
      </h2>
      <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-line bg-white p-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClass}
          placeholder="Trip title (e.g. Cox’s Bazar Escape)"
          required
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={fieldClass}
            placeholder="Location"
          />
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
            placeholder="Date (e.g. August 2023)"
          />
        </div>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className={`${fieldClass} min-h-36`}
          placeholder="Write about this trip… memories, feelings, funny moments."
          required
        />

        <div className="rounded-xl border border-dashed border-line p-3">
          <p className="mb-2 text-xs tracking-wide text-muted uppercase">Trip photos</p>
          <div className="mb-2 flex flex-wrap gap-2">
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`${fieldClass} min-w-[200px] flex-1`}
              placeholder="Paste image URL"
            />
            <button type="button" className={btnGhost} onClick={addImageUrl}>
              Add URL
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onFiles(e.target.files)}
            className="mb-3 text-sm"
          />
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {images.map((img, i) => (
                <div key={`${img.slice(0, 24)}-${i}`} className="relative overflow-hidden rounded-xl">
                  <img src={img} alt="" className="aspect-[4/3] w-full object-cover" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 rounded-full bg-black/60 px-2 text-xs text-white"
                    onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}>
            {editing ? 'Save trip' : 'Add trip'}
          </button>
          {editing && (
            <button type="button" className={btnGhost} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="grid gap-4">
        {content.trips.map((trip) => (
          <li key={trip.id} className="overflow-hidden rounded-2xl border border-line bg-white">
            {trip.images[0] && (
              <img src={trip.images[0]} alt="" className="h-40 w-full object-cover" />
            )}
            <div className="p-4">
              <p className="text-xs text-champagne uppercase">
                {trip.date}
                {trip.location ? ` · ${trip.location}` : ''}
              </p>
              <p className="font-display text-xl font-semibold">{trip.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{trip.story}</p>
              <p className="mt-1 text-xs text-muted">{trip.images.length} photo(s)</p>
              <div className="mt-3 flex gap-1">
                <button type="button" className={btnGhost} onClick={() => setEditing(trip)}>
                  Edit
                </button>
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() => {
                    if (confirm('Delete this trip story?')) removeTrip(trip.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
