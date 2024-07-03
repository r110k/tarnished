import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/catLogo.svg'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/xxx',
}
export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  const transitions = useTransition(location.pathname, {
    from: {
      transform: location.pathname === '/welcome/1' ? 'translateX(0)' : 'translateX(100%)',
    },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 500 },
  })
  map.current[location.pathname] = outlet
  return <div>
    <header>
      <img w-64px h-62px src={logo} alt="这是一个可爱的猫猫logo" />
      <h1>褪色者啊，来这里吧</h1>
    </header>
    <main>
      {transitions((style, pathname) =>
        <animated.div key={pathname} style={style}>
          {map.current[pathname]}
        </animated.div>,
      )}
    </main>
    <footer>
      <Link to={linkMap[location.pathname]}>下一页</Link>
      <Link to="xx">跳过</Link>
    </footer>
  </div>
}
