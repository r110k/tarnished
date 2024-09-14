import { useState } from 'react'
import useSWR from 'swr'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRage } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import { useAjax } from '../lib/ajax'
import { gtime } from '../lib/gtime'

type Groups = { happened_at: string; amount: number }[]

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRage>('thisMonth')
  const { get } = useAjax({ showLoading: false, handleError: true })
  const [kind, setKind] = useState('expenses')

  const generateStartEndAndDefaultItems = () => {
    const defaultItems: { x: string; y: number }[] = []
    if (timeRange === 'thisMonth') {
      const startTime = gtime().firstDayOfMonth
      const start = startTime.format()
      /**
     * 不能直接获取这个月的最后一天，因为最后一天0点0分0秒会漏掉最后一天的所有数据
     * 在下个月第一天的时候有一个坑，就是你不能加一个月然后获取到这个月的第一天
     * 比如：1月31号加一个月可能是 3月1号2号或3号，反正不是 2月1号，稳妥的方法是，获取到
     * 这个月的最后一天，然后加一天
     */
      const endTime = gtime().lastDayOfMonth.add(1, 'days')
      const end = endTime.format()
      for (let i = 0; i < startTime.dayCountOfMonth; i++) {
        const x = startTime.clone.add(i, 'days').format()
        defaultItems.push({ x, y: 0 })
      }
      return { start, end, defaultItems }
    } else {
      return { start: '', end: '' }
    }
  }
  const { start, end, defaultItems } = generateStartEndAndDefaultItems()

  const { data: items } = useSWR(`/api/v1/items/summary?happeneded_after=${start}&happeneded_before=${end}&kind=${kind}&group_by=happened_at`,
    async path =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happened_at, amount }) => ({ x: happened_at, y: amount })),
  )
  const normalizedItems = defaultItems?.map(defaultItem =>
    items?.find(item => item.x === defaultItem.x) || defaultItem,
  )

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
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} timeRanges={[
        { key: 'thisMonth', text: '本月' },
        { key: 'lastMonth', text: '上月' }]} />
      <div flex p-16px items-center>
        <span grow-0 shrink-0>类型：</span>
        <div grow-1 shrink-1><Input type="select" options={[{ value: 'income', text: '收入' }, { value: 'expenses', text: '支出' }]}
        value={kind} onChange={value => setKind(value)} disableError={true} /></div>
      </div>
      <LineChart className='h-160px' items={normalizedItems} />
      <PieChart className='h-260px mt-24px' items={items3} />
      <RankChart className='my-24px' items={items4}/>
    </div>
  )
}

