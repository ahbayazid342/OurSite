import type { ThemeFonts } from '../types/content'

export type FontOption = {
  id: string
  label: string
  family: string
  preview: string
}

export const displayFonts: FontOption[] = [
  {
    id: 'unifraktur',
    label: 'Gothic Fraktur',
    family: '"UnifrakturMaguntia", "Noto Serif Bengali", Georgia, serif',
    preview: 'LoveBird Story',
  },
  {
    id: 'pirata',
    label: 'Pirata One',
    family: '"Pirata One", "Noto Serif Bengali", Georgia, serif',
    preview: 'LoveBird Story',
  },
  {
    id: 'cinzel',
    label: 'Cinzel Decorative',
    family: '"Cinzel Decorative", "Noto Serif Bengali", Georgia, serif',
    preview: 'LoveBird Story',
  },
  {
    id: 'playfair',
    label: 'Playfair Display',
    family: '"Playfair Display", "Noto Serif Bengali", Georgia, serif',
    preview: 'LoveBird Story',
  },
  {
    id: 'cormorant',
    label: 'Cormorant Garamond',
    family: '"Cormorant Garamond", "Noto Serif Bengali", Georgia, serif',
    preview: 'LoveBird Story',
  },
  {
    id: 'greatvibes',
    label: 'Great Vibes (script)',
    family: '"Great Vibes", "Noto Serif Bengali", cursive',
    preview: 'LoveBird Story',
  },
  {
    id: 'parisienne',
    label: 'Parisienne (script)',
    family: '"Parisienne", "Noto Serif Bengali", cursive',
    preview: 'LoveBird Story',
  },
]

export const bodyFonts: FontOption[] = [
  {
    id: 'outfit',
    label: 'Outfit',
    family: '"Outfit", "Noto Serif Bengali", system-ui, sans-serif',
    preview: 'Body text looks like this',
  },
  {
    id: 'lato',
    label: 'Lato',
    family: '"Lato", "Noto Serif Bengali", system-ui, sans-serif',
    preview: 'Body text looks like this',
  },
  {
    id: 'nunito',
    label: 'Nunito',
    family: '"Nunito", "Noto Serif Bengali", system-ui, sans-serif',
    preview: 'Body text looks like this',
  },
  {
    id: 'sourcesans',
    label: 'Source Sans 3',
    family: '"Source Sans 3", "Noto Serif Bengali", system-ui, sans-serif',
    preview: 'Body text looks like this',
  },
  {
    id: 'notoserif',
    label: 'Noto Serif Bengali',
    family: '"Noto Serif Bengali", Georgia, serif',
    preview: 'প্রথম পরিচয়ের গল্প',
  },
]

export const defaultThemeFonts: ThemeFonts = {
  displayFont: 'unifraktur',
  bodyFont: 'outfit',
}

export function getDisplayFont(id: string) {
  return displayFonts.find((f) => f.id === id) ?? displayFonts[0]
}

export function getBodyFont(id: string) {
  return bodyFonts.find((f) => f.id === id) ?? bodyFonts[0]
}
