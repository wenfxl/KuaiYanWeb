<template>
  <el-dialog v-model="is对话框可见2" :title="id===0?'添加新任务类型':'修改任务类型信息'" @open="on对话框被打开"
             :width="is移动端()?'90%':'760px'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="Props.id>0" style="min-width: 80px" label-width="150px"  :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item v-if="Props.id>0" label="Id" prop="Id" disabled="disabled" >
          <el-input class="只读编辑框" v-if="Props.id>0" v-model="data.Id" placeholder="" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="任务类型名称" prop="Name"  style="width: 90%">
          <el-input v-model.trim="data.Name" />
        </el-form-item>
        <el-form-item label="新任务MQTT通知" prop="MqttSendMsg"   style="width: 90%">
          <el-input v-model.trim="data.MqttSendMsg" placeholder="新任务使用mqtt向该主题发送通知,让处理端可以更快响应(可空,不发送通知)" />
        </el-form-item>
        <el-form-item label="Hook任务创建入库前" prop="Name"   style="width: 90%">
          <el-input v-model.trim="data.HookSubmitDataStart" placeholder="有需要直接填写公共函数名即可,不存在自动按模板创建,可空" />
        </el-form-item>
        <el-form-item label="Hook任务创建入库后" prop="Name"  style="width: 90%">
          <el-input v-model.trim="data.HookSubmitDataEnd" placeholder="有需要直接填写公共函数名即可,不存在自动按模板创建,可空" />
        </el-form-item>
        <el-form-item label="Hook任务执行入库前" prop="Name"  style="width: 90%">
          <el-input v-model.trim="data.HookReturnDataStart" placeholder="有需要直接填写公共函数名即可,不存在自动按模板创建,可空" />
        </el-form-item>
        <el-form-item label="Hook任务执行入库后" prop="Name"  style="width: 90%">
          <el-input v-model.trim="data.HookReturnDataEnd" placeholder="有需要直接填写公共函数名即可,不存在自动按模板创建,可空" />
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
import {GetTaskPool详细信息, SaveTaskPool信息, NewTaskPool信息} from "@/api/任务池api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";

const Props = defineProps({
  is对话框可见: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: 0
  },
})
const emit = defineEmits(['on对话框详细信息关闭'])


watch(() => Props.is对话框可见, (newVal, oldVal) => {
  if (newVal) {
    is对话框可见2.value = newVal;
    console.info("is对话框可见2被检测到改变了:")
  }
})

const is对话框可见2 = ref(false)
const data = ref({Id:0,Name:"",HookSubmitDataStart:"",HookSubmitDataEnd:"",HookReturnDataStart:"",HookReturnDataEnd:"",MqttSendMsg:""})
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
  if (Props.id === 0) {

    返回 = await NewTaskPool信息(data.value);
  } else {
    返回 = await SaveTaskPool信息(data.value);
  }
  console.log(返回)
  if (返回.code == 10000) {
    is重新读取.value = true
    is对话框可见2.value = false
ElMessage.success(返回.msg)
  }
}

const on校验表单重置 = (formEl: FormInstance | undefined) => {

  if (!formEl) return
  formEl.resetFields()
}
onMounted(() => {
  console.info("用户详细信息对话框加载完毕了")
})

const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  on校验表单重置(ruleFormRef.value)
  读取详细信息(Props.id)
}
const 读取详细信息 = async (id: number) => {
  if (id > 0) {

        let 返回 = await GetTaskPool详细信息({"Id": id})
    if (返回.code == 10000) {
      data.value = 返回.data
    } else {
      is重新读取.value = false
      is对话框可见2.value = false
    }
  } else {

    data.value = {
      "Id": 0,
      "Name": "",
      "HookSubmitDataStart": "",
      "HookSubmitDataEnd": "",
      "HookReturnDataStart": "",
      "HookReturnDataEnd": "",
      "MqttSendMsg": "",
    }
  }
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
