import type { ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label?: string | ReactNode
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disableError?: boolean
} & (
  | { type: 'text' }
  | { type: 'emoji' }
  | { type: 'sms_code'; onClick: () => void }
  | { type: 'select'; options: { value: string; text: string }[] }
)

export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, type, value, onChange, error, disableError = false } = props

  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input g-input-text type={type} placeholder={placeholder || '请输入'}
          value={value} onChange={e => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'sms_code':
        return (
          <div flex gap-x-16px>
            <input max-w="[calc(40%-8px)]" g-input-text type="text" placeholder={placeholder}
              value={value} onChange={e => onChange?.(e.target.value)} />
            <button type="button" onClick={props.onClick} shrink-0 max-w="[calc(60%-8px)]" g-btn>发送验证码</button>
          </div>
        )
      case 'select':
        return <select h-36px
          value={value} onChange={e => onChange?.(e.target.value)} >
          {props.options?.map(option =>
            <option value={option.value} key={option.value}>{option.text}</option>)}
        </select>
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px>
      {label && <span text-18px >{label}</span>}
      {renderInput()}
      { !disableError && <span text-14px text-red>{error || '\u3000'}</span> }
    </div>
  )
}
