import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { gtime } from '../lib/gtime'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({ name: 'thisMonth', start: gtime().firstDayOfMonth, end: gtime().lastDayOfMonth.add(1, 'day') })
  const { visible, setVisible } = useMenuStore()
  const { start, end } = timeRange
  return (
    <div>
      <Gradient>
        <TopNav title="卢恩在哪" icon={
          <Icon name="menu" className='w-24px h-24px cursor-pointer' onClick={() => setVisible(!visible)} />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      <ItemsSummary />
      <ItemsList start={start} end={end} />
      <AddItemFloatButton />
      <TopMenu onClickMask={() => setVisible(false)} visible={visible} />
    </div>
  )
}
