type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request: () => Promise<unknown>
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange } = props
  const onClick = async () => {
    const response = await props.request()
    // 开始倒计时（但是只有请求成功才能开始倒计时）
    console.log('开始倒计时')
  }
  return (
    <div flex gap-x-16px>
      <input max-w="[calc(40%-8px)]" g-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      <button type="button" onClick={onClick} shrink-0 max-w="[calc(60%-8px)]" g-btn>发送验证码</button>
    </div>
  )
}
