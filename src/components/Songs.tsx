import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Songs() {
  const { content } = useContent()

  return (
    <section id="songs" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Our soundtrack"
          title="Favorite Songs"
          lead="Songs that feel like us — play one, and the memories follow."
        />

        {content.songs.length === 0 ? (
          <p className="text-muted">No songs yet — add some from /admin.</p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {content.songs.map((song) => (
              <Reveal key={song.id} as="li" className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-white/70 p-5 transition-transform hover:-translate-y-1 dark:bg-dark-paper-soft/70">
                  <div className="flex items-start gap-3">
                    <div
                      className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-deep to-champagne font-display text-xl text-paper"
                      aria-hidden
                    >
                      ♪
                    </div>
                    <div className="min-w-0">
                      <h3 className="m-0 text-[1.05rem] font-medium">{song.title}</h3>
                      <p className="mt-0.5 mb-0 text-sm font-light text-muted">{song.artist}</p>
                    </div>
                  </div>
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-rose-deep transition-colors hover:border-transparent hover:bg-rose hover:text-paper"
                  >
                    YouTube
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
