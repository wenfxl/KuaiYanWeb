<template>
  <div class="dashboard-line-box">
    <div
        ref="echart"
        class="dashboard-line"
    />
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import {nextTick, onMounted, onUnmounted, ref, shallowRef} from 'vue'
import {is移动端} from "@/utils/utils";

const chart = shallowRef(null)
const echart = ref(null)
const initChart = () => {
  chart.value = echarts.init(echart.value /* 'macarons' */)
  setOptions()
}
const setOptions = () => {

  let 图数据 = {
    title: {
      text: '卡号统计'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      data: ['制卡数量', '充值数量']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['大大大大前天', '大大大前天', '大大前天', '大前天', '前天', '昨天', '今天']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '制卡数量',
        type: 'line',
        data: [320, 332, 341, 354, 390, 430, 450]
      }, {
        name: '充值数量',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  }
  图数据.title=is移动端()?"":图数据.title
  //创建date变量
  let nowDate = new Date();

//添加天数

  for (let i = 0; i < 7; i++) {
    图数据.xAxis.data[6 - i] = nowDate.getDate().toString()+"日"
    nowDate.setDate(nowDate.getDate() - 1);
  }
  图数据.xAxis.data[6] += "(今天)"
  图数据.xAxis.data[5] += "(昨天)"

  console.log(图数据.xAxis.data)
  chart.value.setOption(图数据)
}

onMounted(async () => {
  await nextTick()
  initChart()
})

onUnmounted(() => {
  if (!chart.value) {
    return
  }
  chart.value.dispose()
  chart.value = null
})
window.onresize = function () {
  chart.value.resize();
}
</script>
<style lang="scss" scoped>
.dashboard-line-box {
  .dashboard-line {
    background-color: #fff;
    height: 360px;
    width: 100%;
  }

  .dashboard-line-title {
    font-weight: 600;
    margin-bottom: 12px;
  }
}
</style>
