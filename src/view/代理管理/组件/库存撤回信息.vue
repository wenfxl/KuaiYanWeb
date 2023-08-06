<template>
  <el-dialog v-model="is对话框可见2" :title="'撤销库存Id:'+Props.Id" @open="on对话框被打开"
             :width="is移动端()?'90%':'40%'"
             @close="on对话框被关闭" >
    <div style="overflow:auto;padding:0 12px;" v-loading="Is加载中">
      <el-form style="min-width: 80px" label-width="80px"  :model="data"
               :label-position="is移动端()?'top':'right'" >
        <el-form-item label="撤回数量" prop="Num">
          <el-input-number v-model="data.Num" :step="1"  :value-on-clear="Props.Num剩余" min="1"  :max="Props.Num剩余"/>
          <el-button @click="data.Num=1" :style="is移动端()?'width: 9vh':'width: 4vh'">归一</el-button>
          <el-button @click="data.Num=Props.Num剩余" :style="is移动端()?'width: 9vh':'width: 4vh'">{{Props.Num剩余}}</el-button>
        </el-form-item>

        <el-form-item label="原因" prop="AppName">
          <el-input v-model.trim="data.Note" placeholder="请输入撤回原因"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer" v-loading="Is加载中">
        <el-button @click="is对话框可见2=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {GetAppIdMax, Get全部用户APi, NewApp信息} from "@/api/应用列表api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";
import {C撤回库存} from "@/api/代理库存管理api";

const Props = defineProps({
  Id: {
    type: Number,
    default: 0
  },
  Num剩余: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits(['on对话框详细信息关闭'])

const is对话框可见2 = ref(true)
const Is加载中 = ref(false)
const data = ref({"ID": 0,"Num": 0, "Note": ""})
const is重新读取 = ref(false)
const on确定按钮被点击 = async (formEl: FormInstance | undefined) => {
  let 返回;
  Is加载中.value=true
  data.value.ID=Props.Id
  返回 = await C撤回库存(data.value);
  Is加载中.value=false
  console.log(返回)
  if (返回.code == 10000) {
    is重新读取.value = true
    is对话框可见2.value = false
    ElMessage({
      type: "success",
      message: 返回.msg,
      showClose: true,
    })
  }
}

const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  data.value.Num=Props.Num剩余
}


const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭', is重新读取.value)

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
