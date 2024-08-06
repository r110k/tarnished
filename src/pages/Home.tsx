import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import logo from '../assets/images/catLogo.svg'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import 'virtual:svgsprites'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)

  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
    (await ajax.get<Resource<User>>(path)).data.resource,
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await ajax.get<Resources<Item>>(path)).data,
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError
  if (isLoadingMe || isLoadingItems) {
    return <Loading />
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return <div>
    <div flex justify-center>
      <img mt-20vh mb-20vh width="128" height="125" src={logo} />
    </div>
    <div px-16px>
      <button h-48px w="100%" b-none text-white bg="#041616" rounded-8px>开始记账</button>
    </div>
    <AddItemFloatButton />
  </div>
}
