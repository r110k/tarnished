type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClick: () => void
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange } = props
  return (
    <div flex gap-x-16px>
      <input max-w="[calc(40%-8px)]" g-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      <button type="button" onClick={props.onClick} shrink-0 max-w="[calc(60%-8px)]" g-btn>发送验证码</button>
    </div>
  )
}
