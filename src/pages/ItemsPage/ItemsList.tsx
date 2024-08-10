interface Props {
  items: Item[]
}

export const ItemsList: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <ol>
        {items.map(item => (<li grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-12px
          key={item.id} border-b-1 b="#eee">
          <div row-start-1 row-end-3 col-start-1 col-end-2
            text-24px w-48px h-48px rounded-24px bg="#d8d8d8"
            flex justify-center items-center>
            🎡
          </div>
          <div row-start-1 row-end-2 col-start-2 col-end-3 >
            旅行
          </div>
          <div row-start-2 row-end-3 col-start-2 col-end-4 text="#999">
            2024年1月1号
          </div>
          <div row-start-1 row-end-2 col-start-3 col-end-4 text="#53a867" >
            ￥ 8000
          </div>
        </li>))}
      </ol>
      <div p-16px>
        <button g-btn>加载更多...</button>
      </div>
    </div>
  )
}
