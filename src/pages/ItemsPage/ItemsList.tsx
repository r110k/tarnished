import axios from 'axios'
import useSWRInfinite from 'swr/infinite'
import { Loading } from '../../components/Loading'
interface Props {
}

// Index 代表从 0 开始
const getKey = (pageIndex: number, prev: Resources<Item>) => {
  // 注意： 上一页可能不是满的
  if (prev) {
    const { pager, resources } = prev
    const sendCount = (pager.page - 1) * pager.per_page + resources.length
    const total = pager.total
    if (sendCount >= total) { return null }
  }
  return `/api/v1/items?page=${pageIndex + 1}`
}
export const ItemsList: React.FC<Props> = () => {
  const { data, error, size, setSize } = useSWRInfinite(
    // A function
    getKey,
    // fetcher,
    async path => (await axios.get<Resources<Item>>(path)).data,
  )
  const onLoadMore = () => {
    setSize(size + 1)
  }
  if (!data || error) {
    return <Loading />
  } else {
    const lastPage = data[data.length - 1]
    const { page, per_page, total } = lastPage.pager
    const hasMore = (page - 1) * per_page + lastPage.resources.length < total
    return (
      <>
        <ol>
          {
            data.map(({ resources }) => {
              return resources.map(item => (<li grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-12px
                key={item.id} border-b-1 b="#eee">
                <div row-start-1 row-end-3 col-start-1 col-end-2
                  text-24px w-48px h-48px rounded-24px bg="#d8d8d8"
                  flex justify-center items-center>
                  🎡
                </div>
                <div row-start-1 row-end-2 col-start-2 col-end-3 >
                  {item.note}
                </div>
                <div row-start-2 row-end-3 col-start-2 col-end-4 text="#999">
                  {item.happened_at}
                </div>
                <div row-start-1 row-end-2 col-start-3 col-end-4 text="#53a867" >
                  ￥ {item.amount / 100}
                </div>
              </li>),
              )
            },
            )
          }
        </ol>
        {hasMore
          ? (<div p-16px text-center>
            <button onClick={onLoadMore} g-btn>加载更多...</button>
          </div>)
          : <div p-16px text-center text-sm text-gray>没有更多了</div>}
      </>
    )
  }
}
