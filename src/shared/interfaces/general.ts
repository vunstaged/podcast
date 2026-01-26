import { JSXElementConstructor, ReactElement } from 'react'

export type ChildrenComponents =
  | ReactElement<any, string | JSXElementConstructor<any>>[]
  | ReactElement<any, string | JSXElementConstructor<any>>
  | string
  | number
  | any

export interface Episode {
  id: string
  title: string
  description: string
  episodeNr: string
  audioUrl: string
  topics: string[]
}
