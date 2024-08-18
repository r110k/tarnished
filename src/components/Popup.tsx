import { animated, useSpring } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useState } from 'react'

type Props = {
  visible: boolean
  onClickMask: () => void
  children?: ReactNode
}
//  bg-black opacity-75 等价于 className="bg-black:75"
export const Popup: React.FC<Props> = (props) => {
  const { visible, onClickMask, children } = props

  const [maskVisible, setMaskVisible] = useState(visible)

  const maskStyles = useSpring({
    opacity: visible ? 0.75 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.5) {
        setMaskVisible(true)
      }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.05) {
        setMaskVisible(false)
      }
    },
    config: {
      duration: 300,
    },
  })
  const maskStyles2 = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
  }
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
    config: {
      duration: 300,
    },
  })

  return (
    <div touch-none>
      <animated.div fixed top-0 left-0 h-full w-full bg-black opacity-75
        onClick={() => onClickMask?.()} style={maskStyles2}
        z="[calc(var(--z-popup)-1)]">
      </animated.div>
      <animated.div fixed bottom-0 left-0 w-full min-h-100px bg-white
        style={menuStyles}
        z="[var(--z-popup)]">
          { children }
      </animated.div>
    </div>
  )
}
