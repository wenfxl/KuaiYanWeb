<script setup lang="ts">
import {useStore} from "vuex";
const store=useStore()

const onCountAdd= ()=>{
  store.commit("onCountAdd")
}
</script>

<template>
    <button type="button" @click="onCountAdd">count is {{ store.state.count }}</button>
  <el-button type="primary" plain @click="onCountAdd">count is {{ store.state.count }}</el-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
