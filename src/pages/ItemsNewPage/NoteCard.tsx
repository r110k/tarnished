import { gtime } from '../../lib/gtime'

type Props = {
  note: Note
}
export const NoteCard: React.FC<Props> = (props) => {
  const { note } = props
  const happenTime = gtime(note.happen_at)
  const naturalDaysBetween = happenTime.calcNaturalDaysBetween(gtime())
  const hasHappened = happenTime.hasHappened
  return (
    <div mt-16px pb-4px text-white w-200px rounded-12px bg="#282826">
      <div tracking-2px leading-24px text-center text-14px rounded-t-12px style={{ backgroundColor: note.color }}>{note.eventName}{hasHappened ? '已经' : '还剩'}</div>
      <div mt-6px text-24px leading-32px text-center>{naturalDaysBetween} 天</div>
      <div text="#626260" text-12px leading-18px text-center>{hasHappened ? '上次' : '下次'}： {happenTime.format('yyyy.MM.dd dddd')} </div>
    </div>
  )
}
