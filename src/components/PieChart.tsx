import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Props = {
  className: string
  items: { x: string | number ; y: number }[]
}

export const PieChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const divRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  useEffect(() => {
    if (!divRef.current) { return }
    if (initialized.current) { return }
    const myChart = echarts.init(divRef.current)
    const option: echarts.EChartsOption = {
      tooltip: { trigger: 'item' },
      grid: { top: 0, right: 0, bottom: 0, left: 0 },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '85%',
          data: items?.map(item => ({ value: item.y, name: item.x })),
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
    myChart.setOption(option)
    initialized.current = true
  }, [])
  return (
    <div ref={divRef} className={className}></div>
  )
}
