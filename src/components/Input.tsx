import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label: string
  placeholder?: string
  type?: 'text' | 'emoji'
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
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px>
      <span text-18px >{label}</span>
      { renderInput() }
      <span text-14px text-red>{error || '\u00A0'}</span>
    </div>
  )
}
