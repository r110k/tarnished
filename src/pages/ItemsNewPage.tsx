import React, { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import s from './ItemsNewPage.module.scss'

export type ItemKind = 'income' | 'expenses'
const tabItems: {
  key: ItemKind
  text: string
  element: React.ReactNode
}[] = [
  { key: 'expenses', text: '支出', element: <div>支出</div> },
  { key: 'income', text: '收入', element: <div>收入</div> },
]
export const ItemsNewPage: React.FC = () => {
  const [tabItem, setTabItem] = useState<ItemKind>('expenses')
  return (
    <div className={s.itemsNewPage}>
      <Gradient>
        <TopNav title="使用你的卢恩" icon={ <Icon name="back" /> } />
      </Gradient>
      <Tabs tabItems={tabItems} value={tabItem} onChange={setTabItem}
        className='text-center' classPrefix="itemsNewPageTabs"/>
    </div>
  )
}
