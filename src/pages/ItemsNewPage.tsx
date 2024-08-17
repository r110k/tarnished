import React, { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { Tags } from './ItemsNewPage/Tags'
import s from './ItemsNewPage.module.scss'

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
