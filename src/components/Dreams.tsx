import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Dreams() {
  const { content, toggleDream } = useContent()

  return (
    <section
      id="dreams"
      className="bg-[radial-gradient(ellipse_70%_50%_at_10%_0%,rgba(184,74,98,0.18),transparent_55%)] bg-paper-soft px-5 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Still unwritten"
          title="Future Dreams / Bucket List"
          lead="Adventures waiting for our names — together, always."
        />

        {content.dreams.length === 0 ? (
          <p className="text-muted">No dreams yet — add some from /admin.</p>
        ) : (
          <ul className="m-0 grid list-none gap-3 p-0">
            {content.dreams.map((dream) => (
              <Reveal key={dream.id} as="li">
                <label className="flex cursor-pointer items-center gap-3.5 rounded-2xl border border-line bg-white/70 px-5 py-4 dark:bg-dark-paper-soft/70">
                  <input
                    type="checkbox"
                    checked={dream.done}
                    onChange={() => toggleDream(dream.id)}
                    className="peer sr-only"
                  />
                  <span className="grid size-[22px] shrink-0 place-items-center rounded-md border-[1.5px] border-rose text-[0.75rem] font-bold text-paper transition-colors peer-checked:bg-rose">
                    {dream.done ? '✓' : ''}
                  </span>
                  <span
                    className={`font-light ${dream.done ? 'text-muted line-through opacity-75' : ''}`}
                  >
                    {dream.text}
                  </span>
                </label>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
