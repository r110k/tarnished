import s from './Tabs.module.scss'
interface Props<T> {
  tabItems: { key: T; text: string }[]
  value: T
  onChange: (key: T) => void
}
export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, value, onChange } = props
  return (
    <ol flex text-white children-px-24px children-py-12px>
      {tabItems.map(items => (<li key={items.key}
        className={items.key === value ? s.selected : ''}
        onClick={() => onChange(items.key)}>
        {items.text}
      </li>))}
    </ol>
  )
}
