import { animated, useSpring } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useState } from 'react'

type Props = {
  visible: boolean
  onClickMask: () => void
  children?: ReactNode
  position?: 'bottom' | 'center'
  zIndex?: string
}
//  bg-black opacity-75 等价于 className="bg-black:75"
export const Popup: React.FC<Props> = (props) => {
  const { visible, onClickMask, children, position = 'bottom', zIndex = 'var(--z-popup)' } = props
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
    zIndex: `calc(${zIndex} - 1)`,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
  }

  const wrapperStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: position === 'bottom'
      ? visible ? 'translateY(0%)' : 'translateY(100%)'
      : '',
    visibility: (position === 'center'
      ? visible ? 'visible' : 'hidden'
      : 'visible') as 'visible' | 'hidden',
    config: {
      duration: 300,
    },
  })

  return (
    <div touch-none>
      <animated.div fixed top-0 left-0 h-full w-full bg-black opacity-75
        onClick={() => onClickMask?.()} style={maskStyles2} >
      </animated.div>
      {position === 'bottom'
        ? (<animated.div fixed bg-white bottom-0 left-0 w-full min-h-100px
          style={{ ...wrapperStyles, zIndex }} rounded-t-8px>
          {children}
        </animated.div>)
        : (<animated.div fixed bg-white left="[50%]" top="[50%]" translate-x="-50%" translate-y="-50%"
          style={{ ...wrapperStyles, zIndex }} rounded-8px overflow-hidden>
          {children}
        </animated.div>)}
    </div>
  )
}
