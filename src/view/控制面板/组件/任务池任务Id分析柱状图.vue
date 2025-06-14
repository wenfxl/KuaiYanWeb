<template>

  <div v-loading="is加载中" element-loading-text="数据努力统计中..." class="dashboard-line-box"
       style="width: 100%;min-height: 360px;position:relative">
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
import {Get任务池任务Id分析, get图表应用用户统计} from "@/api/分析页Api.js";
// import 'echarts/theme/macarons'
const is加载中 = ref(false)
const chart = shallowRef(null)
const echart = ref(null)
const Props = defineProps({
  Tid: {
    type: Number,
    default: 0
  },
})


const initChart = () => {
  chart.value = echarts.init(echart.value /* 'macarons' */)
  setOptions([
    ['日期', '失败', '成功', '总数'],
    ['6-1', 43, 25, 999],
    ['6-2', 23, 33, 999],
    ['6-3', 0, 45, 999],
    ['6-4', 0, 0, 999],
    ['6-5', 86, 65, 999]
  ])
}
const setOptions = (data) => {
  let 图数据 = {
    title: {
      text: '任务30日柱状图'
    },
    legend: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      },
      formatter: function (params) {
        //弹窗内容
        // console.log(params)
        let dotColor = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[1].color + '"></span>'
        let dotColor2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[0].color + '"></span>'
        let dotColor3 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#73c0e7 "></span>'
        return dotColor + '成功:' + params[0].value[2].toString() + "(" + (params[0].value[2] / (params[0].value[3]) * 100).toFixed(2).toString() + "%)" + "<br>" +
            dotColor2 + '失败:' + params[0].value[1].toString() + "(" + (params[0].value[1] / (params[0].value[3]) * 100).toFixed(2).toString() + "%)" + "<br>" +
            dotColor3 + '总数:' + (parseInt(params[0].value[3])).toString();
      }
    },

    dataset: {
      source: data
    },
    xAxis: {type: 'category',},


    yAxis: {},

    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{
      type: 'bar', label: {
        show: true,
        position: 'insideRight',//完成这个类型的数据在该段柱状里面靠左呈现
        formatter: (params) => params.value[1] !== "0" ? params.value[1] : "", //"0"  不显示
        textStyle: {
          fontSize: 13,
        }
      },    // 添加这行设置失败柱状图为红色
      itemStyle: {
        color: '#ff0000' // 红色
      }
    }, {
      type: 'bar', label: {
        show: true,
        position: 'insideLeft',//完成这个类型的数据在该段柱状里面靠左呈现
        formatter: '{@[2]}',
        textStyle: {
          fontSize: 13,
        }
      },    // 添加这行设置失败柱状图为红色
      itemStyle: {
        color: '#68c23c' //
      }
    }],
    stack: 'total'
  };

  图数据.title = is移动端() ? "" : 图数据.title
  chart.value.setOption(图数据)
}
const on读取图表数据 = async () => {
  is加载中.value = true
  let 返回;
  返回 = await Get任务池任务Id分析({TaskId: Props.Tid})
  is加载中.value = false
  console.log(返回)
  if (返回.code === 10000) {
    setOptions(返回.data)
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
  if (chart.value) {
    chart.value.resize();
  }
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
