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
// import 'echarts/theme/macarons'

const chart = shallowRef(null)
const echart = ref(null)
const initChart = () => {
  chart.value = echarts.init(echart.value /* 'macarons' */)
  setOptions()
}
const setOptions = () => {


  let 图数据 = {
    title: {
      text: '在线数据'
    },
    legend: {
      top: 'bottom'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: false, readOnly: true},
        restore: {show: false},
        saveAsImage: {show: true}
      }
    },
    label: {
      alignTo: 'edge',
      minMargin: 5,
      edgeDistance: 10,
      lineHeight: 15,
      rich: {
        time: {
          fontSize: 13,
          color: '#999'
        }
      },
      formatter(param) {
        return param.name + '\n' + param.value + ' (' + param.percent * 2 + '%)';
      }
    },

    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          {value: 1048, name: '测试应用1'},
          {value: 735, name: '测试应用2'},
          {value: 580, name: '测试应用3'},
          {value: 484, name: '测试应用4'},
          {value: 300, name: '测试应用5'},

        ]
      }
    ]
  };
  图数据.title=is移动端()?"":图数据.title

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
