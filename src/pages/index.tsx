import React, { FC, useEffect, useState } from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { Episode, Podcast } from '@shared/interfaces/general'
import PodcastPlayer from '@components/PodcastPlayer'
import EpisodesList from '@components/EpisodesList'
import PodcastStats from '@components/PodcastStats'
import PodcastHero from '@components/PodcastHero'

const PODCAST_JSON_URL = 'https://cdn.vunstaged.com/podcast/podcast.json'

const IndexPage: FC<PageProps> = () => {
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const res = await fetch(PODCAST_JSON_URL)
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        const data: Podcast = await res.json()
        setPodcast(data)
      } catch (err: any) {
        console.error('Failed to load podcast:', err)
        setError('Failed to load podcast data')
      } finally {
        setLoading(false)
      }
    }

    void fetchPodcast()
  }, [])

  if (loading) {
    return (
      <main className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500'>Loading podcast...</p>
      </main>
    )
  }

  if (error || !podcast) {
    return (
      <main className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500'>{error || 'Podcast not available'}</p>
      </main>
    )
  }

  const episodes = podcast.episodes ?? []
  const totalEpisodes = episodes.length
  const latestEpisode = episodes[0]

  return (
    <main className='min-h-screen bg-gray-50 text-gray-900 pb-24'>
      <section className='max-w-7xl mx-auto px-6 py-10'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
          <PodcastHero
            onPlayLatestEpisode={() => {
              if (latestEpisode) {
                setActiveEpisode(latestEpisode)
                setPlaying(true)
              }
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

export const Head: HeadFC = () => <title>VUnstaged Podcast</title>
