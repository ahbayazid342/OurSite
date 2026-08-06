import { BackgroundMusic } from '../components/BackgroundMusic'
import { Countdown } from '../components/Countdown'
import { Dreams } from '../components/Dreams'
import { FallingHearts } from '../components/FallingHearts'
import { Footer } from '../components/Footer'
import { Gallery } from '../components/Gallery'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { LoveNotes } from '../components/LoveNotes'
import { OnThisDay } from '../components/OnThisDay'
import { Songs } from '../components/Songs'
import { Timeline } from '../components/Timeline'
import { Trips } from '../components/Trips'
import { useBackgroundMusic } from '../hooks/useBackgroundMusic'
import { useTheme } from '../hooks/useTheme'

export function HomePage() {
  const { isDark, toggleTheme } = useTheme()
  const { musicOn, toggleMusic, embedSrc, nowPlaying } = useBackgroundMusic()

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-dvh bg-paper text-ink transition-colors duration-400">
        <FallingHearts />
        <BackgroundMusic
          active={musicOn}
          embedSrc={embedSrc}
          label={`${nowPlaying.title} — ${nowPlaying.artist}`}
        />
        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
          musicOn={musicOn}
          onToggleMusic={toggleMusic}
          nowPlaying={musicOn ? `${nowPlaying.title}` : undefined}
        />
        <main>
          <Hero />
          <Countdown />
          <Timeline />
          <Trips />
          <Gallery />
          <Songs />
          <Dreams />
          <LoveNotes />
          <OnThisDay />
        </main>
        <Footer />
      </div>
    </div>
  )
}
