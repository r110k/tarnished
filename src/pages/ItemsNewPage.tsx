import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'

export type ItemKind = 'income' | 'expenses'
const tabItems: { key: ItemKind; text: string }[] = [
  { key: 'expenses', text: '支出' },
  { key: 'income', text: '收入' },
]
export const ItemsNewPage: React.FC = () => {
  const [tabItem, setTabItem] = useState<ItemKind>('expenses')
  return (
    <div>
      <Gradient>
        <TopNav title="使用你的卢恩" icon={ <Icon name="back" /> } />
        <Tabs tabItems={tabItems} value={tabItem} onChange={setTabItem} 
          className='children-flex-1 text-center'/>
      </Gradient>
    </div>
  )
}
