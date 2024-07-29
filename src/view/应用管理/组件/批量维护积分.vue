<template>
  <el-dialog v-model="is显示对话框"
             title="批量维护用户积分"
             width="620"
             draggable="draggable"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;" v-loading="is加载中">
      <el-form>


        <el-form-item
            label="增减积分"
            label-width="120">
          <div>
            <el-input-number v-model="PostData.Number" :precision="0" :step="1" :value-on-clear="0"
                             style="width: auto"/>
            <div>
              <el-button @click="PostData.Number=0" :style="is移动端()?'width: 5vh':'width: 4vh'">
                归零
              </el-button>
              <el-button @click="PostData.Number+=10" :style="is移动端()?'width: 9vh':'width: 4vh'">+10</el-button>
              <el-button @click="PostData.Number+=30" :style="is移动端()?'width: 9vh':'width: 4vh'">+30</el-button>
              <el-button @click="PostData.Number+=100" :style="is移动端()?'width: 9vh':'width: 4vh'">+100</el-button>
              <el-button @click="PostData.Number+=500" :style="is移动端()?'width: 9vh':'width: 4vh'">+500</el-button>
            </div>
            <div>
              <el-button @click="PostData.Number+=1000" :style="is移动端()?'width: 9vh':'width: 4vh'">+1000</el-button>
              <el-button @click="PostData.Number+=3000" :style="is移动端()?'width: 9vh':'width: 4vh'">+3000</el-button>
              <el-button @click="PostData.Number+=5000" :style="is移动端()?'width: 9vh':'width: 4vh'">+5000</el-button>
              <el-button @click="PostData.Number+=10000" :style="is移动端()?'width: 9vh':'width: 4vh'">+10000
              </el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="原因" label-width="120">
          <el-input v-model.trim="PostData.Note" style="width: 270px" placeholder="可空"/>
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
import {Set批量维护_全部用户增减时间点数, Set批量维护增减积分} from "@/api/软件用户api"; // 引入中文包
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
  Id: [],
  Number: 0,
  Note: "",
})

const on确定按钮被点击 = async () => {
  if (!PostData.value.Number) {
    ElMessage.error("修改值不能为:" + PostData.value.Number)
    return
  }


  PostData.value.AppId = Props.AppInfo.AppId
  PostData.value.Id = Props.AppInfo.ids
  PostData.value.Number = parseInt(PostData.value.Number.toString())
  console.log("on确定按钮被点击")
  console.log(PostData.value)

  let 返回 = await Set批量维护增减积分(PostData.value);
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
