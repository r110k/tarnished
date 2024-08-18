import { useRef, useState } from 'react'
import { gtime } from '../lib/gtime'

type Props = {
  start?: Date
  end?: Date
  value?: Date
  onChange?: (value: Date) => void
}
// useRef + foreUpdate ({} 永远不等于另一个 {})
export const Datepicker: React.FC<Props> = (props) => {
  const { start, end, value, onChange } = props
  const startTime = start ? gtime(start) : gtime().add(-3, 'year')
  const endTime = end ? gtime(end) : gtime().add(10, 'year')
  const valueTime = useRef(value ? gtime(value) : gtime())
  const [, update] = useState({})
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error(`结束时间（你传入的 ${endTime.format()}）必须晚于开始时间（你传入的 ${startTime.format()}）`)
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, i) => startTime.year + i)
  const monthList = Array.from({ length: 12 })
      .map((_, i) => i + 1)
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day })
    .map((_, i) => i + 1)
  return (
    <div flex>
      <Column className='grow-1' items={yearList} value={valueTime.current.year} 
        onChange={(year) => { valueTime.current.year = year; update({}); onChange?.(valueTime.current.date) }} />
      <Column className='grow-1' items={monthList} value={valueTime.current.month} 
        onChange={(month) => { valueTime.current.month = month; update({}); onChange?.(valueTime.current.date) }} />
      <Column className='grow-1' items={dayList} value={valueTime.current.day} 
        onChange={(day) => { valueTime.current.day = day; update({}); onChange?.(valueTime.current.date) }} />
    </div>
  )
}

type ColumnProps = {
  itemHeight?: number
  className?: string
  items: number[]
  value: number
  onChange: (value: number) => void
}
export const Column: React.FC<ColumnProps> = (props) => {
  const { itemHeight = 36, className, items, value, onChange    } = props
  const yearIndex = items.indexOf(value)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(yearIndex * -itemHeight)
  const setTranslateY = (y: number) => {
    if (y > 0) { y = 0 }
    y = Math.min(y, 0)
    const maxSwipeDistance = (items.length - 1) * -itemHeight
    y = Math.max(y, maxSwipeDistance)
    _setTranslateY(y)
  }
  return (
    <div h="50vh" overflow-hidden relative className={className}
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
        // 过一段时间肯定看不懂，简述一下逻辑，如果滑动距离不是36 （itemHeight）的整数倍，我们取余，先调整滑动距离至整数倍，然后根据滑动距离调整到下一个36的整数倍或者上一个
        let y = translateY - remainder
        if (Math.abs(remainder) > 18) {
          y += (itemHeight * (remainder > 0 ? 1 : -1))
        }
        setTranslateY(y)
        setIsTouching(false)
        onChange(items[Math.abs(y / itemHeight)])
      }}
    >
      <div style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} border-b-1 border-t-1 b-yellow absolute top="50%" w-full></div>
      <div style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} absolute top="50%" w-full>
        <ol style={{ transform: `translateY(${translateY}px)` }}
           children-flex children-justify-center children-items-center>
          {items.map(item =>
            <li style={{ height: itemHeight }} key={item}>{item}</li>)
          }
        </ol>
      </div>
    </div>
  )
}
