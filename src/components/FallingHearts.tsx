import { useEffect, useState } from 'react'

type Heart = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
}

export function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let id = 0
    const spawn = () => {
      const heart: Heart = {
        id: id++,
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        duration: 7 + Math.random() * 6,
        delay: Math.random() * 0.5,
      }
      setHearts((prev) => [...prev.slice(-28), heart])
    }

    spawn()
    const interval = window.setInterval(spawn, 700)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="animate-rise absolute bottom-[-10vh] text-rose opacity-55 drop-shadow-[0_0_8px_rgba(184,74,98,0.28)]"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}
