import { useState } from 'react'
import { emojis } from '../../lib/emojis'

import s from '../../pages/ItemsNewPage.module.scss'

export const EmojiInput: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('表情')
  return (
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
            {chars.map(char => <span w-36px text-center>{char}</span>)}
          </div>,
        )}
      </div>
    </div>
  )
}
