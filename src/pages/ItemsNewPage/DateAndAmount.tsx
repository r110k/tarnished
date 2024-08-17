import { useState } from 'react'
import { Icon } from '../../components/Icon'

interface Props {
  className?: string
}

export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props
  return (
    <div className={className}>
      <div flex p-16px border-t-1px border-t="#ddd" items-center gap-x-8px>
        <Icon name="calendar" grow-0 shrink-0 className='w-24px h-24px text-[rgb(59,65,48)]' />
        <span grow-0 shrink-0 text-12px text="#999">2024-08-17</span>
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

  )
}
