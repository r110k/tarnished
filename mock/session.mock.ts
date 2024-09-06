import type { MockMethod } from 'vite-plugin-mock'

export const sessionMock: MockMethod[] = [
  {
    url: '/api/v1/session',
    method: 'post',
    timeout: 600,
    response: (): { jwt: string } => {
      return {
        jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDc3LCJleHAiOjE3MjIzNDkzOTd9.sKorw-2gUgj_fitdz-rDOVg-KrQvDjgggLom9KSVZUw',
      }
    },
  },
]
