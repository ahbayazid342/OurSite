import { timeline } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Timeline() {
  return (
    <section id="timeline" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Chapter by chapter"
          title="Our Timeline"
          lead="From the first glance to forever — the moments that wrote us."
        />

        <ol className="relative m-0 list-none p-0 before:absolute before:top-1 before:bottom-1 before:left-3 before:w-0.5 before:bg-gradient-to-b before:from-rose before:via-champagne before:to-transparent md:before:left-1/2 md:before:-ml-px">
          {timeline.map((item, i) => {
            const even = i % 2 === 1
            return (
              <Reveal
                key={item.iso}
                as="li"
                className={`relative mb-8 pl-12 md:w-1/2 md:pl-0 ${
                  even ? 'md:ml-[50%] md:pl-10 md:pr-0' : 'md:pr-10'
                }`}
              >
                <span
                  className={`absolute top-5 left-[5px] size-4 rounded-full border-[3px] border-rose bg-paper shadow-[0_0_0_6px_rgba(184,74,98,0.15)] md:left-auto ${
                    even ? 'md:left-[-8px] md:right-auto' : 'md:right-[-8px]'
                  }`}
                />
                <article className="rounded-2xl border border-line bg-white/70 p-6 shadow-[0_24px_60px_rgba(90,30,45,0.12)] backdrop-blur-sm dark:bg-dark-paper-soft/70">
                  <time
                    dateTime={item.iso}
                    className="mb-1 block text-xs tracking-[0.08em] text-champagne uppercase"
                  >
                    {item.date}
                  </time>
                  <h3 className="mb-2 font-display text-[1.65rem] font-semibold">
                    {item.title}
                  </h3>
                  <p className="m-0 font-light text-muted">{item.body}</p>
                </article>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
