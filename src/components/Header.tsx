import { useEffect, useState } from 'react'
import { site } from '../data/content'

const links = [
  { href: '#timeline', label: 'Timeline' },
  { href: '#trips', label: 'Trips' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#songs', label: 'Songs' },
  { href: '#dreams', label: 'Dreams' },
  { href: '#notes', label: 'Notes' },
]

type Props = {
  isDark: boolean
  onToggleTheme: () => void
  musicOn: boolean
  onToggleMusic: () => void
  nowPlaying?: string
}

export function Header({ isDark, onToggleTheme, musicOn, onToggleMusic, nowPlaying }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 backdrop-blur-xl transition-colors sm:px-8 ${
          scrolled ? 'border-b border-line bg-paper/80' : 'bg-paper/70'
        }`}
      >
        <a href="#top" className="font-display text-2xl font-bold tracking-[0.04em]">
          {site.brand}
        </a>

        <nav className="hidden items-center gap-6 text-[0.92rem] text-muted md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative transition-colors hover:text-ink after:absolute after:bottom-[-0.3rem] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-rose after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {nowPlaying && (
            <span className="mr-1 hidden max-w-[140px] truncate text-xs text-rose sm:inline" title={nowPlaying}>
              ♪ {nowPlaying}
            </span>
          )}
          <button
            type="button"
            onClick={onToggleMusic}
            aria-label="Toggle background music"
            title={musicOn ? `Now playing: ${nowPlaying ?? 'Bangla song'}` : 'Play Bangla music'}
            className={`grid size-10 place-items-center rounded-full transition-colors hover:bg-paper-soft hover:text-rose-deep ${
              musicOn ? 'bg-paper-soft text-rose-deep' : ''
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark or light mode"
            title="Theme"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-paper-soft hover:text-rose-deep"
          >
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="grid size-10 place-content-center gap-1.5 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[1.5px] w-[18px] bg-current transition-transform ${
                open ? 'translate-y-[3.75px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-current transition-transform ${
                open ? '-translate-y-[3.75px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {open && (
        <nav className="fixed inset-x-0 top-16 z-[49] grid gap-1 border-b border-line bg-paper/90 px-5 py-4 backdrop-blur-xl md:hidden">
          {[...links, { href: '#countdown', label: 'Anniversary' }, { href: '#on-this-day', label: 'On This Day' }].map(
            (l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="border-b border-line py-3 text-muted last:border-0"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>
      )}
    </>
  )
}
