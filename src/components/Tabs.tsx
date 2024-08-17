import cs from 'classnames'
import s from './Tabs.module.scss'
interface Props<T> {
  tabItems: {
    key: T
    text: string
    element?: React.ReactNode
  }[]
  value: T
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}
export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props
  return (
    <div className={cs(className, classPrefix)}>
      <ol className={classPrefix ? `${classPrefix}-menu` : ''} flex text-white children-px-24px children-py-12px
        bg="[rgb(173,170,120)]">
        {tabItems.map(items => (<li key={items.key}
          className={
            cs(
              classPrefix ? `${classPrefix}-menu-item` : '',
              items.key === value ? s.selected : '',
            )
          }
          onClick={() => onChange(items.key)}>
          {items.text}
        </li>))}
      </ol>
      <div className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(item => item.key === value)[0].element}
      </div>
    </div>

  )
}
