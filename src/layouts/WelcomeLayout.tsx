import { animated, useTransition } from '@react-spring/web'
import { type ReactNode } from 'react'
import { Outlet, useLocation, useOutlet } from 'react-router-dom'

const map: Record<string, ReactNode> = {}
export const WelcomeLayout: React.FC = () => {
  const location = useLocation()
  const outlet = useOutlet()
  const transitions = useTransition(location.pathname, {
    from: {
      transform: location.pathname === '/wecome/1'
        ? 'translateX(0)'
        : 'translateX(100%)',
    },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 600 },
  })
  map[location.pathname] = outlet
  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        {map[pathname]}
      </div>
    </animated.div>
  })
}
