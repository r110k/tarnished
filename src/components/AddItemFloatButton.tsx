import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export const AddItemFloatButton: React.FC = () => {
  return (
    <Link to="/items/new">
      <button fixed bottom-16px right-16px w-56px h-56px rounded="50%"
        text-white bg="#041616" b-none flex justify-center items-center>
        <Icon name="add" className='w-48px h-48px' />
      </button>
    </Link>
  )
}
