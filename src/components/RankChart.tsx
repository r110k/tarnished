type Props = {
  className: string
  items: { name: string; amount: number; sign: string }[]
}

export const RankChart: React.FC<Props> = (props) => {
  const { className, items } = props

  const renderItems = () => {
    return items?.map(item => <div grid grid-cols="[48px_1fr_1fr]" grid-rows="[repeat(2,1fr)]"
      text-12px gap-x-8px gap-y-6px px-16px my-8px>
      <div style={{ gridArea: '1 / 1 / 3 / 2' }}
        w-48px h-48px rounded-24px bg="#adaa78" text-24px
        flex justify-center items-center>{item.sign}</div>
      <div style={{ gridArea: '1 / 2 / 2 / 3' }} self-end>{item.name}</div>
      <div style={{ gridArea: '1 / 3 / 2 / 4' }} self-end text-right >{item.amount}</div>
      <div style={{ gridArea: '2 / 2 / 3 / 4' }} self-start bg-red h-8px></div>
    </div>)
  }

  return (
    <div className={className}>{
      items ? renderItems() : <div>没有数据</div>
    }</div>
  )
}
