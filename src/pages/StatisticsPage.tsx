import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRage } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRage>('thisMonth')
  const [x, setX] = useState('expenses')

  const items = [
    { happened_at: '2021-12-01', amount: 5000 },
    { happened_at: '2021-12-02', amount: 8900 },
    { happened_at: '2021-12-03', amount: 25000 },
    { happened_at: '2021-12-04', amount: 4000 },
    { happened_at: '2021-12-05', amount: 7500 },
    { happened_at: '2021-12-06', amount: 7500 },
    { happened_at: '2021-12-07', amount: 9000 },
    { happened_at: '2021-12-08', amount: 9000 },
    { happened_at: '2021-12-09', amount: 1500 },
    { happened_at: '2021-12-10', amount: 1500 },
    { happened_at: '2021-12-11', amount: 15000 },
    { happened_at: '2021-12-12', amount: 18900 },
    { happened_at: '2021-12-13', amount: 15000 },
    { happened_at: '2021-12-14', amount: 14000 },
    { happened_at: '2021-12-15', amount: 17500 },
    { happened_at: '2021-12-16', amount: 17500 },
    { happened_at: '2021-12-17', amount: 19000 },
    { happened_at: '2021-12-18', amount: 19000 },
    { happened_at: '2021-12-19', amount: 11500 },
    { happened_at: '2021-12-20', amount: 11500 },
    { happened_at: '2021-12-21', amount: 25000 },
    { happened_at: '2021-12-22', amount: 28900 },
    { happened_at: '2021-12-23', amount: 25000 },
    { happened_at: '2021-12-24', amount: 24000 },
    { happened_at: '2021-12-25', amount: 27500 },
    { happened_at: '2021-12-26', amount: 27500 },
    { happened_at: '2021-12-27', amount: 29000 },
    { happened_at: '2021-12-28', amount: 29000 },
    { happened_at: '2021-12-29', amount: 31500 },
    { happened_at: '2021-12-30', amount: 33500 },
    { happened_at: '2021-12-31', amount: 35000 },
  ].map(({ happened_at, amount }) => ({ x: happened_at, y: amount }))

  const items2 = [
    { tag: { name: '吃饭', sign: '🥨' }, amount: 160000 },
    { tag: { name: '买衣服', sign: '👕' }, amount: 60000 },
    { tag: { name: '氪金', sign: '🎉' }, amount: 64800 },
    { tag: { name: '打车', sign: '🚕' }, amount: 50000 },
    { tag: { name: '加油', sign: '🛢' }, amount: 40000 },
    { tag: { name: '房租', sign: '⛺' }, amount: 399900 },
  ]
  const items3 = items2.map(({ tag, amount }) => ({ x: tag.name, y: amount }))
  const items4 = items2.map(({ tag, amount }) => ({ name: tag.name, sign: tag.sign, amount })).sort((a, b) => b.amount - a.amount)

  return (
    <div pb-16px>
      <Gradient>
        <TopNav title="统计图表" icon={
          <Icon name="back" className='w-24px h-24px cursor-pointer' />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      <div flex p-16px items-center>
        <span grow-0 shrink-0>类型：</span>
        <div grow-1 shrink-1><Input type="select" options={[{ value: 'income', text: '收入' }, { value: 'expenses', text: '支出' }]}
        value={x} onChange={value => setX(value)} disableError={true} /></div>
      </div>
      <LineChart className='h-160px' items={items} />
      <PieChart className='h-260px mt-24px' items={items3} />
      <RankChart className='my-24px' items={items4}/>
    </div>
  )
}

