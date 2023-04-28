<template>
  <template v-for="menu in menus" :key="menu.ID">
    <el-sub-menu v-if="menu.children && menu.children.length>0" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon"></component>
        </el-icon>
        <span class="menu_span">{{menu.name}}</span>
      </template>
<!--      遍历自身-->
      <menuItem :menus="menu.children"></menuItem>
    </el-sub-menu>
<!--如果children 没有子  就添加项目-->
    <el-menu-item  v-else  :index="'/'+menu.path"  class="el-menu-item">
      <el-icon>
        <component :is="menu.meta.icon"></component>
      </el-icon>
      <span class="menu_span">{{menu.name}}</span>
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
      }
    }
)

</script>

<style scoped lang="scss">
.el-menu{
}
.menu_span{
  padding-left: 11px;
}
.el-menu-item{
  background-color: $subMenuHover;
}

el-sub-menu,el-menu-item{

}
</style>
