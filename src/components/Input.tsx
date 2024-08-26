import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label: string
  placeholder?: string
  type?: 'text' | 'emoji' | 'sms_code'
  value?: string
  onChange?: (value: string) => void
  error?: string
}

export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, type = 'text', value, onChange, error } = props

  const renderInput = () => {
    switch (type) {
      case 'emoji':
        return <EmojiInput />
      case 'text':
        return <input g-input-text type={type} placeholder={placeholder || '请输入'}
          value={value} onChange={e => onChange?.(e.target.value)} />
      case 'sms_code':
        return (
          <div flex gap-x-16px>
            <input max-w="[calc(40%-8px)]" g-input-text type="text" placeholder={placeholder}
              value={value} onChange={e => onChange?.(e.target.value)} />
            <button shrink-0 max-w="[calc(60%-8px)]" g-btn>发送验证码</button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px>
      <span text-18px >{label}</span>
      {renderInput()}
      <span text-14px text-red>{error || '\u3000'}</span>
    </div>
  )
}
