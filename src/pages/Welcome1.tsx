import p from '../assets/images/welcome1.svg'
export const Welcome1: React.FC = () => {
  return (
    <div flex flex-col items-center>
      <img w-120px h-113px src={p} alt="这是一张可爱的图片" />
      <h2 text-center text-32px mt-48px color="#9f7335">
        褪色者啊，<br />
        妄想得到艾尔登法环？
      </h2>
    </div>
  )
}
