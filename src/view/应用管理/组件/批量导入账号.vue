<template>
  <el-dialog v-model="is显示对话框"
             title="批量导入软件用户"
             width="800"
             draggable="draggable"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;" v-loading="is加载中">
      <el-form>
        <el-form-item label="AppId" label-width="120">
          <el-input v-model.trim="Props.AppInfo.AppId" disabled style="width: 270px" class="只读编辑框"
                    placeholder="可空"/>
        </el-form-item>
        <el-form-item label="格式" label-width="120">
          <text v-if="Props.AppInfo.AppType<=2">账号|密码|到期时间|积分|绑定信息</text>
          <text v-else>卡号|到期时间|积分|绑定信息</text>
        </el-form-item>
        <el-form-item label="数据一行一个" label-width="120">
          <el-input type="textarea" v-model="PostData.Note" :rows="10"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer" v-loading="is加载中">
        <el-button @click="is显示对话框=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {is移动端, 时间_计算天时分秒提示} from "@/utils/utils";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {SaveApp信息} from "@/api/应用列表api";
import {ElMessage} from "element-plus";
import {Del批量维护_导入软件用户, Set批量维护_全部用户增减时间点数, Set批量维护增减积分} from "@/api/软件用户api"; // 引入中文包
const is加载中 = ref(false)
const is重新读取 = ref(false)
const is显示对话框 = ref(true)
const Props = defineProps({
  AppInfo: {
    type: Object,
    default: {}
  }
})
const emit = defineEmits(['on批量维护输入框被关闭'])
const PostData = ref({
  AppId: 0,
  Note: "",
})

// 校验时间格式的辅助函数
const isValidTimeFormat = (timeStr: string): boolean => {
  // 支持时间戳格式（10位数字）
  if (/^\d{10}$/.test(timeStr)) {
    return true
  }

  // 支持日期时间格式
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
  if (dateTimeRegex.test(timeStr)) {
    const timestamp = Date.parse(timeStr.replace(/-/g, '/'))
    return !isNaN(timestamp)
  }

  return false
}

// 校验数字格式的辅助函数
const isValidNumber = (str: string): boolean => {
  // 使用正则表达式校验是否为有效的数字格式（包括整数和小数）
  const numberRegex = /^-?(\d+\.?\d*|\.\d+)$/
  if (!numberRegex.test(str)) {
    return false
  }

  const num = Number(str)
  return !isNaN(num) && isFinite(num)
}
const on确定按钮被点击 = async () => {
  PostData.value.AppId = Props.AppInfo.AppId
  // 先在本地校验一次
  const lines = PostData.value.Note.split('\n').filter(line => line.trim() !== '')
  const appType = Props.AppInfo.AppType
  // 校验字段数量和重复项
  const usernames = new Set()
  for (let i = 0; i < lines.length; i++) {
    const fields = lines[i].split('|')
    // 根据AppType校验字段数量
    if ((appType <= 2 && fields.length !== 5) || (appType > 2 && fields.length !== 4)) {
      ElMessage.error(`第${i + 1}行数据格式错误， | 分割符号数量不正确`)
      return
    }
    // 检查用户名或卡号是否重复
    const username = fields[0].trim()
    if (usernames.has(username)) {
      ElMessage.error(`第${i + 1}行用户名或卡号重复: ${username}`)
      return
    }
    usernames.add(username)
    // 校验时间格式
    const timeFieldIndex = appType <= 2 ? 2 : 1
    const timeStr = fields[timeFieldIndex].trim()
    if (!isValidTimeFormat(timeStr)) {
      ElMessage.error(`第${i + 1}行时间格式错误: ${timeStr}`)
      return
    }
  }


  is加载中.value = true
  let 返回 = await Del批量维护_导入软件用户(PostData.value);
  is加载中.value = false
  console.log(返回)
  if (返回.code == 10000) {
    is重新读取.value = true
    is显示对话框.value = false
    ElMessage.success(返回.msg)
  }
}
const on对话框被关闭 = () => {
  emit('on批量维护输入框被关闭', is重新读取.value)
}
onMounted(() => {
  if (Props.AppInfo.AppType<=2) {
    PostData.value.Note = "aaaccc|z123456|2025-10-01 12:00:00|66|绑定信息\naaabbb|z123456|2025-10-01 12:00:00|66|绑定信息"
  }else {
    PostData.value.Note = "aaaaaadwad|2025-10-01 12:00:00|66|机器码\naaadwdwaaa|2025-10-01 12:00:00|66|机器码"
  }
})
</script>
