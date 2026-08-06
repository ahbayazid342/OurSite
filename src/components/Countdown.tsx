import { SectionHeading } from './SectionHeading'
import { useCountdown } from '../hooks/useCountdown'

export function Countdown() {
  const { days, hours, mins, secs, yearsTogether, target } = useCountdown()

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: mins, label: 'Mins' },
    { value: secs, label: 'Secs' },
  ]

  return (
    <section id="countdown" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          centered
          eyebrow="Counting every heartbeat"
          title="Anniversary Countdown"
          lead="Until our next anniversary — and every day we get to choose each other again."
        />

        <div className="mx-auto mb-5 grid max-w-lg grid-cols-4 gap-3" aria-live="polite">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-2xl border border-line bg-white/70 px-2 py-4 text-center shadow-[0_24px_60px_rgba(90,30,45,0.12)] backdrop-blur-sm dark:bg-dark-paper-soft/70"
            >
              <span className="block font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-none text-rose-deep">
                {String(u.value).padStart(2, '0')}
              </span>
              <small className="mt-2 block text-xs tracking-[0.08em] text-muted uppercase">
                {u.label}
              </small>
            </div>
          ))}
        </div>

        <p className="text-center text-[0.95rem] text-muted">
          Next anniversary · Year {yearsTogether} ·{' '}
          {target.toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </section>
  )
}
