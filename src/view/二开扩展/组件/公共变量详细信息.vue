<template>
  <el-dialog v-model="is对话框可见2"
             :title="Props.id===''?'添加新公共变量:':'修改公共变量'"
             @open="on对话框被打开"
             :width="is移动端()?'90%':'50%'"
             top="5%"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="false" style="min-width: 80px ;top: 10px" label-width="130px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">

        <el-form-item label="变量名称" prop="Name">
          <el-input v-model="data.Name" placeholder="请输入变量名称" :class="[Props.id!==''?'只读编辑框':'']"
                    :readonly="Props.id!==''"/>
        </el-form-item>

        <el-form-item label="变量类型" prop="Status">
          <el-radio-group v-model="data.Type" :size="is移动端()?'small':''">
            <el-radio-button v-if="Props.id===''|| data.Type===1" :label="1">单行文本</el-radio-button>
            <el-radio-button v-if="Props.id===''|| data.Type===2" :label="2">多行文本</el-radio-button>
            <el-radio-button v-if="Props.id===''|| data.Type===3" :label="3">逻辑开关</el-radio-button>
            <el-tooltip
                content="简单队列模型以换行(\n)为分隔符,置公共变量为添加到后面含(\n)会被判断为多条数据,取公共变量为获取第一行变量,并删除该行,"
                placement="top">
              <el-radio-button v-if="Props.id===''|| data.Type===4" :label="4">队列</el-radio-button>
            </el-tooltip>

          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="data.Type===1" label="变量值" prop="Value">
          <el-input type="text" v-model="data.Value"/>
        </el-form-item>
        <el-form-item v-else-if="data.Type===3" label="变量值" prop="Value">
          <el-radio-group v-model="data.Value">
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-else  label="变量值" prop="Value">
          <el-input type="textarea" v-model="data.Value" :autosize="{ minRows: 2, maxRows: 23 }"/>
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
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";
import {GetInfo, New, SaveInfo} from "@/api/公共变量api";

const Props = defineProps({
  is对话框可见: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: 0
  },
  AppId: {
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
const 公共变量初始数据 = {
  "AppId": 1,
  "Name": "",
  "Value": "",
  "Type": 1,
  "IsVip": 1
}
const data = ref(公共变量初始数据)
const ruleFormRef = ref<FormInstance>()
const is重新读取 = ref(false)
const is加载中 = ref(false)
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
  data.value.AppId = Props.AppId

  if (Props.id == "") {
    返回 = await New(data.value);
  } else {
    返回 = await SaveInfo(data.value);
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


const on表单校验 = ref({
  Name: [
    {required: true, message: '请输入变量名称', trigger: 'blur'},
    {min: 1, message: '最低1位字符', trigger: ''}
  ],
  Value: [
    {max: 20000, message: '最长20000位字符', trigger: 'blur'}
  ],
})
const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  console.info(Props.AppId)

  on校验表单重置(ruleFormRef.value)
  读取详细信息(Props.id)
}
const 读取详细信息 = async (id: String) => {
  if (id != "") {
    let 返回 = await GetInfo({"AppId": Props.AppId, "Name": id})

    if (返回.code == 10000) {
      data.value = 返回.data
      // if (data.value.VipTime.toString().length===10){
      //   data.value.VipTime=data.value.VipTime*1000   //日期时间选择器是13位时间戳所以得处理一下
      // }
    } else {
      is重新读取.value = false
      is对话框可见2.value = false
    }
  } else {
    data.value = 公共变量初始数据
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
