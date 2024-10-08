import type { MockMethod } from 'vite-plugin-mock'

export const weatherMock: MockMethod[] = [
  {
    url: '/api.gualand.cc/',
    method: 'get',
    statusCode: 200,
    timeout: 300,
    response: (): QWeatherResInterface => {
      return {
        code: '200',
        updateTime: '2024-09-11T14:26+08:00',
        fxLink: 'https://www.qweather.com/weather/gongshu-101210112.html',
        daily: [
          {
            fxDate: '2024-09-11',
            sunrise: '05:42',
            sunset: '18:12',
            moonrise: '13:01',
            moonset: '23:01',
            moonPhase: '上弦月',
            moonPhaseIcon: '802',
            tempMax: '32',
            tempMin: '25',
            iconDay: '305',
            textDay: '小雨',
            iconNight: '151',
            textNight: '多云',
            wind360Day: '45',
            windDirDay: '东北风',
            windScaleDay: '1-3',
            windSpeedDay: '16',
            wind360Night: '315',
            windDirNight: '西北风',
            windScaleNight: '1-3',
            windSpeedNight: '16',
            humidity: '92',
            precip: '2.5',
            pressure: '1006',
            vis: '24',
            cloud: '60',
            uvIndex: '3',
          },
          {
            fxDate: '2024-09-12',
            sunrise: '05:43',
            sunset: '18:10',
            moonrise: '14:00',
            moonset: '',
            moonPhase: '盈凸月',
            moonPhaseIcon: '803',
            tempMax: '33',
            tempMin: '26',
            iconDay: '302',
            textDay: '雷阵雨',
            iconNight: '151',
            textNight: '多云',
            wind360Day: '90',
            windDirDay: '东风',
            windScaleDay: '1-3',
            windSpeedDay: '16',
            wind360Night: '135',
            windDirNight: '东南风',
            windScaleNight: '1-3',
            windSpeedNight: '16',
            humidity: '85',
            precip: '2.5',
            pressure: '1004',
            vis: '25',
            cloud: '60',
            uvIndex: '7',
          },
          {
            fxDate: '2024-09-13',
            sunrise: '05:44',
            sunset: '18:09',
            moonrise: '14:54',
            moonset: '00:00',
            moonPhase: '盈凸月',
            moonPhaseIcon: '803',
            tempMax: '34',
            tempMin: '26',
            iconDay: '101',
            textDay: '多云',
            iconNight: '150',
            textNight: '晴',
            wind360Day: '90',
            windDirDay: '东风',
            windScaleDay: '3-4',
            windSpeedDay: '24',
            wind360Night: '90',
            windDirNight: '东风',
            windScaleNight: '1-3',
            windSpeedNight: '16',
            humidity: '91',
            precip: '0.0',
            pressure: '1003',
            vis: '24',
            cloud: '25',
            uvIndex: '8',
          },
        ],
        refer: {
          sources: [
            'QWeather',
          ],
          license: [
            'CC BY-SA 4.0',
          ],
        },
      }
    },
  },
]

