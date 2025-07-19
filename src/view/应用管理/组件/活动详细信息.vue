<template>
  <el-dialog v-model="is对话框可见2" :title="id===0?'添加活动':'修改活动信息id:'+id"
             :width="is移动端()?'90%':'760px'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="Props.id>0" style="min-width: 80px" label-width="150px"  :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item   label="应用名称"  disabled="disabled" >
          <text>{{Props.AppName}}</text>
        </el-form-item>
        <el-form-item label="名称" prop="Name"  style="width: 90%">
          <el-input v-model.trim="data.name" />
        </el-form-item>
        <el-form-item label="活动类型" prop="promotionType"  style="width: 90%">
          <el-radio-group
              v-model="data.promotionType"
              text-color="#626aef"
              fill="rgb(239, 240, 253)"
          >
            <el-radio-button v-if="id>0"   :label="Props.对象_活动类型[data.promotionType]"  :value="data.promotionType" />

            <el-radio-button v-else  v-for="(值,index) in Props.对象_活动类型" :label="值"  :value="Number(index)" />
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="status"     label="时间范围"  >
          <el-config-provider :locale="zhCn">
            <el-date-picker
                v-model="活动时间范围"
                value-format="X"
                type="datetimerange"
                unlink-panels
                range-separator="到"
                start-placeholder="活动开始日期"
                end-placeholder="活动结束日期"
            />
          </el-config-provider>
        </el-form-item>
        <el-form-item  v-if="id>0"  label="类型关联id" prop="Name"  style="width: 90%">
          <el-input  disabled class="只读编辑框" v-model.trim="data.typeAssociatedId" />
        </el-form-item>

      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="on对话框被关闭">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击(ruleFormRef)">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {ElMessage, FormInstance} from "element-plus";
import {is移动端} from "@/utils/utils";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import {活动列表api} from "@/api/活动列表api";
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
  对象_活动类型: {
    type: Object,
    default: {}
  },
})
const emit = defineEmits(['on对话框详细信息关闭'])

const is对话框可见2 = ref(true)

type list_item = {
  id: number,
  name: string,
  appId: number,
  createTime: number,
  updateTime: number,
  startTime: number,
  endTime: number,
  promotionType: number,
  typeAssociatedId: number,
  sort: number
}
const 活动时间范围= ref(["", ""])

const data = ref<list_item>({
    id: 0,
    name: '',
    appId: Props.AppId,
    createTime: 0,
    updateTime: 0,
    startTime: 0,
    endTime: 0,
    promotionType: 1,
    typeAssociatedId: 0,
    sort: 0
})
const ruleFormRef = ref<FormInstance>()
const is重新读取 = ref(false)
const on确定按钮被点击 = async (formEl: FormInstance | undefined) => {

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

  data.value.startTime = Number(活动时间范围.value[0])
  data.value.endTime = Number(活动时间范围.value[1])

  if (Props.id === 0) {
    返回 = await 活动列表api.create(data.value);
  } else {
    返回 = await 活动列表api.update(data.value);
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
  on校验表单重置(ruleFormRef.value)
  console.info("用户详细信息对话框加载完毕了")
  读取详细信息(Props.id)
})


const 读取详细信息 = async (id: number) => {
  if (id > 0) {
    let 返回 = await 活动列表api.info({"id": id})
    if (返回.code == 10000) {
      data.value = 返回.data
      活动时间范围.value[0]=String(data.value.startTime)
      活动时间范围.value[1]=String(data.value.endTime)
    } else {
      is重新读取.value = false
      is对话框可见2.value = false
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
