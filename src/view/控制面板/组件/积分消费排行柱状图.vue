<template>
  <div v-loading="is加载中"  element-loading-text="数据努力统计中..." class="dashboard-line-box" style="width: 100%;min-height: 360px;position:relative">
    <!--这里是echarts绘图区域-->
    <div
        ref="echart"
        class="dashboard-line"
        style="width: 100%;min-height: 500px;z-index:99;position:absolute">
    </div>
    <!--这里是放置按钮让其显示在最前面-->
    <div style="padding-left: 135px; z-index:999;float:left;position:absolute">
      <el-radio-group v-model="图表时间单位" size="small" @change="on读取图表数据">
        <el-radio-button :value="1">一日</el-radio-button>
        <el-radio-button :value="2">一周</el-radio-button>
        <el-radio-button :value="3">一月</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import {nextTick, onMounted, onUnmounted, ref, shallowRef} from 'vue'
import {is移动端,获取前几个个月的月份} from "@/utils/utils";
import {get图表取余额消费排行榜, get图表取积分消费排行榜} from "@/api/分析页Api.js";

const is加载中 = ref(false)
const 图表时间单位 = ref(3)
const chart = shallowRef(null)
const echart = ref(null)
const initChart = () => {
  chart.value = echarts.init(echart.value /* 'macarons' */)
}

const setOptions = (单位,data=[]) => {

  let 图数据  =  {
    title: {
      text: '积分消费排行榜'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '消费积分',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  if (data){
    图数据.xAxis[0].data = data.user
    图数据.series[0].data = data.series
  }

  chart.value.setOption(图数据)
}
const on读取图表数据 = async () => {
  is加载中.value=true
  let 返回;
  返回 = await get图表取积分消费排行榜({Type:图表时间单位.value})
  is加载中.value=false
  console.log(返回)
  if (返回.code === 10000) {
    setOptions(图表时间单位.value,返回.data)
  }
}
onMounted(async () => {
  await nextTick()
  initChart()
  await on读取图表数据()
})

onUnmounted(() => {
  if (!chart.value) {
    return
  }
  chart.value.dispose()
  chart.value = null
})
window.onresize = function () {
  if (chart.value){
    chart.value.resize();
  }
}
</script>
<style lang="scss" scoped>
/*.dashboard-line-box {
  .dashboard-line {
    background-color: #fff;
    height: 100%;
    width: 100%;
  }

  .dashboard-line-title {
    font-weight: 600;
    margin-bottom: 12px;
  }
}*/
</style>
