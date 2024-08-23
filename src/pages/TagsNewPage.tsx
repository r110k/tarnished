import { useState } from 'react'
import { emojis } from '../lib/emojis'

export const TagsNewPage: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('表情')
  const onSubmit = () => {}
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <span>标签名</span>
          <input g-input-text type="text" />
          <span text-red>标签名字太长</span>
        </div>
        <div>
          <span>符号 😋 </span>
          <div>
            <div flex>
              { emojis.map(({ name }) =>
                <span key={name} onClick={() => setEmojiKind(name)}>{ name }</span>,
              )}
            </div>
            <div>
              { emojis.map(({ name, chars }) => <div style={{ display: name === emojiKind ? '' : 'none' }} key={ name }>{ chars }</div>)}
            </div>
          </div>
        </div>
        <p>记账时长按标签，即可进行编辑</p>
        <div>
          <button g-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
