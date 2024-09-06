import create from 'zustand'

interface TagList {
  list: Tag[]
  setList: (data: Tag[]) => void
}

export const useTagsStore = create<TagList>((set, get) => (
  {
    list: [],
    setList: (list) => {
      set(state => ({ list }))
    },
  }
))
