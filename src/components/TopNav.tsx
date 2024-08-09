import { Icon } from './Icon'

interface Props {
  title?: string
}

export const TopNav: React.FC<Props> = ({ title = '褪色者啊' }) => {
  return (
    <div text-white flex items-center px-24px pt-24px pb-8px>
      <Icon name="menu" className='w-24px h-24px mr-16px' />
      <h1 text-24px leading-none>{title}</h1>
    </div>
  )
}
