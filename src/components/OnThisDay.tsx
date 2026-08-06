import { fallbackMemory, onThisDayMemories } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

function todayKey() {
  const now = new Date()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${mm}-${dd}`
}

export function OnThisDay() {
  const key = todayKey()
  const memory = onThisDayMemories[key] ?? fallbackMemory
  const label = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
  })

  return (
    <section
      id="on-this-day"
      className="bg-[radial-gradient(ellipse_70%_50%_at_10%_0%,rgba(184,74,98,0.18),transparent_55%)] bg-paper-soft px-5 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Memory lane"
          title="On This Day"
          lead="A memory that shares today’s date — a little gift from our past."
        />

        <Reveal as="article">
          <div className="rounded-2xl border border-line bg-white/70 px-6 py-8 text-center shadow-[0_24px_60px_rgba(90,30,45,0.12)] dark:bg-dark-paper-soft/70">
            <time className="mb-3 block text-xs tracking-[0.1em] text-champagne uppercase">
              {label}
            </time>
            <h3 className="mb-3 font-display text-[2rem]">{memory.title}</h3>
            <p className="m-0 font-light text-muted">{memory.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
