import { animated, useTransition } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import type { ReactNode } from 'react'

import logo from '../assets/images/catLogo.svg'
import { useSwipe } from '../hooks/useSwipe'

interface extraStyleInterface {position: 'relative' | 'absolute' }

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/welcome/1',
}
export const WelcomeLayout: React.FC = () => {
  const animating = useRef(false)

  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const [extraStyle, setExtraStyle] = useState<extraStyleInterface>({ position: 'relative' })
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)', },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 5000 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' })
      animating.current = false
    },
  })

  const mainRef = useRef<HTMLElement>(null)
  const { direction } = useSwipe(mainRef, {
    onTouchStart: e => e.preventDefault()
  })
  const nav = useNavigate()
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) {
        return
      }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])

  return (
    <div bg="#041616" h-screen flex flex-col items-stretch pb-16px>
      <header shrink-0 text-center pt-64px>
        <img w-64px h-62px src={logo} alt="这是一个可爱的猫猫logo" />
        <h1 text="#ab7a36" text-32px>褪色者啊，来这里吧</h1>
      </header>
      <main ref={mainRef} flex-1 shrink-1 relative >
        {transitions((style, pathname) =>
            <animated.div key={pathname} style={{ ...style, ...extraStyle }}
              w="100%" h="100%" p-16px flex>
              <div bg="#596a69" rounded-8px grow-1 flex justify-center items-center >
                {map.current[pathname]}
              </div>
            </animated.div>,
        )}
      </main>
      <footer shrink-0 text-center text-32px text="#ab7a36" grid grid-cols-3 grid-rows-1>
        <Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={linkMap[location.pathname]}>下一页</Link>
        <Link style={{ gridArea: '1 / 3 / 2 / 4' }} to="/welcome/1">跳过</Link>
      </footer>
    </div>
  )
}
