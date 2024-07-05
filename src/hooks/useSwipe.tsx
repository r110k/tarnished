import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}
export const useSwipe = (elRef: RefObject<HTMLElement>, config: Config) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right'>('')
  const x = useRef(-1)

  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
  }
  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const newX = e.touches[0].clientX
    const d = newX - x.current
    if (Math.abs(d) < 12) {
      return
    } else if (d > 0) {
      setDirection('right')
    } else {
      setDirection('left')
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }

  useEffect(() => {
    if (!elRef.current)
      return
    elRef.current.addEventListener('touchstart', onTouchStart)
    elRef.current.addEventListener('touchmove', onTouchMove)
    elRef.current.addEventListener('touchend', onTouchEnd)

    return () => {
      if (!elRef.current)
        return
      elRef.current.removeEventListener('touchstart', onTouchStart)
      elRef.current.removeEventListener('touchmove', onTouchMove)
      elRef.current.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return { direction }
}
