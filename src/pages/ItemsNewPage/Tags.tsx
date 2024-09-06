import { Link } from 'react-router-dom'
import useSWRInfinite from 'swr/infinite'
import { Icon } from '../../components/Icon'
import { useAjax } from '../../lib/ajax'
import { Loading } from '../../components/Loading'

interface Props {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}

export const Tags: React.FC<Props> = (props) => {
  const { kind } = props

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
    { revalidateFirstPage: false },
  )
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore

  if (!data) {
    return <div>啥也没有,点击加号创建新标签</div>
  }

  const lastPage = data[data.length - 1]
  const { page, per_page, total } = lastPage.pager
  const hasMore = (page - 1) * per_page + lastPage.resources.length < total
  const onLoadMore = () => {
    setSize(size + 1)
  }

  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]"
        justify-center gap-x-32px gap-y-16px px-32px py-16px>
        <li w-48px flex justify-center items-center flex-col gap-y-8px>
          <Link to={`/tags/new?kind=${kind}`}>
            <span block w-48px h-48px rounded="24px" bg="[rgb(173,170,120)]"
              text-24px flex justify-center items-center>
              <Icon name="add" className="text-[rgb(59,65,48)]" />
            </span>
          </Link>
          <span text-12px text="#666">新增标签</span>
        </li>
        {
          data.map(({ resources }) => {
            return resources.map((tag, index) => (
              <li key={tag.id} w-48px flex justify-center items-center flex-col gap-y-8px
                onClick={() => { props.onChange?.([tag.id]) }} >
                {props.value?.includes(tag.id)
                  ? <span block w-48px h-48px rounded="24px" bg="[rgb(173,170,120)]"
                    text-24px flex justify-center items-center
                    b-2 b="[rgb(59,65,48)]">{tag.sign}</span>
                  : <span block w-48px h-48px rounded="24px" bg="[rgb(173,170,120)]"
                    text-24px flex justify-center items-center
                    b-2 b-transparent>{tag.sign}</span>
                }
                <span inline-block text-12px text="#666">{tag.name}</span>
              </li>
            ))
          })
        }
      </ol>
      {!hasMore
        ? <div p-16px text-center text-sm text-gray>没有更多了,点击加号创建新标签</div>
        : isLoading
          ? <Loading text-12px className='mt-16px' />
          : (<div p-16px text-center>
            <button onClick={onLoadMore} g-btn>加载更多...</button>
          </div>)}
    </div>
  )
}
