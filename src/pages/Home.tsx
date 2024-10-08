import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import logo from '../assets/images/catLogo.svg'
import { useAjax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { get } = useAjax({ showLoading: true, handleError: false })

  const { data: meData, error: meError } = useSWR('/api/v1/me', async (path) => {
    const response = await get<Resource<User>>(path)
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
      <Link to="/items/new">
        <button g-btn>开始记账</button>
      </Link>
    </div>
    <AddItemFloatButton />
  </div>
}
