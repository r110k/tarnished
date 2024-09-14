import useSWRInfinite from 'swr/infinite'
import { Loading } from '../../components/Loading'
import { Icon } from '../../components/Icon'
import { useAjax } from '../../lib/ajax'
import type { Gtime } from '../../lib/gtime'

type Props = {
  start: Gtime
  end: Gtime
}

export const ItemsList: React.FC<Props> = (props) => {
  const { start, end } = props
  const { get } = useAjax()
  // Index 代表从 0 开始
  const getKey = (pageIndex: number, prev: Resources<Item>) => {
  // 注意： 上一页可能不是满的
    if (prev) {
      const { pager, resources } = prev
      const sendCount = (pager.page - 1) * pager.per_page + resources.length
      const total = pager.total
      if (sendCount >= total) { return null }
    }
    return `/api/v1/items?page=${pageIndex + 1}&happened_after=${start.isoString}&happened_before=${end.isoString}`
  }
  const { data, error, size, setSize } = useSWRInfinite(
    // A function
    getKey,
    // fetcher,
    async path => (await get<Resources<Item>>(path)).data,
    { revalidateFirstPage: false },
  )
  const onLoadMore = () => {
    setSize(size + 1)
  }

  // 加载中最佳实践，既没有数据，又没有错误，并且处理加载中之前，要先处理错误
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore
  if (!data) {
    // 要区分是不是首屏数据请求（第一页就报错了）, 下面没有数据，又是错误，显然是第一屏的处理逻辑
    return <>
      {error && (<div flex flex-col items-center justify-center>
        <Icon name="fail" className='w-60px h-60px text-red' />
        <div p-16px text-center text-sm text-gray>没逝的没逝的，只是服务器炸了而已，只好请您隔一段时间再来访问了</div>
      </div>)}
      {isLoading && <Loading />}
    </>
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
        {error && (<div flex flex-col items-center justify-center>
          <Icon name="fail" className='w-60px h-60px text-red' />
          <div p-16px text-center text-sm text-gray>没逝的没逝的，只是服务器炸了而已，只好请您隔一段时间再来访问了</div>
        </div>)}
        {!hasMore
          ? <div p-16px text-center text-sm text-gray>没有更多了</div>
          : isLoading
            ? <Loading text-12px className='mt-16px'/>
            : (<div p-16px text-center>
            <button onClick={onLoadMore} g-btn>加载更多...</button>
          </div>)}
      </>
    )
  }
}
