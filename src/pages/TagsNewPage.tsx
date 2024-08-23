import { useState } from 'react'
import { emojis } from '../lib/emojis'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import s from './TagsNewPage.module.scss'

export const TagsNewPage: React.FC = () => {
  // console.log(JSON.stringify(emojis))
  const [emojiKind, setEmojiKind] = useState('表情')
  const onSubmit = () => { }
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="挑选一个 Emoji" icon={<Icon name="back" />} />
      </Gradient>
      <form onSubmit={onSubmit} px-16px py-32px g-form>
        <div flex flex-col gap-y-8px>
          <span text-18px g-form-label>标签名</span>
          <input g-input-text type="text" />
          <span text-14px text-red>标签名字太长</span>
        </div>
        <div flex flex-col gap-y-8px>
          <span text-18px>符号 <span text-24px>😋</span></span>
          <div b-1 b="[rgb(59,65,48)]" rounded-8px>
            <div flex p-8px gap-x-16px overflow-auto text="#999">
              {emojis.map(({ name }) =>
                <span whitespace-nowrap key={name}
                  // className={name === emojiKind ? 'text-#333' : ''}
                  className={name === emojiKind ? s.selectedTag : ''}
                  onClick={() => setEmojiKind(name)}>{name}</span>,
              )}
            </div>
            <div pt-8px p-b-16px text-24px h-400px overflow-auto>
              {emojis.map(({ name, chars }) =>
                <div style={{ display: name === emojiKind ? '' : 'none' }} key={name}
                  grid grid-cols="[repeat(auto-fit,36px)]" grid-rows="[repeat(auto-fit,36px)]"
                  justify-center>
                  {chars.map(char => <span w-36px text-center>{ char }</span>)}
                </div>,
              )}
            </div>
          </div>
        </div>
        <p text-center p-y-24px>记账时长按标签，即可进行编辑</p>
        <div>
          <button g-btn>确定</button>
        </div>
      </form>
    </div>
  )
}
