<template>
  <template v-for="menu in menus" :key="menu.ID">
    <el-sub-menu class="parent" v-if="menu.children && menu.children.length>0" :index="menu.path">
      <template #title>
        <el-icon  >
          <component :is="menu.meta.icon"></component>
        </el-icon>
        <div  class="菜单下文字" v-if="is折叠">{{ menu.meta.text }}</div>
        <span v-show="!is折叠" class="menu_span">{{ menu.name }}</span>
      </template>
      <!--      遍历自身-->
      <menuItem :menus="menu.children"></menuItem>
    </el-sub-menu>
    <!--如果children 没有子  就添加项目-->
    <el-menu-item v-else :index="'/'+menu.path" class="el-menu-item">
      <el-icon>
        <component :is="menu.meta.icon"></component>
      </el-icon>
      <span class="menu_span">{{ menu.name }}</span>
    </el-menu-item>

  </template>
</template>

<script setup lang='ts'>
import menuItem from '@/view/layout/components/MenuBar/menuItem.vue'
import {watch} from "vue";
import {useRoute} from "vue-router";

defineProps({
      menus: {
        type: Object
      },
      is折叠: {
        type: Boolean,
      }
    }
)

</script>

<style scoped lang="scss">
.el-menu {
}

.menu_span {
  padding-left: 11px;
}

.el-menu-item {
  background-color: $subMenuHover;
}

el-sub-menu, el-menu-item {

}
.类内数据靠左 {
  display: flex;
  justify-content: flex-start;
}

.parent {
  position: relative;

}
.菜单下文字 {
  position: absolute;
  background-position-x: 0;
  height: 15px;
  left: 17px;
  align-items: flex-start;
  text-align: left;
  padding-left: 0px; /* 可根据需要调整内边距 */
}
</style>
