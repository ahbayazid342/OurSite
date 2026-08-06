import { Link } from 'react-router-dom'
import { site } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-soft px-5 py-14 text-center">
      <p className="mb-1 font-display text-[2rem] font-bold tracking-[0.06em]">
        {site.brand}
      </p>
      <p className="m-0 font-light text-muted">Made with love, for the love of my life.</p>
      <p className="mt-4 text-rose">♥ Our story continues…</p>
      <Link
        to="/admin"
        className="mt-6 inline-block text-xs tracking-wide text-muted/70 uppercase hover:text-rose"
      >
        Admin
      </Link>
    </footer>
  )
}
