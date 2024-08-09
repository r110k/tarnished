import s from './TimeRangePicker.module.scss'
export type TimeRage = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
interface Props {
  selected: TimeRage
  onSelected: (selected: TimeRage) => void
}
const timeRanges: { key: TimeRage; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]
export const TimeRangePicker: React.FC<Props> = ({ selected, onSelected }) => {
  return (
    <div>
      <ol flex text-white children-px-24px children-py-12px cursor-pointer>
        {timeRanges.map(tr => (<li key={tr.key}
          className={tr.key === selected ? s.selected : ''}
          onClick={() => onSelected(tr.key)}>
          {tr.text}
        </li>))}
      </ol>
    </div>
  )
}
