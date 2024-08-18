import { useState } from 'react'
import { gtime } from '../lib/gtime'

type Props = {
  start?: Date
  end?: Date
  value?: Date
}
export const Datepicker: React.FC<Props> = (props) => {
  const { start, end, value } = props

  const t = gtime()
  console.log(t.format())
  console.log(t.parts)
  t.parts = { year: '2019' }
  console.log(t.parts)
  console.log(t.add(-10, 'year'))
  console.log(t.add(10, 'year'))
  console.log(t.format('yyyy年MM月dd日 HH:mm:ss.fff'))

  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)
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
        const remainder = translateY % 36
        if (remainder !== 0) {
          // 过一段时间肯定看不懂，简述一下逻辑，如果滑动距离不是36的整数倍，我们取余，先调整滑动距离至整数倍，然后根据滑动距离调整到下一个36的整数倍或者上一个
          let adjustment = -remainder
          if (Math.abs(remainder) > 18) {
            adjustment += (36 * (remainder > 0 ? 1 : -1))
          }
          setTranslateY(translateY + adjustment)
        }
        setIsTouching(false)
      }}
    >
      <div b-2 b-yellow absolute h-36px top="[calc(50%-18px)]" w-full></div>
      <div b-1 b-red absolute h-36px top="[calc(50%-18px-360px)]" w-full>
        <ol style={{ transform: `translateY(${translateY}px)` }}
          children-h-36px text-center children-leading-36px>
          <li>1990</li>
          <li>1991</li>
          <li>1992</li>
          <li>1993</li>
          <li>1994</li>
          <li>1995</li>
          <li>1996</li>
          <li>1997</li>
          <li>1998</li>
          <li>1999</li>
          <li>2000</li>
          <li>2001</li>
          <li>2002</li>
          <li>2003</li>
          <li>2004</li>
          <li>2005</li>
          <li>2006</li>
          <li>2007</li>
          <li>2008</li>
          <li>2009</li>
          <li>2010</li>
          <li>2011</li>
          <li>2012</li>
          <li>2013</li>
          <li>2014</li>
          <li>2015</li>
          <li>2016</li>
          <li>2017</li>
          <li>2018</li>
          <li>2019</li>
          <li>2020</li>
          <li>2021</li>
          <li>2022</li>
          <li>2023</li>
          <li>2024</li>
          <li>2025</li>
          <li>2026</li>
          <li>2027</li>
        </ol>
      </div>
    </div>
  )
}
