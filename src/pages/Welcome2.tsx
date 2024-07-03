import p from '../assets/images/welcome2.svg'
export const Welcome2: React.FC = () => {
  return (
    <div flex flex-col items-center>
      <img w-120px h-117px src={p} alt="这是一张可爱的图片" />
      <h2 text-center text-32px mt-48px color="#9f7335">
        即使引导早已破碎，<br />
        也请您早日当上艾尔登之王
      </h2>
    </div>
  )
}
