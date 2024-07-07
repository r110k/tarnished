import create from 'zustand'

interface Demo {
  count: number
  add: () => void
}

export const useDemoStore = create<Demo>((set, get) => (
  {
    count: 0,
    add: () => {
      set({ count: get().count + 1 })
    },
  }
))
