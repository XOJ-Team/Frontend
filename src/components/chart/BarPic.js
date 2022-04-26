import React from 'react'

import  {Bar}  from '@ant-design/charts/es';



export default function BaPic(props) {
  // 条形图设置
// https://charts.ant.design/zh/examples/bar/stacked#basic
const config = {
  data: props.ranklist,
  xField: 'ranking',
  yField: 'name',
  seriesField:'name',
  // color:farpropsAuth.XJTLUPURPLE,
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle',
    // 'left', 'middle', 'right'
    // 可配置附加的布局方法
    layout: [
      // 柱形图数据标签位置自动调整
      {
        type: 'interval-adjust-position',
      }, // 数据标签防遮挡
      {
        type: 'interval-hide-overlap',
      }, // 数据标签文颜色自动调整
      {
        type: 'adjust-color',
      },
    ],
  },
};

  return (
    <Bar {...config} />
  )
}
