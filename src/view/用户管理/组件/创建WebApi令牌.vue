<template>
  <el-dialog v-model="is对话框可见_创建令牌2"
             title="创建新WebApi令牌,用户名就是Token"
             @open="on对话框被打开"
             :width="is移动端()?'90%':'50%'"
             top="5%"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="false" style="min-width: 80px ;top: 10px" label-width="130px" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item v-show="data.User" label="User" prop="User">
          <el-input v-model="data.User" placeholder="" class="只读编辑框" readonly/>
        </el-form-item>
        <el-form-item label="动态标记" prop="Name">
          <el-input v-model.trim="data.Tab" placeholder="请输入动态标记,可以当做备注"/>
        </el-form-item>
        <el-form-item label="绑定接口" prop="Captcha">
          <el-select
              v-model="数组_已选择WebApi接口"
              multiple
              placeholder="选择本Token可以调用的接口"
              style="width: 100%"
              @change="on验证码多选发生变化"
          >
            <el-option
                v-for="item in 数组_WebApi"
                :key="item[0]"
                :label="item[1]+'('+item[0]+')'"
                :value="item[0]"
            />
          </el-select>
        </el-form-item>
      </el-form>

    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="is对话框可见_创建令牌2=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击(ruleFormRef)">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";
import {NewWebApiToken} from "@/api/在线用户api";
import {Get全部WebAPi} from "@/api/应用列表api";

const Props = defineProps({
  is对话框可见_创建令牌: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['on对话框详细信息关闭'])
const 数组_WebApi = ref([])
const 数组_已选择WebApi接口 = ref(["未定义"])
const on读取WebApi数组 = async () => {
  console.log(数组_WebApi.value.length)
  数组_已选择WebApi接口.value = []
  if (数组_WebApi.value.length === 0) {
    const res = await Get全部WebAPi()
    if (res.code == 10000) {
      数组_WebApi.value = res.data
    }
  }
  console.log(数组_WebApi.value)
  return
}
const on验证码多选发生变化 = () => {
  console.info(数组_已选择WebApi接口.value)
}

watch(() => Props.is对话框可见_创建令牌, (newVal, oldVal) => {
  if (newVal) {
    is对话框可见_创建令牌2.value = newVal;
    console.info("is对话框可见_创建令牌2被检测到改变了:")
  }
})

const is对话框可见_创建令牌2 = ref(false)
const 初始数据 = {
  "OutTime": 315360000,
  "Key": "",
  "Tab": "",
  "User": "",
}
const data = ref(初始数据)
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
  data.value.Key=""
  for (let i = 0; i < 数组_已选择WebApi接口.value.length; i++) {
    for(let item in 数组_WebApi.value){

      console.log(数组_WebApi.value[item])
      console.log(数组_已选择WebApi接口.value[i])
      if(数组_WebApi.value[item][0]===数组_已选择WebApi接口.value[i]){
        data.value.Key+=数组_WebApi.value[item][1]+'('+数组_WebApi.value[item][0]+'),'
        break;
      }
    }
  }
  console.log(data.value.Key)
  let 返回;
  返回 = await NewWebApiToken(data.value);

  console.log(返回)

  if (返回.code == 10000) {
    is重新读取.value = true
    is对话框可见_创建令牌2.value = false
ElMessage.success(返回.msg)
  }
}

const on校验表单重置 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  console.info("用户详细信息对话框加载完毕了")
  data.value = 初始数据
  数组_已选择WebApi接口.value = []
  on读取WebApi数组()
})

const on对话框被打开 = () => {
  is重新读取.value = false
}

const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见_创建令牌2.value = false
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
