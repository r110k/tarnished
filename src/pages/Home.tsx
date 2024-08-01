import useSWR from 'swr'
import axios from 'axios'

const fetcher = (path: string) => {
  return axios.get<{ msg: string }>(path)
}

export const Home: React.FC = () => {
  const { data, error } = useSWR('http://152.32.233.140:3000', fetcher)
  console.log('data?.data')
  console.log(data?.data)
  if (error) {
    return <div>Failed to load</div>
  }
  if (!data) {
    return <div>Loading</div>
  }
  return <div>hello, {data?.data.msg}</div>
}
