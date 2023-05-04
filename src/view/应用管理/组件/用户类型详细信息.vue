<template>
  <el-dialog v-model="is对话框可见2"
             :title="id===0?AppName+'('+Props.AppId+')'+'添加新用户类型:':AppName+'('+Props.AppId+')'+'修改用户类型'"
             @open="on对话框被打开"
             :width="is移动端()?'90%':'50%'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="false" style="min-width: 80px" label-width="130px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item label="ID" prop="ID" disabled="disabled">
          <el-input v-model.number="data.Id" placeholder="" readonly="readonly" />
        </el-form-item>
        <el-form-item label="用户类型名称" prop="Name">
          <el-input v-model="data.Name" placeholder="用户类型名称"/>
        </el-form-item>
        <el-form-item label="整数代号" prop="Mark" disabled="disabled">
          <el-input-number v-model="data.Mark" :step="1" :value-on-clear="1" :min="1"/>
        </el-form-item>
        <el-form-item label="权重" prop="Weight">
          <el-tooltip
              content="充卡用户类型不同切换用户类型使用,剩余时间(点数)*旧类型权重/新类型权重=新剩余时间(点数),建议直接填对应卡的用户售价,方便计算,未分类=1"
              placement="bottom-start">
            <el-input-number v-model="data.Weight" :step="1" :value-on-clear="0" :min="1"/>
          </el-tooltip>

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
import {NewUserClass信息, SaveUserClass信息, GetUserClass详细信息} from "@/api/用户类型api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端, 时间_取现行时间戳, 时间_时间戳到时间, 时间_计算天时分秒提示} from "@/utils/utils";
// 引入中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const Props = defineProps({
  is对话框可见: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: 0
  },
  AppId: {
    type: Number,
    default: 0
  },
  AppName: {
    type: String,
    default: ""
  },
  AppType: {
    type: Number,
    default: 1
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
const data = ref({
  "Id": 1,
  "AppId": 10001,
  "Name": "测试用户类型",
  "Mark": 1,
  "Weight": 1
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
  data.value.AppId=Props.AppId
  if (Props.id === 0) {
    返回 = await NewUserClass信息(data.value);
  } else {
    返回 = await SaveUserClass信息(data.value);
  }
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
  Name: [
    {required: true, message: '请输入用户类型名称', trigger: 'blur'},
    {min: 1, message: '最低1位字符', trigger: ''}
  ],
  Weight: [
    {required: true, message: '请输入权重', trigger: 'blur'},
    {type: 'number',message: '请输入权重,切换分组使用,剩余时间(点数)*旧分组权重/新分组权重=新剩余时间(点数)',trigger: "blur",min:1},
  ],
  Mark: [
    {required: true, message: '请输入整数代号', trigger: 'blur'},
    {type: 'number',message: '代号必须大于0',trigger: "blur",min:1},
  ]


})
const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  on校验表单重置(ruleFormRef.value)
  读取详细信息(Props.id)
}
const 读取详细信息 = async (id: number) => {
  if (id > 0) {
    let 返回 = await GetUserClass详细信息({ "Id": id})
    if (返回.code == 0) {
      data.value = 返回.data
      // if (data.value.VipTime.toString().length===10){
      //   data.value.VipTime=data.value.VipTime*1000   //日期时间选择器是13位时间戳所以得处理一下
      // }
    } else {
      is重新读取.value = false
      is对话框可见2.value = false
    }
  } else {
    data.value = {
      "Id": 0,
      "AppId": Props.AppId,
      "Name": "",
      "Mark": 1,
      "Weight": 1
    }
  }
}


const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭', is重新读取.value)

}

const isAppType计点 = () => {
  return Props.AppType === 2 || Props.AppType  === 4
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
