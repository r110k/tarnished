interface Props {
  kind: Item['kind']
}
export const Tags: React.FC<Props> = () => {
  const tags = Array.from({ length: 299 })
  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]"
        justify-center gap-x-32px gap-y-16px px-32px py-16px>
        {tags.map(tag => (
          <li w-48px h-48px flex justify-center items-center
            b-1 b="[rgb(173,170,120)]">🚀</li>
        ))}
      </ol>
    </div>
  )
}
