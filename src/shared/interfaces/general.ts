import { JSXElementConstructor, ReactElement } from 'react'

export type ChildrenComponents =
  | ReactElement<any, string | JSXElementConstructor<any>>[]
  | ReactElement<any, string | JSXElementConstructor<any>>
  | string
  | number
  | any

export interface Podcast {
  description: string
  category: string
  language: string
  imageUrl: string
  links: PodcastLinks
  episodes: Episode[]
}

export interface PodcastLinks {
  website: string
  youtube: string
  instagram: string
  facebook: string
  telegram: string
  tiktok: string
  spotify: string
  applePodcasts: string
  rss: string
}

export interface Episode {
  id: string
  number: number
  show: string
  hosts: string[]
  guests: string[]
  topics: string[]
  description: string
  youtubeUrl: string
  imageUrl: string
  audioUrl: string
  hexColor: string
  duration: number
  durationString: string
  bytesLength: number
  explicit: boolean
  type: 'full' | 'trailer' | string
  publishedAt: string // or Date if you parse it
}
