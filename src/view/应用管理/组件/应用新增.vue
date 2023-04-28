<template>
  <el-dialog v-model="is对话框可见2" title="添加新应用" @open="on对话框被打开"
             :width="is移动端()?'90%':'40%'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form style="min-width: 80px" label-width="80px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">

        <el-form-item label="AppId" prop="AppId">
          <el-input-number v-model="data.AppId"  :step="1" :value-on-clear="10001"/>
        </el-form-item>

        <el-form-item label="应用名称" prop="AppName">
          <el-input v-model="data.AppName" placeholder="请输入新应用名称"/>
        </el-form-item>

        <el-form-item label="应用类型" prop="AppType">

          <el-radio-group v-model="data.AppType"  :size="is移动端()?'small':''">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="账号密码登陆,会员时间到期不可登录"
                placement="bottom-start"
            >
              <el-radio-button :label="1" >账号限时</el-radio-button>
            </el-tooltip>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="账号密码登陆,点数为0,不可登录"
                placement="bottom"
            >
            <el-radio-button :label="2">账号计点</el-radio-button>
            </el-tooltip>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="卡号登陆,会员时间到期不可登录"
                placement="bottom"
            >
            <el-radio-button :label="3">卡号限时</el-radio-button>
            </el-tooltip>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="卡号登陆,点数为0,不可登录"
                placement="bottom-end"
            >
              <el-radio-button :label="4">卡号计点</el-radio-button>
            </el-tooltip>

          </el-radio-group>
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
import {GetAppIdMax, NewApp信息} from "@/api/应用列表api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";

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
const data = ref({"AppId":10001,"AppName":"测试应用","AppType":1})
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
  返回 = await NewApp信息(data.value);
  console.log(返回)
  if (返回.code == 0) {
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
  AppName: [
    {required: true, message: '请输入应用名称', trigger: 'blur'},
    {min: 4, message: '最低4位字符', trigger: ''}
  ],
  AppId:  [
    {required: true, message: '请输入AppId', trigger: 'blur'},
    {pattern:/\d{5,}$/, message: '最低5位数字', trigger: 'blur'}
  ]
})

const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  on校验表单重置(ruleFormRef.value)
  读取当前最大Appid()
}
const 读取当前最大Appid = async () => {
    let 返回 = await GetAppIdMax()
  console.info("读取当前最大Appid")
  console.info(返回)
    if (返回.code == 0) {
      console.info(返回.data.AppIdMax)
      data.value.AppId=返回.data.AppIdMax+1
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
