import React from 'react'
import type { AxiosError } from 'axios'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import type { FormError } from '../lib/validate'
import { hasError, validate } from '../lib/validate'
import { useAjax } from '../lib/ajax'
import { Tags } from './ItemsNewPage/Tags'
import s from './ItemsNewPage.module.scss'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { ItemDate } from './ItemsNewPage/ItemDate'

export const ItemsNewPage: React.FC = () => {
  const { data, setData, setError } = useCreateItemStore()
  const tabItems: {
    key: Item['kind']
    text: string
    element: React.ReactNode
  }[] = [
    { key: 'expenses', text: '支出', element: <Tags kind='expenses' value={data.tag_ids} onChange={(tag_ids) => { setData({ tag_ids }) }} /> },
    { key: 'income', text: '收入', element: <Tags kind='income' value={data.tag_ids} onChange={(tag_ids) => { setData({ tag_ids }) }} /> },
  ]

  const { post: postWithLoading } = useAjax({ showLoading: true, handleError: true })
  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof data> }>) => {
    console.error(err.response?.data)
    setError(err.response?.data?.errors ?? {}) // expect set error to validation code but set to email
    throw err
  }
  const onSubmit = async () => {
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型，收入或者支出' },
      { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      { key: 'happened_at', type: 'required', message: '请选择时间' },
      { key: 'amount', type: 'required', message: '请输入金额' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能是0' },
      // 不过理论上来说，所有异常（前端不可能操作出来的可以不测）
      // { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      // { key: 'amount', type: 'notEqual', value: 0, message: '金额不能是0' },
    ])
    setError(newError)
    if (hasError(newError)) {
      const message = Object.values(newError).flat().join('\n')
      window.alert(message)
      return
    }
    const response = await postWithLoading<Resource<Item>>('/api/v1/items', data)
      .catch(onSubmitError)
    console.log(response)
  }

  return (
    <div h-vhcheck flex flex-col className={s.itemsNewPage} >
      <Gradient className="grow-0 shrink-0">
        <TopNav title="使用你的卢恩" icon={<Icon name="back" />} />
      </Gradient>
      <Tabs tabItems={tabItems} className='text-center grow-1 shrink-1 overflow-hidden' classPrefix="itemsNewPageTabs"
        value={data.kind!} onChange={tabItem => setData({ kind: tabItem })} />
      <ItemAmount className="grow-0 shrink-0"
        onSubmit={onSubmit}
        value={data.amount} onChange={amount => setData({ amount })}
        itemDate={<ItemDate value={data.happened_at} onChange={(happened_at) => { setData({ happened_at }) }} />} />
    </div>
  )
}
