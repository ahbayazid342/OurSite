type Props = {
  eyebrow: string
  title: string
  lead: string
  centered?: boolean
}

export function SectionHeading({ eyebrow, title, lead, centered }: Props) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <p className="mb-3 text-[0.78rem] font-medium tracking-[0.18em] text-rose uppercase">
        {eyebrow}
      </p>
      <h2 className="mb-3 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-tight">
        {title}
      </h2>
      <p
        className={`mb-11 max-w-xl font-light text-muted ${centered ? 'mx-auto' : ''}`}
      >
        {lead}
      </p>
    </div>
  )
}
