import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Gallery() {
  const { content } = useContent()
  const [active, setActive] = useState<string | null>(null)
  const photos = content.photos

  return (
    <section
      id="gallery"
      className="bg-[radial-gradient(ellipse_70%_50%_at_10%_0%,rgba(184,74,98,0.18),transparent_55%)] bg-paper-soft px-5 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Frozen in light"
          title="Photo Gallery"
          lead="A few frames from our favorite chapters. Manage photos from the admin panel."
        />

        {photos.length === 0 ? (
          <p className="text-muted">No photos yet — add some from /admin.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {photos.map((photo, i) => (
              <Reveal key={photo.id}>
                <button
                  type="button"
                  onClick={() => setActive(photo.full)}
                  aria-label={`Open ${photo.alt}`}
                  className={`group relative block w-full overflow-hidden rounded-2xl p-0 ${
                    i % 5 === 1 || i % 5 === 4 ? 'aspect-[4/6]' : 'aspect-[4/5]'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent opacity-60 transition-opacity group-hover:opacity-25" />
                </button>
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
          aria-label="Photo preview"
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
