<template>
  <div class="最底层div">
    <el-tabs v-model="activeNames" class="demo-tabs" @tab-click="on折叠面板表项被打开">
      <el-tab-pane label="基础设置" name="基础设置">
        <template #title>
          <el-icon size="18" color="#73767a">
            <Tools/>
          </el-icon>
          基础设置
        </template>

        <SetBaseInfo></SetBaseInfo>
      </el-tab-pane>
      <el-tab-pane label="在线支付配置" name="在线支付配置">
        <template #title>
          <el-icon size="18" color="#73767a">
            <CreditCard/>
          </el-icon>
          在线支付配置
        </template>
        <SetPayInfo></SetPayInfo>
      </el-tab-pane>
      <el-tab-pane label="短信平台配置" name="短信平台配置">
        <template #title>
          <el-icon size="18" color="#73767a">
            <ChatSquare/>
          </el-icon>
          短信平台配置
        </template>
        <SetSmsInfo></SetSmsInfo>
      </el-tab-pane>
      <el-tab-pane label="行为验证码平台配置" name="行为验证码平台配置">
        <template #title>
          <el-icon size="18" color="#73767a">
            <ChatSquare/>
          </el-icon>
          行为验证码平台配置
        </template>
        <SetCaptcha2Info></SetCaptcha2Info>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import SetPayInfo from "@/view/系统管理/组件/在线支付设置.vue";
import SetBaseInfo from "@/view/系统管理/组件/基础信息设置.vue";
import SetSmsInfo from "@/view/系统管理/组件/短信平台配置.vue";
import SetCaptcha2Info from "@/view/系统管理/组件/行为验证码平台配置.vue";

const activeNames = ref('基础设置')
const on折叠面板表项被打开 = (val: string[]) => {
  console.log(val)
}
</script>
