<template>
  <div class="最底层div">
    <el-collapse v-model="activeNames" @change="on折叠面板表项被打开" accordion>
      <el-collapse-item title="基础设置" name="基础设置">
        <template #title>
           <el-icon size="18" color="#73767a">
          <Tools />
        </el-icon>  基础设置
        </template>

        <SetBaseInfo></SetBaseInfo>
      </el-collapse-item>
      <el-collapse-item title="在线支付配置" name="在线支付配置">
        <template #title>
          <el-icon size="18" color="#73767a">
            <CreditCard />
          </el-icon>  在线支付配置
        </template>
          <SetPayInfo></SetPayInfo>
      </el-collapse-item>
      <el-collapse-item title="短信平台配置" name="短信平台配置">
        <template #title>
          <el-icon size="18" color="#73767a">
            <ChatSquare />
          </el-icon>  短信平台配置
        </template>
        <SetSmsInfo></SetSmsInfo>
      </el-collapse-item>
      <el-collapse-item title="行为验证码平台配置" name="行为验证码平台配置">
        <template #title>
          <el-icon size="18" color="#73767a">
            <ChatSquare />
          </el-icon>  行为验证码平台配置
        </template>
        <SetCaptcha2Info></SetCaptcha2Info>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import SetPayInfo from "@/view/系统管理/组件/在线支付设置.vue";
import SetBaseInfo from "@/view/系统管理/组件/基础信息设置.vue";
import SetSmsInfo from "@/view/系统管理/组件/短信平台配置.vue";
import SetCaptcha2Info from "@/view/系统管理/组件/行为验证码平台配置.vue";

const activeNames = ref(['基础设置'])
const on折叠面板表项被打开 = (val: string[]) => {
  console.log(val)
}
</script>
