import p from '../assets/images/welcome4.svg'

export const Welcome4: React.FC = () => {
  return (
    <div flex flex-col items-center>
      <img w-120px h-121px src={p} alt="这是一张可爱的图片" />
      <h2 text-center text-32px mt-48px color="#9f7335">
        觐见艾尔登法环<br />
        成为艾尔登之王吧
      </h2>
    </div>
  )
}
