import type { ReactNode } from 'react'
import { useState } from 'react'

interface Props {
  className?: string
  itemDate: ReactNode
  value?: number
  onChange: (amount: number) => void
  onSubmit: () => void
}

export const ItemAmount: React.FC<Props> = (props) => {
  const { className, value, onChange, onSubmit } = props
  const [output, _setOutput] = useState(() => value ? (value / 100).toString(2) : '0')
  const setOutput = (str: string) => {
    if (str.length > 10) { return }
    const dotIndex = str.indexOf('.')
    if (dotIndex >= 0 && str.length - dotIndex > 3) { return }
    _setOutput(str)
    onChange(parseFloat(str) * 100)
  }

  const append = (char: string) => {
    switch (char) {
      case '.':
        if (!output.includes('.')) { setOutput(output + char) }
        break
      case '0':
        if (output !== '0') { setOutput(output + char) }
        break
      default:
        if (output === '0') { setOutput(char) }
        else { setOutput(output + char) }
        break
    }
  }
  const clear = () => { setOutput('0') }

  return (
    <>
      <div className={className}>
        <div flex p-16px border-t-1px border-t="#ddd" items-center>
          {props.itemDate}
          <code grow-1 shrink-1 text-right color="#53a867">{ output }</code>
        </div>
        <div grid grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,56px)]"
          children-b-none children-bg-white
          bg="#ddd" gap-1px py-1px
        >
          <button type="button" row-start-1 col-start-1 row-end-2 col-end-2 onClick={() => { append('1') }}>1</button>
          <button type="button" row-start-1 col-start-2 row-end-2 col-end-3 onClick={() => { append('2') }}>2</button>
          <button type="button" row-start-1 col-start-3 row-end-2 col-end-4 onClick={() => { append('3') }}>3</button>
          <button type="button" row-start-2 col-start-1 row-end-3 col-end-2 onClick={() => { append('4') }}>4</button>
          <button type="button" row-start-2 col-start-2 row-end-3 col-end-3 onClick={() => { append('5') }}>5</button>
          <button type="button" row-start-2 col-start-3 row-end-3 col-end-4 onClick={() => { append('6') }}>6</button>
          <button type="button" row-start-3 col-start-1 row-end-4 col-end-2 onClick={() => { append('7') }}>7</button>
          <button type="button" row-start-3 col-start-2 row-end-4 col-end-3 onClick={() => { append('8') }}>8</button>
          <button type="button" row-start-3 col-start-3 row-end-4 col-end-4 onClick={() => { append('9') }}>9</button>
          <button type="button" row-start-4 col-start-1 row-end-5 col-end-3 onClick={() => { append('0') }}>0</button>
          <button type="button" row-start-4 col-start-3 row-end-5 col-end-4 onClick={() => { append('.') }}>.</button>
          <button type="button" row-start-1 col-start-4 row-end-3 col-end-5 onClick={clear}>清空</button>
          <button row-start-3 col-start-4 row-end-5 col-end-5 text-white bg="[rgb(173,170,120)]" onClick={() => { onSubmit?.() }}>提交</button>
        </div>
      </div>
    </>
  )
}
