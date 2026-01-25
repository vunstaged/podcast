import React from 'react'
import PodcastLogo from '@images/logo-black.png'

type EpisodeProps = {
  onPlayLatestEpisode: () => void
}

const PodcastHero = ({ onPlayLatestEpisode }: EpisodeProps) => {
  return (
    <div>
      <img width='300px' src={PodcastLogo} alt='Podcast' />
      <p className='mt-6 text-lg text-gray-700'>
        A weekly show about tech, creativity, and the stories behind the work.
      </p>

      <div className='mt-6 flex flex-wrap gap-3'>
        <button
          className='px-5 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition'
          onClick={() => onPlayLatestEpisode()}
        >
          Play Latest
        </button>
        <button className='px-5 py-3 rounded-xl border border-gray-300 text-gray-900 hover:bg-gray-100 transition'>
          Browse Episodes
        </button>
      </div>
    </div>
  )
}

export default PodcastHero
