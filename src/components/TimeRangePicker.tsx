import { usePopup } from '../hooks/usePopup'
import { type Gtime, gtime } from '../lib/gtime'
import { Tabs } from './Tabs'

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

  const onConfirm = () => {
    _onSelect({
      name: 'custom',
      start: gtime(),
      end: gtime(),
    })
  }
  const { popup, show } = usePopup({
    children: <div onClick={onConfirm}>弹窗</div>,
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
