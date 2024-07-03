import p from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (
    <div flex flex-col items-center>
      <img w-120px h-95px src={p} alt="这是一张可爱的图片" />
      <h2 text-center text-32px mt-48px color="#9f7335">
        伴火同进者，<br />
        终将遇到命定之死
      </h2>
    </div>
  )
}
