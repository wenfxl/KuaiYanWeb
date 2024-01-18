<template>
  <el-dialog v-model="is对话框可见2"
             :title="Props.id===0?'添加新定时任务:':'修改定时任务'"
             :width="is移动端()?'90%':'50%'"
             top="3%"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="false" style="min-width: 80px ;top: 10px" label-width="130px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item v-if="Props.id>0" label="Id" prop="Id" disabled="disabled">
          <el-input class="只读编辑框" v-if="Props.id>0" v-model="data.Id" placeholder="" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="定时任务名称" prop="Name">
          <el-input v-model.trim="data.Name"/>
        </el-form-item>
        <el-form-item label="状态" prop="Name">
          <el-switch
              :active-value="1"
              :inactive-value="2"
              v-model="data.Status"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              inline-prompt
              active-text="启用"
              inactive-text="停用"
          />
        </el-form-item>
        <el-form-item label="写执行日志"  >
          <el-switch
              :active-value="1"
              :inactive-value="2"
              v-model="data.IsLog"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              inline-prompt
              active-text="写出"
              inactive-text="忽略"
          />
        </el-form-item>
        <el-form-item label="cron表达式" prop="Cron">
          <el-input v-model.trim="data.Cron">
            <template #append>
                  <el-button type="primary" @click="showCron=!showCron" icon="DocumentCopy">打开cron表达式生成器
                  </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-dialog v-model="showCron" :width="is移动端()?'90%':'50%'" top="3%">
          <template #header >
            <el-text>实时生效</el-text>
          </template>
          <template #default>
            <EasyCron
                v-model:value="data.Cron"
                :exeStartTime="exeStartTime"
                :hideYear="hideYear"
                :remote="remote"
                :hideSecond="hideSecond"
            />
          </template>
        </el-dialog>


        <el-form-item label="任务类型">
          <el-radio-group v-model="data.Type">
            <el-radio-button :label="1" border>HTTP请求</el-radio-button>
            <el-radio-button :label="2" border>公共js函数</el-radio-button>
            <el-radio-button :label="3" border>SQL</el-radio-button>
            <!--            <el-radio-button :shell="4"  border>shell</el-radio-button>--> <!--安全问题,暂时禁用-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="执行内容" prop="RunText">
          <el-input v-model="data.RunText" type="textarea" :placeholder="执行内容占位符[data.Type]" :autosize="{ minRows: 2, maxRows: 10 }"/>
        </el-form-item>
        <el-form-item label="备注">
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
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";
import {Info, Create, Update} from "@/api/定时任务管理.js";
import EasyCron from '@/components/EasyCron/EasyCronInner.vue'
import {cronEmits, cronProps} from '@/components/EasyCron/easy.cron.data'
//============cron表达式=========================
const Props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String,
    default: '请输入cron表达式',
  },
  exeStartTime: {
    type: [Number, String, Object],
    default: 0,
  },
  ...cronProps,
})

const emit = defineEmits(['on对话框详细信息关闭', ...cronEmits])
const editCronValue = ref(Props.value)
const showCron = ref(false)
watch(
    () => Props.value,
    (newVal) => {
      if (newVal !== editCronValue.value) {
        editCronValue.value = newVal
      }
    },
)
watch(editCronValue, (newVal) => {
  emit('change', newVal)
  emit('update:value', newVal)
})
//============cron表达式=========================

const  执行内容占位符=ref(['','https://www.baidu.com','请填写全局公共函数如:测试网页访问(1)','DELETE FROM db_cron WHERE  RunTime<1700000000 \r\n支持变量 {{十位时间戳}}'])
//const emit = defineEmits(['on对话框详细信息关闭'])


const is对话框可见2 = ref(true)
const 初始数据 = {
  "Id": 0,
  "Name": "",
  "Status": 1,
  "Cron": "",
  "IsLog": 1,
  "Type": 1,
  "RunText": "",
  "Note": "",
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
  let 返回;

  if (Props.id == 0) {
    返回 = await Create(data.value);
  } else {
    data.value.Id = Props.id
    返回 = await Update(data.value);
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


const on表单校验 = ref({
  Name: [
    {required: true, message: '请输入名称', trigger: 'blur'},
    {min: 1, message: '最低1位字符', trigger: ''}
  ],
  RunText: [
    {max: 1000, message: '最长1000位字符', trigger: 'blur'}
  ],
})
const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")

  on校验表单重置(ruleFormRef.value)
  读取详细信息(Props.id)
}
const 读取详细信息 = async (id: number) => {
  if (id != 0) {
    let 返回 = await Info({"Id": id})

    if (返回.code == 10000) {
      data.value = 返回.data
    } else {
      is重新读取.value = false
      is对话框可见2.value = false
    }
  } else {
    data.value = 初始数据
  }
}


const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭', is重新读取.value)
}

onMounted(async () => {
  on对话框被打开()
})
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
