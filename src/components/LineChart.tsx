import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Props = {
  className: string
  items?: { x: string | number ; y: number }[]
}

export const LineChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const divRef = useRef<HTMLDivElement>(null)
  const myChart = useRef<echarts.ECharts>()

  const xItems = items?.map(item => item.x)
  const yItems = items?.map(item => item.y)

  const initialized = useRef(false)

  useEffect(() => {
    if (!divRef.current) { return }
    if (initialized.current) { return }
    myChart.current = echarts.init(divRef.current)
    const option: echarts.EChartsOption = {
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: ([{ axisValue, data }]: any) => {
          const parts = axisValue.split('-')
          const label = `${parts[0]}年${parts[1]}月${parts[2]}日`
          const value = data === null ? '无数据' : `${data}元`
          return `${label}<br /><div text-right>${value}</div>`
        },
      },
      grid: {
        top: 8,
        right: 16,
        bottom: 24,
        left: 16,
      },
      xAxis: {
        type: 'category',
        data: xItems,
        axisLabel: {
          // label from '2021-12-01' to '01-01'
          formatter: (label: string) => label.slice(label.indexOf('-') + 1),
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          data: yItems,
          type: 'line',
          smooth: true,
        },
      ],
    }
    myChart.current.setOption(option)
    initialized.current = true
  }, [])
  useEffect(() => {
    const option: echarts.EChartsOption = {
      xAxis: { data: xItems },
      series: [{ data: yItems }],
    }
    myChart.current?.setOption(option)
  }, [items])
  return (
    <div ref={divRef} className={className}></div>
  )
}
