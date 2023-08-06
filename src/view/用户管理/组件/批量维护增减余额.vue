<template>
  <el-dialog v-model="is对话框可见2" title="批量增减余额"
             :width="is移动端()?'90%':'40%'"
             @close="on对话框被关闭"
             draggable
  >
    <div style="overflow:auto;padding:0 12px;">
      <el-form style="min-width: 80px" label-width="80px"  :model="data"
               :label-position="is移动端()?'top':'right'" >

        <el-form-item label="增减金额" prop="AppId">
          <el-input-number v-model="data.RMB" :step="1" placeholder="2" :value-on-clear="0"/>
        </el-form-item>
        <el-form-item label="原因" prop="AppName">
          <el-input v-model.trim="data.Note" placeholder="请输入维护原因"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="is对话框可见2=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击()">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {GetAppIdMax, Get全部用户APi, NewApp信息} from "@/api/应用列表api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";

const emit = defineEmits(['on批量维护增减余额输入框被关闭'])

const is对话框可见2 = ref(true)
const data = ref({"Id": [], "RMB": 0.01, "Note": ""})

const is重新读取 = ref(false)
const is确认被点击 = ref(false)
const on确定按钮被点击 =  () => {
  is确认被点击.value=true;
  is对话框可见2.value=false
}
const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  emit('on批量维护增减余额输入框被关闭', is确认被点击.value, data.value)
  is对话框可见2.value = false
}

</script>

<style scoped lang="scss">

.li展示不可修改信息 {
  font-size: 16px;
  margin-left: 10px;
  float: left;
  clear: right;
  width: 100%;
  height: 30px;
  word-wrap: break-word;
  word-break: normal;
}

</style>
