import { useState } from 'react'
import { usePopup } from '../hooks/usePopup'
import { type Gtime, gtime } from '../lib/gtime'
import { Tabs } from './Tabs'
import { Input } from './Input'

export type TimeRange = {
  start: Gtime
  end: Gtime
  name: 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom' | 'twoMonthsAgo' | 'threeMonthsAgo'
}

type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}

const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  { text: '本月', key: { name: 'thisMonth', start: gtime().firstDayOfMonth, end: gtime().lastDayOfMonth.add(1, 'day') } },
  { text: '上月', key: { name: 'lastMonth', start: gtime().firstDayOfMonth.add(-1, 'month').firstDayOfMonth, end: gtime().firstDayOfMonth.add(-1, 'day') } },
  { text: '今年', key: { name: 'thisYear', start: gtime().set({ month: 1 }).firstDayOfMonth, end: gtime().set({ month: 12, day: 1 }).lastDayOfMonth } },
  { text: '自定义时间', key: { name: 'custom', start: gtime(), end: gtime() } },
]

export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')

  const onConfirm = () => {
    _onSelect({
      name: 'custom',
      start: gtime(),
      end: gtime(),
    })
  }
  const { popup, show } = usePopup({
    children: <div onClick={onConfirm} >
      <header py-14px px-16px text-18px text-white bg="[var(--color-blue)]">请选择时间</header>
      <main px-16px py-24px gap-y-8px>
        <Input type='date' disableError label="开始时间: " value={start} onChange={val => setStart(val)}/>
        <Input type='date' disableError label="结束时间: " value={end} onChange={val => setEnd(val)} className="mt-8px"/>
      </main>
      <footer text-right>
        <button b-none bg-transparent px-16px py-8px>确认</button>
        <button b-none bg-transparent px-16px py-8px>取消</button>
      </footer>
    </div>,
    position: 'center',
  })
  const onSelect = (key: TimeRange) => {
    if (key.name === 'custom') {
      show()
    } else {
      _onSelect(key)
    }
  }
  return (
    <>
      {popup}
      <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
    </>
  )
}
