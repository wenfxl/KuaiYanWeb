<template>
  <div class="最底层div">
    <el-form v-loading="is加载中" :inline="false" style="min-width: 80px" label-width="130px" :model="Data"
             :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
      <div class="内容div">
        <el-divider content-position="left">支付宝PC</el-divider>
        <el-form-item label="开关" prop="支付宝开关">
          <el-radio-group v-model="Data.支付宝开关">
            <el-radio-button :label="true" size="" border>开启</el-radio-button>
            <el-radio-button :label="false" size="" border>关闭</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商户ID" disabled="disabled">
          <el-input v-model.trim="Data.支付宝商户ID"/>
        </el-form-item>
        <el-form-item label="商户私钥" disabled="disabled">
          <el-input v-model.trim="Data.支付宝商户私钥"/>
        </el-form-item>
        <el-form-item label="商户私钥" disabled="disabled">
          <el-input v-model.trim="Data.支付宝商户公钥"/>
        </el-form-item>
        <el-form-item label="同步回调url" disabled="disabled">
          <el-input v-model.trim="Data.支付宝同步回调url" placeholder="同步回调地址支持变量`{OrderId}`订单id,`{OrderId2}`第三方订单id,`{User}`用户名,`{Type}`支付方式"/>
        </el-form-item>
      </div>

      <div class="内容div">
        <el-divider content-position="left">微信支付</el-divider>
        <el-form-item label="开关" prop="微信支付开关">
          <el-radio-group v-model="Data.微信支付开关">
            <el-radio-button :label="true" size="" border>开启</el-radio-button>
            <el-radio-button :label="false" size="" border>关闭</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商户ID" disabled="disabled">
          <el-input v-model.trim="Data.微信支付商户ID"/>
        </el-form-item>
        <el-form-item label="商户私钥" disabled="disabled">
          <el-input v-model.trim="Data.微信支付商户密匙"/>
        </el-form-item>
        <el-form-item label="同步回调url" disabled="disabled">
          <el-input v-model.trim="Data.微信支付异步回调url"/>
        </el-form-item>
        <el-form-item label="单次最大金额" disabled="disabled">
          <el-input v-model.trim="Data.微信支付单次最大金额"/>
        </el-form-item>

        <div style="text-align:center">
          <el-button style="width: 15vh; " type="primary" @click="on确定按钮被点击(ruleFormRef)">保存</el-button>
        </div>

      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {GetInfoPay, SaveInfoPay} from "@/api/系统设置api.js";
import {ElMessage, FormInstance} from 'element-plus'
import {is移动端} from "@/utils/utils";


const Data = ref({
  "支付宝开关": false,
  "支付宝商户ID": "20210088888818",
  "支付宝商户私钥": "xxxxxxx",
  "支付宝商户公钥": "666666666666",
  "支付宝同步回调url": "https://www.baidu.com/s?wd=%E5%85%85%E5%80%BC%E6%88%90%E5%8A%9F%E6%9B%B4%E6%96%B0%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF%E6%9F%A5%E7%9C%8B",
  "微信支付开关": false,
  "微信支付商户ID": "1234567",
  "微信支付AppId": "1234567",
  "微信支付商户密匙": "66666666666",
  "微信支付异步回调Url": "6666666666666",
  "微信支付单次最大金额": 500
})

const ruleFormRef = ref<FormInstance>()
const is加载中 = ref(false)
const onGetList = async () => {
  is加载中.value = true
  const res = await GetInfoPay({})
  Data.value = res.data
  is加载中.value = false
}



onMounted(async () => {
  await onGetList()
})
const on确定按钮被点击 = async (formEl: FormInstance | undefined) => {


  if (!formEl) return
  let 表单验证结果 = await formEl.validate((valid, fields) => {
    if (!valid) {
      console.log('参数验证失败', fields)
    } else {
      console.log('参数验证通过')
    }
  })
  console.info("表单验证结果")
  console.info(表单验证结果)
  if (!表单验证结果) return   //如果是假直接返回
  let 返回;
  is加载中.value = true
  返回 = await SaveInfoPay(Data.value);
  is加载中.value = false
  console.log(返回)
  if (返回.code == 10000) {
    ElMessage({
      type: "success",
      message: 返回.msg,
      showClose: true,
    })
  }
}
</script>

<style scoped lang="scss">
.el-table .cell {
  white-space: pre-wrap; /*这是重点。文本换行*/

}

/*.gva-search-box {*/
/*  padding: 24px;*/
/*  padding-bottom: 2px;*/
/*  background-color: #fff;*/
/*  border-radius: 2px;*/
/*  margin-bottom: 12px;*/
/*}*/
.最底层div {
  min-height: calc(100vh - 200px);
  padding: 12px 16px;
  margin:0  2px 10px;
  background: #f0f2f5;
}

.内容div {
  min-height: 20%;
  padding: 12px 16px;
  margin:0  2px 10px;
  background: #ffffff;
}

.搜索框 {
  top: -5px;
  padding:0 0 ;
  margin:0 0  10px;
  align-items: center;
}

.demo-pagination-block {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.el-statistic__number {
  font-size: 18px;
  color: #eebe77;
}

.gva-btn-list {
  border: 1px solid rgb(235, 238, 245);
}

.工具栏 {
  margin: 7px 8px 8px;
  background: #fafafa;
  color: #606266;
  float: right;
  padding-right: 1px;

  .el-icon {
    /*设置边框阴影*/

    font-size: 16px;
    margin-left: 10px;
    padding: 5px;
    ///*边框 1px  颜色 */
    border: 1px solid rgb(235, 238, 245);
    color: #0c0d0e;
    //box-shadow: 2px 2px 3px 0 rgba(45, 75, 74, 0.6);
    speak: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    cursor: pointer; //改变鼠标样式为手型
  }
}


.工具_更多 {
  background-color: #ffffff;
  width: 150px;
  margin:0 ;
  /*边框 1px  颜色 */
  border: 1px solid #ccc;
  /*图层高度  3000  值大一点 会在顶层*/
  z-index: 3000;
  /*定位方式 绝对定位*/
  position: absolute;
  list-style-type: none;
  border-radius: 4px; //设置圆角
  /*设置边框阴影*/
  box-shadow: 2px 2px 3px 0 rgba(45, 75, 74, 0.6);
  padding: 5px 0;
  font-size: 12px;

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

.工具_更多_li {
  list-style-type: none;
  font-size: 12px;
  margin: 0;
  padding: 7px 16px;
  //设置 鼠标悬停时样式
  &:hover {
    background: #889aa4; //改变背景颜色
    cursor: pointer; //改变鼠标样式为手型
  }
}

.el-form-item {
  padding: 0;
  margin: 0 15px 8px 0;
}

.el-table .cell {
  white-space: pre-line;
}

.编辑框 {
  width: 200px;
}

单条信息分组框 {
  padding: 20px 10px 10px 10px;

}
</style>
