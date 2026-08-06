import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function LoveNotes() {
  const { content } = useContent()

  return (
    <section id="notes" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Words from the heart"
          title="Love Notes"
          lead="Little letters I want you to find whenever you need a smile."
        />

        {content.notes.length === 0 ? (
          <p className="text-muted">No notes yet — add some from /admin.</p>
        ) : (
          <div className="grid gap-5">
            {content.notes.map((note, i) => (
              <Reveal key={note.id} as="article">
                <div
                  className={`relative rounded-2xl border border-line bg-gradient-to-br from-paper-soft/80 to-white/70 p-7 shadow-[0_24px_60px_rgba(90,30,45,0.12)] dark:from-dark-paper-soft dark:to-dark-paper-soft/70 ${
                    i % 3 === 1
                      ? 'rotate-[0.5deg]'
                      : i % 3 === 2
                        ? '-rotate-[0.2deg]'
                        : '-rotate-[0.4deg]'
                  }`}
                >
                  <span className="absolute top-2 left-3 font-display text-5xl leading-none text-rose/35">
                    “
                  </span>
                  <p className="mt-2 mb-4 font-display text-[1.35rem] leading-relaxed italic">
                    {note.body}
                  </p>
                  <footer className="text-sm tracking-wide text-muted">{note.from}</footer>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
