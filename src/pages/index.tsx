import React, { FC } from 'react'
import type { HeadFC, PageProps } from 'gatsby'

type Episode = {
  id: string
  title: string
  description: string
  date: string
  duration: string
  tags: string[]
}

const episodes: Episode[] = [
  {
    id: 'ep-01',
    title: 'Welcome to the Podcast',
    description: 'We introduce the show, the hosts, and what to expect.',
    date: '2026-01-01',
    duration: '28:15',
    tags: ['intro', 'hosts']
  },
  {
    id: 'ep-02',
    title: 'The Future of Tech',
    description: 'A deep dive into emerging technologies and trends.',
    date: '2026-01-08',
    duration: '45:12',
    tags: ['tech', 'trends']
  },
  {
    id: 'ep-03',
    title: 'The Future of People',
    description: 'A deep dive into emerging technologies and trends.',
    date: '2026-01-11',
    duration: '45:12',
    tags: ['tech', 'trends']
  }
]

const IndexPage: FC<PageProps> = () => {
  const totalEpisodes = episodes.length
  const latestEpisode = episodes[0]

  return (
    <main className='min-h-screen bg-gray-50 text-gray-900'>
      {/* HERO */}
      <section className='max-w-6xl mx-auto px-6 py-10'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
          <div>
            <h1 className='text-4xl font-bold'>The VUnstaged Podcast</h1>
            <p className='mt-3 text-lg text-gray-700'>
              A weekly show about tech, creativity, and the stories behind the
              work.
            </p>

            <div className='mt-6 flex flex-wrap gap-3'>
              <button className='px-5 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition'>
                Play Latest
              </button>
              <button className='px-5 py-3 rounded-xl border border-gray-300 text-gray-900 hover:bg-gray-100 transition'>
                Browse Episodes
              </button>
            </div>
          </div>

          {/* Podcast stats */}
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
        </div>
      </section>

      {/* EPISODE GRID */}
      <section className='max-w-6xl mx-auto px-6 pb-16'>
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
                  {episode.duration}
                </span>
              </div>

              <p className='mt-3 text-gray-700'>{episode.description}</p>

              <div className='mt-4 flex flex-wrap gap-2'>
                {episode.tags.map(tag => (
                  <span
                    key={tag}
                    className='text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-700'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className='mt-5 flex justify-between items-center'>
                <span className='text-sm text-gray-500'>{episode.date}</span>
                <button className='px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-900 transition'>
                  Listen
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>VUnstaged</title>
