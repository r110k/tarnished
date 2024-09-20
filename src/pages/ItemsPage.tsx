import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Gtime, gtime } from '../lib/gtime'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [outOfRange, setOutOfRange] = useState(false)
  const [timeRange, _setTimeRange] = useState<TimeRange>({ name: 'thisMonth', start: gtime().firstDayOfMonth, end: gtime().lastDayOfMonth.add(1, 'day') })
  const { visible, setVisible } = useMenuStore()
  const { start, end } = timeRange
  const setTimeRange = (t: TimeRange) => {
    if (t.start.timestamp > t.end.timestamp) {
      [t.start, t.end] = [t.end, t.start]
    }
    if (t.end.timestamp - t.start.timestamp > Gtime.DAY * 365) {
      setOutOfRange(true)
    } else {
      setOutOfRange(false)
    }
    _setTimeRange(t)
  }
  return (
    <div>
      <Gradient>
        <TopNav title="卢恩在哪" icon={
          <Icon name="menu" className='w-24px h-24px cursor-pointer' onClick={() => setVisible(!visible)} />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      {
        outOfRange
          ? <div text-center p-32px >筛选账单时间跨度不能超过365天</div>
          : <>
            <ItemsSummary start={start} end={end} />
            <ItemsList start={start} end={end} />
          </>
      }
      <AddItemFloatButton />
      <TopMenu onClickMask={() => setVisible(false)} visible={visible} />
    </div>
  )
}
