import type { MockMethod } from 'vite-plugin-mock'

export const meMock: MockMethod = {
  url: '/api/v1/me',
  method: 'get',
  statusCode: 401,
  timeout: 300,
  response: (): Resource<User> => {
    return {
      resource: {
        id: 1476,
        email: 'malcom.johnston@kreiger-rogahn.example',
        created_at: '2024-07-30T12:23:16.982Z',
        updated_at: '2024-07-30T12:23:16.982Z',
      },
    }
  },
}

