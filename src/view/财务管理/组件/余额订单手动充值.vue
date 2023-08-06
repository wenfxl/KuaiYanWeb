<template>
  <el-dialog v-model="is对话框可见2" title="手动充值" @open="on对话框被打开"
             :width="is移动端()?'90%':'50%'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form style="min-width: 80px" label-width="80px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">

        <el-form-item label="用户名" prop="User">
          <el-input v-model.trim="data.User" placeholder="请输入用户名"/>
        </el-form-item>

        <el-form-item label="增减金额" prop="Rmb">
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="金额整数转中文(data.RMB)"
              placement="top-start"
          >
            <div >
              <el-input-number v-model="data.RMB" :step="1" :precision="2" :value-on-clear="0" :max="10000000" :min="-10000000"/>
              <el-button @click="data.RMB=0" :style="is移动端()?'width: 5vh':'width: 4vh'">
                {{ "清零" }}
              </el-button>
              <el-button @click="data.RMB+=100" :style="is移动端()?'width: 5vh':'width: 4vh'">
                {{ "+100" }}
              </el-button>
              <el-button @click="data.RMB+=1000" :style="is移动端()?'width: 5vh':'width: 4vh'">
                {{ "+1000" }}
              </el-button>
              <el-button @click="data.RMB+=5000" :style="is移动端()?'width: 5vh':'width: 4vh'">
                {{ "+5000" }}
              </el-button>
              <el-button @click="data.RMB+=10000" :style="is移动端()?'width: 5vh':'width: 4vh'">
                {{ "+1W" }}
              </el-button>
              <el-button @click="data.RMB=-data.RMB" :style="is移动端()?'width: 5vh':'width: 4vh'">
                {{ "负数" }}
              </el-button>
            </div>
          </el-tooltip>

        </el-form-item>
        <el-form-item label="备注" prop="Note">
          <el-input v-model="data.Note" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
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
import {onMounted, ref, watch} from 'vue'
import {NewRMBPayOrder} from "@/api/余额充值订单api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端, 金额整数转中文} from "@/utils/utils";

const Props = defineProps({
  is对话框可见: {
    type: Boolean,
    default: false
  },
  AppId: {
    type: Number,
    default: 10001
  },
})

const emit = defineEmits(['on对话框详细信息关闭'])
watch(() => Props.is对话框可见, (newVal, oldVal) => {
  if (newVal) {
    is对话框可见2.value = newVal;
    console.info("is对话框可见2被检测到改变了:")
  }
})

const formLabelWidth = '140px'
const is对话框可见2 = ref(false)
const data = ref({
  "User": "",
  "RMB": 0,
  "Note": ""
})
const ruleFormRef = ref<FormInstance>()
const is重新读取 = ref(false)
const on确定按钮被点击 = async (formEl: FormInstance | undefined) => {
  console.info("on确定按钮被点击")
  console.info(data.value)
  if (!formEl) return
  let 表单验证结果 = await formEl.validate((valid, fields) => {
    if (!valid) {
      console.log('参数验证失败', fields)
    } else {
      console.log('参数验证通过')
    }
  })
  console.info("表单验证结果")
  console.info(表单验证结果)
  if (!表单验证结果) return   //如果是假直接返回
  let 返回;
  返回 = await NewRMBPayOrder(data.value);
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

const on校验表单重置 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  console.info("用户详细信息对话框加载完毕了")
})


const on表单校验 = ref({
  User: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
})

const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  on校验表单重置(ruleFormRef.value)
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
