import React, { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { Tags } from './ItemsNewPage/Tags'
import s from './ItemsNewPage.module.scss'
import { DateAndAmount } from './ItemsNewPage/DateAndAmount'

const tabItems: {
  key: Item['kind']
  text: string
  element: React.ReactNode
}[] = [
  { key: 'expenses', text: '支出', element: <Tags kind='expenses' /> },
  { key: 'income', text: '收入', element: <Tags kind='income' /> },
]
export const ItemsNewPage: React.FC = () => {
  const [tabItem, setTabItem] = useState<Item['kind']>('expenses')
  const { data, error, setData, setError } = useCreateItemStore()

  return (
    <div h-vhcheck flex flex-col className={s.itemsNewPage}>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="使用你的卢恩" icon={ <Icon name="back" /> } />
        <div>{JSON.stringify(data)}</div>
      </Gradient>

      <Tabs tabItems={tabItems} className='text-center grow-1 shrink-1 overflow-hidden' classPrefix="itemsNewPageTabs"
        value={data.kind!} onChange={tabItem => setData({ kind: tabItem })} />

      <DateAndAmount className="grow-0 shrink-0" />
    </div>
  )
}
