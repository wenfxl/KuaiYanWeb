<template>
  <el-dialog v-model="is显示" title="APK加固创建任务"  :width="is移动端()?'90%':'50%'" @close="on关闭">
    <el-form label-width="70px">
      <el-form-item label="选择APK">
        <el-upload
            class="upload-demo"
            drag
            multiple
            ref="upload"
            :action="上传凭证?.Url"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :on-exceed="on上传数量超限制"
            :on-change="on文件状态被改变"
            :on-success="on上传成功"
            :auto-upload="false"
            accept="application/vnd.android.package-archive"
            :data="上传凭证"
            style="width: 100%;"
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            将apk文件拖放到此处或<em>点击上传</em>最大100Mb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="选择应用" prop="">
        <el-select v-model.number="FormData.AppId" clear placeholder="请选择应用" filterable style="width: 100%;">
          <el-option v-for="(item,index) in 数组AppId_Name" :key="item.Appid"
                     :label="item.AppName+'('+item.Appid.toString()+')'" :value="item.Appid"/>
        </el-select>
      </el-form-item>
      <!-- ... existing code ... -->
      <el-form-item label="签名方式">
        <el-select v-model="FormData.签名方式" placeholder="请选择签名方式" style="width: 100%;">
          <el-option label="不签名" :value="1"/>
          <el-option label="随机签名" :value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Activity">
        <el-input v-model="FormData.Activity" placeholder="指定添加到的窗口,可空,默认首屏" style="width: 100%;">
        </el-input>
      </el-form-item>


      <!-- ... existing code ... -->
    </el-form>
    <div>

        <el-link href="https://www.fnkuaiyan.cn/%E6%8C%87%E5%8D%97/Apk%E5%8A%A0%E9%AA%8C%E8%AF%81.html"
                 target="_blank">
          常见导致加验证后闪退问题
          <el-icon size="24">
            <Link/>
          </el-icon>
        </el-link>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="on创建任务">开始加验证</el-button>
        <el-button type="info" @click="is显示=false">关 闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {UploadFilled} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";

import {GetAppIdNameList} from "@/api/应用列表api";
import { GetUploadToken, CreateApkAddFNKYTask} from "@/api/Apk加验证";
import {ElMessage, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {UploadFile, UploadFiles} from "element-plus/es/components/upload/src/upload";
import {is移动端} from "@/utils/utils";

const is显示 = ref(true)
const is重新读取 = ref(false)

const FormData = ref({
  fileName: "",
  签名方式: 2,
  AppId: 10000,
  Activity: "",
})

const emit = defineEmits(['on对话框详细信息关闭'])

onMounted(() => {
  is显示.value = true
  onGetAppIdNameList()
})
const MapAppId_Name = ref({})
const 数组AppId_Name = ref([{
  "Appid": 10000,
  "AppName": ""
}])
const onGetAppIdNameList = async () => {
  let res = await GetAppIdNameList()
  数组AppId_Name.value = res.data.Array
  MapAppId_Name.value = res.data.Map
  console.log("没有搜索条件的应用,修改第一个,现在搜索条件的值为:" + res.data.Map[FormData.value.AppId.toString()])
  if (res.data.Map[FormData.value.AppId.toString()] == null || FormData.value.AppId <= 10000) {
    let 局_默认appid=Store.state.搜索_默认选择应用AppId
    对象_搜索条件.value.AppId = 数组AppId_Name.value.some(item => item.Appid === 局_默认appid)?局_默认appid:数组AppId_Name.value[0].Appid
  }
}
const on上传成功 = async (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
//{"name":"火山程序.apk","percentage":100,"status":"success","size":220117,"raw":{"uid":1737344416100},"uid":1737444446100,"response":{"hash":"Fnf2Aol-0k5FX9FtK7PJ0A7MX-AW","key":"fnkuaiyan/aaaaaa/火山程序.apk"}}

  let json = FormData.value
  json.uploadFile=uploadFile
  json.Path=response.key
  json.fileName=uploadFile.name
  let res = await CreateApkAddFNKYTask(json)
  console.log(res)
  if (res.code == 10000) {
    is重新读取.value=true
    is显示.value=false
  }

}

const upload = ref<UploadInstance>()

const on上传数量超限制: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file) //更换当前上传的为新文件
}

const on文件状态被改变: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (uploadFile.status === 'ready') {
    if (!uploadFile?.raw) {
      return false;
    }
    const isApk = uploadFile.raw.type === 'application/vnd.android.package-archive';
    const isLt100M = uploadFile?.raw.size / 1024 / 1024 < 100;
    if (!isApk) {
      ElMessage.error('只能上传 APK 文件!');
      upload.value!.clearFiles(); // 清除不符合条件的文件
    }
    if (!isLt100M) {
      ElMessage.error('上传 APK 文件大小不能超过 100MB!');
      upload.value!.clearFiles(); // 清除不符合条件的文件
    }
  }
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
  const isApk = file.type === 'application/vnd.android.package-archive';
  const isLt100M = file.size / 1024 / 1024 < 100;

  if (!isApk) {
    ElMessage.error('只能上传 APK 文件!');
    return false
  }
  if (!isLt100M) {
    ElMessage.error('上传 APK 文件大小不能超过 100MB!');
    return false
  }
  const ret = await GetUploadToken({"Path": file.name});
  console.info(ret)
  if (ret.code != 10000) {
    return false
  }
  上传凭证.value = ret.data
  if (上传凭证.value?.Type == 2) {
    上传凭证.value.key = 上传凭证.value.Path
    上传凭证.value.token = 上传凭证.value.UpToken
  }
}


const on创建任务 = () => {
  upload.value!.submit()
}

</script>

<style scoped lang="scss">
</style>
