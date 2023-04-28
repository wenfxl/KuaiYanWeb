<template>
  <el-breadcrumb class="面包屑">
    <el-breadcrumb-item v-for="面包屑 in tempString" :key="面包屑" class="面包屑">
      <span class="最后一个" v-if="面包屑 === tempString[tempString.length - 1]"  style="color: #324258;">{{ 面包屑 }}</span>
      <span class="no-最后一个" v-else  style="color: #97a8be" >{{ 面包屑 }}</span>

    </el-breadcrumb-item>
  </el-breadcrumb>
</template>


<script setup lang='ts'>
import {RouteLocationMatched, useRoute} from "vue-router";
import {Ref, ref, watch} from "vue";

const Route = useRoute()
const 数组_面包屑: Ref<RouteLocationMatched[]> = ref([])
const tempString: Ref<string[]> = ref([])
const GetList = () => {
  console.log("数据变化了")
  数组_面包屑.value = Route.matched
  tempString.value = 数组_面包屑.value[数组_面包屑.value.length - 1].path.split("/")

  //数组_面包屑.value = temproute[temproute.length-1].path.split("/")

  console.log(tempString.value)

}
GetList()
watch(() => Route.path, () => {
      GetList()
    }
)

</script>

<style lang="scss" scoped>

.面包屑 {
  font-size: 20px;
}

/* //scoped   不能限定 不然不生效  el-breadcrumb__inner 就是面包屑的类名*/
/*.el-breadcrumb__inner {*/
/*  color: #909399 !important;*/
/*}*/

.no-最后一个 {
  color: #97a8be;
  /*cursor: text;*/
}
.最后一个 {
  font-weight: 600;
  /*cursor: pointer;*/
}

</style>

