export const ItemsSummary: React.FC = () => {
  return (
    <ol bg="#041616" flex justify-between items-center m-16px rounded-8px
      py-12px px-16px children-px-24px text-center>
      <li text="#fe7275">
        <div>收入</div>
        <div>1000000</div>
      </li>
      <li text="#53a867">
        <div>支出</div>
        <div>200000</div>
      </li>
      <li text-white>
        <div>结余</div>
        <div>800000</div>
      </li>
    </ol>
  )
}
