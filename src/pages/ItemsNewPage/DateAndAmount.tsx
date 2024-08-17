import { useState } from 'react'

interface Props {
  className?: string
}

export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props
  const [x, setX] = useState('')
  return (
    <div className={className} b-1 b="blue">
      <input value={x} onChange={e => setX(e.target.value)} />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />

    </div>
  )
}
