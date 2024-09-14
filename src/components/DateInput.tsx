import { usePopup } from '../hooks/usePopup'
import { gtime } from '../lib/gtime'
import { Datepicker } from './Datepicker'

type Props = {
  value?: string
  placeholder?: string
  onChange?: (v: string) => void
  className?: string
}
export const DateInput: React.FC<Props> = (props) => {
  const { value, onChange, className, placeholder } = props

  const { popup, toggle, hide } = usePopup({
    children: <Datepicker
      onCancel={() => hide()}
      onConfirm={(d) => { onChange?.(gtime(d).isoString); hide() }}
    />,
  })

  return (
    <>
      {popup}
      <input type="text" readOnly className={className} g-input-text placeholder={placeholder || '请输入'}
        value={value ? gtime(value).format() : ''} onClick={toggle}/>
    </>
  )
}
