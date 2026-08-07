import { useEffect } from 'react'
import { useContent } from '../context/ContentContext'
import { getBodyFont, getDisplayFont } from '../data/fonts'

/** Applies selected fonts site-wide via CSS variables */
export function FontTheme() {
  const { content, ready } = useContent()

  useEffect(() => {
    if (!ready) return
    const display = getDisplayFont(content.theme?.displayFont)
    const body = getBodyFont(content.theme?.bodyFont)
    const root = document.documentElement
    root.style.setProperty('--font-display', display.family)
    root.style.setProperty('--font-body', body.family)
  }, [content.theme?.displayFont, content.theme?.bodyFont, ready])

  return null
}
