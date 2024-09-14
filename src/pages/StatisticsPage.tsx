import { useState } from 'react'
import useSWR from 'swr'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import { useAjax } from '../lib/ajax'
import type { Gtime } from '../lib/gtime'
import { timeRangeToStartAndEnd } from '../lib/timeRangeToStartAndEnd'

type Groups = { happened_at: string; amount: number }[]
type Groups2 = { tag_id: string; tag: Tag; amount: number }[]
type GetKeyParams = {
  start: Gtime
  end: Gtime
  kind: Item['kind']
  group_by: 'happened_at' | 'tag_id'
}
const getKey = (params: GetKeyParams) => {
  const { start, end, kind, group_by } = params
  return `/api/v1/items/summary?happeneded_after=${start.format()}&happeneded_before=${end.format()}&kind=${kind}&group_by=${group_by}`
}

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { get } = useAjax({ showLoading: false, handleError: true })
  const [kind, setKind] = useState<Item['kind']>('expenses')

  const generateDefaultItems = (time: Gtime) => {
    // const defaultItems: { x: string; y: number }[] = []
    return Array.from({ length: time.dayCountOfMonth }).map((_, i) => {
      const x = time.clone.add(i, 'days').format()
      return { x, y: 0 }
    })
  }
  const { start, end } = timeRangeToStartAndEnd(timeRange)
  const defaultItems = generateDefaultItems(start)
  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happened_at' }),
    async path =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happened_at, amount }) => ({ x: happened_at, y: amount / 100 })),
  )
  const normalizedItems = defaultItems?.map(defaultItem =>
    items?.find(item => item.x === defaultItem.x) || defaultItem,
  )
  const { data: data2 } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }),
    async path =>
      (await get<{ groups: Groups2; total: number }>(path)).data,
  )
  const { groups: groups2 } = data2 ?? { }
  const items2 = groups2?.map((item, i) => {
    return { name: item.tag.name, value: item.amount / 100, sign: item.tag.sign }
  })

  return (
    <div pb-16px>
      <Gradient>
        <TopNav title="统计图表" icon={
          <Icon name="back" className='w-24px h-24px cursor-pointer' />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} timeRanges={[
        { key: 'thisMonth', text: '本月' },
        { key: 'lastMonth', text: '上月' },
        { key: 'twoMonthsAgo', text: '两个月前' },
        { key: 'threeMonthsAgo', text: '三个月前' }]} />
      <div flex p-16px items-center>
        <span grow-0 shrink-0>类型：</span>
        <div grow-1 shrink-1><Input type="select" options={[{ value: 'income', text: '收入' }, { value: 'expenses', text: '支出' }]}
        value={kind} onChange={value => setKind(value as Item['kind'])} disableError={true} /></div>
      </div>
      <LineChart className='h-160px' items={normalizedItems} />
      <PieChart className='h-260px mt-24px' items={items2} />
      <RankChart className='my-24px' items={items2}/>
    </div>
  )
}
