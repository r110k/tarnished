export const AddItemFloatButton: React.FC = () => {
  return (
    <button fixed bottom-16px right-16px w-56px h-56px rounded="50%" text-white text-6xl bg="#041616" b-none>
      <svg style={{ fill: 'white' }} max-w="40px" height="40px" mt-8px>
        <use xlinkHref='#add'></use>
      </svg>
    </button>
  )
}
