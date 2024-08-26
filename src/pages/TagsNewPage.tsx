import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { Input } from '../components/Input'

export const TagsNewPage: React.FC = () => {
  // console.log(JSON.stringify(emojis))
  const [emoji, setEmoji] = useState('')

  const onSubmit = () => { }
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="挑选一个 Emoji" icon={<Icon name="back" />} />
      </Gradient>
      <form onSubmit={onSubmit} px-16px py-32px g-form>
        <Input label='标签名' error='标签名太长' placeholder='请输入标签' />
        <Input label={<span leading-24px>符号 <span text-24px>{emoji}</span></span>} type='emoji' value={emoji} onChange={v => setEmoji(v)} />
        <p text-center p-y-24px>记账时长按标签，即可进行编辑</p>
        <div>
          <button g-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
