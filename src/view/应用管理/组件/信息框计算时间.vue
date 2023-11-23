<template>
  <el-dialog v-model="is对话框可见2" title="计算时间" @open="on对话框被打开"
             :width="is移动端()?'90%':'40%'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">

    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="is对话框可见2=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击(ruleFormRef)">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'

import {ElMessage, FormInstance} from "element-plus";
import {is移动端, 时间_取现行时间戳} from "@/utils/utils";

const emit = defineEmits(['on对话框被关闭'])

const is对话框可见2 = ref(true)
const  Time =ref(时间_取现行时间戳())
const on确定按钮被点击 = async (formEl: FormInstance | undefined) => {

}

const on对话框被打开 = () => {

}

const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭')
}
</script>

<style scoped lang="scss">


</style>
