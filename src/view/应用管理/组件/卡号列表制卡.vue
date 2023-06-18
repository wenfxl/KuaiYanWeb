<template>
  <el-dialog v-model="is对话框可见2"
             :title="id===0?AppName+'('+Props.AppId+')'+'添加新卡类:':AppName+'('+Props.AppId+')'+'修改卡类信息'"
             @open="on对话框被打开"
             :width="is移动端()?'90%':'50%'"
             top="5%"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="false" style="min-width: 80px ;top: 10px" label-width="130px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">

        <el-form-item label="选择卡类" prop="Name">
          <el-select v-model="data.Id" clear placeholder="选择卡类">
            <el-option v-for="(值,index) in KaClass" :key="index" :label="KaClass[index]" :value="Number(index)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员备注" prop="AdminNote">
          <el-input
              v-model="data.AdminNote"
              placeholder="管理员备注可以备注准备用来做什么"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="制卡数量" prop="Number">
          <el-input-number v-model="data.Number" :precision="0" :step="1" :value-on-clear="1" :min="1" :max="100"/>
          <el-button @click="data.Number=1" :style="is移动端()?'width: 5vh':'width: 5vh'">
            归一
          </el-button>
          <el-button @click="data.Number+=10"
                     :style="is移动端()?'width: 9vh':'width: 4vh'">+10
          </el-button>
          <el-button @click="data.Number+=100"
                     :style="is移动端()?'width: 9vh':'width: 4vh'">+100
          </el-button>
          <el-button type="primary" @click="on开始制卡按钮被点击(ruleFormRef)"
                     style="width: 90px">开始制卡
          </el-button>
        </el-form-item>

        <el-form-item label="格式模板" prop="Prefix">
          <el-input
              v-model="格式模板"
              placeholder="格式模板"
          >
            <template #append>
              <el-button @click="格式化卡号内容">重新格式化</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="生成内容" prop="Prefix">
          <el-input  :autosize="{ minRows: 2, maxRows: 23 }" type="textarea" v-model="生成内容" placeholder="生成卡号内容"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="is对话框可见2=false">关闭</el-button>
        <el-button type="primary" @click="置剪辑版文本(生成内容, '已复制到剪辑版')">复 制</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {NewKa信息} from "@/api/卡号列表api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端, 时间_取现行时间戳, 时间_时间戳到时间, 时间_计算天时分秒提示, 置剪辑版文本} from "@/utils/utils";
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
  KaClass: {
    type: Object,
    default: {}
  },
})
const emit = defineEmits(['on对话框详细信息关闭'])
const 格式模板 = ref('卡号:{Name} 时间:{VipTime} 软件:{AppName}')

const 生成内容 = ref('')
const 生成卡号Data = ref([
  {
    "Id": 6,
    "Name": "T1TxwA5faMjDTHPVUraOi1D1T",
    "VipTime": 86400,
    "RMb": 5.55,
    "VipNumber": 10
  }
])


watch(() => Props.is对话框可见, (newVal, oldVal) => {
  if (newVal) {
    is对话框可见2.value = newVal;
    console.info("is对话框可见2被检测到改变了:")
  }
})

const is对话框可见2 = ref(false)
const data = ref({
  "Id": Number(Object.keys(Props.KaClass)[0]),
  "Number": 1,
  "AdminNote": ""
})
const ruleFormRef = ref<FormInstance>()
const is重新读取 = ref(false)

const on校验表单重置 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
onMounted(() => {
  console.info("用户详细信息对话框加载完毕了")
})

const on表单校验 = ref({})

const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  on校验表单重置(ruleFormRef.value)
  生成卡号Data.value = []
  生成内容.value = ""
  格式模板.value=isAppType计点()?'卡号:{Name} 点数:{VipTime} 软件:{AppName}':'卡号:{Name} 时间:{VipTime} 软件:{AppName}'
  data.value ={
    "Id": Number(Object.keys(Props.KaClass)[0]),
    "Number": 1,
    "AdminNote": ""
  }

}

const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭', is重新读取.value)

}

const on开始制卡按钮被点击 = async (formEl: FormInstance | undefined) => {

  console.info("on开始制卡按钮被点击")
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
  if (data.value.Id != 0) {
    返回 = await NewKa信息 (data.value);
  } else {
    ElMessage({
      type: "error",
      message: "卡类Id错误,如果没有卡类请先去卡类列表添加",
      showClose: true,
    })
    返回.code=7
    return
  }
  console.log(返回)
  if (返回.code == 10000) {
    生成卡号Data.value=返回.data
    格式化卡号内容()
    is重新读取.value = true
    ElMessage({
      type: "success",
      message: 返回.msg,
      showClose: true,
    })
  }
}
const 格式化卡号内容 = () => {
  let 最终内容=""
  let 临时文本=""
  for (var i=0; i<生成卡号Data.value.length ;i++ ){
    //ref('卡号:{Name} 时间:{VipTime} 软件:{AppName}')
    临时文本= 格式模板.value.replace('{Name}',生成卡号Data.value[i].Name)
    临时文本= 临时文本.replace('{VipTime}',isAppType计点()?生成卡号Data.value[i].VipTime.toString():时间_计算天时分秒提示(生成卡号Data.value[i].VipTime))
    临时文本= 临时文本.replace('{AppName}',Props.AppName)

    最终内容+=临时文本+"\n"

  }
  生成内容.value=最终内容
}
const isAppType计点 = () => {
  return Props.AppType === 2 || Props.AppType === 4
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
