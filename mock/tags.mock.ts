import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

let id = 0
const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<Tag>): Tag => {
  return {
    id: createId(),
    user_id: -10000,
    name: faker.word.adjective(),
    sign: faker.internet.emoji(),
    kind: 'income',
    deleted_at: null,
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    ...attrs,
  }
}

const createList = (n: number, attrs?: Partial<Tag>): Tag[] => {
  return Array.from({ length: n }).map(() => create(attrs))
}

const createResponse = ({ total = 10, perPage = 10, page = 1 }, attrs?: Partial<Tag>): Resources<Tag> => {
  const sendCount = (page - 1) * perPage
  const left = total - sendCount
  return {
    resources: left > 0 ? createList(Math.min(perPage, left), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      total,
    },
  }
}

export const tagsMock: MockMethod = {
  url: '/api/v1/tags',
  method: 'get',
  statusCode: 200,
  timeout: 150,
  response: ({ query }: ResponseParams): Resources<Tag> => {
    return createResponse({ total: 52, perPage: 50, page: parseInt(query.page) || 1 })
  },
}
