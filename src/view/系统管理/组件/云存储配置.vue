<template>
  <div class="最底层div">
    <el-form v-loading="is加载中" :inline="false" style="min-width: 80px" label-width="130px" :model="Data"
             :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
      <div class="内容div">
        <el-form-item label="当前选择" :disabled="true">
          <el-select v-model="Data.当前选择" class="m-2" placeholder="Select" size="">
            <el-option label="通用S3兼容协议"   :value="1"/>
            <el-option label="七牛云对象存储" :value="2"/>
          </el-select>
        </el-form-item>
        <div class="内容div" v-if="Data.当前选择===1">
          <el-divider content-position="left">S3兼容协议
            <el-link href="https://www.minio.org.cn/" target="_blank">推荐MinIO搭建</el-link>
          </el-divider>
          <el-form-item label="Endpoint" :disabled="true">
            <el-input v-model.trim="Data.S3兼容协议.Endpoint" placeholder="play.min.io"/>
          </el-form-item>
          <el-form-item label="AK" :disabled="true">
            <el-input v-model.trim="Data.S3兼容协议.AccessKey" placeholder="请输入AccessKey"/>
          </el-form-item>
          <el-form-item label="SK" disabled="disabled">
            <el-input v-model.trim="Data.S3兼容协议.SecretKey"
                      placeholder="请输入SecretKey"/>
          </el-form-item>
          <el-form-item label="空间名称" disabled="disabled">
            <el-input v-model.trim="Data.S3兼容协议.Bucket"
                      placeholder="请输入空间名称"/>
          </el-form-item>
          <el-form-item label="根文件夹" disabled="disabled">
            <el-input v-model.trim="Data.S3兼容协议.rootPath"
                      placeholder="可空,系统只占用空间下的一个文件夹,不可为根目录,默认'fnkuaiyan/' 尾部带/ "/>
          </el-form-item>
          <el-form-item label="外链域名" disabled="disabled">
            <el-input v-model.trim="Data.S3兼容协议.外链域名"
                      placeholder="(可空) 请输入外链域名"/>
          </el-form-item>
        </div>
        <div class="内容div" v-if="Data.当前选择===2">
          <el-divider content-position="left">七牛云
            <el-link href="https://s.qiniu.com/bIR7Zn" target="_blank">www.qiniu.com</el-link>
          </el-divider>
          <el-form-item label="AK" :disabled="true">
            <el-input v-model.trim="Data.七牛云对象存储.AccessKey" placeholder="请输入AccessKey"/>
          </el-form-item>
          <el-form-item label="SK" disabled="disabled">
            <el-input v-model.trim="Data.七牛云对象存储.SecretKey"
                      placeholder="请输入SecretKey"/>
          </el-form-item>
          <el-form-item label="空间名称" disabled="disabled">
            <el-input v-model.trim="Data.七牛云对象存储.Bucket"
                      placeholder="请输入空间名称"/>
          </el-form-item>
          <el-form-item label="根文件夹" disabled="disabled">
            <el-input v-model.trim="Data.七牛云对象存储.rootPath"
                      placeholder="可空,系统只占用空间下的一个文件夹,不可为根目录,默认'fnkuaiyan/' 尾部带/ "/>
          </el-form-item>
          <el-form-item label="外链域名" disabled="disabled">
            <el-input v-model.trim="Data.七牛云对象存储.外链域名"
                      placeholder="(可空) 请输入外链域名"/>
          </el-form-item>
        </div>
        <div style="text-align:center">
          <el-button style="width: 15vh; " type="primary" @click="on确定按钮被点击(ruleFormRef)">保存</el-button>
        </div>

      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {GetInfoCloudStorage, SaveInfoCloudStorage} from "@/api/系统设置api.js";
import {ElMessage, FormInstance} from 'element-plus'
import {is移动端} from "@/utils/utils";


const Data = ref({
  "当前选择": 2,
  "七牛云对象存储": {
    "AccessKey": "",
    "SecretKey": "",
    "外链域名": "",
    "Bucket": "",
    "rootPath": ""
  },
  "S3兼容协议": {
    "Endpoint": "",
    "AccessKey": "",
    "SecretKey": "",
    "外链域名": "",
    "Bucket": "",
    "rootPath": ""
  }
})

const ruleFormRef = ref<FormInstance>()
const is加载中 = ref(false)
const onGetList = async () => {
  is加载中.value = true
  const res = await GetInfoCloudStorage({})
  Data.value = res.data
  if (!Data.value.当前选择) {
    Data.value.当前选择 = 1
  }
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
  返回 = await SaveInfoCloudStorage(Data.value);
  is加载中.value = false
  console.log(返回)
  if (返回.code == 10000) {
ElMessage.success(返回.msg)
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

  padding: 12px 16px;
  margin: 0 2px 10px;
  background: #f0f2f5;
}

.内容div {
  min-height: 20%;
  padding: 12px 16px;
  margin: 0 2px 10px;
  background: #ffffff;
}

.搜索框 {
  top: -5px;
  padding: 0 0;
  margin: 0 0 10px;
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
  margin: 0;
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

</style>
