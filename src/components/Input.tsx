import type { ChangeEvent, ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'
import { DateInput } from './DateInput'

type Props = {
  label?: string | ReactNode
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disableError?: boolean
  className?: string
} & (
  | { type: 'text' }
  | { type: 'date' }
  | { type: 'emoji' }
  | { type: 'sms_code'; request: () => Promise<unknown> }
  | { type: 'select'; options: { value: string; text: string }[] }
)

export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, type, value, onChange: _onChange, error, disableError = false, className } = props

  const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (typeof e === 'string') {
      _onChange?.(e)
    } else {
      _onChange?.(e.target.value)
    }
  }
  const common = { value, onChange, placeholder }

  const renderInput = () => {
    switch (type) {
      case undefined:
      case 'text':
        return <input g-input-text { ...common } />
      case 'date':
        return <DateInput g-input-text { ...common } />
      case 'emoji':
        return <EmojiInput { ...common } />
      case 'sms_code':
        return <SmsCodeInput { ...common } request={props.request} />
      case 'select':
        return <select h-36px { ...common } >
          {props.options?.map(option =>
            <option value={option.value} key={option.value}>{option.text}</option>)}
        </select>
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px className={className}>
      {label && <span text-18px >{label}</span>}
      {renderInput()}
      { !disableError && <span text-14px text-red>{error || '\u3000'}</span> }
    </div>
  )
}
