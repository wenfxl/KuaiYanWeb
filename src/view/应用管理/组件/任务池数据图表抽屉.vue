<template>
  <el-drawer v-model="is图表分析抽屉可见2" direction="ltr" @close="on抽屉被关闭" show-close  size="90%">
    <template #header>
<!--      <h4>set title by slot</h4>-->
    </template>
    <template #default>
      <div style="flex: auto;width: 100%">
        <Echarts任务池任务Id分析柱状图 :Tid="Props.Tid"/>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">

      </div>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import Echarts任务池任务Id分析柱状图 from '@/view/控制面板/组件/任务池任务Id分析柱状图.vue'

import {onMounted, ref, watch} from "vue";

const Props = defineProps({
  Tid: {
    type: Number,
    default: 0
  },
})
const emit = defineEmits(['on图表分析抽屉关闭'])

const is图表分析抽屉可见2 = ref(true)
onMounted(() => {
  console.info("图表分析加载完毕了")
})
const on抽屉被关闭 = () => {
  console.info("on对话框被关闭")
  is图表分析抽屉可见2.value = false
  emit('on图表分析抽屉关闭', false)

}

</script>

<style scoped css="scss">

</style>
