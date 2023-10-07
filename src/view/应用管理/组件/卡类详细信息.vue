<template>
  <el-dialog v-model="is对话框可见2"
             :title="id===0?AppName+'('+Props.AppId+')'+'添加新卡类:':AppName+'('+Props.AppId+')'+'修改卡类信息'"
             @open="on对话框被打开"
             :width="is移动端()?'90%':'50%'"
             top="1%"
             @close="on对话框被关闭">

    <div style="overflow:auto;padding:0 12px;" v-loading="is加载中">
      <el-form :inline="false" style="min-width: 80px ;top: 10px" label-width="130px"  :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">

        <el-form-item label="卡类名称" prop="Name">
          <el-input v-model.trim="data.Name" placeholder="请输入卡类名称"/>
        </el-form-item>
        <el-form-item label="卡类备注" prop="Note">
          <el-input v-model.trim="data.Note" placeholder="请输入卡类备注,仅管理员可见"/>
        </el-form-item>
        <el-form-item label="卡前缀" prop="Prefix">
          <el-input v-model.trim="data.Prefix" placeholder="请输入前缀"/>
        </el-form-item>

        <el-form-item :label="isAppType计点()?'加点数':'加秒数'" prop="VipTime">

          <el-tooltip
              class="box-item"
              effect="light"
              :content="时间_计算天时分秒提示 (data.VipTime)"
              placement="left"
              :disabled="isAppType计点()"
          >
            <div style="display: flex; align-items: center">
              <el-input-number v-model="data.VipTime" :precision="0" :step="1" :value-on-clear="0" :min="0"/>
              <el-button @click="data.VipTime=0" :style="is移动端()?'width: 5vh':'width: 5vh'">
                清零
              </el-button>
              <el-button @click="data.VipTime+=isAppType计点()?10:86400" :style="is移动端()?'width: 9vh':'width: 4vh'">
                {{ isAppType计点() ? '+10' : '+1天' }}
              </el-button>
              <el-button @click="data.VipTime+=isAppType计点()?100:86400*3"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ isAppType计点() ? '+100' : '+3' }}
              </el-button>
              <el-button @click="data.VipTime+=isAppType计点()?1000:86400*30"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ isAppType计点() ? '+1000' : '+30' }}
              </el-button>
              <el-button @click="data.VipTime+=isAppType计点()?10000:86400*365"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ isAppType计点() ? '+10000' : '+365' }}
              </el-button>
            </div>
          </el-tooltip>

        </el-form-item>
        <el-form-item :label="isAppType计点()?'推荐人加点数':'推荐人加秒数'" prop="VipTime"  v-if="AppType<=2">
          <el-tooltip
              class="box-item"
              effect="light"
              :content="时间_计算天时分秒提示 (data.InviteCount)+'*本用户类型权重/为推广人权重'"
              placement="left"
              :disabled="isAppType计点()"
          >
            <div style="display: flex; align-items: center">
              <el-input-number v-model="data.InviteCount" :precision="0" :step="1" :value-on-clear="0" :min="0"/>
              <el-button @click="data.InviteCount=0" :style="is移动端()?'width: 5vh':'width: 5vh'">
                清零
              </el-button>
              <el-button @click="data.InviteCount+=isAppType计点()?10:86400"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ isAppType计点() ? '+10' : '+1天' }}
              </el-button>
              <el-button @click="data.InviteCount+=isAppType计点()?100:86400*3"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ isAppType计点() ? '+100' : '+3' }}
              </el-button>
              <el-button @click="data.InviteCount+=isAppType计点()?1000:86400*30"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ isAppType计点() ? '+1000' : '+30' }}
              </el-button>
              <el-button @click="data.InviteCount+=isAppType计点()?10000:86400*365"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ isAppType计点() ? '+10000' : '+365' }}
              </el-button>
            </div>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="余额" prop="RMb"   v-if="AppType<=2">

          <div style="display: flex; align-items: center">
            <el-input-number v-model="data.RMb" :precision="2" :step="1" :value-on-clear="0.00" :min="0"/>
            <el-button @click="data.RMb=0" :style="is移动端()?'width: 5vh':'width: 5vh'">
              清零
            </el-button>
            <el-button @click="data.RMb+=10"
                       :style="is移动端()?'width: 9vh':'width: 4vh'">{{ '+10' }}
            </el-button>
            <el-button @click="data.RMb+=isAppType计点()?100:86400*3"
                       :style="is移动端()?'width: 9vh':'width: 4vh'">{{'+100' }}
            </el-button>
            <el-button @click="data.RMb+=1000"
                       :style="is移动端()?'width: 9vh':'width: 4vh'">{{ '+1000' }}
            </el-button>
            <el-button @click="data.RMb+=10000"
                       :style="is移动端()?'width: 9vh':'width: 4vh'">{{ '+10000'  }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="积分" prop="VipNumber">
          <el-tooltip
              class="box-item"
              effect="light"
              content="余额和积分的区别,余额所有这个用户登录的应用都可以使用,积分只有这个用户登录的这个应用可以使用"
              placement="left"
          >
            <div style="display: flex; align-items: center">
              <el-input-number v-model="data.VipNumber" :precision="2" :step="1" :value-on-clear="0.00" :min="0"/>
              <el-button @click="data.VipNumber=0" :style="is移动端()?'width: 5vh':'width: 5vh'">
                清零
              </el-button>
              <el-button @click="data.VipNumber+=10"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ '+10' }}
              </el-button>
              <el-button @click="data.VipNumber+=isAppType计点()?100:86400*3"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{'+100' }}
              </el-button>
              <el-button @click="data.VipNumber+=1000"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ '+1000' }}
              </el-button>
              <el-button @click="data.VipNumber+=10000"
                         :style="is移动端()?'width: 9vh':'width: 4vh'">{{ '+10000'  }}
              </el-button>
            </div>
          </el-tooltip>

        </el-form-item>
        <el-form-item label="用户售价" prop="Money">
          <el-tooltip
              class="box-item"
              effect="light"
              content="-1 禁止用户购买"
              placement="left"
          >
            <div style="display: flex; align-items: center">
              <el-input-number v-model="data.Money" :precision="2" :step="1" :value-on-clear="0.00" :min="-1"/>
            </div>
          </el-tooltip>

        </el-form-item>
        <el-form-item label="代理售价" prop="AgentMoney">
          <el-tooltip
              class="box-item"
              effect="light"
              content="-1 禁止代理购买"
              placement="left"
          >
            <div style="display: flex; align-items: center">
              <div style="display: flex; align-items: center">
                <el-input-number v-model="data.AgentMoney" :precision="2" :step="1" :value-on-clear="0.00" :min="-1"/>
                <el-button @click="data.AgentMoney=data.Money"
                           :style=" 'margin-left: 10px;'+is移动端()?'width: 10vh':'width: 10vh'">
                  同用户售价
                </el-button>
              </div>
            </div>
          </el-tooltip>

        </el-form-item>
        <el-form-item label="用户类型" prop="UserClassId" style="width:280px">
          <el-select v-model="data.UserClassId" clear placeholder="全部">
            <el-option v-for="(ver,key) in UserType" :key="key" :label="ver" :value="Number(key)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="类型不同处理方式" prop="NoUserClass"  >
          <el-radio-group v-model="data.NoUserClass">
            <el-radio-button :label="1">自动根据权重转换分组</el-radio-button>
            <el-radio-button :label="2">禁止充值</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="卡号长度" prop="KaLength">
          <el-input-number v-model="data.KaLength" :step="1" :value-on-clear="0" :min="10"/>
        </el-form-item>
        <el-form-item label="卡内容字符集" prop="KaLength">
            <el-select v-model="data.KaStringType" placeholder="大小写字母+数字" style="width: 190px;">
              <el-option label="大小写字母+数字" :value="1"/>
              <el-option label="大写字母+数字" :value="2"/>
              <el-option label="小写字母+数字" :value="3"/>
            </el-select>
        </el-form-item>
        <el-form-item label="可用次数" prop="Num" v-if="AppType<=2">
          <el-input-number v-model="data.Num" :step="1" :value-on-clear="1" :min="1"/>
        </el-form-item>
        <el-form-item label="充值方式" prop="KaType"  v-if="AppType<=2">
          <el-radio-group v-model="data.KaType">
            <el-radio-button :label="1">有次数即可</el-radio-button>
            <el-radio-button :label="2">每用户一次</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最大在线数" prop="MaxOnline">
          <el-input-number v-model="data.MaxOnline" :step="1" :value-on-clear="1" :min="1"/>
        </el-form-item>


      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer"  v-loading="is加载中">
        <el-button :disabled="Props.id===0" @click="on确定按钮被点击(ruleFormRef,true)">添加为新卡类</el-button>
        <el-button @click="is对话框可见2=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击(ruleFormRef)">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {NewKaClass信息, SaveKaClass信息, GetKaClass详细信息} from "@/api/卡类列表api";
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
    default: {"0": "未分类"}
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
  "Id": 0,
  "AppId": Props.AppId,
  "Name": "天卡",
  "Note": "",
  "Prefix": "T1",
  "VipTime": 86400,
  "InviteCount": 3600,
  "RMb": 5.55,
  "VipNumber": 10,
  "Money": 3.02,
  "AgentMoney": 3,
  "UserClassId": 1,
  "NoUserClass": 1,
  "KaLength": 25,
  "KaStringType": 1,
  "Num": 1,
  "KaType": 1,
  "MaxOnline":1
})
const ruleFormRef = ref<FormInstance>()
const is重新读取 = ref(false)
const is加载中 = ref(false)
const on确定按钮被点击 = async (formEl: FormInstance | undefined,添加为新卡类:boolean) => {

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
  is加载中.value=true
  if (Props.id === 0 || 添加为新卡类) {
    data.value.Id=0
    返回 = await NewKaClass信息(data.value);
  } else {
    返回 = await SaveKaClass信息(data.value);
  }
  is加载中.value=false
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
  Name: [
    {required: true, message: '请输入卡类名称', trigger: 'blur'},
    {min: 1, message: '最低1位字符', trigger: ''}
  ],
  Prefix: [
    {
      pattern: /^[A-Za-z0-9]+$/,
      message: '只能输入英文字母和数字',
      trigger: 'blur'
    }
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
    let 返回 = await GetKaClass详细信息({"AppId": Props.AppId, "Id": id})
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
      "Id": 0,
      "AppId": Props.AppId,
      "Name": "",
      "Prefix": "",
      "VipTime": 0,
      "InviteCount": 0,
      "RMb": 0,
      "VipNumber": 0,
      "Money": 0,
      "AgentMoney": 0,
      "UserClassId": 0,
      "NoUserClass": 1,
      "KaLength": 25,
      "KaStringType": 1,
      "Num": 1,
      "KaType": 1,
      "MaxOnline":1
    }
  }
}


const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭', is重新读取.value)

}

const isAppType计点 = () => {
  return Props.AppType === 2 || Props.AppType === 4
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
