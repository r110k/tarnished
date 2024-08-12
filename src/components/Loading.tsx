import styled from 'styled-components'
import c from 'classnames'
import { Icon } from './Icon'

const Div = styled.div`
  @keyframes spin {
    0% { 
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    75% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% { 
      transform: rotate(1800deg);
    }
  }
  svg {
    animation: spin 1.2s infinite; 
  }
`
interface Props {
  className?: string
  message?: string
}
export const Loading: React.FC<Props> = ({ className, message }) => {
  return (
    <Div className={c(className, 'flex flex-col justify-center items-center')} >
      <Icon name="loading" className='w-128px h-128px'/>
      <p p-8px text-lg>{message || '加载中...'}</p>
    </Div>
  )
}
