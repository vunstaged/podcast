import React, { useEffect, useState } from 'react'
import { Episode } from '@shared/interfaces/general'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { formatPayerTime, getAudioDuration } from '@shared/utils'

type EpisodesListProps = {
  episodes: Episode[]
  activeEpisode: Episode | null
  playing: boolean
  setActiveEpisode: (episode: Episode) => void
  setPlaying: (value: boolean) => void
}

const EpisodesList = ({
  episodes,
  activeEpisode,
  playing,
  setActiveEpisode,
  setPlaying
}: EpisodesListProps) => {
  const [durations, setDurations] = useState<Record<string, number>>({})

  useEffect(() => {
    episodes.forEach(async episode => {
      if (!episode.audioUrl) return

      try {
        const duration = await getAudioDuration(episode.audioUrl)
        setDurations(prev => ({ ...prev, [episode.id]: duration }))
      } catch (err) {
        console.error('Failed to load audio metadata:', err)
      }
    })
  }, [episodes])

  const handlePlayPause = (episode: Episode) => {
    if (activeEpisode?.id === episode.id) {
      setPlaying(!playing)
    } else {
      setActiveEpisode(episode)
      setPlaying(true)
    }
  }

  return (
    <section className='max-w-7xl mx-auto px-6 pb-16'>
      <h2 className='text-2xl font-bold mb-6'>Episodes</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {episodes.map(episode => (
          <article
            key={episode.id}
            className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition'
          >
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-semibold'>{episode.title}</h3>
              <span className='text-sm text-gray-500'>
                {durations[episode.id]
                  ? formatPayerTime(Math.floor(durations[episode.id]))
                  : '00:00'}
              </span>
            </div>

            <p className='mt-3 text-sm text-gray-700'>{episode.description}</p>

            <div className='mt-5 flex justify-between items-center'>
              <div className='flex items-center gap-2 flex-wrap'>
                {episode.topics.slice(0, 3).map(topic => (
                  <span
                    key={topic}
                    className='text-[10px] font-medium px-2 py-0.5 rounded-full border border-gray-200 text-gray-700'
                  >
                    {topic}
                  </span>
                ))}

                {episode.topics.length > 3 && (
                  <span className='text-[10px] font-medium px-2 py-0.5 rounded-full border border-gray-200 text-gray-700'>
                    +{episode.topics.length - 3} more
                  </span>
                )}
              </div>

              <div className='min-w-13'>
                <button
                  className='
                  w-12 h-12 rounded-full bg-black text-white
                  flex items-center justify-center shadow-lg
                  transition-transform duration-150 ease-out
                  hover:scale-105
                  disabled:opacity-50
                  disabled:pointer-events-none
                  active:scale-90
                  disabled:active:scale-100'
                  onClick={() => handlePlayPause(episode)}
                  disabled={!episode.audioUrl}
                >
                  {activeEpisode?.id === episode.id && playing ? (
                    <PauseIcon />
                  ) : (
                    <PlayArrowIcon />
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EpisodesList
