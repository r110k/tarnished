import logo from '../assets/images/catLogo.svg'
import addIcon from '../assets/icons/add.svg'

export const Home: React.FC = () => {
  return <div>
    <div flex justify-center>
      <img mt-20vh mb-20vh width="128" height="125" src={logo} />
    </div>
    <div px-16px>
      <button h-48px w="100%" b-none text-white bg="#041616" rounded-8px>开始记账</button>
    </div>
    <button fixed bottom-16px right-16px w-56px h-56px rounded="50%" text-white text-6xl bg="#041616" b-none>
      <img src={addIcon} max-w="40px" mt-8px />
    </button>
  </div>
}
