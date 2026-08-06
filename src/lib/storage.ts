import type { EditableContent } from '../types/content'
import { defaultEditable } from '../data/content'
import { normalizeContent } from './normalize'

const DB_NAME = 'lovebird-db'
const DB_VERSION = 1
const STORE = 'content'
const KEY = 'main'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

/** Migrate old localStorage payload once, then keep everything in IndexedDB */
async function migrateFromLocalStorage(): Promise<EditableContent | null> {
  try {
    const raw = localStorage.getItem('lovebird-content-v1')
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<EditableContent>
    const data = normalizeContent(parsed)
    await saveContent(data)
    localStorage.removeItem('lovebird-content-v1')
    localStorage.removeItem('lovebird-dreams')
    return data
  } catch {
    return null
  }
}

export async function loadContent(): Promise<EditableContent> {
  try {
    const db = await openDb()
    const fromDb = await new Promise<EditableContent | null>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(KEY)
      req.onsuccess = () => resolve((req.result as EditableContent | undefined) ?? null)
      req.onerror = () => reject(req.error)
    })
    db.close()

    if (fromDb) return normalizeContent(fromDb)

    const migrated = await migrateFromLocalStorage()
    if (migrated) return migrated

    return structuredClone(defaultEditable)
  } catch {
    return structuredClone(defaultEditable)
  }
}

export async function saveContent(content: EditableContent): Promise<void> {
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(content, KEY)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export async function clearStoredContent(): Promise<void> {
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(KEY)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
  localStorage.removeItem('lovebird-content-v1')
  localStorage.removeItem('lovebird-dreams')
}

export function downloadBackup(content: EditableContent) {
  const blob = new Blob([JSON.stringify(content, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `lovebird-backup-${stamp}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function parseBackupFile(file: File): Promise<EditableContent> {
  const text = await file.text()
  const parsed = JSON.parse(text) as Partial<EditableContent>
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid backup file')
  }
  return normalizeContent(parsed)
}
