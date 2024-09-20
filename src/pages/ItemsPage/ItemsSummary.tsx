import useSWR from 'swr'
import type { Gtime } from '../../lib/gtime'
import { useAjax } from '../../lib/ajax'
import { Money } from '../../components/Moneny'

type Props = {
  start: Gtime
  end: Gtime
}

export const ItemsSummary: React.FC<Props> = (props) => {
  const { start, end } = props
  const { get } = useAjax({ showLoading: false, handleError: false })
  // 用了 useSWR 就不要用 store
  const { data } = useSWR(start && end && `/api/v1/items/balance?happeneded_after=${start.isoString}&happeneded_before=${end.isoString}`, async path =>
    (await get<{ income: number; expenses: number; balance: number }>(path)).data,
  )
  const { balance, income, expenses } = data ?? { income: 0, expenses: 0, balance: 0 }

  return (
    <ol bg="#041616" flex justify-between items-center m-16px rounded-8px
      py-12px px-16px children-px-24px text-center>
      <li text="#fe7275">
        <div>收入</div>
        <div><Money value={ income } /></div>
      </li>
      <li text="#53a867">
        <div>支出</div>
        <div><Money value={ expenses } /></div>
      </li>
      <li text-white>
        <div>结余</div>
        <div><Money value={ balance } /></div>
      </li>
    </ol>
  )
}
