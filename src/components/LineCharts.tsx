import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Props = {
  className: string
  items: { x: string | number ; y: number }[]
}

export const LineCharts: React.FC<Props> = (props) => {
  const { className, items } = props
  const divRef = useRef<HTMLDivElement>(null)

  const xItems = items?.map(item => item.x)
  const yItems = items?.map(item => item.y)

  useEffect(() => {
    if (!divRef.current) { return }
    const myChart = echarts.init(divRef.current)
    const option = {
      xAxis: {
        type: 'category',
        data: xItems,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: yItems,
          type: 'line',
          smooth: true,
        },
      ],
    }
    myChart.setOption(option)
  }, [])
  return (
    <div ref={divRef} className={className}></div>
  )
}
