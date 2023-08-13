<template>
  <div v-loading="is加载中" element-loading-text="数据努力统计中..." class="dashboard-line-box"
       style="width: 100%;min-height: 360px;position:relative">
    <!--这里是echarts绘图区域-->
    <div
        ref="echart"
        class="dashboard-line"
        style="width: 100%;min-height: 200px;z-index:99;position:absolute">
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import chinaJson from "@/assets/json/china.json";
import {nextTick, onMounted, onUnmounted, ref, shallowRef} from 'vue'
import {is移动端, 获取前几个个月的月份} from "@/utils/utils";
import {get图表在线用户统计, Get在线用户Ip地图分布统计} from "@/api/分析页Api.js";

const is加载中 = ref(false)
const 图表时间单位 = ref(1)
const chart = shallowRef(null)
const echart = ref(null)
// 各省的人口数据
const mapData = [
  {name: "河北省", value: 100},
  {name: "山西省", value: 90},
  {name: "辽宁省", value: 40},
  {name: "吉林省", value: 50},
  {name: "黑龙江省", value: 60},
  {name: "江苏省", value: 20},
  {name: "浙江省", value: 8},
  {name: "安徽省", value: 20},
  {name: "福建省", value: 46},
  {name: "江西省", value: 32},
  {name: "山东省", value: 2},
  {name: "河南省", value: 2},
  {name: "湖北省", value: 26},
  {name: "湖南省", value: 30},
  {name: "广东省", value: 29},
  {name: "海南省", value: 20},
  {name: "四川省", value: 212},
  {name: "贵州省", value: 235},
  {name: "云南省", value: 20},
  {name: "陕西省", value: 289},
  {name: "甘肃省", value: 274},
  {name: "青海省", value: 260},
  {name: "台湾省", value: 244},
  {name: "内蒙古自治区", value: 235},
  {name: "广西壮族自治区", value: 27},
  {name: "西藏自治区", value: 20},
  {name: "宁夏回族自治区", value: 20},
  {name: "新疆维吾尔自治区", value: 20},
  {name: "北京市", value: 20},
  {name: "天津市", value: 20},
  {name: "上海市", value: 20},
  {name: "重庆市", value: 20},
  {name: "香港特别行政区", value: 20},
  {name: "澳门特别行政区", value: 20},
  {name: "南海诸岛", value: 8},
];
const initChart = () => {
  echarts.registerMap('china', chinaJson);
  chart.value = echarts.init(echart.value /* 'macarons' */)
  setOptions(mapData)
}

const setOptions = (data) => {

  let 临时数据 = mapData

  for (let i = 0; i < 临时数据.length; i++) {
    临时数据[i].value = 0
    for (let j = 0; j < data.length; j++) {
/*      console.log(临时数据[i].name)
      console.log(data[j].name)*/
      if (临时数据[i].name === data[j].name) {

        临时数据[i].value = data[j].value;
        break;
      }
    }
  }

  console.log(临时数据)

  let 图数据 = {
    title: {
      text: '在线用户分布图',
    },
    tooltip: {
      show: true,
    },
    // 数据和类型
    series: [{
      type: 'map',
      map: 'china',
      // 鼠标移入显示的内容
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{c}",
      },
      //悬浮显示信息,这里是是否常显省份名称
      label: {
        show: false,
        color: 'red',
        fontSize: 10
      },
      // 地图大小倍数
      zoom: 1.4,
      // 开启缩放
      roam: false,
      // 设置缩放的大小
      scaleLimit: {
        min: 1.2,
        max: 30,
      },
      top: 100,
      data: 临时数据
    }],
    visualMap: {
      min: 0,
      max: 1000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    }
  }
  图数据.title = is移动端() ? "" : 图数据.title

  chart.value.setOption(图数据)
}
const on读取图表数据 = async () => {
  is加载中.value = true
  let 返回;
  返回 = await Get在线用户Ip地图分布统计()
  is加载中.value = false
  console.log(返回.data)
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
