import React, { FC, useState } from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { Episode } from '@shared/interfaces/general'
import PodcastPlayer from '@components/PodcastPlayer'
import EpisodesList from '@components/EpisodesList'
import PodcastStats from '@components/PodcastStats'
import PodcastHero from '@components/PodcastHero'
import episodes from '@shared/resources/episodes.json'

const IndexPage: FC<PageProps> = () => {
  const totalEpisodes = episodes.length
  const latestEpisode = episodes[0]
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null)
  const [playing, setPlaying] = useState(false)

  const getEpisodeUrl = (id: string) =>
    `https://cdn.vunstaged.com/podcast/${id}.mp3`

  return (
    <main className='min-h-screen bg-gray-50 text-gray-900 pb-24'>
      <section className='max-w-7xl mx-auto px-6 py-10'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
          <PodcastHero
            onPlayLatestEpisode={() => {
              setActiveEpisode(latestEpisode)
              setPlaying(true)
            }}
          />
          <PodcastStats
            totalEpisodes={totalEpisodes}
            latestEpisode={latestEpisode}
          />
        </div>
      </section>

      <EpisodesList
        episodes={episodes}
        activeEpisode={activeEpisode}
        playing={playing}
        setActiveEpisode={setActiveEpisode}
        setPlaying={setPlaying}
      />

      <PodcastPlayer
        episode={activeEpisode}
        audioUrl={activeEpisode?.audioUrl}
        playing={playing}
        setPlaying={setPlaying}
      />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>VUnstaged</title>
