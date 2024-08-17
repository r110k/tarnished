import { animated, useSpring } from '@react-spring/web'

type Props = {
  visible: boolean
  onClickMask: () => void
}
//  bg-black opacity-75 等价于 className="bg-black:75"
export const Popup: React.FC<Props> = (props) => {
  const { visible, onClickMask } = props
  const maskStyles = useSpring({
    opacity: visible ? 0.75 : 0,
  })

  return (
    visible
      ? <div>
          <animated.div fixed top-0 left-0 h-full w-full bg-black opacity-75
            onClick={() => onClickMask?.()} style={{ ...maskStyles }}
            z="[calc(var(--z-popup)-1)]">
          </animated.div>
          <animated.div fixed bottom-0 left-0 w-full min-h-100px bg-white
            z="[var(--z-popup)]">
          </animated.div>
        </div>
      : null
  )
}
