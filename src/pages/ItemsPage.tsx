import styled from 'styled-components'
import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRage } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'
const Div = styled.div`
  background: rgb(59,65,48);
  background: linear-gradient(180deg, rgba(59,65,48,1) 0%, rgba(173,170,120,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRage>('thisMonth')
  const [items] = useState<Item[]>([
    {
      id: 4633,
      user_id: 1471,
      amount: 2521,
      note: 'doloremque',
      happened_at: '2020-01-01T00:00:00.000Z',
      tag_ids: [
        7893,
        7894,
        7895,
        7896,
      ],
      created_at: '2024-07-30T12:23:16.531Z',
      updated_at: '2024-07-30T12:23:16.531Z',
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
          sign: '😡',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.507Z',
          updated_at: '2024-07-30T12:23:16.507Z',
          kind: 'expenses',
        },
        {
          id: 7895,
          user_id: 1471,
          name: 'Omn.',
          sign: '😡',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.510Z',
          updated_at: '2024-07-30T12:23:16.510Z',
          kind: 'expenses',
        },
        {
          id: 7896,
          user_id: 1471,
          name: 'Qui.',
          sign: '❤',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.513Z',
          updated_at: '2024-07-30T12:23:16.513Z',
          kind: 'expenses',
        },
      ],
    },
    {
      id: 4634,
      user_id: 1471,
      amount: 1376,
      note: 'voluptatem',
      happened_at: '2020-01-01T00:00:00.000Z',
      tag_ids: [
        7893,
        7894,
        7895,
        7896,
      ],
      created_at: '2024-07-30T12:23:16.535Z',
      updated_at: '2024-07-30T12:23:16.535Z',
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
          sign: '😡',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.507Z',
          updated_at: '2024-07-30T12:23:16.507Z',
          kind: 'expenses',
        },
        {
          id: 7895,
          user_id: 1471,
          name: 'Omn.',
          sign: '😡',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.510Z',
          updated_at: '2024-07-30T12:23:16.510Z',
          kind: 'expenses',
        },
        {
          id: 7896,
          user_id: 1471,
          name: 'Qui.',
          sign: '❤',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.513Z',
          updated_at: '2024-07-30T12:23:16.513Z',
          kind: 'expenses',
        },
      ],
    },
    {
      id: 4635,
      user_id: 1471,
      amount: 1630,
      note: 'omnis',
      happened_at: '2020-01-01T00:00:00.000Z',
      tag_ids: [
        7893,
        7894,
        7895,
        7896,
      ],
      created_at: '2024-07-30T12:23:16.539Z',
      updated_at: '2024-07-30T12:23:16.539Z',
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
          sign: '😡',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.507Z',
          updated_at: '2024-07-30T12:23:16.507Z',
          kind: 'expenses',
        },
        {
          id: 7895,
          user_id: 1471,
          name: 'Omn.',
          sign: '😡',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.510Z',
          updated_at: '2024-07-30T12:23:16.510Z',
          kind: 'expenses',
        },
        {
          id: 7896,
          user_id: 1471,
          name: 'Qui.',
          sign: '❤',
          deleted_at: null,
          created_at: '2024-07-30T12:23:16.513Z',
          updated_at: '2024-07-30T12:23:16.513Z',
          kind: 'expenses',
        },
      ],
    },
  ])
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <Div>
        <TopNav />
        <TimeRangePicker selected={timeRange} onSelected={setTimeRange} />
      </Div>
      <ItemsSummary />
      <ItemsList items={items} />
      <AddItemFloatButton />
      <TopMenu onClickMask={() => setVisible(false)} visible={visible} />
    </div>
  )
}
