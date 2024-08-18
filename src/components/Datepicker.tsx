import { useState } from 'react'
import { gtime } from '../lib/gtime'

type Props = {
  start?: Date
  end?: Date
  value?: Date
  itemHeight?: number
}
export const Datepicker: React.FC<Props> = (props) => {
  const { start, end, value, itemHeight = 36 } = props

  const startTime = start ? gtime(start) : gtime().add(-3, 'year')
  const endTime = end ? gtime(end) : gtime().add(10, 'year')
  const valueTime = end ? gtime(value) : gtime()
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error(`结束时间（你传入的 ${endTime.format()}）必须晚于开始时间（你传入的 ${startTime.format()}）`)
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, i) => startTime.year + i)

  const yearIndex = yearList.indexOf(valueTime.year)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(yearIndex * -itemHeight)
  const setTranslateY = (y: number) => {
    if (y > 0) { y = 0 }
    y = Math.min(y, 0)
    const maxSwipeDistance = (yearList.length - 1) * -itemHeight
    y = Math.max(y, maxSwipeDistance)
    _setTranslateY(y)
  }
  return (
    <div h="50vh" overflow-hidden relative
      onTouchStart={(e) => {
        setIsTouching(true)
        setLastY(e.touches[0].clientY)
      }}
      onTouchMove={(e) => {
        if (isTouching) {
          const y = e.touches[0].clientY
          const dy = y - lastY
          const currentY = translateY + dy
          setTranslateY(currentY)
          setLastY(y)
        }
      }}
      onTouchEnd={() => {
        const remainder = translateY % itemHeight
        if (remainder !== 0) {
          // 过一段时间肯定看不懂，简述一下逻辑，如果滑动距离不是36 （itemHeight）的整数倍，我们取余，先调整滑动距离至整数倍，然后根据滑动距离调整到下一个36的整数倍或者上一个
          let adjustment = -remainder
          if (Math.abs(remainder) > 18) {
            adjustment += (itemHeight * (remainder > 0 ? 1 : -1))
          }
          setTranslateY(translateY + adjustment)
        }
        setIsTouching(false)
      }}
    >
      <div style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} b-2 b-yellow absolute top="50%" w-full></div>
      <div style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} b-1 b-red absolute top="50%" w-full>
        <ol style={{ transform: `translateY(${translateY}px)` }}
           children-flex children-justify-center children-items-center>
          {yearList.map(year =>
            <li style={{ height: itemHeight }} key={year}>{year}</li>)
          }
        </ol>
      </div>
    </div>
  )
}
