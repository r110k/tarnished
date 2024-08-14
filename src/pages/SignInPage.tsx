import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

export const SignInPage: React.FC = () => {
  return (
    <div>
      <Gradient>
        <TopNav title="褪色者啊" icon={
          <Icon name="back" className='w-24px h-24px cursor-pointer' onClick={() => console.log('hi')} />
        }/>
      </Gradient>
    </div>
  )
}
