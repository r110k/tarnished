import create from 'zustand'
import type { FormError } from '../lib/validate'

type Data = {
  email: string
  code: string
}

interface SignIn {
  data: Data
  setData: (data: Partial<Data>) => void
  error: FormError<Data>
  setError: (error: Partial<FormError<Data>>) => void
}

export const useSignInStore = create<SignIn>((set, get) => (
  {
    data: { email: '354929394@qq.com', code: '999999' },
    error: { email: [], code: [] },
    setData: (data: Partial<Data>) => {
      set(state => ({
        ...state,
        data: {
          ...state.data,
          ...data,
        },
      }))
    },
    setError(error: Partial<FormError<Data>>) {
      set(state => ({
        ...state,
        error: {
          ...error,
        },
      }))
    },
  }
))
