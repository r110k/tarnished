import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRage } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineCharts } from '../components/LineCharts'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRage>('thisMonth')

  const items = [
    { happened_at: '2021-12-01', amount: 5000 },
    { happened_at: '2021-12-03', amount: 25000 },
    { happened_at: '2021-12-04', amount: 4000 },
    { happened_at: '2021-12-05', amount: 7500 },
    { happened_at: '2021-12-07', amount: 9000 },
    { happened_at: '2021-12-09', amount: 1500 },
    { happened_at: '2021-12-13', amount: 50000 },
    { happened_at: '2021-12-31', amount: 5000 },
  ].map(({ happened_at, amount }) => ({ x: happened_at, y: amount }))

  return (
    <div>
      <Gradient>
        <TopNav title="统计图表" icon={
          <Icon name="back" className='w-24px h-24px cursor-pointer' />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      <LineCharts className='h-400px' items={items} />
    </div>
  )
}

