import p from '../assets/images/welcome1.svg'
export const Welcome1: React.FC = () => {
  return (
    <div flex flex-col items-center>
      <img w-120px src={p} alt="这是一张可爱的图片" />
      <h2 text-center>
        褪色者啊，<br />
        妄想得到艾尔登法环？
      </h2>
    </div>
  )
}
