<template>
  <el-dialog v-model="is显示对话框"
             :title="isAppType计点?'批量维护_全部用户增减修改点数':'批量维护_全部用户增减修改时间'"
             width="620"
             draggable="draggable"
             @close="on对话框被关闭">
    <div style="overflow:auto;padding:0 12px;" v-loading="is加载中">
      <el-form>
        <el-form-item label="AppId:" label-width="120">
          <el-text>{{ Props.AppInfo.AppId }}</el-text>
        </el-form-item>
        <el-form-item label="应用名称:" label-width="120">
          <el-text>{{ Props.AppInfo.AppName }}</el-text>
        </el-form-item>
        <el-form-item label="操作类型:" label-width="120">
          <el-radio-group v-model="PostData.AddType">
            <el-radio-button :label="1">增加{{ 时间or点数 }}</el-radio-button>
            <el-radio-button :label="2">减少{{ 时间or点数 }}</el-radio-button>
            <el-radio-button :label="3">指定{{ 时间or点数 }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="修改为指定到期时间" v-if="PostData.AddType===3 && AppType===1">
          <el-config-provider :locale="zhCn">
            <el-date-picker
                v-model="PostData.Number"
                value-format="X"
                type="datetime"
            />
          </el-config-provider>
        </el-form-item>


        <el-form-item
            v-else
            :label="(PostData.AddType===1?'增加':PostData.AddType===2?'减少':PostData.AddType===3?'指定':'异常AddType')+(AppType===2 ? '点数:':'会员时间:')"
            label-width="120">

          <div v-if="isAppType计点">
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
          <template v-else>
            <el-tooltip
                class="box-item"
                effect="light"
                :content="时间_计算天时分秒提示 (Math.abs(PostData.Number))"
                placement="left"
            >
              <div>
                <el-config-provider :locale="zhCn">
                  <el-input-number v-model="PostData.Number" :precision="0" :step="1" :value-on-clear="0"
                                   style="width: auto"/>
                </el-config-provider>
                <div>
                  <el-button @click="PostData.Number=0" :style="is移动端()?'width: 5vh':'width: 4vh'">
                    归零
                  </el-button>
                  <el-button @click="PostData.Number+=86400" :style="is移动端()?'width: 9vh':'width: 4vh'">+1天
                  </el-button>
                  <el-button @click="PostData.Number+=86400*3" :style="is移动端()?'width: 9vh':'width: 4vh'">+3
                  </el-button>
                  <el-button @click="PostData.Number+=86400*30" :style="is移动端()?'width: 9vh':'width: 4vh'">+30
                  </el-button>
                  <el-button @click="PostData.Number+=86400*365" :style="is移动端()?'width: 9vh':'width: 4vh'">+365
                  </el-button>
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-form-item>
        <el-form-item label="账号状态:" label-width="120">
          <el-radio-group v-model="PostData.UserVipTimeStatus">
            <el-radio-button :label="1">全部</el-radio-button>
            <el-radio-button :label="2">{{ AppType === 2 ? "无点数" : "会员已到期" }}</el-radio-button>
            <el-radio-button :label="3">{{ AppType === 2 ? "有点数" : "会员未过期" }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="isAppType卡号?'卡号前缀:':'账号前缀:'" label-width="120">
          <el-input v-model.trim="PostData.UserPrefix" style="width: 270px" placeholder="可空"/>
        </el-form-item>
        <el-form-item label="用户类型" label-width="120">
          <el-select
              v-model="PostData.UserClassId"
              multiple
              value-key="id"
              placeholder="可空"
              style="width: 240px"
          >
            <el-option v-for="(item,index) in Props.UserClassId" :key="item.Id"
                       :label="item.Name" :value="item.Id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="首次登录时间" label-width="120">
          <el-config-provider :locale="zhCn">
            <el-date-picker
                v-model="首次登录时间数组"
                value-format="X"
                type="daterange"
                unlink-panels
                range-separator="到"
                start-placeholder="制卡开始日期"
                end-placeholder="制卡结束日期"
                :shortcuts="数组_制卡预选日期"
            />
          </el-config-provider>
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
import {Set批量维护_全部用户增减时间点数} from "@/api/软件用户api"; // 引入中文包
const 时间or点数 = ref("时间")
const AppType = ref(1)
const is加载中 = ref(false)
const is重新读取 = ref(false)
const is显示对话框 = ref(true)
const 数组_制卡预选日期 = [{
  text: '今天',
  value: () => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000);
    return [start, end]
  }
}, {
  text: '最近1天',
  value: () => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24);
    return [start, end]
  }
},
  {
    text: '最近1周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近1个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近3个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const Props = defineProps({
  AppInfo: {
    type: Object,
    default: {}
  },
  UserClassId: {
    type: Object,
    default: []
  }
})
const emit = defineEmits(['on批量维护输入框被关闭'])
const PostData = ref({
  AppId: 0,
  AddType: 1,
  Number: 0,
  UserVipTimeStatus: 1,
  UserPrefix: "",
  OneLoginTimeStart: 0,
  OneLoginTimeEnd: 0,
  UserClassId: [],
})
const 首次登录时间数组 = ref(["", ""])


/*
type 结构请求_全部用户增减时间点数 struct {
  AppId             int    `json:"AppId"`
  AddType           int    `json:"AddType"`           //操作类型  1减少时间或点数  2 增加时间或点数  3指定到期时间或点数
  Number            int64  `json:"Number"`            //如果为增减时间为增减数值   执行时间或电视,为到期时间戳或点数
  UserVipTimeStatus int    `json:"UserVipTimeType"`   //账号到期状态 1 全部 2已到期 2未到期
  UserPrefix        string `json:"UserPrefix"`        //用户或卡号前缀,空为不限制
  OneLoginTimeStart int    `json:"OneLoginTimeStart"` //首次登录区时间戳开始 0为不限制
  OneLoginTimeEnd   int    `json:"OneLoginTimeEnd"`   //首次登录区时间戳结束 0为不限制
}
*/


const on确定按钮被点击 = async () => {
  if (!PostData.value.Number) {
    ElMessage.error("修改值不能为:" + PostData.value.Number)
    return
  }


  PostData.value.AppId = Props.AppInfo.AppId
  PostData.value.Number = parseInt(PostData.value.Number.toString())
  PostData.value.OneLoginTimeStart = parseInt(首次登录时间数组.value[0] == null ? "0" : 首次登录时间数组.value[0])
  PostData.value.OneLoginTimeEnd = parseInt(首次登录时间数组.value[1] == null ? "0" : 首次登录时间数组.value[1])
  console.log("on确定按钮被点击")
  console.log(PostData.value)

  let 返回 = await Set批量维护_全部用户增减时间点数(PostData.value);
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

const isAppType计点 = computed(() => {
  if (Props.AppInfo.AppType == 2 || Props.AppInfo.AppType == 4) {
    return true
  }
  return false
})
const isAppType卡号 = computed(() => {
  if (Props.AppInfo.AppType == 3 || Props.AppInfo.AppType == 4) {
    return true
  }
  return false
})
onMounted(() => {
  console.log("onMounted")
  console.log(Props.AppInfo)
  console.log(isAppType计点.value)
  时间or点数.value = isAppType计点.value ? "点数" : "时间"
  AppType.value = isAppType计点.value ? 2 : 1
})

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
