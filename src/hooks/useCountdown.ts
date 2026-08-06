import { useEffect, useState } from 'react'
import { site } from '../data/content'

function nextAnniversary(from = new Date()) {
  const { month, day } = site.anniversary
  let year = from.getFullYear()
  let target = new Date(year, month - 1, day, 0, 0, 0)

  if (target.getTime() <= from.getTime()) {
    year += 1
    target = new Date(year, month - 1, day, 0, 0, 0)
  }

  return target
}

function getParts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  const secs = Math.floor((diff / 1000) % 60)
  return { days, hours, mins, secs, target }
}

export function useCountdown() {
  const [parts, setParts] = useState(() => getParts(nextAnniversary()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(getParts(nextAnniversary()))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const yearsTogether = parts.target.getFullYear() - site.marriageYear

  return { ...parts, yearsTogether }
}
