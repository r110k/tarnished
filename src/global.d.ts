var isDev: boolean
interface Resource<T> {
  resource: T
}
interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    total: number
  }
}
interface User {
  id: number
  name?: string
  email: string
  created_at: string
  updated_at: string
}
interface Item {
  id: number
  created_at: string
  updated_at: string
  deleted_at?: string | null
  user_id: number
  amount: number
  note?: string
  happened_at: string
  tag_ids: number[]
  kind: 'expenses' | 'income'
  tags?: any[]
}
interface Tag {
  id: number
  user_id: number
  name: string
  sign: string
  deleted_at?: string 
  created_at: string
  updated_at: string
  kind: Item['kind']
}

type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[]