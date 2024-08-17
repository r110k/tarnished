import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

export const ItemsNewPage: React.FC = () => {
  return (
    <div>
      <Gradient>
        <TopNav title="使用你的卢恩" icon={ <Icon name="back" /> } />
      </Gradient>
    </div>
  )
}
