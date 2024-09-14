type Props = {
  value?: string
  placeholder?: string
  onChange?: (v: string) => void
  className?: string
}
export const DateInput: React.FC<Props> = (props) => {
  const { value, onChange, className, placeholder } = props
  return (
    <input type="text" readOnly className={className} g-input-text placeholder={placeholder || '请输入'}
      value={value} />
  )
}
