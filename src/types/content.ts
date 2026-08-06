export type Photo = {
  id: string
  src: string
  full: string
  alt: string
}

export type Song = {
  id: string
  title: string
  artist: string
  url: string
}

export type Dream = {
  id: string
  text: string
  done: boolean
}

export type LoveNote = {
  id: string
  body: string
  from: string
}

export type Trip = {
  id: string
  title: string
  location: string
  date: string
  story: string
  images: string[]
}

export type EditableContent = {
  photos: Photo[]
  songs: Song[]
  dreams: Dream[]
  notes: LoveNote[]
  trips: Trip[]
}

export function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
