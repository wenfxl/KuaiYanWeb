<template>
  <div>
    <div class="big">
      <div class="inner">
        <img src="../../assets/notFound.png">
        <p>页面被神秘力量吸走了</p>
        <p>或没有该页面权限</p>
        <div  style="text-align:center" >
          <el-button @click="函数_去首页()" >去首页</el-button>
        </div>

      </div>
    </div>

  </div>
</template>

<script  setup lang="ts">
import {useRouter} from "vue-router";
const Router = useRouter()

const 函数_去首页=()=>{
  Router.push ("/控制面板/仪表台")
}
</script>

<style scoped lang="scss">
    .big{
        width: 100%;
        height: calc(100vh - 220px);
        background-color: rgb(244,244,244);
        position: relative;
    }
    .inner{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .inner p {
        text-align: center;
        font-size: 24px;
    }
    .inner .leftPic{
        width: 60px;
        height: 60px;
        margin-left: 44%;
        margin-top: 20px;
    }
</style>
