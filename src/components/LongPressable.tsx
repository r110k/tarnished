import { useRef } from 'react'
import type { ReactNode, TouchEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
  onEnd?: () => void
}
export const LongPressable: React.FC<Props> = (props) => {
  const { children, className, onEnd } = props
  const touchTimer = useRef<number>()
  const touchPosition = useRef<{ x?: number; y?: number }>({ x: undefined, y: undefined })
  const onTouchStart = (e: TouchEvent) => {
    touchTimer.current = window.setTimeout(() => {
      onEnd?.()
    }, 800)
    const { clientX: x, clientY: y } = e.touches[0]
    touchPosition.current = { x, y }
  }
  const onTouchMove = (e: TouchEvent) => {
    const limitMoveDistance = 5
    const { clientX: newX, clientY: newY } = e.touches[0]
    const { x, y } = touchPosition.current
    if (x === undefined || y === undefined) { return }
    const deltaX = x - newX
    const deltaY = y - newY
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
    if (distance > limitMoveDistance) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchTimer.current) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
  return (
    <div className={className}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {children}
     </div>
  )
}
