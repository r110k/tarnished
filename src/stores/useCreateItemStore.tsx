import create from 'zustand'
import type { FormError } from '../lib/validate'
import { gtime } from '../lib/gtime'

type Data = Item

interface CreateItem {
  data: Partial<Data>
  setData: (data: Partial<Data>) => void
  error: FormError<Data>
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateItemStore = create<CreateItem>((set, get) => (
  {
    data: {
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happened_at: gtime().format(),
    },
    error: {
      kind: [],
      tag_ids: [],
      amount: [],
      happened_at: [],
    },
    setData: (data) => {
      set(state => ({
        ...state,
        data: {
          ...state.data,
          ...data,
        },
      }))
    },
    setError(error) {
      set(state => ({
        ...state.error,
        error: {
          ...error,
        },
      }))
    },
  }
))
