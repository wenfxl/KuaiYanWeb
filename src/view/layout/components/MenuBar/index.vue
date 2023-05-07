<template>
  <el-menu
      background-color="$menuBg"
      text-color="#fff"
      class="el-menu"
      :collapse="is折叠"
      COLLAPSE-transition="false"
      popper-effect="light"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      ref="menu"
      router="router"
      :default-active="$route.path"
  >
    <menuItem :menus="menus"></menuItem>

  </el-menu>

</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import menuItem from '@/view/layout/components/MenuBar/menuItem.vue'
import {useRouter, useRoute} from "vue-router";

const Route = useRoute()
//const menus = {"children":[{"ID":6,"path":"仪表台","name":"仪表台","meta":{"title":"仪表台","icon":"Promotion"},"children":[]},{"ID":6,"path":"用户管理","name":"用户管理","meta":{"title":"用户管理","icon":"Promotion"},"children":[{"ID":6,"path":"在线用户","name":"在线用户","meta":{"title":"在线用户","icon":"Promotion"},"children":[]},{"ID":6,"path":"用户账号","name":"用户账号","meta":{"title":"用户账号","icon":"Promotion"},"children":[]},{"ID":6,"path":"管理账号","name":"管理账号","meta":{"title":"管理账号","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"应用管理","name":"应用管理","meta":{"title":"应用管理","icon":"Promotion"},"children":[{"ID":6,"path":"应用列表","name":"应用列表","meta":{"title":"应用列表","icon":"Promotion"},"children":[]},{"ID":6,"path":"卡号列表","name":"卡号列表","meta":{"title":"卡号列表","icon":"Promotion"},"children":[]},{"ID":6,"path":"软件用户","name":"软件用户","meta":{"title":"软件用户","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"财务管理","name":"财务管理","meta":{"title":"财务管理","icon":"Promotion"},"children":[{"ID":6,"path":"余额充值订单","name":"余额充值订单","meta":{"title":"余额充值订单","icon":"Promotion"},"children":[]},{"ID":6,"path":"平台购卡订单","name":"平台购卡订单","meta":{"title":"平台购卡订单","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"系统管理","name":"系统管理","meta":{"title":"系统管理","icon":"Promotion"},"children":[{"ID":6,"path":"系统设置","name":"系统设置","meta":{"title":"系统设置","icon":"Promotion"},"children":[]},{"ID":6,"path":"定时任务","name":"定时任务","meta":{"title":"定时任务","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"日志管理","name":"日志管理","meta":{"title":"日志管理","icon":"Promotion"},"children":[{"ID":6,"path":"余额日志","name":"余额日志","meta":{"title":"余额日志","icon":"Promotion"},"children":[]},{"ID":6,"path":"登录日志","name":"登录日志","meta":{"title":"登录日志","icon":"Promotion"},"children":[]},{"ID":6,"path":"制卡日志","name":"制卡日志","meta":{"title":"制卡日志","icon":"Promotion"},"children":[]}]}]}
const menus = [{
  "ID": 1,
  "path": "控制面板",
  "name": "控制面板",
  "meta": {"title": "控制面板", "icon": "Promotion"},
  "children": [{
    "ID": 2,
    "path": "控制面板/仪表台",
    "name": "仪表台",
    "meta": {"title": "仪表台", "icon": "Star"},
    "children": []
  }, {
    "ID": 2,
    "path": "控制面板/监控页",
    "name": "监控页",
    "meta": {"title": "监控页", "icon": "DataLine"},
    "children": []
  }, {
    "ID": 2,
    "path": "控制面板/分析页",
    "name": "分析页",
    "meta": {"title": "分析页", "icon": "PieChart"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "用户管理",
  "name": "用户管理",
  "meta": {"title": "用户管理", "icon": "User"},
  "children": [{
    "ID": 6,
    "path": "用户管理/在线用户",
    "name": "在线用户",
    "meta": {"title": "在线用户", "icon": "Monitor"},
    "children": []
  }, {
    "ID": 6,
    "path": "用户管理/用户账号",
    "name": "用户账号",
    "meta": {"title": "用户账号", "icon": "UserFilled"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "应用管理",
  "name": "应用管理",
  "meta": {"title": "应用管理", "icon": "SwitchFilled"},
  "children": [{
    "ID": 6,
    "path": "应用管理/应用列表",
    "name": "应用列表",
    "meta": {"title": "应用列表", "icon": "Monitor"},
    "children": []
  }, {
    "ID": 6,
    "path": "应用管理/软件用户",
    "name": "软件用户",
    "meta": {"title": "软件用户", "icon": "UserFilled"},
    "children": []
  }, {
    "ID": 6,
    "path": "应用管理/用户类型",
    "name": "用户类型",
    "meta": {"title": "用户类型", "icon": "Menu"},
    "children": []
  }, {
    "ID": 6,
    "path": "应用管理/卡类列表",
    "name": "卡类列表",
    "meta": {"title": "卡类列表", "icon": "Memo"},
    "children": []
  }, {
    "ID": 6,
    "path": "应用管理/卡号列表",
    "name": "卡号列表",
    "meta": {"title": "卡号列表", "icon": "Tickets"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "财务管理",
  "name": "财务管理",
  "meta": {"title": "财务管理", "icon": "Histogram"},
  "children": [{
    "ID": 6,
    "path": "财务管理/余额充值订单",
    "name": "余额充值订单",
    "meta": {"title": "余额充值订单", "icon": "document-checked"},
    "children": []
  }, {
    "ID": 6,
    "path": "财务管理/平台购卡订单",
    "name": "平台购卡订单",
    "meta": {"title": "平台购卡订单", "icon": "Tickets"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "系统管理",
  "name": "系统管理",
  "meta": {"title": "系统管理", "icon": "Setting"},
  "children": [{
    "ID": 6,
    "path": "系统管理/系统设置",
    "name": "系统设置",
    "meta": {"title": "系统设置", "icon": "Tools"},
    "children": []
  }, {
    "ID": 6,
    "path": "系统管理/在线支付",
    "name": "在线支付",
    "meta": {"title": "在线支付", "icon": "CreditCard"},
    "children": []
  }, {
    "ID": 999,
    "path": "系统管理/公共变量",
    "name": "公共变量",
    "meta": {"title": "公共变量", "icon": "ElementPlus"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "日志管理",
  "name": "日志管理",
  "meta": {"title": "日志管理", "icon": "Calendar"},
  "children": [{
    "ID": 6,
    "path": "日志管理/用户消息",
    "name": "用户消息",
    "meta": {"title": "用户消息", "icon": "ChatLineSquare"},
    "children": []
  }, {
    "ID": 6,
    "path": "日志管理/登录日志",
    "name": "登录日志",
    "meta": {"title": "登录日志", "icon": "Coin"},
    "children": []
  }, {
    "ID": 6,
    "path": "日志管理/余额日志",
    "name": "余额日志",
    "meta": {"title": "余额日志", "icon": "CreditCard"},
    "children": []
  }, {
    "ID": 6,
    "path": "日志管理/积分点数",
    "name": "积分点数",
    "meta": {"title": "积分点数", "icon": "CreditCard"},
    "children": []
  }, {
    "ID": 6,
    "path": "日志管理/制卡日志",
    "name": "制卡日志",
    "meta": {"title": "制卡日志", "icon": "Postcard"},
    "children": []
  }]
}]
defineProps({
  is折叠: {
    type: Boolean,
  }
})
import {useStore} from "vuex";

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

</style>
