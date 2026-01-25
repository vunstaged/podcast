type MeasureFn = {
  (text: string, font: string): number
  canvas?: HTMLCanvasElement
}

export const capitalizeWords = (text: string) => {
  return text
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const measureText: MeasureFn = (text, font) => {
  if (typeof document === 'undefined') return 0
  const canvas =
    measureText.canvas ??
    (measureText.canvas = document.createElement('canvas'))
  const ctx = canvas.getContext('2d')
  if (!ctx) return 0
  ctx.font = font
  return ctx.measureText(text).width
}

export const updateUrlQueryParams = (
  url: string,
  params: Record<string, string>
): string => {
  const parsedUrl = new URL(url)
  const searchParams = parsedUrl.searchParams

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value)
  })

  return parsedUrl.toString()
}

export const scrollMainToTop = (smooth: boolean = true) => {
  if (typeof window === 'undefined') return

  const main = document.querySelector('main')
  if (!main) return

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
      })
    })
  })
}

export const formatPayerTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const paddedSeconds = String(seconds).padStart(2, '0')
  const paddedMinutes = hours > 0 ? String(minutes).padStart(2, '0') : minutes

  return hours > 0
    ? `${hours}:${paddedMinutes}:${paddedSeconds}`
    : `${minutes}:${paddedSeconds}`
}
