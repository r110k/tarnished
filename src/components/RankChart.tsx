type Props = {
  className: string
  items?: { name: string; value: number; sign: string }[]
}

export const RankChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const total = items?.reduce((result, item) => result += item.value, 0) ?? 0
  const max = items?.reduce((result, item) => Math.max(result, item.value), 0) ?? 0

  const colors = [
    // Adobe color trends
    '#BF045B',
    '#1CA64C',
    '#7EBF8E',
    '#D9B29C',
    '#A65F46',
    // 宫崎骏 哈尔的移动城堡
    '#5e5259',
    '#b2a79d',
    '#fdbea6',
    '#050b15',
    '#10122b',
    '#284788',
    '#cdb297',
    '#fdf799',
    '#fdb258',
    '#b04f28',
    // 千与千寻
    '#519b51',
    '#2e9282',
    '#072351',
    '#060107',
    '#ebded1',
    '#6a6c6d',
    '#5e3420',
    '#85262a',
    '#ad3840',
    '#da595f',
    // 你想活出怎样的人生
    '#406d81',
    '#6fadc0',
    '#f4dc91',
    '#de8174',
    '#8ea931',
  ]

  const calColorIndex = (index: number): number => parseInt(((Math.random() as number) * 100).toFixed(2)) % 30

  const renderItems = () => {
    return items?.map((item, index) => <div grid grid-cols="[48px_1fr_1fr]" grid-rows="[repeat(2,1fr)]"
      text-12px gap-x-8px gap-y-6px px-16px my-8px
      key={index}>
      <div row-start-1 col-start-1 row-end-3 col-end-2
        w-48px h-48px rounded-24px bg="#adaa78" text-24px
        flex justify-center items-center>{item.sign}</div>
      <div row-start-1 col-start-2 row-end-2 col-end-3 self-end>
        {item.name} - { `${((item.value / total) * 100).toFixed(2)}%`}
      </div>
      <div row-start-1 col-start-3 row-end-2 col-end-4 self-end text-right >
        {/* <Money value={item.value * 100} /> */}
        { item.value } 元
      </div>
      <div row-start-2 col-start-2 row-end-3 col-end-4 self-start bg-red h-8px rounded-4px bg='#ccc'
        relative overflow-hidden>
          <div rounded-4px h-full style={{ background: colors[calColorIndex(index)], width: `${(item.value / max) * 100}%` }} />
        </div>
    </div>)
  }

  return (
    <div className={className}>{
      items ? renderItems() : <div>没有数据</div>
    }</div>
  )
}
