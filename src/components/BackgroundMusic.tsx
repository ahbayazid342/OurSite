type Props = {
  active: boolean
  embedSrc: string
  label: string
}

/** Hidden YouTube player — starts only after user toggles music (autoplay policy) */
export function BackgroundMusic({ active, embedSrc, label }: Props) {
  if (!active) return null

  return (
    <div className="pointer-events-none fixed -left-[9999px] size-px overflow-hidden opacity-0" aria-hidden>
      <iframe
        title={label}
        src={embedSrc}
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        tabIndex={-1}
      />
    </div>
  )
}
