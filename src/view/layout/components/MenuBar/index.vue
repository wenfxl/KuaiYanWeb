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
import {ref, watch} from 'vue'
import menuItem from '@/view/layout/components/MenuBar/menuItem.vue'
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";


const Route = useRoute()
//const menus = {"children":[{"ID":6,"path":"仪表台","name":"仪表台","meta":{"title":"仪表台","icon":"Promotion"},"children":[]},{"ID":6,"path":"用户管理","name":"用户管理","meta":{"title":"用户管理","icon":"Promotion"},"children":[{"ID":6,"path":"在线用户","name":"在线用户","meta":{"title":"在线用户","icon":"Promotion"},"children":[]},{"ID":6,"path":"用户账号","name":"用户账号","meta":{"title":"用户账号","icon":"Promotion"},"children":[]},{"ID":6,"path":"管理账号","name":"管理账号","meta":{"title":"管理账号","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"应用管理","name":"应用管理","meta":{"title":"应用管理","icon":"Promotion"},"children":[{"ID":6,"path":"应用列表","name":"应用列表","meta":{"title":"应用列表","icon":"Promotion"},"children":[]},{"ID":6,"path":"卡号列表","name":"卡号列表","meta":{"title":"卡号列表","icon":"Promotion"},"children":[]},{"ID":6,"path":"软件用户","name":"软件用户","meta":{"title":"软件用户","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"财务管理","name":"财务管理","meta":{"title":"财务管理","icon":"Promotion"},"children":[{"ID":6,"path":"支付充值订单","name":"支付充值订单","meta":{"title":"支付充值订单","icon":"Promotion"},"children":[]},{"ID":6,"path":"平台购卡订单","name":"平台购卡订单","meta":{"title":"平台购卡订单","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"系统管理","name":"系统管理","meta":{"title":"系统管理","icon":"Promotion"},"children":[{"ID":6,"path":"系统设置","name":"系统设置","meta":{"title":"系统设置","icon":"Promotion"},"children":[]},{"ID":6,"path":"定时任务","name":"定时任务","meta":{"title":"定时任务","icon":"Promotion"},"children":[]}]},{"ID":6,"path":"日志管理","name":"日志管理","meta":{"title":"日志管理","icon":"Promotion"},"children":[{"ID":6,"path":"余额日志","name":"余额日志","meta":{"title":"余额日志","icon":"Promotion"},"children":[]},{"ID":6,"path":"登录日志","name":"登录日志","meta":{"title":"登录日志","icon":"Promotion"},"children":[]},{"ID":6,"path":"制卡日志","name":"制卡日志","meta":{"title":"制卡日志","icon":"Promotion"},"children":[]}]}]}
const menus = [{
  "ID": 1,
  "path": "控制面板",
  "name": "控制面板",
  "meta": {"title": "控制面板", "icon": "Promotion","text": "面板"},
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
  "meta": {"title": "用户管理", "icon": "User","text": "用户"},
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
  "meta": {"title": "应用管理", "icon": "SwitchFilled","text": "应用"},
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
  }, {
    "ID": 6,
    "path": "应用管理/黑名单",
    "name": "黑名单",
    "meta": {"title": "黑名单", "icon": "DocumentRemove"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "财务管理",
  "name": "财务管理",
  "meta": {"title": "财务管理", "icon": "Histogram","text": "财务"},
  "children": [{
    "ID": 6,
    "path": "财务管理/支付充值订单",
    "name": "支付充值订单",
    "meta": {"title": "支付充值订单", "icon": "document-checked"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "系统管理",
  "name": "系统管理",
  "meta": {"title": "系统管理", "icon": "Setting","text": "系统"},
  "children": [{
    "ID": 6,
    "path": "系统管理/系统设置",
    "name": "系统设置",
    "meta": {"title": "系统设置", "icon": "Tools"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "代理管理",
  "name": "代理管理",
  "meta": {"title": "代理管理", "icon": "HelpFilled","text": "代理"},
  "children": [{
    "ID": 6,
    "path": "代理管理/代理账号",
    "name": "代理账号",
    "meta": {"title": "代理账号", "icon": "Stamp"},
    "children": []
  },{
    "ID": 6,
    "path": "代理管理/库存管理",
    "name": "库存管理",
    "meta": {"title": "库存管理", "icon": "Collection"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "日志管理",
  "name": "日志管理",
  "meta": {"title": "日志管理", "icon": "Calendar","text": "日志"},
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
    "path": "日志管理/库存日志",
    "name": "库存日志",
    "meta": {"title": "库存日志", "icon": "OfficeBuilding"},
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
  }, {
    "ID": 6,
    "path": "日志管理/定时任务日志",
    "name": "定时任务",
    "meta": {"title": "定时任务", "icon": "Postcard"},
    "children": []
  }, {
    "ID": 6,
    "path": "日志管理/代理操作日志",
    "name": "代理操作日志",
    "meta": {"title": "代理操作", "icon": "Postcard"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "二开扩展",
  "name": "二开扩展",
  "meta": {"title": "二开扩展", "icon": "Operation","text": "扩展"},
  "children": [{
    "ID": 999,
    "path": "二开扩展/用户云配置",
    "name": "用户云配置",
    "meta": {"title": "用户云配置", "icon": "ElementPlus"},
    "children": []
  }, {
    "ID": 999,
    "path": "二开扩展/公共变量",
    "name": "公共变量",
    "meta": {"title": "公共变量", "icon": "ElementPlus"},
    "children": []
  }, {
    "ID": 999,
    "path": "二开扩展/公共函数",
    "name": "公共函数",
    "meta": {"title": "公共函数", "icon": "ChromeFilled"},
    "children": []
  }, {
    "ID": 999,
    "path": "二开扩展/定时任务",
    "name": "定时任务",
    "meta": {"title": "定时任务", "icon": "Timer"},
    "children": []
  }, {
    "ID": 999,
    "path": "二开扩展/任务池",
    "name": "任务池",
    "meta": {"title": "任务池", "icon": "ChromeFilled"},
    "children": []
  }, {
    "ID": 999,
    "path": "二开扩展/云存储",
    "name": "云存储",
    "meta": {"title": "云存储", "icon": "Files"},
    "children": []
  }]
}, {
  "ID": 6,
  "path": "工具",
  "name": "工具",
  "meta": {"title": "工具", "icon": "Tools","text": "工具"},
  "children": [{
    "ID": 999,
    "path": "工具/apk加验证",
    "name": "apk加验证",
    "meta": {"title": "apk加验证", "icon": "Cellphone"},
    "children": []
  }]
}
]
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
