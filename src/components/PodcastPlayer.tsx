import React, { FC, useEffect, useRef, useState } from 'react'
import { Episode } from '@shared/interfaces/general'
import { formatPayerTime } from '@shared/utils'
import HeadsetIcon from '@mui/icons-material/Headset'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import PlayerSlider from '@components/PlayerSlider'

type Props = {
  episode: Episode | null
  audioUrl?: string | null
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const PodcastPlayer: FC<Props> = ({
  episode,
  audioUrl = null,
  playing,
  setPlaying
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [volume, setVolume] = useState(1)
  const [lastVolume, setLastVolume] = useState(1)
  const timeProgress = formatPayerTime(Math.floor(currentTime))
  const totalProgress = formatPayerTime(Math.floor(duration))

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audioUrl) return

    audio.pause()
    audio.src = audioUrl
    audio.load()

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))

    setSeeking(true)
    const t = setTimeout(() => setSeeking(false), 50)
    return () => clearTimeout(t)
  }, [audioUrl])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    playing ? audio.play().catch(() => {}) : audio.pause()
  }, [playing])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => setDuration(audio.duration)
    audio.addEventListener('loadedmetadata', onLoaded)

    return () => audio.removeEventListener('loadedmetadata', onLoaded)
  }, [audioUrl])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let raf: number
    const tick = () => {
      if (!seeking) setCurrentTime(audio.currentTime)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seeking])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(lastVolume || 1)
    } else {
      setLastVolume(volume)
      setVolume(0)
    }
  }

  return (
    <div
      className={`
        fixed left-0 right-0 bottom-0 z-50 bg-white border-t shadow-lg p-4
        transition-transform duration-300
        ${audioUrl ? 'translate-y-0' : 'translate-y-full'}
      `}
    >
      <div className='flex items-center gap-4 w-full'>
        <div className='w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center'>
          <HeadsetIcon />
        </div>

        <div className='flex flex-col min-w-[180px]'>
          <div className='font-semibold'>
            {episode?.title || 'Select an episode'}
          </div>
          <div className='text-sm text-gray-500'>
            <span
              className={`inline-block ${timeProgress.length === 4 ? 'w-[37px]' : timeProgress.length === 7 ? 'w-[56px]' : 'w-[43px]'} `}
            >
              {timeProgress}
            </span>
            /
            <span
              className={`inline-block text-center ${totalProgress.length === 4 ? 'w-[43px]' : totalProgress.length === 7 ? 'w-[60px]' : 'w-[53px]'} `}
            >
              {totalProgress}
            </span>
          </div>
        </div>
        <div className='flex-1'>
          <PlayerSlider
            value={currentTime}
            max={duration}
            onChange={v => {
              const audio = audioRef.current
              if (!audio) return
              audio.currentTime = v
              setCurrentTime(v)
            }}
            disabled={!audioUrl}
          />
        </div>

        <div className='flex items-center gap-2 w-28'>
          <button onClick={toggleMute} className='text-gray-600'>
            {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </button>
          <PlayerSlider value={volume} max={1} onChange={setVolume} />
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
            onClick={() => setPlaying(p => !p)}
            disabled={!audioUrl}
          >
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </button>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  )
}

export default PodcastPlayer
