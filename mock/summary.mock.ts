import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [
  {
    url: '/api/v1/items/summary',
    method: 'get',
    statusCode: 200,
    timeout: 300,
    response: ({ query }: ResponseParams) => {
      if (query.group_by === 'happened_at') {
        return {
          groups: [
            { happened_at: '2024-09-01', amount: 5000 },
            { happened_at: '2024-09-02', amount: 8900 },
            { happened_at: '2024-09-03', amount: 25000 },
            { happened_at: '2024-09-04', amount: 4000 },
            { happened_at: '2024-09-05', amount: 7500 },
            { happened_at: '2024-09-06', amount: 7500 },
            { happened_at: '2024-09-07', amount: 9000 },
            // { happened_at: '2024-09-08', amount: 9000 },
            // { happened_at: '2024-09-09', amount: 1500 },
            // { happened_at: '2024-09-10', amount: 1500 },
            // { happened_at: '2024-09-11', amount: 15000 },
            // { happened_at: '2024-09-12', amount: 18900 },
            // { happened_at: '2024-09-13', amount: 15000 },
            // { happened_at: '2024-09-14', amount: 14000 },
            { happened_at: '2024-09-15', amount: 17500 },
            // { happened_at: '2024-09-16', amount: 17500 },
            { happened_at: '2024-09-17', amount: 19000 },
            { happened_at: '2024-09-18', amount: 19000 },
            // { happened_at: '2024-09-19', amount: 11500 },
            // { happened_at: '2024-09-20', amount: 11500 },
            // { happened_at: '2024-09-21', amount: 25000 },
            // { happened_at: '2024-09-22', amount: 28900 },
            // { happened_at: '2024-09-23', amount: 25000 },
            // { happened_at: '2024-09-24', amount: 24000 },
            // { happened_at: '2024-09-25', amount: 27500 },
            // { happened_at: '2024-09-26', amount: 27500 },
            // { happened_at: '2024-09-27', amount: 29000 },
            // { happened_at: '2024-09-28', amount: 29000 },
            { happened_at: '2024-09-29', amount: 31500 },
            { happened_at: '2024-09-30', amount: 33500 },
            { happened_at: '2024-09-31', amount: 35000 },
          ],
          total: 36000,
        }
      } else {
        return {
          groups: [
            {
              tag_id: 17042,
              tag: {
                id: 17042,
                user_id: 3149,
                name: 'Est.',
                sign: '❤',
                deleted_at: null,
                created_at: '2024-08-26T17:48:18.718+08:00',
                updated_at: '2024-08-26T17:48:18.718+08:00',
                kind: 'expenses',
              },
              amount: 9000,
            },
            {
              tag_id: 17041,
              tag: {
                id: 17041,
                user_id: 3149,
                name: 'Aut.',
                sign: '😀',
                deleted_at: null,
                created_at: '2024-08-26T17:48:18.715+08:00',
                updated_at: '2024-08-26T17:48:18.715+08:00',
                kind: 'expenses',
              },
              amount: 6000,
            },
            {
              tag_id: 17040,
              tag: {
                id: 17040,
                user_id: 3149,
                name: 'Ver.',
                sign: '😡',
                deleted_at: null,
                created_at: '2024-08-26T17:48:18.712+08:00',
                updated_at: '2024-08-26T17:48:18.712+08:00',
                kind: 'expenses',
              },
              amount: 5000,
            },
          ],
          total: 10000,
        }
      }
    },
  },
]
