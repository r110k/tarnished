import { useDemoStore } from '../useDemoStore'

export const Home: React.FC = () => {
  const { count, add } = useDemoStore()
  return (
    <div text-6xl>
      Home Display zustand
      <div>{count}</div>
      <div>
        <button onClick={add}> +1 </button>
      </div>
    </div>
  )
}
