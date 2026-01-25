import React from 'react'
import { Episode } from '@shared/interfaces/general'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

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
              <span className='text-sm text-gray-500'>{episode.duration}</span>
            </div>

            <p className='mt-3 text-gray-700'>{episode.description}</p>

            <div className='mt-4 flex flex-wrap gap-2'>
              {episode.topics.map(topic => (
                <span
                  key={topic}
                  className='text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-700'
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className='mt-5 flex justify-between items-center'>
              <span className='text-sm text-gray-500'>{episode.date}</span>

              <button
                onClick={() => handlePlayPause(episode)}
                className='w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg'
              >
                {activeEpisode?.id === episode.id && playing ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EpisodesList
