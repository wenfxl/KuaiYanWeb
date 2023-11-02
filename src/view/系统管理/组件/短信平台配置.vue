<template>
  <div class="最底层div">
    <el-form v-loading="is加载中" :inline="false" style="min-width: 80px" label-width="130px" :model="Data"
             :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
      <div class="内容div" style="order:3;">
        <el-form-item label="当前选择" disabled="disabled">
          <el-select v-model="Data.当前选择" class="m-2" placeholder="Select" size="">
            <el-option label="腾讯云短信(SMS)" :value="1"/>
            <el-option label="短信宝" :value="2"/>
          </el-select>
        </el-form-item>
      </div>
      <div class="内容div" v-if="Data.当前选择===1" >
        <el-divider content-position="left">腾讯云短信(SMS)</el-divider>
        <el-form-item label="SECRET_ID" disabled="disabled">
          <el-input v-model.trim="Data.TX云Sms.SECRET_ID">
          </el-input>
        </el-form-item>
        <el-form-item label="SECRET_KEY" disabled="disabled">
          <el-input v-model.trim="Data.TX云Sms.SECRET_KEY"/>
        </el-form-item>
        <el-form-item label="短信应用ID" disabled="disabled">
          <el-input v-model.trim="Data.TX云Sms.短信应用ID"/>
        </el-form-item>
        <el-form-item label="短信签名" disabled="disabled">
          <el-input v-model.trim="Data.TX云Sms.短信签名"/>
        </el-form-item>
        <el-form-item label="正文模板ID" disabled="disabled">
          <el-input v-model.trim="Data.TX云Sms.正文模板ID"/>
        </el-form-item>
      </div>
      <div class="内容div"  v-if="Data.当前选择===2">
        <el-divider content-position="left">短信宝
          <el-link href="https://www.smsbao.com/reg?r=H713" target="_blank">www.smsbao.com</el-link>
        </el-divider>
        <el-form-item label="用户名" disabled="disabled">
          <el-input v-model.trim="Data.Sms短信宝.User">
          </el-input>
        </el-form-item>
        <el-form-item label="ApiKey" disabled="disabled">
          <el-input v-model.trim="Data.Sms短信宝.ApiKey" placeholder="可空">
          </el-input>
        </el-form-item>
        <el-form-item label="产品ID" disabled="disabled">
          <el-input v-model.trim="Data.Sms短信宝.ProductId" placeholder="可空">
          </el-input>
        </el-form-item>
        <el-form-item label="发送内容" disabled="disabled">
          <el-input v-model.trim="Data.Sms短信宝.SendValue" placeholder="【短信宝】您的验证码是{code}">
          </el-input>
        </el-form-item>
      </div>
      <div style="text-align:center">
        <el-button style="width: 15vh; " type="primary" @click="on确定按钮被点击(ruleFormRef)">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {GetInfoSMS, SaveInfoSMS} from "@/api/系统设置api.js";
import {ElMessage, FormInstance} from 'element-plus'
import {is移动端} from "@/utils/utils";


const Data = ref({
  "当前选择": 1,
  "TX云Sms": {
    "SECRET_ID": "",
    "SECRET_KEY": "",
    "短信应用ID": "",
    "短信签名": "",
    "正文模板ID": ""
  },
  "Sms短信宝": {
    "User": "",
    "ApiKey": "",
    "ProductId": "",
    "SendValue": "",
  }
})

const ruleFormRef = ref<FormInstance>()
const is加载中 = ref(false)
const onGetList = async () => {
  is加载中.value = true
  const res = await GetInfoSMS({})
  Data.value = res.data
  if (Data.value.当前选择 === 0) {
    Data.value.当前选择 = 1
  }
  is加载中.value = false
}

onMounted(async () => {
  await onGetList()
})
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
  is加载中.value = true
  返回 = await SaveInfoSMS(Data.value);
  is加载中.value = false
  console.log(返回)
  if (返回.code == 10000) {
    ElMessage({
      type: "success",
      message: 返回.msg,
      showClose: true,
    })
  }
}
</script>

<style scoped lang="scss">

.最底层div {
  padding: 12px 16px;
  margin: 0 2px 10px;
  background: #f0f2f5;
}

.内容div {
  min-height: 20%;
  padding: 12px 16px;
  margin: 0 2px 10px;
  background: #ffffff;
}
.active-div { //失败了,想实现,选择那个,就让那个在上边显示,但是没成功 以后实现
  min-height: 20%;
  padding: 12px 16px;
  margin: 0 2px 10px;
  background: #ffffff;
  position: relative;
  z-index: 9999; /* 设置较大的z-index值 */
}
</style>
