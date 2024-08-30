import { useEffect, useState } from 'react'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request: () => Promise<unknown>
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange } = props
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (!started) { return }
    if (count === 0) {
      setStarted(false)
      setCount(5)
      return
    }
    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 950)
    return () => window.clearTimeout(timer)
  }, [started, count])

  const onClick = async () => {
    const response = await props.request()
    // 开始倒计时（但是只有请求成功才能开始倒计时）
    console.log('开始倒计时')
    setStarted(true)
  }
  return (
    <div flex gap-x-16px>
      <input max-w="[calc(40%-8px)]" g-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button disabled type="button" shrink-0 max-w="[calc(60%-8px)]" g-btn>
        重新发送验证码，请等待 {count} 秒
      </button>
        : <button type="button" onClick={onClick} shrink-0 max-w="[calc(60%-8px)]" g-btn>
        发送验证码
      </button>}
    </div>
  )
}
