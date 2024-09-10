import type { MockMethod } from 'vite-plugin-mock'
import { meMock } from './me.mock'
import { itemsMock } from './items.mock'
import { sessionMock } from './session.mock'
import { validationCodesMock } from './validationCodes.mock'
import { tagsMock } from './tags.mock'
import { weatherMock } from './weather.mock'
export default [
  ...meMock,
  ...tagsMock,
  ...itemsMock,
  ...sessionMock,
  ...validationCodesMock,
  ...weatherMock,
] as MockMethod[]
