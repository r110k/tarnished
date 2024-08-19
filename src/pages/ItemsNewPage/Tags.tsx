import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'

interface Props {
  kind: Item['kind']
}
export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const tags = Array.from({ length: 299 })
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
          <span text-12px>新增标签</span>
        </li>
        {tags.map((tag, index) => (
          <li key={index} w-48px flex justify-center items-center flex-col gap-y-8px>
            <span block w-48px h-48px rounded="24px" bg="[rgb(173,170,120)]"
              text-24px flex justify-center items-center
              b-1 b="[rgb(59,65,48)]">🚀</span>
            <span text-12px text="#666">打车</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
