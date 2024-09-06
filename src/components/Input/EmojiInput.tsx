import { useState } from 'react'
import { emojis } from '../../lib/emojis'

import s from './EmojiInput.module.scss'

type Props = {
  value?: string
  onChange?: (value: string) => void
}

export const EmojiInput: React.FC<Props> = (props) => {
  const { value, onChange } = props
  const [emojiKind, setEmojiKind] = useState('表情')
  return (
    <div className={s.wrapper} b-1 b="[rgb(59,65,48)]" rounded-8px>
      <div flex p-8px gap-x-16px overflow-auto text="#999">
        {emojis.map(({ name }) =>
          <span whitespace-nowrap key={name}
            // className={name === emojiKind ? 'text-#333' : ''}
            className={name === emojiKind ? s.selectedTab : ''}
            onClick={() => setEmojiKind(name)}>{name}</span>,
        )}
      </div>
      <div pt-8px p-b-16px text-24px h-300px overflow-auto>
        {emojis.map(({ name, chars }) =>
          <div style={{ display: name === emojiKind ? '' : 'none' }} key={name}
            grid grid-cols="[repeat(auto-fit,36px)]" grid-rows="[repeat(auto-fit,36px)]"
            justify-center>
            {chars.map(char => <span key={char} className={value === char ? s.selectedEmoji : ''}
              inline-flex items-center justify-center h-36px b-1 b-transparent rounded-4px
              onClick={() => value !== char && onChange?.(char)} >{char}</span>)}
          </div>,
        )}
      </div>
    </div>
  )
}
