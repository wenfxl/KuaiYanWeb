<template>
  <div class="logo">
    <img src="@/assets/logo4.png" />
    <h2  class="title"  v-show="!is折叠">飞鸟快验应用管理系统</h2>
  </div>
</template>

<script  setup >

defineProps({
  is折叠:{
    type:Boolean,
  }
})
</script>

<style scoped>
.logo{
  /*排列:弯曲*/
  display: flex;
  /*对齐 :居中*/
  align-items: center;
  /*填充 左边  左内边距*/
  padding-left: 14px;
  height: 64px;
  overflow: hidden;
  white-space: nowrap;

}
img{
height: 32px;
  margin-right: 8px;
}
.title{
  font-size: 20px;
  padding-right: 8px;
  color: #ffffff;
  margin-bottom:0 ;
}

</style>
