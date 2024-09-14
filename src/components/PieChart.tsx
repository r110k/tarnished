import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Props = {
  className: string
  items?: { name: string | number ; value: number; sign: string }[]
}

export const PieChart: React.FC<Props> = (props) => {
  const { className, items = [] } = props
  const divRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const myChart = useRef<echarts.ECharts>()
  useEffect(() => {
    if (!divRef.current) { return }
    if (initialized.current) { return }
    myChart.current = echarts.init(divRef.current)
    const option: echarts.EChartsOption = {
      tooltip: { trigger: 'item' },
      grid: { top: 0, right: 0, bottom: 0, left: 0 },
      series: [
        {
          type: 'pie',
          radius: '90%',
          data: items,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    myChart.current.setOption(option)
    initialized.current = true
  }, [])
  useEffect(() => {
    const option: echarts.EChartsOption = {
      series: [{ data: items }],
    }
    myChart.current?.setOption(option)
  }, [items])
  return (
    <div ref={divRef} className={className}></div>
  )
}
