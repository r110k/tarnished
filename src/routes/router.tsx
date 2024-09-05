import { createBrowserRouter } from 'react-router-dom'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { preload } from 'swr'
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

export const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/home', element: <Home title="褪色者啊" /> },
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
      return preload('/api/v1/items?page=1', async (path) => {
        const response = await axios.get<Resources<Item>>(path).catch(onError)
        if (response.data.resources.length > 0) {
          return response.data
        } else {
        // 如果没数据就加载首页, 注意这里不能返回空，空也会被认定为有数据
          throw new ErrorEmptyData()
        }
      })
    },
  },
  { path: '/items/new', element: <ItemsNewPage /> },
  { path: '/sign_in', element: <SignInPage /> },
  { path: '/tags/new', element: <TagsNewPage /> },
  { path: '/tags/:id', element: <TagsEditPage /> },
  { path: '/statistics', element: <StatisticsPage /> },
  { path: '/export', element: <div>敬请期待</div> },
  { path: '/tags', element: <div>标签</div> },
  { path: '/noty', element: <div>敬请期待</div> },
])
