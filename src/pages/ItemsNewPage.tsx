import React from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { Tags } from './ItemsNewPage/Tags'
import s from './ItemsNewPage.module.scss'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { ItemDate } from './ItemsNewPage/ItemDate'

export const ItemsNewPage: React.FC = () => {
  const { data, error, setData, setError } = useCreateItemStore()
  const tabItems: {
    key: Item['kind']
    text: string
    element: React.ReactNode
  }[] = [
    { key: 'expenses', text: '支出', element: <Tags kind='expenses' value={data.tag_ids} onChange={(tag_ids) => { setData({ tag_ids }) }} /> },
    { key: 'income', text: '收入', element: <Tags kind='income' value={data.tag_ids} onChange={(tag_ids) => { setData({ tag_ids }) }} /> },
  ]

  return (
    <div h-vhcheck flex flex-col className={s.itemsNewPage}>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="使用你的卢恩" icon={<Icon name="back" />} />
        <div text-24px>{JSON.stringify(data)}</div>
      </Gradient>
      <Tabs tabItems={tabItems} className='text-center grow-1 shrink-1 overflow-hidden' classPrefix="itemsNewPageTabs"
        value={data.kind!} onChange={tabItem => setData({ kind: tabItem })} />
      <ItemAmount className="grow-0 shrink-0"
        value={data.amount} onChange={amount => setData({ amount })}
        itemDate={<ItemDate value={data.happened_at} onChange={(happened_at) => { setData({ happened_at }) }}/>} />
    </div>
  )
}
