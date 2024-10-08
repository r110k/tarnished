import type { ReactNode } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popup } from '../components/Popup'
import { rootDiv } from '../main'

type Options = {
  initialVisible?: boolean
  children: ReactNode
  position?: 'bottom' | 'center'
  zIndex?: string
}

export const usePopup = (options: Options) => {
  const { initialVisible = false, children, position, zIndex } = options
  const [visible, setVisible] = useState(initialVisible)
  const popup = ReactDOM.createPortal(
      <Popup visible={visible} onClickMask={() => setVisible(false)} position={position} zIndex={zIndex}>
        { children }
      </Popup>,
      rootDiv,
  )

  return {
    popup,
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
    toggle() {
      setVisible(!visible)
    },
  }
}
