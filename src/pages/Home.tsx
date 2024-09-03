import useSWR from 'swr'
import { Navigate, useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import logo from '../assets/images/catLogo.svg'
import { useAjax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = (props) => {
  const { get } = useAjax()
  useTitle(props.title)
  const nav = useNavigate()

  const onHttpError = (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        nav('/sign_in')
      }
    }
    throw error
  }

  const { data: meData, error: meError } = useSWR('/api/v1/me', async (path) => {
    const response = await get<Resource<User>>(path).catch(onHttpError)
    return response.data.resource
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<Resources<Item>>(path)).data,
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError
  if (isLoadingMe || isLoadingItems) {
    return <Loading className='h-screen' message='褪色者啊，来这边...' />
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return <div>
    <div flex justify-center>
      <img mt-20vh mb-20vh width="128" height="125" src={logo} />
    </div>
    <div px-16px>
      <button g-btn>开始记账</button>
    </div>
    <AddItemFloatButton />
  </div>
}
