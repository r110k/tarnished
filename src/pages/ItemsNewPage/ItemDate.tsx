import { Datepicker } from '../../components/Datepicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { gtime } from '../../lib/gtime'

type Props = {
  value?: string | Date
  onChange?: (date: string) => void
}

export const ItemDate: React.FC<Props> = (props) => {
  const { value, onChange } = props
  const { popup, toggle, hide } = usePopup({
    children: <Datepicker
      onCancel={() => hide()}
      onConfirm={(d) => { onChange?.(gtime(d).isoString); hide() }}
    />,
  })
  return (
    <>
      { popup }
      <span flex grow-0 shrink-0 flex-gap-8px items-center
        onClick={toggle}>
        <Icon name="calendar" className='w-24px h-24px text-[rgb(59,65,48)]' />
        <span leading-24px text="#999">{gtime(value).format()}</span>
      </span>
    </>
  )
}
