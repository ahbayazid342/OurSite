import { useMemo, useState } from 'react'
import { backgroundPlaylist } from '../data/content'

export function useBackgroundMusic() {
  const [on, setOn] = useState(false)

  const embedSrc = useMemo(() => {
    const ids = backgroundPlaylist.map((s) => s.id)
    const first = ids[0]
    const playlist = ids.join(',')
    const params = new URLSearchParams({
      autoplay: '1',
      loop: '1',
      playlist,
      controls: '0',
      modestbranding: '1',
      rel: '0',
      playsinline: '1',
    })
    return `https://www.youtube.com/embed/${first}?${params.toString()}`
  }, [])

  const toggleMusic = () => setOn((v) => !v)

  const nowPlaying = backgroundPlaylist[0]

  return { musicOn: on, toggleMusic, embedSrc, nowPlaying }
}
