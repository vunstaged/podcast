import React from 'react'
import { Episode } from '@shared/interfaces/general'

type PodcastStatsProps = {
  totalEpisodes: number
  latestEpisode: Episode
}

const PodcastStats = ({ totalEpisodes, latestEpisode }: PodcastStatsProps) => {
  return (
    <div className='bg-white rounded-2xl shadow-md p-6 w-full md:w-1/3'>
      <h2 className='font-semibold text-lg'>Podcast Stats</h2>
      <div className='mt-4 space-y-3'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Episodes</span>
          <span className='font-semibold'>{totalEpisodes}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Latest</span>
          <span className='font-semibold'>{latestEpisode.title}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Next Release</span>
          <span className='font-semibold'>Every Friday</span>
        </div>
      </div>
    </div>
  )
}

export default PodcastStats
