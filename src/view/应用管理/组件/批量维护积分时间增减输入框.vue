<template>
  <el-dialog v-model="is对话框可见2"
             :title="Props.标题"
             @open="on对话框被打开"
             width="520"
             draggable="draggable"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;">
      <el-form>
        <el-form-item :label="Props.提示信息">
          <div v-if="isAppType计点()">
          <el-input-number  v-model="输入框值" :precision="0" :step="1" :value-on-clear="0" style="width: auto"/>
            <div>
              <el-button @click="输入框值=0" :style="is移动端()?'width: 5vh':'width: 4vh'">
                归零
              </el-button>
              <el-button @click="输入框值+=10" :style="is移动端()?'width: 9vh':'width: 4vh'">+10</el-button>
              <el-button @click="输入框值+=30" :style="is移动端()?'width: 9vh':'width: 4vh'">+30</el-button>
              <el-button @click="输入框值+=100" :style="is移动端()?'width: 9vh':'width: 4vh'">+100</el-button>
              <el-button @click="输入框值+=500" :style="is移动端()?'width: 9vh':'width: 4vh'">+500</el-button>
            </div>
            <div>
              <el-button @click="输入框值=-输入框值" :style="is移动端()?'width: 5vh':'width: 4vh'">
                负值
              </el-button>
              <el-button @click="输入框值+=1000" :style="is移动端()?'width: 9vh':'width: 4vh'">+1000</el-button>
              <el-button @click="输入框值+=3000" :style="is移动端()?'width: 9vh':'width: 4vh'">+3000</el-button>
              <el-button @click="输入框值+=5000" :style="is移动端()?'width: 9vh':'width: 4vh'">+5000</el-button>
              <el-button @click="输入框值+=10000" :style="is移动端()?'width: 9vh':'width: 4vh'">+10000</el-button>
            </div>
          </div>
          <template v-else>


            <el-tooltip
                class="box-item"
                effect="light"
                :content="(输入框值<0?'负':'')+时间_计算天时分秒提示 (Math.abs(输入框值))"
                placement="left"
            >
              <div>
                <el-config-provider :locale="zhCn">
                  <el-input-number v-model="输入框值" :precision="0" :step="1" :value-on-clear="0" style="width: auto"/>
                </el-config-provider>
                <div >
                    <el-button @click="输入框值=0" :style="is移动端()?'width: 5vh':'width: 4vh'">
                      归零
                    </el-button>
                    <el-button @click="输入框值+=86400" :style="is移动端()?'width: 9vh':'width: 4vh'">+1天</el-button>
                    <el-button @click="输入框值+=86400*3" :style="is移动端()?'width: 9vh':'width: 4vh'">+3</el-button>
                    <el-button @click="输入框值+=86400*30" :style="is移动端()?'width: 9vh':'width: 4vh'">+30</el-button>
                    <el-button @click="输入框值+=86400*365" :style="is移动端()?'width: 9vh':'width: 4vh'">+365</el-button>
                    <el-button @click="输入框值=-输入框值" :style="is移动端()?'width: 5vh':'width: 4vh'">
                      负值
                    </el-button>
                </div>

              </div>
            </el-tooltip>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="is对话框可见2=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {is移动端, 时间_计算天时分秒提示} from "@/utils/utils";
import zhCn from 'element-plus/lib/locale/lang/zh-cn' // 引入中文包

const Props = defineProps({
  is批量维护输入框可见: {
    type: Boolean,
    default: false
  },
  AppType: {
    type: Number,
    default: 1
  },
  提示信息: {
    type: String,
    default: ""
  },
  标题: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['on批量维护输入框被关闭'])

watch(() => Props.is批量维护输入框可见, (newVal, oldVal) => {
  if (newVal) {
    is对话框可见2.value = newVal;
  }
})

const is对话框可见2 = ref(false)
const 输入框值 = ref(0)
const is确认被点击 = ref(false)
const on对话框被打开 = () => {
  is确认被点击.value = false
  输入框值.value=0
}
const on确定按钮被点击 =  () => {
  is确认被点击.value=true;
  is对话框可见2.value=false
}
const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  emit('on批量维护输入框被关闭', is确认被点击.value, 输入框值.value)
  is对话框可见2.value = false
}

const isAppType计点 = () => {
  return Props.AppType === 2 || Props.AppType === 4
}
</script>

<style scoped lang="scss">

.li展示不可修改信息 {
  font-size: 16px;
  margin-left: 10px;
  float: left;
  clear: right;
  width: 100%;
  height: 30px;
  word-wrap: break-word;
  word-break: normal;
}

</style>
