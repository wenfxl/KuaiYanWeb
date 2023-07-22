<template>
  <el-dialog v-model="is对话框可见2"
             :title="id===0?AppName+'('+Props.AppId+')'+'添加新用户:':AppName+'('+Props.AppId+')'+'修改用户信息'"
             @open="on对话框被打开"
             :width="is移动端()?'90%':'50%'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="false" style="min-width: 80px" label-width="130px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item label="用户id" prop="Uid" disabled="disabled">
          <el-input :class="[id>0?'只读编辑框':'']"  v-model.number="data.Uid" placeholder="" :readonly="id===0?false:true" />
        </el-form-item>
        <el-form-item  label="本软件状态" prop="Status">
          <el-switch
              :active-value="1"
              :inactive-value="2"
              v-model="data.Status"
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="正常"
              inactive-text="冻结"
          />
        </el-form-item>
        <el-form-item label="绑定信息" prop="Key">
          <el-input v-model="data.Key" placeholder="请输入绑定信息"/>
        </el-form-item>
        <!--        <el-form-item label="测试显示时间戳" prop="data.VipTime">-->
        <!--          <el-input v-model.number="data.VipTime"/>-->
        <!--        </el-form-item>-->
        <el-form-item :label="isAppType计点()?'剩余点数':'Vip到期时间'" prop="VipTime">

          <el-input-number v-if="isAppType计点()" v-model="data.VipTime" :precision="0" :step="1" :value-on-clear="0" :min="0"/>

          <template v-else>


            <el-tooltip
                class="box-item"
                effect="light"
                :content="'剩余:'+时间_计算天时分秒提示 (data.VipTime-时间_取现行时间戳())"
                placement="left"
            >
              <div>
                <el-config-provider :locale="zhCn">
                  <el-date-picker
                      v-model.number="data.VipTime"
                      type="datetime"
                      format="YYYY/MM/DD hh:mm:ss"
                      value-format="X"
                  />
                </el-config-provider>
                <el-button @click="data.VipTime=时间_取现行时间戳()" :style="is移动端()?'width: 5vh':'width: 4vh'">
                  此刻
                </el-button>
                <el-button @click="data.VipTime+=86400" :style="is移动端()?'width: 9vh':'width: 4vh'">+1天</el-button>
                <el-button @click="data.VipTime+=86400*3" :style="is移动端()?'width: 9vh':'width: 4vh'">+3</el-button>
                <el-button @click="data.VipTime+=86400*30" :style="is移动端()?'width: 9vh':'width: 4vh'">+30</el-button>
                <el-button @click="data.VipTime+=86400*365" :style="is移动端()?'width: 9vh':'width: 4vh'">+365</el-button>
              </div>
            </el-tooltip>
          </template>
        </el-form-item>
        <el-form-item label="积分" prop="VipNumber">
          <div >
            <el-input-number v-model="data.VipNumber" :precision="2" :step="0.1" :value-on-clear="0.00" :min="0"/>
            <el-button @click="data.VipNumber=0" :style="is移动端()?'width: 5vh':'width: 4vh'">
              {{ "清零" }}
            </el-button>
            <el-button @click="data.VipNumber+=10" :style="is移动端()?'width: 5vh':'width: 4vh'">
              {{ "+10" }}
            </el-button>
            <el-button @click="data.VipNumber+=100" :style="is移动端()?'width: 5vh':'width: 4vh'">
              {{ "+100" }}
            </el-button>
            <el-button @click="data.VipNumber+=500" :style="is移动端()?'width: 5vh':'width: 4vh'">
              {{ "+500" }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="Note">
          <el-input type="textarea" v-model="data.Note" placeholder="请输入备注"/>
        </el-form-item>
        <el-form-item label="最大同时在线数量" prop="MaxOnline">
          <el-input-number v-model.number="data.MaxOnline" :step="1" :value-on-clear="0" :min="1"/>
        </el-form-item>

        <el-form-item :label="'用户类型'+data.UserClassId" prop="UserClassId" style="width:280px">
          <el-select v-model="data.UserClassId" clear placeholder="全部">
<!--            <el-option key="0" label="未分类" :value="0"/>-->
            <el-option  v-for="(ver,key) in UserType" :key="key" :label="ver" :value="Number(key)"/>
          </el-select>
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
import {NewAppUser信息, SaveAppUser信息, GetAppUser详细信息} from "@/api/软件用户api";
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
  UserType: {
    type: Object,
    default: {"0":"未分类"}
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
  "AppId":Props.AppId,
  "Id": 1,
  "Uid": 1,
  "Status":1,
  "Key": "绑定的key",
  "VipTime": 1681213040,
  "VipNumber": 12.13,
  "Note": "用户备注",
  "MaxOnline": 1,
  "UserClassId": 0,
  "AppType": 1
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
    返回 = await NewAppUser信息(data.value);
  } else {
    返回 = await SaveAppUser信息(data.value);
  }
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
  Uid: [
    {type: 'number',message: '用户id(Uid)必须>0',trigger: "blur",min:1}
  ]
  // Phone: [
  //   {pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/, message: '请输入合法手机号', trigger: 'blur'},
  // ],
  // Email: [
  //   {
  //     pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
  //     message: '请输入正确的邮箱',
  //     trigger: 'blur'
  //   },
  // ],
})

const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开")
  on校验表单重置(ruleFormRef.value)
  读取详细信息(Props.id)
}
const 读取详细信息 = async (id: number) => {
  if (id > 0) {
    let 返回 = await GetAppUser详细信息({"AppId": Props.AppId, "Id": id})
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
    data.value = {
      "AppId":Props.AppId,
      "Id": 0,
      "Uid": 1,
      "Status":1,
      "Key": "绑定的key",
      "VipTime": isAppType计点()?100:时间_取现行时间戳(),
      "VipNumber": 0,
      "Note": "用户备注",
      "MaxOnline": 1,
      "UserClassId": 0,
      "AppType": Props.AppType
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

type UserInfo = {
  user: string;
  phone: string;
  passWord: string;
  SuperpassWord: string;
  email: string;
  qq: string;
  rmb: number;
  note: string;
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
