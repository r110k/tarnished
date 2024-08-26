import { useSearchParams } from 'react-router-dom'
import type { FormEventHandler } from 'react'
import { useEffect } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { Input } from '../components/Input'
import { useCreateTagStore } from '../stores/useCreateTagStore'
import { hasError, validate } from '../lib/validate'

export const TagsNewPage: React.FC = () => {
  const { data, setData, error, setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const kind = searchParams.get('kind')
    if (!kind) { throw new Error('kind 必填') }
    if (kind !== 'expenses' && kind !== 'income') { throw new Error('kind 只能是 expenses 或者 income') }
    setData({ kind })
  }, [searchParams])
  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: 'kind 必填' },
      { key: 'name', type: 'required', message: 'name 必填' },
      { key: 'name', type: 'length', max: 12, message: 'name 长度不能大于12' },
      { key: 'sign', type: 'required', message: 'sign 必填' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      //console.log('没有错')
    }
  }
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="挑选一个 Emoji" icon={<Icon name="back" />} />
      </Gradient>
      <form onSubmit={onSubmit} px-16px py-32px g-form>
        <Input label='标签名' placeholder='请输入标签' error={error.name?.[0]}
          value={data.name} onChange={name => setData({ name }) } />
        <Input label={<span leading-24px>符号 <span text-24px>{data.sign}</span></span>} type='emoji' error={error.sign?.[0]}
          value={data.sign} onChange={sign => setData({ sign })} />
        <p text-center p-y-24px>记账时长按标签，即可进行编辑</p>
        <div>
          <button g-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
