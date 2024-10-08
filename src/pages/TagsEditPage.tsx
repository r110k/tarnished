import { useNavigate, useParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { BackIcon } from '../components/BackIcon'
import { confirmable } from '../lib/confirmable'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsEditPage: React.FC = () => {
  const nav = useNavigate()

  const { id } = useParams()
  const { destory } = useAjax()
  const onDelete = confirmable(async () => {
    if (!id) { throw new Error('id 不能为空') }
    await destory(`/api/v1/tags/${id}`).catch((error) => { window.alert('删除失败'); throw error })
    window.alert('删除成功')
    nav('/items/new')
  })
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="查看标签" icon={<BackIcon />} />
      </Gradient>
      <TagForm type="edit" />
      <div px-16px p-b-32px>
        <button g-btn bg-red onClick={onDelete}>删除</button>
      </div>
    </div>
  )
}
