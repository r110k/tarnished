import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [
  {
    url: '/api/v1/items/summary',
    method: 'get',
    statusCode: 200,
    timeout: 300,
    response: () => {
      return {
        groups: [
          { happened_at: '2021-12-01', amount: 5000 },
          { happened_at: '2021-12-02', amount: 8900 },
          { happened_at: '2021-12-03', amount: 25000 },
          { happened_at: '2021-12-04', amount: 4000 },
          { happened_at: '2021-12-05', amount: 7500 },
          { happened_at: '2021-12-06', amount: 7500 },
          { happened_at: '2021-12-07', amount: 9000 },
          // { happened_at: '2021-12-08', amount: 9000 },
          // { happened_at: '2021-12-09', amount: 1500 },
          // { happened_at: '2021-12-10', amount: 1500 },
          // { happened_at: '2021-12-11', amount: 15000 },
          // { happened_at: '2021-12-12', amount: 18900 },
          // { happened_at: '2021-12-13', amount: 15000 },
          // { happened_at: '2021-12-14', amount: 14000 },
          { happened_at: '2021-12-15', amount: 17500 },
          // { happened_at: '2021-12-16', amount: 17500 },
          { happened_at: '2021-12-17', amount: 19000 },
          { happened_at: '2021-12-18', amount: 19000 },
          // { happened_at: '2021-12-19', amount: 11500 },
          // { happened_at: '2021-12-20', amount: 11500 },
          // { happened_at: '2021-12-21', amount: 25000 },
          // { happened_at: '2021-12-22', amount: 28900 },
          // { happened_at: '2021-12-23', amount: 25000 },
          // { happened_at: '2021-12-24', amount: 24000 },
          // { happened_at: '2021-12-25', amount: 27500 },
          // { happened_at: '2021-12-26', amount: 27500 },
          // { happened_at: '2021-12-27', amount: 29000 },
          // { happened_at: '2021-12-28', amount: 29000 },
          { happened_at: '2021-12-29', amount: 31500 },
          { happened_at: '2021-12-30', amount: 33500 },
          { happened_at: '2021-12-31', amount: 35000 },
        ],
        total: 36000,
      }
    },
  },
]
