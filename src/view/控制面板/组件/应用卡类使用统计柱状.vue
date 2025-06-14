<template>

  <div v-loading="is加载中"  element-loading-text="数据努力统计中..."  class="dashboard-line-box"       style="width: 100%;min-height: 360px;position:relative">
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
import {get图表卡号列表统计应用卡类可用已用, get图表应用用户类型统计} from "@/api/分析页Api.js";
import {useStore} from "vuex";
// import 'echarts/theme/macarons'
const is加载中 = ref(false)
const chart = shallowRef(null)
const echart = ref(null)
const initChart = () => {
  chart.value = echarts.init(echart.value /* 'macarons' */)
  setOptions([
    ['product', '已用', '未用', '总数'],
    ['卡类1', 43, 25, 999],
    ['卡类2', 23, 33, 999],
    ['卡类3', 36, 45, 999],
    ['卡类4', 4, 65, 999],
    ['卡类5', 86, 65, 999]
  ])
}
const setOptions = (data) => {
  let 图数据 = {
    title: {
      text: '应用卡类统计'
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
        let dotColor = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[0].color + '"></span>'
        let dotColor2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[1].color + '"></span>'
        let dotColor3 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#73c0e7 "></span>'
        return dotColor + '已用:' + params[0].value[1].toString() + "(" + (params[0].value[1] / (params[0].value[3] ) * 100).toFixed(2).toString() + "%)" + "<br>" +
            dotColor2 + '未用:' + params[0].value[2].toString() + "(" + (params[0].value[2] / (params[0].value[3]) * 100).toFixed(2).toString() + "%)" + "<br>" +
            dotColor3 + '总数:' + (parseInt(params[0].value[3])).toString();
      }
    },

    dataset: {
      source: data
    },
    xAxis: {},


    yAxis: {type: 'category',},

    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{
      type: 'bar', label: {
        show: true,
        position: 'insideLeft',//完成这个类型的数据在该段柱状里面靠左呈现
        formatter: '{@[1]}',
        textStyle: {
          fontSize: 13,
        }
      }
    }, {
      type: 'bar', label: {
        show: true,
        position: 'insideLeft',//完成这个类型的数据在该段柱状里面靠左呈现
        formatter: '{@[2]}',
        textStyle: {
          fontSize: 13,
        }
      }
    }],
    stack: 'total'
  };

  图数据.title=is移动端()?"":图数据.title
  chart.value.setOption(图数据)
}

const Store = useStore()


const on读取图表数据 = async () => {
  is加载中.value=true
  let 返回;
  返回 = await get图表卡号列表统计应用卡类可用已用({AppId:Store.state.搜索_卡号列表.AppId})
  is加载中.value=false
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
  if (chart.value){
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
