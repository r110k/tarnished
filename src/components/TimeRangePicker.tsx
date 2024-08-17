import { Tabs } from './Tabs'
export type TimeRage = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
interface Props {
  selected: TimeRage
  onSelect: (selected: TimeRage) => void
}
const timeRanges: { key: TimeRage; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]
export const TimeRangePicker: React.FC<Props> = ({ selected, onSelect: onSelected }) => {
  return (
    <div>
      <Tabs tabItems={timeRanges} value={selected} onChange={onSelected} />
    </div>
  )
}
