import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { router } from './routes/router'

import 'virtual:uno.css'
import './global.scss'
import 'virtual:svgsprites'
import { usePopup } from './hooks/usePopup'
import { Loading } from './components/Loading'
import { useLoadingStore } from './stores/useLoadingStore'

vhCheck()

export const App: React.FC = () => {
  const { visible } = useLoadingStore()
  const { popup, show, hide } = usePopup({
    initialVisible: true,
    children: <div p-16px><Loading /></div>,
    position: 'center',
  })
  useEffect(() => {
    visible ? show() : hide()
  }, [visible])

  return <>
    <RouterProvider router={router} />
    {popup}
  </>
}
