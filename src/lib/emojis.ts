import { emojiList } from './emojiList'

export const emojis: { name: string; chars: string[] }[] = [
  { name: '表情', chars: [] },
  { name: '手势', chars: [] },
  { name: '人物', chars: [] },
  { name: '动物', chars: [] },
  { name: '食物', chars: [] },
  { name: '运动', chars: [] },
  { name: '自然', chars: [] },
  { name: '旅行', chars: [] },
  { name: '物品', chars: [] },
  { name: '符号', chars: [] },
  { name: '旗帜', chars: [] },
  { name: '其他', chars: [] },
]

emojiList.forEach(([name, chars]) => {
  if (name.startsWith('face')) {
    emojis.find(x => x.name === '表情')?.chars.push(...chars.map(x => x.trim()))
  } else if (name.startsWith('hand')) {
    emojis.find(x => x.name === '手势')?.chars.push(...chars)
  }
})
