import { Outlet, createBrowserRouter } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { Root } from '../components/Root'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'
import { SignInPage } from '../pages/SignInPage'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import { ItemsPageError } from '../pages/ItemsPageError'
import { ErrorEmptyData, ErrorUnauthorized } from '../errors'
import { AuthErrorPage } from '../pages/AuthErrorPage'
import { NotePage } from '../pages/NotePage'
import { gtime } from '../lib/gtime'
import { ajax } from '../lib/ajax'

export const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  {
    path: '/welcome',
    element: <WelcomeLayout />,
    children: [
      { path: '1', element: <Welcome1 /> },
      { path: '2', element: <Welcome2 /> },
      { path: '3', element: <Welcome3 /> },
      { path: '4', element: <Welcome4 /> },
    ],
  },
  { path: '/sign_in', element: <SignInPage /> },
  // 放在这个分组的路由全部需要登陆
  {
    path: '/',
    element: <Outlet />,
    errorElement: <AuthErrorPage />,
    loader: async () => {
      return await ajax.get<Resource<User>>('/api/v1/me')
        .catch((e) => {
          if (e.response?.status === 401) { throw new ErrorUnauthorized() }
        })
    },
    // loader: () => preload('/api/v1/me', path => axios.get<Resource<User>>(path)
    //   .then(r => r.data, (e) => { throw new ErrorUnauthorized() })),
    children: [
      { path: '/home', element: <Home title="褪色者啊" /> },
      {
        path: '/items',
        element: <ItemsPage />,
        errorElement: <ItemsPageError />,
        loader: async () => {
          const onError = (error: AxiosError) => {
            if (error.response) {
              const { status } = error.response
              if (status === 401) {
                throw new ErrorUnauthorized()
              }
            }
            throw error
          }
          // 如果有数据就加载列表页
          const response = await ajax.get<Resources<Item>>('/api/v1/items?page=1').catch(onError)
          if (response.data.resources.length > 0) {
            return response.data
          } else {
            // 如果没数据就加载首页, 注意这里不能返回空，空也会被认定为有数据
            throw new ErrorEmptyData()
          }
        },
      },
      {
        path: '/items/new',
        element: <ItemsNewPage />,
      },
      { path: '/tags/new', element: <TagsNewPage /> },
      { path: '/tags/:id', element: <TagsEditPage /> },
      { path: '/statistics', element: <StatisticsPage /> },
      { path: '/export', element: <div>敬请期待</div> },
      { path: '/tags', element: <div>标签</div> },
      { path: '/noty', element: <div>敬请期待</div> },
    ],
  },
  // 看板路由
  {
    path: '/guaban', element: <NotePage title={`${gtime().format('yyyyMMdd')}号瓜田`} />,
  },
])
