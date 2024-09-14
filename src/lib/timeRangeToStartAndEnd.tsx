import type { TimeRange } from '../components/TimeRangePicker'
import type { Gtime } from './gtime'
import { gtime } from './gtime'

const timeRangeMap: { [k in TimeRange]: number } = {
  thisMonth: 0,
  lastMonth: -1,
  twoMonthsAgo: -2,
  threeMonthsAgo: -3,
  thisYear: 0,
  custom: 0,
}

export const timeRangeToStartAndEnd = (timeRange: TimeRange) => {
  let selected: Gtime, start: Gtime, end: Gtime
  switch (timeRange) {
    case 'thisMonth':
    case 'lastMonth':
    case 'twoMonthsAgo':
    case 'threeMonthsAgo':
      selected = gtime().firstDayOfMonth.add(timeRangeMap[timeRange], 'month')
      start = selected.firstDayOfMonth
      end = start.lastDayOfMonth.add(1, 'days')
      return { start, end }
    case 'thisYear':
      start = gtime().set({ month: 1 }).firstDayOfMonth
      end = gtime().add(1, 'year').set({ month: 1 }).firstDayOfMonth
      return { start, end }
    case 'custom':
      return { start: gtime(), end: gtime() }
  }
}
