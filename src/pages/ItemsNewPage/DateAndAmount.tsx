import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'

interface Props {
  className?: string
}

export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props

  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)

  const { popup, toggle } = usePopup(true, <div h="50vh" overflow-hidden relative
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
  </div>)
  const onClickDate = () => { toggle() }
  return (
    <>
      <div className={className}>
        <div flex p-16px border-t-1px border-t="#ddd" items-center>
          <span flex grow-0 shrink-0 flex-gap-8px items-center
            onClick={onClickDate}>
            <Icon name="calendar" className='w-24px h-24px text-[rgb(59,65,48)]' />
            <span text-12px text="#999">2024-08-17</span>
          </span>
          <code grow-1 shrink-1 text-right color="#53a867">123456789.01</code>
        </div>
        <div grid grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,56px)]"
          children-b-none children-bg-white
          bg="#ddd" gap-1px py-1px
        >
          <button row-start-1 col-start-1 row-end-2 col-end-2>1</button>
          <button row-start-1 col-start-2 row-end-2 col-end-3>2</button>
          <button row-start-1 col-start-3 row-end-2 col-end-4>3</button>
          <button row-start-2 col-start-1 row-end-3 col-end-2>4</button>
          <button row-start-2 col-start-2 row-end-3 col-end-3>5</button>
          <button row-start-2 col-start-3 row-end-3 col-end-4>6</button>
          <button row-start-3 col-start-1 row-end-4 col-end-2>7</button>
          <button row-start-3 col-start-2 row-end-4 col-end-3>8</button>
          <button row-start-3 col-start-3 row-end-4 col-end-4>9</button>
          <button row-start-4 col-start-1 row-end-5 col-end-3>0</button>
          <button row-start-4 col-start-3 row-end-5 col-end-4>.</button>
          <button row-start-1 col-start-4 row-end-3 col-end-5>清空</button>
          <button row-start-3 col-start-4 row-end-5 col-end-5>提交</button>
        </div>
      </div>
      {popup}
    </>
  )
}
