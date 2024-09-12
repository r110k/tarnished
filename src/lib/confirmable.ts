export const confirmable = (fn: () => void) => () => {
  const result = window.confirm('🏮 确认要删除么？')
  if (result) {
    fn()
  }
}
