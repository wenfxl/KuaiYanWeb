<template>
  <el-dialog v-model="is显示" title="文件上传" width="800" @close="on关闭">

    <div style=" display: flex;">
      <el-text size="large" style="width: 50px">地址:</el-text>
      <el-input type="text" size="small" v-model="path" @blur="on失去焦点" />
    </div>


    <el-upload
        class="upload-demo"
        drag
        multiple
        ref="upload"
        :before-upload="beforeAvatarUpload"
        :on-success="on上传成功"
        :data="上传凭证"
        :http-request="on自定义上传方法"
        :auto-upload="true"
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        将文件拖放到此处或<em>点击上传</em>
      </div>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="is显示=false">关 闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {UploadFilled} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import {GetUpToken} from "@/api/云存储api";
import axios from "axios";


const is显示 = ref(true)
const is重新读取 = ref(false)
const path = ref("")
const emit = defineEmits(['on对话框详细信息关闭'])

const Props = defineProps({
  path: {
    type: String,
    default: ""
  }
})
onMounted(() => {
  is显示.value = true
  path.value = Props.path
})

const on上传成功 = (data: any) => {
  is重新读取.value = true
}

const on关闭 = () => {
  // console.info("关闭")
  emit('on对话框详细信息关闭', is重新读取.value)
}

// 上传凭证
interface W文件上传凭证 {
  Path: string  // 对象路径
  Type: number // 对象类型  1:自身 2:七牛云
  Url: string   // 上传url
  UpToken: string // UpToken
  token: string // UpToken
  key: string // UpToken
}

const 上传凭证 = ref<W文件上传凭证>({
  Path: "",
  Type: 0,      //1 通用s3兼容协议  2 七牛云
  Url: "",
  UpToken: "",
  token: "",
  key: ""
})
const on自定义上传方法 = async (options) => {
  const { file, onProgress, onSuccess, onError } = options; // 解构进度回调
  const formData = new FormData();

  try {
    // S3协议上传
    if(上传凭证.value.Type === 1){
      await axios.put(上传凭证.value.Url, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (progressEvent) => {
          // 计算并触发进度更新
          const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress({ percent }); // 关键：触发进度条更新
        }
      });
      onSuccess({ code: 10000 }); // 触发成功回调
      return;
    }

    // 七牛云上传
    if(上传凭证.value.Type === 2){
      formData.append('file', file);
      formData.append('token', 上传凭证.value.token); // 新增
      formData.append('key', 上传凭证.value.key); // 新增
      await axios.post(上传凭证.value.Url, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress({ percent });
        }
      });
      onSuccess({ code: 10000 });
      return;
    }
  } catch (error) {
    onError(error); // 触发错误回调
  }
}

//上传前hook
const beforeAvatarUpload = async (file) => {
  const ret = await GetUpToken({"Path": path.value + file.name});
  console.info(ret)
  if (ret.code != 10000) {
    return false
  }
  switch (ret.data.Type) {
    case 1:
      // S3协议应仅使用预签名URL
      上传凭证.value = {
        Url: ret.data.Url,
        Path: "",
        Type: 1,
        UpToken: "",
        token: "",
        key: ret.data.Path
      }
      break;
    case 2:
      上传凭证.value.Url = ret.data.Url
      上传凭证.value.Type = 2
      上传凭证.value.UpToken = ret.data.UpToken
      上传凭证.value.key = ret.data.Path
      上传凭证.value.token = ret.data.UpToken
      break;
  }
}

const on失去焦点 = () => {
  path.value=path.value.trim()
  if (path.value !== "" && path.value.substring(path.value.length - 1) !== "/" ) {
    path.value += "/"
  }
}


</script>


<style scoped lang="scss">

</style>
