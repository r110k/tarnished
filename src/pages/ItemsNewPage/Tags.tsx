import { Link, useNavigate } from 'react-router-dom'
import useSWRInfinite from 'swr/infinite'
import type { TouchEvent } from 'react'
import { useRef } from 'react'
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
    { revalidateFirstPage: false },
  )
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore
  const touchTimer = useRef<number>()
  const touchPosition = useRef<{ x?: number; y?: number }>({ x: undefined, y: undefined })
  const onTouchStart = (e: TouchEvent, id: Tag['id']) => {
    touchTimer.current = window.setTimeout(() => {
      nav(`/tags/${id}`)
    }, 800)
    const { clientX: x, clientY: y } = e.touches[0]
    touchPosition.current = { x, y }
  }
  const onTouchMove = (e: TouchEvent, id: Tag['id']) => {
    const limitMoveDistance = 5
    const { clientX: newX, clientY: newY } = e.touches[0]
    const { x, y } = touchPosition.current
    if (x === undefined || y === undefined) { return }
    const deltaX = x - newX
    const deltaY = y - newY
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
    if (distance > limitMoveDistance) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
  const onTouchEnd = (e: TouchEvent, id: Tag['id']) => {
    if (touchTimer.current) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
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
          justify-center gap-x-33px gap-y-16px px-32px py-16px>
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
                <li key={tag.id} w-49px flex justify-center items-center flex-col gap-y-8px
                  onClick={() => { props.onChange?.([tag.id]) }}
                  onTouchStart={e => onTouchStart(e, tag.id)} onTouchMove={e => onTouchMove(e, tag.id)} onTouchEnd={e => onTouchEnd(e, tag.id)} >
                  {props.value?.includes(tag.id)
                    ? <span block w-49px h-48px rounded="24px" bg="[rgb(173,170,120)]"
                      text-25px flex justify-center items-center
                      b-3 b="[rgb(59,65,48)]">{tag.sign}</span>
                    : <span block w-49px h-48px rounded="24px" bg="[rgb(173,170,120)]"
                      text-25px flex justify-center items-center
                      b-3 b-transparent>{tag.sign}</span>
                  }
                  <span inline-block text-12px text="#666">{tag.name}</span>
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
