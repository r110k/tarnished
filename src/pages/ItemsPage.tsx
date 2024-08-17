import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRage } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRage>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <Gradient>
        <TopNav title="卢恩在哪" icon={
          <Icon name="menu" className='w-24px h-24px cursor-pointer' onClick={() => setVisible(!visible)} />
        } />
        <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      </Gradient>
      <ItemsSummary />
      <ItemsList />
      <AddItemFloatButton />
      <TopMenu onClickMask={() => setVisible(false)} visible={visible} />
    </div>
  )
}
