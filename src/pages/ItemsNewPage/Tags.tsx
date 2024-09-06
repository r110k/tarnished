import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { Icon } from '../../components/Icon'
import { useTagsStore } from '../../stores/useTagsStore'
import { useAjax } from '../../lib/ajax'

interface Props {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}
export const Tags: React.FC<Props> = (props) => {
  const { kind } = props

  const { get } = useAjax({ showLoading: true, handleError: true })
  const { list: tags, setList } = useTagsStore()

  useSWR('/api/v1/tags', async (path) => {
    const response = await get<Resources<Tag>>(path)
    setList(response.data.resources)
  })

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
        {tags.map((tag, index) => (
          <li key={tag.id} w-48px flex justify-center items-center flex-col gap-y-8px
            onClick={() => { props.onChange?.([tag.id]) }} >
            { props.value?.includes(tag.id)
              ? <span block w-48px h-48px rounded="24px" bg="[rgb(173,170,120)]"
              text-24px flex justify-center items-center
              b-2 b="[rgb(59,65,48)]">{tag.sign}</span>
              : <span block w-48px h-48px rounded="24px" bg="[rgb(173,170,120)]"
              text-24px flex justify-center items-center
              b-2 b-transparent>{tag.sign}</span>
            }
            <span inline-block text-12px text="#666">{tag.name}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
