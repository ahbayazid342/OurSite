import { site } from '../data/content'

export function Hero() {
  return (
    <section
      id="top"
      className="relative grid min-h-dvh place-items-center overflow-hidden px-5 pb-20 pt-28 text-center"
    >
      <div
        className="animate-hero-shift absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_20%,rgba(184,74,98,0.28),transparent_70%),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(212,165,116,0.22),transparent_65%),linear-gradient(165deg,var(--color-paper-soft)_0%,var(--color-paper)_45%,#f3d5cf_100%)] dark:bg-[radial-gradient(ellipse_80%_55%_at_50%_18%,rgba(225,138,156,0.18),transparent_70%),radial-gradient(ellipse_50%_40%_at_15%_85%,rgba(224,184,138,0.12),transparent_60%),linear-gradient(165deg,#24161a_0%,var(--color-paper)_50%,#301c24_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b84a62' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="animate-fade-up relative z-10 max-w-3xl">
        <p className="animate-brand-glow text-gradient mb-2 font-display text-[clamp(2.8rem,8vw,5.2rem)] font-normal leading-none tracking-[0.04em]">
          {site.brand}
        </p>
        <h1 className="mb-3 font-display text-[clamp(1.8rem,4.5vw,3rem)] font-normal leading-tight tracking-wide">
          {site.title}{' '}
          <span className="animate-heartbeat inline-block text-rose" aria-hidden>
            ♥
          </span>
        </h1>
        <p className="mb-8 font-body text-[clamp(1.2rem,3vw,1.65rem)] font-medium text-muted">
          {site.bangla}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#timeline"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-rose-deep to-rose px-6 py-3.5 text-[0.95rem] font-medium text-paper shadow-[0_12px_30px_rgba(122,36,56,0.25)] transition-transform hover:-translate-y-0.5 dark:from-rose dark:to-champagne dark:text-dark-paper"
          >
            Begin our journey
          </a>
          <a
            href="#notes"
            className="inline-flex items-center justify-center rounded-full border border-line bg-white/70 px-6 py-3.5 text-[0.95rem] font-medium backdrop-blur-sm transition-transform hover:-translate-y-0.5 dark:bg-dark-paper-soft/70"
          >
            Read a love note
          </a>
        </div>
      </div>

      <a
        href="#countdown"
        aria-label="Scroll to anniversary"
        className="absolute bottom-7 left-1/2 h-[38px] w-6 -translate-x-1/2 rounded-full border-[1.5px] border-muted opacity-55"
      >
        <span className="animate-scroll-dot absolute top-2 left-1/2 size-1 -ml-0.5 rounded-full bg-rose" />
      </a>
    </section>
  )
}
