<template>
  <el-drawer v-model="is图表分析抽屉可见2" direction="ltr" @close="on抽屉被关闭" show-close  size="90%">
    <template #header>
<!--      <h4>set title by slot</h4>-->
    </template>
    <template #default>
      <div style="flex: auto;width: 100%">
        <el-row :gutter="20">
          <el-col :span="14" >
            <Echarts在线用户地图分布/>
          </el-col>
          <el-col :span="10">
            <Echarts在线统计/>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24" >
            <Echarts应用用户注册统计/>
          </el-col>
        </el-row>




      </div>
    </template>
    <template #footer>
      <div style="flex: auto">

      </div>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import Echarts在线统计 from '@/view/控制面板/组件/在线用户统计饼图.vue'
import Echarts应用用户注册统计 from '@/view/控制面板/组件/在线用户统计登录活动时间统计折线.vue'
import {onMounted, ref, watch} from "vue";
import Echarts在线用户地图分布 from '@/view/控制面板/组件/在线用户地图分布图.vue'

const Props = defineProps({
  is图表分析抽屉可见: {
    type: Boolean,
    default: false
  }
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
