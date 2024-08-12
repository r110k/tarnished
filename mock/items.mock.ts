import type { MockMethod } from 'vite-plugin-mock'

let id = 0
const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<Item>): Item => {
  return {
    id: createId(),
    user_id: 1471,
    amount: 8712,
    note: 'cumque',
    happened_at: '2020-01-01T00:00:00.000Z',
    tag_ids: [
      7893,
      7894,
    ],
    created_at: '2024-07-30T12:23:16.621Z',
    updated_at: '2024-07-30T12:23:16.621Z',
    kind: 'expenses',
    deleted_at: null,
    tags: [
      {
        id: 7893,
        user_id: 1471,
        name: 'Vel.',
        sign: '😡',
        deleted_at: null,
        created_at: '2024-07-30T12:23:16.503Z',
        updated_at: '2024-07-30T12:23:16.503Z',
        kind: 'expenses',
      },
      {
        id: 7894,
        user_id: 1471,
        name: 'Ut .',
        sign: '😂',
        deleted_at: null,
        created_at: '2024-07-30T12:23:16.507Z',
        updated_at: '2024-07-30T12:23:16.507Z',
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
  return {
    resources: createList(perPage, attrs),
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
  timeout: 600,
  response: ({ query }: ResponseParams): Resources<Item> => {
    return createResponse({ total: 20, perPage: 10, page: parseInt(query.page) || 1 })
  },
}
