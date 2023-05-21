<template>
  <el-tabs
      v-if="!is移动端()"
      v-model="acktiveKey"
      type="card"
      class="breadcrumb"
      closable
      @tab-change="on切换现行子夹"
      @tab-remove="on子夹被删除"
      @contextmenu.prevent.native="on弹出菜单($event)"
  >
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
  <ul class="菜单_右键" v-show="菜单_isShow" :style="{left:菜单_left +'px' , top:菜单_Top+'px'}">
    <li @click="on菜单被选择('关闭其他')">关闭其他</li>
    <li @click="on菜单被选择('关闭左边')">关闭左边</li>
    <li @click="on菜单被选择('关闭右边')">关闭右边</li>
    <li @click="on菜单被选择('关闭所有')">关闭所有</li>
  </ul>
</template>
<script lang="ts" setup>
import {computed, onMounted, Ref, ref, watch} from 'vue'
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {ITab} from "@/store/ITab";

const Store = useStore()
const editableTabs = computed(() => {
  return Store.getters.getItabArray    // getItabArray  后面没有  ()  不算是一个函数 比较奇怪
})

const acktiveKey = ref("")
const Route = useRoute()

const AddTab = () => {
  const {meta, path,name} = Route
  const Tab: ITab = {
    path: path,
    title: name as string
  }
  // console.log(path)
  // console.log(meta.tatle)
  Store.commit("addITab", Tab)
}


watch(() => Route.path, () => {
      //console.info("Route.path:"+ Route.name )
      //如果name 没有值 说明是404
      if (Route.name) {
        acktiveKey.value = Route.path
        AddTab()
      }

    }
)

import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {is移动端} from "@/utils/utils";

const Router = useRouter()
const on切换现行子夹 = (tabName: string) => {
  Router.push(tabName)
  console.log("on切换现行子夹:" + tabName)
}
const on子夹被删除 = (Path: string) => {
  console.log("on子夹被删除:" + Path)
  if (editableTabs.value.length == 1) {
    console.log("on子夹被删除:" + editableTabs.value.length)
    ElMessage({
      message: '已经是最后一页了.',
      type: 'warning',
    })
    return
  }
  //判断是不是当前页,新型切换子夹
  if (acktiveKey.value == Path) {
    editableTabs.value.forEach((aaa: ITab, index: number) => {
      if (aaa.path == Path) {
        const next = editableTabs.value[index + 1] || editableTabs.value[index - 1]
        if (next) {
          Router.push(next.path)
        }
      }
    })
  }
  Store.commit("DeleteITab", Path)
}

const 菜单_left = ref("")
const 菜单_Top = ref("")
const 菜单_isShow: Ref<boolean> = ref(false)

const on弹出菜单 = (e: any) => {
  // console.info(e)
  // console.info(e.target.id)
  if (e.target.id) {
    let path = e.target.id.split("-")[1]
    Store.commit("on更新菜单当前Path", path)
    菜单_left.value = e.x
    菜单_Top.value = e.y
    菜单_isShow.value = true
  }
}

const on菜单被选择 = (命令: string) => {
  菜单_isShow.value = false
  Store.commit("onTabs菜单删除", 命令)
  // 关闭全部重新打开仪表台 不然显示空
  if (命令 == "关闭所有") {
    Router.push("/")
  }
}

//监控菜单,如果在显示状态  监控window 点击事件 操作点击就关闭菜单
watch(()=>菜单_isShow.value,()=>{
  if (菜单_isShow.value) {
    //添加监听事件
    window.addEventListener("click",()=>菜单_isShow.value=false)
  }else {
    //菜单不显示了 就移除监听事件 节约系统资源
    window.removeEventListener("click",()=>菜单_isShow.value=false)
  }
})
const on刷新页面监控 = () => {

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("Tabs_Router", JSON.stringify(editableTabs.value))
  })

  let session = sessionStorage.getItem("Tabs_Router")
  if (session) {
    let tablet = JSON.parse(session)
    tablet.forEach((item: ITab) => {
      Store.commit("addITab", item)
    })
  }
}

onMounted(() => {
  on刷新页面监控()
})
</script>
<style lang="scss">
.demo-tabs  {
  padding:0 ;
  color: #6b778c;
  font-size: 20px;
  font-weight: 600;
  height: 42px;

}

.菜单_右键 {
  background-color: #ffffff;
  width: 90px;
  margin:0 ;
  /*边框 1px  颜色 */
  border: 1px solid #ccc;
  /*图层高度  3000  值大一点 会在顶层*/
  z-index: 3000;
  /*定位方式 绝对定位*/
  position: absolute;
  list-style-type: none;
  border-radius: 7px;
  /*设置边框阴影*/
  box-shadow: 2px 2px 3px 0 rgba(45, 75, 74, 0.6);
  padding: 5px 0;
  font-size: 14px;

  li {
    margin: 0;
    padding: 7px 16px;
    //设置 鼠标悬停时样式
    &:hover {
      background: #889aa4; //改变背景颜色
      cursor: pointer; //改变鼠标样式为手型
    }
  }

}
</style>
