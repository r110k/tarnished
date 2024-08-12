import styled from 'styled-components'
import c from 'classnames'

const Div = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  display: inline-block;
  div {
    display: block;
    border: 6px solid #9f7335;
    border-color: #9f7335 transparent transparent transparent;
    width: 51px;
    height: 51px;
    margin: 6px;
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    position: absolute;
  }
  div:nth-child(1) {
    animation-delay: -0.6s;
  }
  div:nth-child(2) {
    animation-delay: -0.45s;
  }
  div:nth-child(3) {
    animation-delay: -0.3s;
  }
  div:nth-child(4) {
    animation-delay: -0.15s;
  }
  @keyframes spin {
    0% { 
      transform: rotate(0deg);
    }
    100% { 
      transform: rotate(360deg);
    }
  }
`
interface Props {
  className?: string
  message?: string
}
export const Loading: React.FC<Props> = ({ className, message }) => {
  return (
    <div className={c(className, 'flex flex-col justify-center items-center')}>
      <Div>
        <div /> <div /> <div /> <div />
      </Div>
      <p p-8px text-lg>{message || '加载中...'}</p>
    </div>
  )
}
