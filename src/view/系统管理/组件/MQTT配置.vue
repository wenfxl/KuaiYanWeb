<template>
  <div class="最底层div">
    <el-form v-loading="is加载中" :inline="false" style="min-width: 80px" label-width="130px" :model="Data"
             :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
      <div class="内容div">
        <el-divider content-position="left">MQTT
          <el-link href="https://www.emqx.com/zh/mqtt/public-mqtt5-broker" target="_blank">免费公共MQTT服务器</el-link>
        </el-divider>
        <el-form-item label="连接状态">
          <el-switch v-model="Data.连接状态" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="服务器地址">
          <el-input v-model.trim="Data.服务器地址" placeholder="服务器地址"/>
        </el-form-item>
        <el-form-item label="服务器端口">
          <el-input v-model.number="Data.服务器端口" placeholder="服务器端口"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model.trim="Data.用户名" placeholder="(可空)"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="Data.密码" placeholder="(可空)"/>
        </el-form-item>
        <div style="text-align:center">
          <el-button style="width: 15vh; " type="primary" @click="on确定按钮被点击(ruleFormRef)">保存</el-button>
        </div>

      </div>

    </el-form>
    <el-form v-loading="is加载中" :inline="false" style="min-width: 80px" label-width="130px"
             :label-position="is移动端()?'top':'right'">
      <div class="内容div">
        <el-divider content-position="left">测试发送</el-divider>
        <el-form-item label="主题">
          <el-input v-model.trim="testData.主题" placeholder="用户订阅的主题名称"/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model.trim="testData.内容" placeholder="要发送的内容"/>
        </el-form-item>
        <div style="text-align:center">
          <el-button style="width: 15vh; " type="primary" @click="on发送测试被点击">发送测试</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang='ts'>

import {onBeforeUnmount, onMounted, ref} from "vue";
import {
  GetInfoMQTT,
  GetInfo系统设置, MqttSendMsg,
  SaveInfoMQTT,
  SaveInfo系统设置,
  S生成API加密源码SDK,
  TestSendSms,
} from "@/api/系统设置api.js";
import {ElMessage, ElMessageBox, FormInstance} from 'element-plus'
import {is移动端} from "@/utils/utils";


const Data = ref({
  "连接状态": true,
  "服务器地址": "broker.emqx.io",
  "服务器端口": 1883,
  "用户名": "",
  "密码": "",
})

const testData = ref({
  "主题": "text",
  "内容": "broker.emqx.io",
})
const ruleFormRef = ref<FormInstance>()
const is加载中 = ref(false)
const onGetList = async () => {
  is加载中.value = true
  const res = await GetInfoMQTT({})
  Data.value = res.data
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
  返回 = await SaveInfoMQTT(Data.value);
  is加载中.value = false
  console.log(返回)
  if (返回.code == 10000) {
    ElMessage.success(返回.msg)
  }
}
const on发送测试被点击 = async (Type: number) => {

  let 提交数据 = testData.value
  is加载中.value = true
  const res = await MqttSendMsg(提交数据)
  is加载中.value = false
  if (res.code == 10000) {
    ElMessage.success(res.msg)
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
</style>
