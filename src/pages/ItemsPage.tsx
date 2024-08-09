import styled from 'styled-components'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'
const Div = styled.div`
  background: rgb(59,65,48);
  background: linear-gradient(180deg, rgba(59,65,48,1) 0%, rgba(173,170,120,1) 100%);
`

export const ItemsPage: React.FC = () => {
  return (
    <div>
      <Div>
        <TopNav />
        <TimeRangePicker />
      </Div>
      <ItemsSummary />
      <ItemsList />
      <AddItemFloatButton />
    </div>
  )
}
