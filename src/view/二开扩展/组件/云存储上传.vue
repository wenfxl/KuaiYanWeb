<template>
  <el-dialog v-model="is显示" :title="'文件上传到->'+Props.path" width="800" @close="on关闭">
    <el-upload
        class="upload-demo"
        drag
        multiple
        ref="upload"
        :action="上传凭证?.Url"
        :before-upload="beforeAvatarUpload"
        :on-success="on上传成功"
        :auto-upload="true"
        :data="上传凭证"
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
import {ref} from "vue";
import {GetUpToken} from "@/api/云存储api";


const is显示 = ref(true)
const is重新读取 = ref(false)
const emit = defineEmits(['on对话框详细信息关闭'])

const Props = defineProps({
  path: {
    type: String,
    default: ""
  }
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

const 上传凭证 = ref<W文件上传凭证>()
//上传前hook
const beforeAvatarUpload = async (file) => {
  const ret = await GetUpToken({"Path": Props.path + file.name});
  console.info(ret)
  if (ret.code != 10000) {
    return false
  }
  上传凭证.value = ret.data
  if (上传凭证.value.Type == 2) {
    上传凭证.value.key = 上传凭证.value.Path
    上传凭证.value.token = 上传凭证.value.UpToken
  }

}
</script>


<style scoped lang="scss">

</style>
