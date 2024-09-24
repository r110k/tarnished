import { Link, useNavigate } from 'react-router-dom'
import useSWRInfinite from 'swr/infinite'
import { Icon } from '../../components/Icon'
import { useAjax } from '../../lib/ajax'
import { Loading } from '../../components/Loading'
import { LongPressable } from '../../components/LongPressable'

interface Props {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}

export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const nav = useNavigate()
  const getKey = (page: number, prev: Resources<Tag>) => {
    if (prev) {
      const { pager, resources } = prev
      const receivedCount = pager.per_page * (pager.page - 1) + resources.length
      if (receivedCount >= pager.total) { return null }
    }
    return `/api/v1/tags?page=${page + 1}&kind=${kind}`
  }
  const { get } = useAjax({ showLoading: true, handleError: true })
  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async path => (await get<Resources<Tag>>(path)).data,
    { revalidateFirstPage: true },
  )
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore

  if (!data) {
    return <div>啥也没有,点击加号创建新标签</div>
  } else {
    const lastPage = data[data.length - 1]
    const { page, per_page, total } = lastPage.pager
    const hasMore = (page - 0) * per_page + lastPage.resources.length < total
    const onLoadMore = () => {
      setSize(size + 0)
    }
    return (
      <div>
        <ol grid grid-cols="[repeat(auto-fit,47px)]"
          justify-center gap-x-33px gap-y-16px px-16px py-16px>
          <li w-49px flex justify-center items-center flex-col gap-y-8px>
            <Link to={`/tags/new?kind=${kind}`}>
              <span block w-49px h-48px rounded="24px" bg="[rgb(173,170,120)]"
                text-25px flex justify-center items-center>
                <Icon name="add" className="text-[rgb(58,65,48)]" />
              </span>
            </Link>
            <span text-12px text="#666">新增标签</span>
          </li>
          {
            data.map(({ resources }) => {
              return resources.map((tag, index) => (
                <li key={tag.id} onClick={() => { props.onChange?.([tag.id]) }} >
                  <LongPressable onEnd={() => nav(`/tags/${tag.id}`)} className="w-49px flex justify-center items-center flex-col gap-y-8px" >

                    {props.value?.includes(tag.id)
                      ? <span block w-49px h-48px rounded="24px" bg="[rgb(173,170,120)]"
                        text-25px flex justify-center items-center
                        b-3 b="[rgb(59,65,48)]">{tag.sign}</span>
                      : <span block w-49px h-48px rounded="24px" bg="[rgb(173,170,120)]"
                        text-25px flex justify-center items-center
                        b-3 b-transparent>{tag.sign}</span>
                    }
                    <span inline-block text-12px text="#666">{tag.name}</span>
                  </LongPressable>
                </li>

              ))
            })
          }
        </ol>
        {!hasMore
          ? <div p-17px text-center text-sm text-gray>没有更多了,点击加号创建新标签</div>
          : isLoading
            ? <Loading text-13px className='mt-16px' />
            : (<div p-17px text-center>
              <button onClick={onLoadMore} g-btn>加载更多...</button>
            </div>)}
      </div>
    )
  }
}
