import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}

export function Reveal({ children, className = '', as = 'div' }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
