<template>
  <el-menu
      background-color="$menuBg"
      text-color="#fff"
      class="el-menu"
      :collapse="is折叠"
      COLLAPSE-transition="false"
      popper-effect="light"
      popper-class="子菜单"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      ref="menu"
      router="router"
      unique-opened=""
      :default-active="$route.path"
      :collapse-transition="false"
  >
    <menuItem :is折叠="is折叠" :menus="menus"></menuItem>

  </el-menu>

</template>

<script lang="ts" setup>
import 菜单json from "@/store/菜单.json"
import menuItem from '@/view/layout/components/MenuBar/menuItem.vue'
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";


const Route = useRoute()
//const menus = {"children":[{"ID":6,"path":"仪表台","name":"仪表台","meta":{"title":"仪表台","icon":"Promotion"},"children":[]},{"ID":6,"path":"用户管理","name":"用户管理","meta":{"title":"用户管理","icon":"Promotion"},"children":[{"ID":6,"path":"在线用户","name":"在线用户","meta":{"title":"在线用户","icon":"Promotion"},"children":[]},{"ID":6,"path":"用户账号","name":"用户账号","meta":{"title":"用户账号","icon":"Promotion"},"children":[]},{"ID":6,"path":"管理账号","name":"管理账号","meta":{"title":"管理账号","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"应用管理","name":"应用管理","meta":{"title":"应用管理","icon":"Promotion"},"children":[{"ID":6,"path":"应用列表","name":"应用列表","meta":{"title":"应用列表","icon":"Promotion"},"children":[]},{"ID":6,"path":"卡号列表","name":"卡号列表","meta":{"title":"卡号列表","icon":"Promotion"},"children":[]},{"ID":6,"path":"软件用户","name":"软件用户","meta":{"title":"软件用户","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"财务管理","name":"财务管理","meta":{"title":"财务管理","icon":"Promotion"},"children":[{"ID":6,"path":"支付充值订单","name":"支付充值订单","meta":{"title":"支付充值订单","icon":"Promotion"},"children":[]},{"ID":6,"path":"平台购卡订单","name":"平台购卡订单","meta":{"title":"平台购卡订单","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"系统管理","name":"系统管理","meta":{"title":"系统管理","icon":"Promotion"},"children":[{"ID":6,"path":"系统设置","name":"系统设置","meta":{"title":"系统设置","icon":"Promotion"},"children":[]},{"ID":6,"path":"定时任务","name":"定时任务","meta":{"title":"定时任务","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"日志管理","name":"日志管理","meta":{"title":"日志管理","icon":"Promotion"},"children":[{"ID":6,"path":"余额日志","name":"余额日志","meta":{"title":"余额日志","icon":"Promotion"},"children":[]},{"ID":6,"path":"登录日志","name":"登录日志","meta":{"title":"登录日志","icon":"Promotion"},"children":[]},{"ID":6,"path":"制卡日志","name":"制卡日志","meta":{"title":"制卡日志","icon":"Promotion"},"children":[]}]}]}
//把下边菜单改成外部json文件

const menus = 菜单json
defineProps({
  is折叠: {
    type: Boolean,
  }
})


const store = useStore()
const handleOpen = (key: string, keyPath: string[]) => {

  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)


}

const select = (key: string, keyPath: string[]) => {
  // console.log(key)
  // console.log( keyPath)

}


// watch(() => Route.path, () => {
//   console.log($route.path)
//   if (this.$route.path === '/') {
//     this.$refs.menu.close(this.KeyIndex)
//   }
//     }
// )
</script>

<style scoped lang="scss">
.el-menu {
  background-color: $menuBg;
  border: none; //消除边框
}
.子菜单 {
  background-color: #ffffff;
  border: none; //消除边框
}

</style>
