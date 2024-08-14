import type { ReactNode } from 'react'

interface Props {
  title?: string
  icon: ReactNode
}

export const TopNav: React.FC<Props> = ({ title = '褪色者啊', icon }) => {
  return (
    <div text-white flex items-center px-24px pt-24px pb-8px>
      <span className='w-24px h-24px mr-16px
         flex items-center justify-center children-max-width="100%" children-max-height="100%"'>{ icon }</span>
      <h1 text-24px leading-none>{title}</h1>
    </div>
  )
}
