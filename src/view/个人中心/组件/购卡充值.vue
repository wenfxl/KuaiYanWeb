<template>
  <div v-loading="is加载中">
    <el-card>
      <el-form label-width="120px">
        <div style="align-items: center ">
          <el-form-item label="购买充值卡">
            <el-select v-model="选择充值卡Id" placeholder="请选择要购买的充值卡">
              <el-option
                  v-for="item in 数组_可购买充值卡"
                  :key="item.Id"
                  :label="item.Name+' => ¥'+item.Money"
                  :value="item.Id"
              >
                <span style="float: left">{{ item.Name }}</span>
                <span
                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                >¥{{ item.Money }}</span
                >
              </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 5px" @click="on购买充值卡(选择充值卡Id)">立即购买</el-button>
            <el-button @click="on刷新购买记录">购买记录</el-button>
          </el-form-item>
        </div>


        <el-divider/>

        <div style="align-items: center ">
          <el-form-item label="使用充值卡" style="width: 100%">
            <el-input v-model.trim="局_使用充值卡" placeholder="请输入卡号"></el-input>
          </el-form-item>
          <el-form-item label="推荐人账号" style="width: 100%">
            <el-tooltip
                :trigger-keys="[]"
                content="获取奖励，记得把自己的帐号告诉他哦。"
                effect="dark"
                placement="right">
              <el-input  v-model="推荐人账号"
                  placeholder="填写推荐人帐号，他也奖励时间,推荐越多奖励越多。填自己无效。赶快帮助更多人，获取奖励，记得把自己的帐号告诉他哦。"></el-input>
            </el-tooltip>

          </el-form-item>
        </div>
        <div style="text-align:center">
          <el-button style="width: 15vh;" @click="on使用充值卡充值" type="primary">充值</el-button>
        </div>
      </el-form>
      <div style="margin-top: 5px">
        <el-table v-loading="is加载中" :data="数组_已购买充值卡" border style="width: 100% ;white-space: pre-wrap;"
                  ref="tableRef"
                  :max-height="2000"
                  v-if="数组_已购买充值卡.length>0"
                  :header-cell-style="{background:'#FAFAFAFF',color:'#606266'}">

          <el-table-column prop="Name" label="卡号" width="260" show-overflow-tooltip="">
            <template #default="scope">
              <el-icon class="复制按钮" @click="置剪辑版文本(scope.row.Name,'已复制到剪辑版')">
                <DocumentCopy/>
              </el-icon>
              {{ scope.row.Name }}
            </template>
          </el-table-column>
          <el-table-column prop="KaClassName" label="卡类名称" width="150"/>
          <el-table-column prop="Num" label="已用/最大" width="85">
            <template #default="scope">
              <el-tag
                  :type="scope.row.Num<scope.row.NumMax?'':'warning'">
                {{ scope.row.Num.toString() + '/' + scope.row.NumMax.toString() }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="RegisterTime" label="制卡时间" width="160">
            <template #default="scope">
              {{ 时间_时间戳到时间(scope.row.RegisterTime) }}
            </template>
          </el-table-column>


          <template v-slot:empty>
            <div slot="empty" style="text-align: left;">
              <el-empty description="居然没有数据啊"/>
            </div>
          </template>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {快验取可购买充值卡, 余额购买充值卡, 购买充值卡记录, 使用充值卡} from "@/api/快验个人中心api.js";
import {ElMessage} from "element-plus";
import {时间_时间戳到时间, 置剪辑版文本} from "@/utils/utils";
import {useStore} from "vuex";

const Store = useStore()
const Props = defineProps({
  UserInfo: {
    type: Object,
    default: {
      User: "13888888888",
      UserType: "扶持Vip",
      VipNumber: 180.00,
      RMB: 180.01,
      VipTime: 1685678065,
      Email: "13888888888@qq.com",
    }
  }
})


const 选择充值卡Id = ref(0)

const 数组_可购买充值卡 = ref([])
const 数组_已购买充值卡 = ref([])

const on快验取可购买充值卡 = async () => {


  if (Store.state.搜索_个人中心.数组_可购买充值卡.length === 0) {
    let 返回 = await 快验取可购买充值卡({})
    console.info("快验取可购买充值卡")
    console.info(返回)
    if (返回.code === 10000) {
      let 临时 = Store.state.搜索_个人中心
      临时.数组_可购买充值卡 = 返回.data
      Store.commit("set搜索_个人中心", 临时)
    }
  }

  数组_可购买充值卡.value = Store.state.搜索_个人中心.数组_可购买充值卡
  if (数组_可购买充值卡.value.length > 0) {
    选择充值卡Id.value = 数组_可购买充值卡.value[0].Id
  }

}
const is加载中 = ref(false)
const 局_使用充值卡 = ref("")
const 推荐人账号 = ref("")
const emit = defineEmits(['on更新个人信息'])

const on使用充值卡充值 = async () => {

  if (局_使用充值卡.value.length>20) {
    is加载中.value = true
    let 返回 = await 使用充值卡({Ka: 局_使用充值卡.value,InviteUser:推荐人账号.value})
    is加载中.value = false
    console.info("on使用充值卡充值")
    console.info(返回)
    if (返回.code === 10000) {
      emit('on更新个人信息')
      await on充值卡记录加一(局_使用充值卡.value)
     ElMessage.success(返回.msg)

    }
  }else {
    ElMessage.error("卡号不存在")
  }
}
const on购买充值卡 = async (Id) => {
  if (Id > 0) {
    is加载中.value = true
    let 返回 = await 余额购买充值卡({KaCLassId: Id})
    is加载中.value = false
    console.info("余额购买充值卡")
    console.info(返回)
    if (返回.code === 10000) {
      局_使用充值卡.value = 返回.data.KaName

     ElMessage.success(返回.msg)
      if (数组_已购买充值卡.value.length>0){
        await on刷新购买记录()
      }

    }
  }
}
const on充值卡记录加一 = async (卡号:string) => {
  for (let i=0;i<数组_已购买充值卡.value.length;i++){
    if (数组_已购买充值卡.value[i].Name===卡号){
      数组_已购买充值卡.value[i].Num++
    }
  }
}

const on刷新购买记录 = async () => {

  is加载中.value = true
  let 返回 = await 购买充值卡记录({})
  is加载中.value = false
  console.info("购买充值卡记录")
  console.info(返回)
  if (返回.code === 10000) {
    数组_已购买充值卡.value = 返回.data
  }
}
onMounted(() => {
  on快验取可购买充值卡()
})
</script>

<style scoped>
</style>
