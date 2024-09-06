type Parts = {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds: number
  ms: number
}

type Unit =
  | 'year' | 'years' | 'month' | 'months' | 'day' | 'days'
  | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds'
  | 'ms'

export const gtime = (p?: number | string | Date) => {
  return new Gtime(p)
}

export class Gtime {
  #date: Date

  constructor(p?: number | string | Date) {
    this.#date = p ? new Date(p) : new Date()
  }

  /**
   * 格式化输出, 默认值是 yyyy-MM-dd
   * @param pattern 目前仅支持 yyyy MM dd HH mm ss fff
   */
  format(pattern = 'yyyy-MM-dd') {
    return pattern.replace(/yyyy/g, this.year.toString())
      .replace(/MM/g, this.month.toString().padStart(2, '0'))
      .replace(/dd/g, this.day.toString().padStart(2, '0'))
      .replace(/dd/g, this.day.toString().padStart(2, '0'))
      .replace(/HH/g, this.hours.toString().padStart(2, '0'))
      .replace(/mm/g, this.minutes.toString().padStart(2, '0'))
      .replace(/ss/g, this.seconds.toString().padStart(2, '0'))
      .replace(/fff/g, this.ms.toString().padStart(3, '0'))
  }

  isLeapYear() {
    const year = this.year
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  get currentYearDaysCount() {
    if (this.isLeapYear()) {
      return 366
    }
    return 365
  }

  add(n: number, unit: Unit) {
    const table = {
      year: 'year',
      years: 'year',
      month: 'month',
      months: 'month',
      day: 'day',
      days: 'day',
      hour: 'hours',
      hours: 'hours',
      minute: 'minutes',
      minutes: 'minutes',
      second: 'seconds',
      seconds: 'seconds',
      ms: 'ms',
    } as const
    this[table[unit]] += n
    return this
  }

  get date() {
    return new Date(this.#date)
  }

  get timestamp() {
    return this.#date.getTime()
  }

  get lastDayOfMonth() {
    return new Gtime(new Date(this.year, this.month - 1 + 1, 0))
  }

  get parts(): Parts {
    const year = this.#date.getFullYear()
    const month = this.#date.getMonth() + 1
    const day = this.#date.getDate()
    const hours = this.#date.getHours()
    const minutes = this.#date.getMinutes()
    const seconds = this.#date.getSeconds()
    const ms = this.#date.getMilliseconds()

    return { year, month, day, hours, minutes, seconds, ms }
  }

  set parts(p: Partial<Parts>) {
    // 表驱动编程
    const table = {
      year: 'setFullYear',
      month: 'setMonth',
      day: 'setDate',
      hours: 'setHours',
      minutes: 'setMinutes',
      seconds: 'setSeconds',
      ms: 'setMilliseconds',
    } as const
    // p = {year: 2024, month: 8} => [['year', 2024], ['month', 8]]
    Object.entries(p).forEach(([key, value]) => {
      const k = key as keyof typeof p
      const methodName = table[k]
      value = (k === 'month' ? value - 1 : value)
      this.#date[methodName](value)
    })
  }

  get year() {
    return this.parts.year
  }

  set year(v) {
    this.parts = { year: v }
  }

  get month() {
    return this.parts.month
  }

  set month(v) {
    this.parts = { month: v }
  }

  get day() {
    return this.parts.day
  }

  set day(v) {
    this.parts = { day: v }
  }

  get hours() {
    return this.parts.hours
  }

  set hours(v) {
    this.parts = { hours: v }
  }

  get minutes() {
    return this.parts.minutes
  }

  set minutes(v) {
    this.parts = { minutes: v }
  }

  get seconds() {
    return this.parts.seconds
  }

  set seconds(v) {
    this.parts = { seconds: v }
  }

  get ms() {
    return this.parts.ms
  }

  set ms(v) {
    this.parts = { ms: v }
  }

  get isoString() {
    // FIXME: 获取当前用户的时区,仅支持时区为整数的地理位置(+08:00), 无法支持 时区为 (-07:30) 的地理位置
    const timezone = Math.round(-this.#date.getTimezoneOffset() / 60)
    const absolute = Math.abs(timezone)
    const sign = timezone > 0 ? '+' : '-'
    const pad = absolute.toString().padStart(2, '0')
    return `${this.format('yyyy-MM-ddTHH:mm:ss.fff') + sign + pad}:00`
  }
}
