<template>
  <div class="最底层div">
    <el-form v-loading="is加载中" :inline="false" style="min-width: 80px" label-width="130px" :model="Data"
             :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
      <div class="内容div">
        <el-divider content-position="left">系统</el-divider>
        <el-form-item label="系统名称" prop="系统名称" disabled="disabled">
          <el-input v-model="Data.系统名称"/>
        </el-form-item>
        <el-form-item label="系统地址" prop="系统地址">
          <el-input v-model="Data.系统地址" placeholder="系统地址"/>
        </el-form-item>
        <el-form-item label="系统开关" prop="系统开关">
          <el-radio-group v-model="Data.系统开关">
            <el-radio-button :label="true" size="" border>开启</el-radio-button>
            <el-radio-button :label="false" size="" border>关闭</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系统关闭提示" prop="系统关闭提示">
          <el-input v-model="Data.系统关闭提示" placeholder="系统关闭提示"/>
        </el-form-item>
      </div>
      <div class="内容div">
        <el-divider content-position="left">代理中心(计划中)</el-divider>
        <el-form-item label="代理中心开关" prop="代理中心开关">
          <el-radio-group v-model="Data.代理中心开关">
            <el-radio-button :label="true" size="" border>开启</el-radio-button>
            <el-radio-button :label="false" size="" border>关闭</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="代理中心关闭提示" prop="代理中心关闭提示">
          <el-input v-model="Data.代理中心关闭提示" placeholder="代理中心关闭提示"/>
        </el-form-item>
      </div>
      <div class="内容div">
        <el-divider content-position="left">其他(计划中)</el-divider>
        <el-form-item label="用户中心开关" prop="用户中心开关">
          <el-radio-group v-model="Data.用户中心开关">
            <el-radio-button :label="true" size="" border>开启</el-radio-button>
            <el-radio-button :label="false" size="" border>关闭</el-radio-button>
          </el-radio-group>
        </el-form-item>


        <div style="text-align:center">
          <el-button style="width: 15vh; " type="primary" @click="on确定按钮被点击(ruleFormRef)">保存</el-button>
        </div>

      </div>
    </el-form>
  </div>
</template>

<script setup lang='ts'>

import {onBeforeUnmount, onMounted, ref} from "vue";
import {GetInfo系统设置, SaveInfo系统设置,} from "@/api/系统设置api.js";
import {ElMessage, FormInstance} from 'element-plus'
import {is移动端} from "@/utils/utils";


const Data = ref({
  "系统名称": "Ty通用后台管理系统111",
  "系统地址": "www.baidu.com",
  "系统开关": true,
  "系统关闭提示": "系统已经关闭使用",
  "用户中心开关": true,
  "代理中心开关": true,
  "代理中心关闭提示": "www.baidu.com"
})

const ruleFormRef = ref<FormInstance>()
const is加载中 = ref(false)
const onGetList = async () => {
  is加载中.value = true
  const res = await GetInfo系统设置({})
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
  返回 = await SaveInfo系统设置(Data.value);
  is加载中.value = false
  console.log(返回)
  if (返回.code == 0) {
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
  margin:0  2px 10px;
  background: #f0f2f5;
}
.内容div {
  min-height: 20%;
  padding: 12px 16px;
  margin:0  2px 10px;
  background: #ffffff;
}
</style>
