import { useState } from 'react'
import { Datepicker } from '../../components/Datepicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { gtime } from '../../lib/gtime'

export const ItemDate: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const { popup, toggle, hide } = usePopup({
    children: <Datepicker
      onCancel={() => hide()}
      onConfirm={(d) => { setDate(d); hide() }}
    />,
  })
  return (
    <>
      { popup }
      <span flex grow-0 shrink-0 flex-gap-8px items-center
        onClick={toggle}>
        <Icon name="calendar" className='w-24px h-24px text-[rgb(59,65,48)]' />
        <span leading-24px text="#999">{gtime(date).format()}</span>
      </span>
    </>
  )
}
