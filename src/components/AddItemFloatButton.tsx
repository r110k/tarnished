import addIcon from '../assets/icons/add.svg'

export const AddItemFloatButton: React.FC = () => {
  return (
    <button fixed bottom-16px right-16px w-56px h-56px rounded="50%" text-white text-6xl bg="#041616" b-none>
      <img src={addIcon} max-w="40px" mt-8px />
    </button>
  )
}
