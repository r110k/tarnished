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
const compareKey = <T extends string | { name: string }>(a: T, b: T) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a === b
  } else if (a instanceof Object && b instanceof Object) {
    return a.name === b.name
  }
  return false
}
export const Tabs = <T extends string | { name: string }>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props
  return (
    <div flex flex-col className={cs(className, classPrefix)}>
      <ol grow-0 shrink-0 className={classPrefix ? `${classPrefix}-menu` : ''} flex text-white children-px-24px children-py-12px
        bg="[rgb(173,170,120)]">
        {tabItems.map(item => (<li key={ typeof item.key === 'string' ? item.key : item.key.name }
          className={ cs(classPrefix ? `${classPrefix}-menu-item` : '', compareKey(item.key, value) ? s.selected : '') }
          onClick={() => onChange(item.key)}>
          {item.text}
        </li>))}
      </ol>
      <div grow-1 shrink-1 overflow-auto className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(item => compareKey(item.key, value))[0].element}
      </div>
    </div>

  )
}
