import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

let id = 0
const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<Item>): Item => {
  return {
    id: createId(),
    amount: faker.number.int({ min: 99, max: 100_0000_00 }),
    note: 'cumque',
    happened_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    deleted_at: null,
    user_id: 1471,
    tag_ids: [
      7893,
      7894,
    ],
    tags: [
      {
        id: 7893,
        user_id: 1471,
        name: 'Vel.',
        sign: '😡',
        deleted_at: null,
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
        kind: 'expenses',
      },
      {
        id: 7894,
        user_id: 1471,
        name: 'Ut .',
        sign: '😂',
        deleted_at: null,
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
        kind: 'expenses',
      },
    ],
    ...attrs,
  }
}

const createList = (n: number, attrs?: Partial<Item>): Item[] => {
  return Array.from({ length: n }).map(() => create(attrs))
}

const createResponse = ({ total = 10, perPage = 10, page = 1 }, attrs?: Partial<Item>): Resources<Item> => {
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

export const itemsMock: MockMethod = {
  url: '/api/v1/items',
  method: 'get',
  statusCode: 200,
  timeout: 2500,
  response: ({ query }: ResponseParams): Resources<Item> => {
    return createResponse({ total: 0, perPage: 10, page: parseInt(query.page) || 1 })
  },
}
