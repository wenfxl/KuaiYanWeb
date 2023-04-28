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
      text: '应用用户统计'
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
        return dotColor + '会员:' + params[0].value[1].toString() + "(" + (params[0].value[1] / (params[0].value[1] + params[0].value[2]) * 100).toFixed(2).toString() + "%)" + "<br>" +
            dotColor2 + '非会员:' + params[0].value[2].toString() + "(" + (params[0].value[2] / (params[0].value[1] + params[0].value[2]) * 100).toFixed(2).toString() + "%)" + "<br>" +
            dotColor3 + '共计数量:' + (params[0].value[1] + params[0].value[2]).toString();
      }
    },

    dataset: {
      source: [
        ['product', '非会员', '会员', '总数'],
        ['测试应用1', 43, 25, 999],
        ['测试应用2', 23, 33, 999],
        ['测试应用3', 36, 45, 999],
        ['测试应用4', 4, 65, 999],
        ['测试应用5', 86, 65, 999]
      ]
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
