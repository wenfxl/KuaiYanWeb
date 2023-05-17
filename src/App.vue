<script setup lang="ts">
import HelloWorld from "com/HelloWorld.vue"
import Layout from "@/view/layout/layout.vue";
</script>

<template>
  <!--  <layout></layout>-->
  <router-view/>
</template>

<style lang="scss">
.只读编辑框 {
  .el-input__wrapper {
    background-color: #f1f1f5;
  }
}

</style>
