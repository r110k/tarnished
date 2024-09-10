var isDev: boolean
interface Resource<T> {
  resource: T
}
interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    total: number
  }
}
interface User {
  id: number
  name?: string
  email: string
  created_at: string
  updated_at: string
}
interface Item {
  id: number
  created_at: string
  updated_at: string
  deleted_at?: string | null
  user_id: number
  amount: number
  note?: string
  happened_at: string
  tag_ids: number[]
  kind: 'expenses' | 'income'
  tags?: any[]
}
interface Tag {
  id: number
  user_id: number
  name: string
  sign: string
  deleted_at?: string | null
  created_at: string
  updated_at: string
  kind: Item['kind']
}

type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[]

interface Note {
  id: number
  color: string
  eventName: string
  happen_at: string
  deleted_at?: string | null
  created_at: string
  updated_at: string
}

interface QWeatherResInterface {

  /**
   * 状态码
   * 200	请求成功
   * 204	请求成功，但你查询的地区暂时没有你需要的数据。
   * 400	请求错误，可能包含错误的请求参数或缺少必选的请求参数。
   * 401	认证失败，可能使用了错误的KEY、数字签名错误、KEY的类型错误（如使用SDK的KEY去访问Web API）。
   * 402	超过访问次数或余额不足以支持继续访问服务，你可以充值、升级访问量或等待访问量重置。
   * 403	无访问权限，可能是绑定的PackageName、BundleID、域名IP地址不一致，或者是需要额外付费的数据。
   * 404	查询的数据或地区不存在。
   * 429	超过限定的QPM（每分钟访问次数），请参考QPM说明
   * 500	无响应或超时，接口服务异常请联系我们
   * @reffer: https://dev.qweather.com/docs/resource/status-code/
   */
  code: string

  /**
   * 当前API的最近更新时间
   */
  updateTime: string

  /**
   * 当前数据的响应式页面，便于嵌入网站或应用
   */
  fxLink: string


  /**
   * 某天的预报
   */
  daily: DayWeather[]

  /**
   * 原始数据
   */
  refer: Refer
}

interface DayWeather {
  /**
   * 预报日期
   */
  fxDate: string

  /**
   * 日出时间，在高纬度地区可能为空
   */
  sunrise: string

  /**
   * 日落时间，在高纬度地区可能为空
   */
  sunset: string

  /**
   * 当天月升时间，可能为空
   */
  moonrise: string

  /**
   * 当天月落时间，可能为空
   */
  moonset: string

  /**
   * 月相名称
   */
  moonPhase: string

  /**
   *  月相图标代码，另请参考天气图标项目
   */
  moonPhaseIcon: string

  /**
   * 预报当天最高温度
   */
  tempMax: string

  /**
   *  预报当天最低温度
   */
  tempMin: string

  /**
   * 预报白天天气状况的图标代码，另请参考天气图标项目
   * 图标: https://dev.qweather.com/docs/resource/icons/
   * 项目: https://icons.qweather.com/
   */
  iconDay: string

  /**
   * 预报白天天气状况文字描述，包括阴晴雨雪等天气状态的描述
   */
  textDay: string

  /**
   *  预报夜间天气状况的图标代码，另请参考天气图标项目
   */
  iconNight: string

  /**
   * 预报晚间天气状况文字描述，包括阴晴雨雪等天气状态的描述
   */
  textNight: string

  /**
   * 预报白天风向360角度
   */
  wind360Day: string

  /**
   * 预报白天风向
   */
  windDirDay: string

  /**
   * 预报白天风力等级
   */
  windScaleDay: string

  /**
   * 预报白天风速，公里/小时
   */
  windSpeedDay: string

  /**
   * 预报夜间风向360角度
   */
  wind360Night: string

  /**
   * 预报夜间当天风向
   */
  windDirNight: string

  /**
   * 预报夜间风力等级
   */
  windScaleNight: string

  /**
   * 预报夜间风速，公里/小时
   */
  windSpeedNight: string

  /**
   * 相对湿度，百分比数值
   */
  humidity: string

  /**
   *  预报当天总降水量，默认单位：毫米
   */
  precip: string

  /**
   * 大气压强，默认单位：百帕
   */
  pressure: string

  /**
   * 大气压强，默认单位：百帕
   */
  vis: string

  /**
   * 云量，百分比数值。可能为空
   */
  cloud: string

  /**
   * 紫外线强度指数
   */
  uvIndex: string
}

/**
* 原始数据
*/
interface Refer {
  /**
   * 原始数据来源，或数据源说明，可能为空
   */
  sources: string[]

  /**
   * 数据许可或版权声明，可能为空
   */
  license: string[]
}
