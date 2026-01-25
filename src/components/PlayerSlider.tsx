import React, { FC, useRef } from 'react'

type SliderProps = {
  value: number
  max: number
  onChange: (value: number) => void
  disabled?: boolean
}

const PlayerSlider: FC<SliderProps> = ({
  value,
  max,
  onChange,
  disabled = false
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const percent = max ? (value / max) * 100 : 0

  const handleMove = (clientX: number) => {
    if (disabled) return
    const track = trackRef.current
    if (!track) return

    const rect = track.getBoundingClientRect()
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    onChange(p * max)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    handleMove(e.clientX)

    const onMove = (ev: MouseEvent) => handleMove(ev.clientX)
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)

    const onMove = (ev: TouchEvent) => handleMove(ev.touches[0].clientX)
    const onEnd = () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }

    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
  }

  return (
    <div
      ref={trackRef}
      className={`w-full h-2 rounded-full overflow-hidden bg-black/20 cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div
        className='h-full rounded-full bg-black'
        style={{ width: `${percent}%`, minWidth: '.1%' }}
      />
    </div>
  )
}

export default PlayerSlider
