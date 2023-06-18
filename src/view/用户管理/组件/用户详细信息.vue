<template>
  <el-dialog v-model="is对话框可见2" :title="id===0?'添加新用户':'修改用户信息'" @open="on对话框被打开"
             :width="is移动端()?'90%':'760px'"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form :inline="Props.id>0" style="min-width: 80px" label-width="80px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item v-if="Props.id>0" label="Id" prop="Id" disabled="disabled">
          <el-input class="只读编辑框" v-if="Props.id>0" v-model="data.Id" placeholder="" readonly="readonly"/>
        </el-form-item>
        <el-form-item v-if="Props.id>0" label="状态" prop="Status">
          <el-switch
              :active-value="1"
              :inactive-value="2"
              v-model="data.Status"
              class="ml-2"
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="正常"
              inactive-text="冻结"
          />
        </el-form-item>

        <el-form-item label="用户名" prop="User">


          <el-input :class="[id>0?'只读编辑框':'']" v-model="data.User" :readonly="id>0"/>
        </el-form-item>
        <el-form-item label="密码" prop="PassWord">
          <el-input v-model="data.PassWord" :placeholder="Props.id===0?'请输入密码':'不修改留空忽略即可'"/>
        </el-form-item>
        <el-form-item label="手机号" prop="Phone">
          <el-input v-model="data.Phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="超级密码" prop="SuperPassWord">
          <el-input v-model="data.SuperPassWord" :placeholder="Props.id===0?'请输入超级密码':'不修改留空忽略即可'"/>
        </el-form-item>

        <el-form-item label="QQ" prop="Qq">
          <el-input v-model="data.Qq" placeholder="请输入联系QQ"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="data.Email" placeholder="请输入邮箱地址"/>
        </el-form-item>
        <el-form-item label="实名信息" prop="RealNameAttestation">
          <el-input v-model="data.RealNameAttestation" placeholder="请输入实名认证信息"/>
        </el-form-item>
        <el-form-item label="余额" prop="Rmb">
          <el-input-number v-model="data.Rmb" :precision="2" :step="0.1" :value-on-clear="0"/>
        </el-form-item>
      </el-form>
      <el-form style="min-width: 80px" label-width="80px" :rules="on表单校验" :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-form-item label="备注" prop="Note">
          <el-input v-model="data.Note" type="textarea" placeholder="请输入备注"
                    :style="'width:'+is移动端()?'':'350px'"/>
        </el-form-item>
        <el-form-item label="用户角色" prop="Role">
          <el-radio-group v-model="data.Role">
            <el-radio-button :label="0">普通用户</el-radio-button>
            <el-radio-button :label="1">1级代理</el-radio-button>
            <el-radio-button :label="2" v-if="Props.id>0">2级代理</el-radio-button>
            <el-radio-button :label="3" v-if="Props.id>0">3级代理</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <template v-if="Props.id>0 && data.Role>0" class="代理信息框">
          <el-form-item label="代理折扣" prop="AgentDiscount">
            <!--            <el-input v-model.number="data.AgentDiscount" placeholder="代理价($100)*折扣(5.0)=半价($50)"/>-->
            <el-input-number v-model="data.AgentDiscount" :precision="1" :step="0.1" :value-on-clear="0" :min="0"
                             :max="10"/>
          </el-form-item>
          <el-form-item label="上级代理Id" prop="UPAgentId">
            <el-input v-model.number="data.UPAgentId" placeholder="" style="width: 80px"/>
          </el-form-item>
        </template>

        <div v-if="Props.id>0 " class="展示不可修改信息">
          <ul>
            <li class="li展示不可修改信息">登录平台:
              <el-text type="info" size="large">{{ data.LoginAppName }}</el-text>
            </li>
            <li class="li展示不可修改信息">登录时间:
              <el-text type="info" size="large">{{
                  data.LoginTime === 0 ? '未登录过' : 时间_时间戳到时间(data.LoginTime)
                }}
              </el-text>
            </li>
            <li class="li展示不可修改信息">登录IP:
              <el-text type="info" size="large">{{ data.LoginIp }}</el-text>
            </li>
            <li class="li展示不可修改信息">注册IP:
              <el-text type="info" size="large">{{ data.RegisterIp }}</el-text>
            </li>
            <li class="li展示不可修改信息">注册时间:
              <el-text type="info" size="large">{{ 时间_时间戳到时间(data.RegisterTime) }}</el-text>
            </li>
          </ul>
        </div>
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
import {New用户信息, Save用户信息, Get用户详细信息} from "@/api/用户信息api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端, 时间_时间戳到时间} from "@/utils/utils";

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
const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭', is重新读取.value)

}


watch(() => Props.is对话框可见, (newVal, oldVal) => {
  if (newVal) {
    is对话框可见2.value = newVal;
    console.info("is对话框可见2被检测到改变了:")
  }
})

const formLabelWidth = '140px'
const is对话框可见2 = ref(false)
const data = ref({
  id: 0,
  Status: 1,
  "User": "",
  "Phone": "",
  "PassWord": "",
  "SuperPassWord": "",
  "Email": "",
  "Qq": "",
  "Rmb": 0.0,
  "Note": "",
  "Role": 0
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
  if (Props.id === 0) {
    返回 = await New用户信息(data.value);
  } else {
    返回 = await Save用户信息(data.value);
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

  if (Props.id === 0) {
    // 添加账号 验证密码
    on表单校验.value.User[0].required = true
    on表单校验.value.PassWord[0].required = true
    on表单校验.value.SuperPassWord[0].required = true
  } else {
    //修改账号不验证密码
    on表单校验.value.User[0].required = false
    on表单校验.value.PassWord[0].required = false
    on表单校验.value.SuperPassWord[0].required = false
  }

  if (!formEl) return
  formEl.resetFields()
}
onMounted(() => {
  console.info("用户详细信息对话框加载完毕了")
})


const on表单校验 = ref({
  User: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 4, message: '最低4位字符', trigger: ''}
  ],
  Phone: [
    {pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/, message: '请输入合法手机号', trigger: 'blur'},
  ],
  Email: [
    {
      pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
      message: '请输入正确的邮箱',
      trigger: 'blur'
    },
  ],
  SuperPassWord: [
    {required: true, message: '请输入用户密码', trigger: 'blur'},
    {min: 6, message: '最低6位字符', trigger: 'blur'}
  ],
  PassWord: [
    {required: true, message: '请输入用户密码', trigger: 'blur'},
    {min: 6, message: '最低6位字符', trigger: 'blur'}
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

    let 返回 = await Get用户详细信息({"Id": id})
    if (返回.code == 10000) {
      data.value = 返回.data
    } else {
      is重新读取.value = false
      is对话框可见2.value = false
    }
  } else {
    data.value = {
      "User": "",
      "Phone": "",
      "PassWord": "",
      "SuperPassWord": "",
      "Email": "",
      "Qq": "",
      "Rmb": 0.0,
      "Note": "",
      "Role": 0
    }
    // data.value = {
    //   "User": "test6",
    //   "Phone": "13109812593",
    //   "PassWord": "test4test4",
    //   "SuperPassWord": "test4test4",
    //   "Email": "1056795985@qq.com",
    //   "Qq": "1056795985",
    //   "Rmb": 81.69,
    //   "Note": "测试用户2号xxxxx111",
    //   "Role": 0
    // }

  }
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
