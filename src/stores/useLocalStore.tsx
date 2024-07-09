import create from 'zustand'

interface Local {
  hasReadWelcomes: boolean
  setHasReadWelcomes: (read: boolean) => void
}
const init = localStorage.getItem('hasReadWelcomes')
export const useLocalStore = create<Local>(set => (
  {
    hasReadWelcomes: init === 'yes',
    setHasReadWelcomes: (read) => {
      const result = read ? 'yes' : 'no'
      localStorage.setItem('hasReadWelcomes', result)
      set({ hasReadWelcomes: read })
    },
  }
))
