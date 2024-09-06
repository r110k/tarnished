import type { FormEventHandler } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { AxiosError } from 'axios'
import type { FormError } from '../../lib/validate'
import { hasError, validate } from '../../lib/validate'
import { useCreateTagStore } from '../../stores/useCreateTagStore'
import { Input } from '../../components/Input'
import { useAjax } from '../../lib/ajax'

type Props = {
  type: 'create' | 'edit'
}

export const TagForm: React.FC<Props> = (props) => {
  const { type } = props
  const nav = useNavigate()
  const { data, setData, error, setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()
  const kind = searchParams.get('kind') ?? ''
  useEffect(() => {
    if (type !== 'create') { return }
    if (!kind) { throw new Error('kind 必填') }
    if (kind !== 'expenses' && kind !== 'income') { throw new Error('kind 只能是 expenses 或者 income') }
    setData({ kind })
  }, [searchParams])
  const params = useParams()
  useEffect(() => {
    if (type !== 'edit') { return }
    const id = params.id
    if (!id) { throw new Error('id 必填') }
    // Ajax
    console.log(id)
  }, [])
  const { post } = useAjax({ showLoading: true, handleError: true })
  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof data> }>) => {
    if (err.response) {
      const { status } = err.response
      if (status === 422) {
        const { errors } = err.response.data
        setError(errors)
      }
    }
    throw err
  }
  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: 'kind 必填' },
      { key: 'name', type: 'required', message: 'name 必填' },
      { key: 'name', type: 'length', max: 12, message: 'name 长度不能大于12' },
      { key: 'sign', type: 'required', message: 'sign 必填' },
    ])
    setError(newError)
    if (hasError(newError)) { return }
    const response = await post<Resource<Tag>>('/api/v1/tags', data)
      .catch(onSubmitError)
    setData(response.data.resource)
    nav(`/items/new?kind=${encodeURIComponent(kind)}`)
  }
  return (
    <form onSubmit={onSubmit} g-form p-16px p-t-32px>
      <Input label='标签名' placeholder='请输入标签' error={error.name?.[0]}
        value={data.name} onChange={name => setData({ name })} />
      <Input label={<span leading-24px>符号 <span text-24px>{data.sign}</span></span>} type='emoji' error={error.sign?.[0]}
        value={data.sign} onChange={sign => setData({ sign })} />
      <p text-center p-b-24px>记账时长按标签，即可进行编辑</p>
      <div>
        <button g-btn>确定</button>
      </div>
    </form>
  )
}
