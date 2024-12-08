<template>
  <el-dialog v-model="is显示对话框"
             title="维护用户云配置"
             width="620"
             draggable="draggable"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;" v-loading="is加载中">
      <el-form>
        <el-form-item
            label="被选中Uid数量"
            label-width="120">
          <div>
            <el-text class="mx-1">{{Props.Uids}}</el-text>
          </div>
        </el-form-item>

        <el-form-item
            label="云配置名称"
            label-width="120">
          <div>
            <el-input v-model.trim="PostData.Name"/>
          </div>
        </el-form-item>
        <el-form-item label="配置值" label-width="120">
          <el-input v-model.trim="PostData.Value" placeholder="如果为空则删除"/>
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
import {ElMessage} from "element-plus";
import {Set批量维护_全部用户增减时间点数, Set批量维护置用户云配置} from "@/api/软件用户api"; // 引入中文包
const is加载中 = ref(false)
const is重新读取 = ref(false)
const is显示对话框 = ref(true)
const Props = defineProps({
  AppInfo: {
    type: Object,
    default: {}
  },
  Uids: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['on批量维护输入框被关闭'])
const PostData = ref({
  AppId: 0,
  Uid: [],
  Name: "",
  Value: "",
})

const on确定按钮被点击 = async () => {
  if (!PostData.value.Name) {
    ElMessage.error("配置名不能为空"   )
    return
  }

  PostData.value.AppId = Props.AppInfo.AppId
  PostData.value.Uids = Props.Uids
  console.log("on确定按钮被点击")
  console.log(PostData.value)
  let 返回 = await Set批量维护置用户云配置(PostData.value);
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
})
</script>
