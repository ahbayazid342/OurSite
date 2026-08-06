import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Trips() {
  const { content } = useContent()
  const [active, setActive] = useState<string | null>(null)
  const trips = content.trips

  return (
    <section id="trips" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Miles with you"
          title="Our Trips"
          lead="Every journey becomes a chapter — write the story, keep the photos, relive it anytime."
        />

        {trips.length === 0 ? (
          <p className="text-muted">
            No trips yet — add your first tour story from{' '}
            <a href="/admin" className="text-rose underline-offset-2 hover:underline">
              /admin
            </a>
            .
          </p>
        ) : (
          <div className="grid gap-10">
            {trips.map((trip) => (
              <Reveal key={trip.id}>
                <article className="overflow-hidden rounded-2xl border border-line bg-white/70 shadow-[0_24px_60px_rgba(90,30,45,0.1)] backdrop-blur-sm dark:bg-dark-paper-soft/70">
                  {trip.images[0] && (
                    <button
                      type="button"
                      className="block w-full p-0"
                      onClick={() => setActive(trip.images[0])}
                      aria-label={`Open cover photo for ${trip.title}`}
                    >
                      <img
                        src={trip.images[0]}
                        alt={trip.title}
                        className="h-56 w-full object-cover sm:h-72"
                        loading="lazy"
                      />
                    </button>
                  )}

                  <div className="p-6 sm:p-8">
                    <p className="mb-1 text-xs tracking-[0.1em] text-champagne uppercase">
                      {trip.date}
                      {trip.location ? ` · ${trip.location}` : ''}
                    </p>
                    <h3 className="mb-3 font-display text-[1.9rem] font-semibold leading-tight">
                      {trip.title}
                    </h3>
                    <p className="whitespace-pre-wrap font-light leading-relaxed text-muted">
                      {trip.story}
                    </p>

                    {trip.images.length > 1 && (
                      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {trip.images.slice(1).map((img, i) => (
                          <button
                            key={`${trip.id}-img-${i}`}
                            type="button"
                            className="aspect-[4/3] overflow-hidden rounded-xl p-0"
                            onClick={() => setActive(img)}
                          >
                            <img
                              src={img}
                              alt={`${trip.title} photo ${i + 2}`}
                              className="size-full object-cover transition-transform duration-500 hover:scale-105"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Trip photo"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-3xl text-white"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          <img
            src={active}
            alt=""
            className="max-h-[85vh] max-w-[min(920px,94vw)] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
