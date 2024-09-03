import type { MockMethod } from 'vite-plugin-mock'

export const validationCodesMock: MockMethod = {
  url: '/api/v1/validation_codes',
  method: 'post',
  timeout: 3000,
  response: (): {} => ({ }),
}

