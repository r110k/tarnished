import useSWR from 'swr'
import { useAjax } from '../lib/ajax'
import { gtime } from '../lib/gtime'
import olu from '../assets/images/olu.gif'
import { useTitle } from '../hooks/useTitle'
import { NoteCard } from './ItemsNewPage/NoteCard'

type Props = {
  title: string
}
export const NotePage: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { get } = useAjax({ showLoading: true, handleError: true })

  const { data: todayWeather } = useSWR('https://api.gualand.cc/', async path =>
    (await get<QWeatherResInterface>(path).catch((error) => { window.alert('天气服务异常'); throw error })).data.daily[0],
  )

  const noteList: Note[] = [
    { color: '#efc97f', eventName: '拖地', happen_at: '2024-09-01', id: -1, created_at: '', updated_at: '' }, // todi
    { color: '#db6b6d', eventName: '陆陆换床单', happen_at: '2024-09-08', id: -1, created_at: '', updated_at: '' }, // lu iddj
    { color: '#669ee2', eventName: '陆陆理发', happen_at: '2024-08-23', id: -1, created_at: '', updated_at: '' }, // lu lifa
    { color: '#82c2bb', eventName: '去迪士尼', happen_at: '2024-10-05', id: -1, created_at: '', updated_at: '' }, // desiny
    { color: '#6f8dee', eventName: '瓜瓜换床单', happen_at: '2024-09-01', id: -1, created_at: '', updated_at: '' }, // gua iddj
    { color: '#6cba92', eventName: '瓜瓜理发', happen_at: '2024-09-01', id: -1, created_at: '', updated_at: '' }, // gua lifa
  ]

  if (!todayWeather) {
    return <div>loading</div>
  } else {
    const isDayMode = gtime().isBeforeSometime(`${gtime().format()} ${todayWeather.sunset}`)
      && gtime().isAfterSometime(`${gtime().format()} ${todayWeather.sunrise}`)

    // progress
    // 获取当前年份
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 0)
    // 计算今天是今年的第几天
    const diff = now.getTime() - startOfYear.getTime()
    const oneDay = 1000 * 60 * 60 * 24 // 毫秒数计算
    const dayOfYear = Math.floor(diff / oneDay)
    const progressPercentage = Math.floor((dayOfYear / gtime().currentYearDaysCount) * 100)

    return (
      <div bg="#C8E2DF" h-screen pb-16px pt-16px px-12px overflow-auto>
        <div flex gap-x-32px>
          <div w-200px rounded-24px p-12px pb-6px text-14px text="#3d3d3d"
            bg-gradient-to-b from="#CFF5FE" to="#F6FEFF" bg="linear-gradient(to bottom, #CFF5FE 70%, #F6FEFF 30%)">
            <div flex justify-between leading-16px>
              <div>{isDayMode ? todayWeather.textDay : todayWeather.textNight}</div>
              <div font-bold>{todayWeather.tempMin}° - {todayWeather.tempMax}°</div>
            </div>
            <div flex justify-center items-center leading-48px >
              <i text-48px text="#e36d30" className={`qi-${todayWeather?.iconDay}`}></i>
            </div>
            <div text-12px text="#626260" flex justify-between>
              <div>{isDayMode ? '日出' : '月出'}  {isDayMode ? todayWeather?.sunrise : todayWeather.moonrise}</div>
              <div>{isDayMode ? '日落' : '月落'}  {isDayMode ? todayWeather?.sunset : todayWeather.moonset}</div>
            </div>
          </div>

          <div bg="#282826" rounded-12px px-20px py-4px>
            <div w-60px h-60px rounded-30px p-5px
              style={{ background: `conic-gradient( #abd25a ${progressPercentage}%, #F6FEFF)` }}>
              <div w-50px h-50px rounded-25px bg="#282826">
                <img width="48px" src={olu} />
              </div>
            </div>
            <div text-18px leading-24px font-bold text-white text-center pt-4px>{progressPercentage}%</div>
          </div>
        </div>
        {
          noteList.map((item, index) => {
            return (
              <NoteCard key={index} note={item} />
            )
          })
        }
      </div>
    )
  }
}
