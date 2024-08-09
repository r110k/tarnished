import styled from 'styled-components'
import c from 'classnames'
import { Icon } from './Icon'

const Div = styled.div`
  @keyframes spin {
    0% { 
      transform: rotate(0deg);
      animation-timing-function: ease-in;
    }
    75% {
      transform: rotate(720deg);
      animation-timing-function: linear;
    }
    100% { 
      transform: rotate(1080deg);
      animation-timing-function: ease-out;
    }
  }
  svg {
    animation: spin 2.4s infinite; 
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
