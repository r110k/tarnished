import { useEffect, useRef, useState } from 'react'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request: () => Promise<unknown>
}

const maxCount = 3
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange } = props
  const [started, setStarted] = useState<Date>()
  const [count, setCount] = useState(maxCount)
  const timer = useRef<number>()

  const onClick = async () => {
    const response = await props.request()
    // 开始倒计时（但是只有请求成功才能开始倒计时）
    console.log('开始倒计时')
    setStarted(new Date())
  }

  useEffect(() => {
    if (!started) {
      clearTimer()
      return
    }
    timer.current = window.setInterval(() => {
      const seconds = Math.round((new Date().getTime() - started.getTime()) / 1000)
      const remainsCount = maxCount - seconds
      if (remainsCount <= 0) {
        setStarted(undefined)
        return
      }
      setCount(remainsCount)
    }, 950)
    return () => {
      clearTimer()
    }
  }, [started])

  const clearTimer = () => {
    if (timer.current) {
      window.clearInterval(timer.current)
    }
    timer.current = undefined
  }
  return (
    <div flex gap-x-16px>
      <input max-w="[calc(40%-8px)]" g-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button disabled type="button" shrink-0 max-w="[calc(60%-8px)]" g-btn text-gray bg-white b-1 b-color-gray>
         {count} 秒后可以重新发送
      </button>
        : <button type="button" onClick={onClick} shrink-0 max-w="[calc(60%-8px)]" g-btn>
        发送验证码
      </button>}
    </div>
  )
}
