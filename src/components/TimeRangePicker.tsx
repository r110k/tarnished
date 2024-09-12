import { Tabs } from './Tabs'
export type TimeRage =
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom'
  | 'twoMonthsAgo'
  | 'threeMonthsAgo'

type Props = {
  selected: TimeRage
  onSelect: (selected: TimeRage) => void
  timeRanges?: { key: TimeRage; text: string }[]
}

const defaultTimeRanges: { key: TimeRage; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
  { key: 'twoMonthsAgo', text: '两个月前' },
  { key: 'threeMonthsAgo', text: '三个月前' },
]

export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect, timeRanges = defaultTimeRanges } = props
  return (
    <div>
      <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
    </div>
  )
}
