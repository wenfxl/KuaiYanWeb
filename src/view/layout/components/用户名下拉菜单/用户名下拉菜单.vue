<template>
  <el-badge :value="Store.state.UserInfo.UserMsgNoRead" :max="99" class="item"
            :hidden="Store.state.UserInfo.UserMsgNoRead===0">
    <el-icon class="右上角图标" @click="on路由跳转('用户消息')">
      <Bell/>
    </el-icon>
  </el-badge>

  <el-dropdown>
    <span class="el-dropdown-link" style="color:#0c0d0e ;font-size: 18px;">
      <el-icon class="右上角图标"><User/></el-icon>  {{ is移动端() ? '' : Store.state.UserInfo?.AdminInfo?.User }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="on退出登录">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {GetAdminInfo, login, OutLogin} from "@/api/user.js"
import {is移动端} from "@/utils/utils";

const Store = useStore()
const Router = useRouter()

const on路由跳转 = (name) => {
  Router.push({name})
}
const on退出登录 =  async () => {
  await OutLogin()

  Store.commit("setToken", "")
  Store.commit("onTabs菜单删除", "关闭所有")
  Store.commit("on更新菜单当前Path", "")
  Router.replace({path: "Login"})
}
const onGetUserInfo = async () => {
  console.log(Store.state.UserInfo)
  if (!Store.state.UserInfo?.AdminInfo?.User) {
    console.log("用户信息没有了需要更新")
    const res = await GetAdminInfo()
    console.log(res.data)
    Store.commit("setUserInfo", res.data)
  }
}
onMounted(() => {
  onGetUserInfo()
})


</script>

<style lang="scss">
.右上角图标 {
  margin-left: 15px;
  cursor: pointer;
  border-radius: 25px;
  border: 2px solid #e9e9eb;
  padding: 3px;
}


</style>
