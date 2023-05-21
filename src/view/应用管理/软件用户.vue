<template>
  <div class="最底层div">
    <div class="内容div" style="align-items: center ">
      <el-form :inline="true">
        <el-form-item label="选择应用" prop="" style="width:300px">
          <el-select v-model.number="对象_搜索条件.AppId" clear placeholder="请选择应用" @change="on读取列表">
            <el-option v-for="(item,index) in 数组AppId_Name" :key="item.Appid"
                       :label="item.AppName+'('+item.Appid.toString()+')'" :value="item.Appid"/>
          </el-select>
        </el-form-item>

        <el-form-item :label="isAppType计点()?'剩余点数':'vip时间'" prop="status" style="width:140px">
          <el-select v-model="对象_搜索条件.Status" clear placeholder="全部">
            <el-option key="0" label="全部" :value="0"/>
            <el-option key="1" :label="isAppType计点()?'有点':'正常'" :value="1"/>
            <el-option key="2" :label="isAppType计点()?'无点':'到期'" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="搜索框"
                    v-model="对象_搜索条件.Keywords"
                    placeholder="搜索内容"
                    style="top:0 ; width: 200px;padding: 0;margin: 0"
                    clearable
          >
            <template #prepend>
              <el-select v-model="对象_搜索条件.Type" placeholder="用户名Id" style="width: 100px;">
                <el-option label="Id" :value="1"/>
                <el-option :label="isAppType卡号()?'卡号Id':'用户名Id'" :value="2"/>
                <el-option :label="isAppType卡号()?'卡号':'用户名'" :value="3"/>
                <el-option label="绑定信息" :value="4"/>
                <el-option label="软件用户备注" :value="5"/>
              </el-select>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item style="padding-left: 5px">
          <el-button type="primary" icon="search" @click="on读取列表">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="内容div">
      <div class="gva-btn-list" style="background:#FAFAFAFF">
        <el-button icon="Plus" type="primary" style="margin: 8px 8px 8px; width: 65px" @click="on对话框详细信息打开(0)">
          新增
        </el-button>

        <el-popconfirm title="确定删除勾选软件用户?" width="200" @confirm="on批量删除" confirm-button-text="确定"
                       cancel-button-text="取消">
          <template #reference>
            <el-button icon="warning" type="danger" style="margin: 8px 8px 8px;; width: 65px"
                       :disabled=is批量删除禁用>删除
            </el-button>
          </template>
        </el-popconfirm>

        <div class="工具栏">
          <el-tooltip content="刷新"
                      effect="dark"
                      placement="top">
            <el-icon @click="on读取列表">
              <RefreshRight/>
            </el-icon>
          </el-tooltip>

          <!--          <el-popover placement="right"  trigger="hover">-->
          <!--            <template #reference>-->
          <!--              <el-icon  ><More /></el-icon>-->
          <!--            </template>-->
          <!--            <li class="工具_更多_li"  @click="on删除已注销" >删除已注销</li>-->
          <!--          </el-popover>-->
        </div>
      </div>

      <el-table v-loading="is加载中" :data="Data.List" border style="width: 100% ;white-space: pre-wrap;"
                ref="tableRef"
                :max-height="tableHeight"
                @selection-change="on选择框被选择"
                :header-cell-style="{background:'#FAFAFAFF',color:'#606266'}">
        <el-table-column type="selection" width="45"/>
        <el-table-column prop="Id" label="Id" width="50"/>
        <!--        <el-table-column prop="Uid" label="用户id" width="100"/>-->
        <el-table-column :label="isAppType卡号()?'卡号':'用户名'" :width="isAppType卡号()?280:110">
          <template #default="scope">
            {{ isAppType卡号() ? scope.row.Name : scope.row.User }}
          </template>
        </el-table-column>

        <el-table-column align="left" label="本软件状态" prop="status" width="110">
          <template #default="scope">
            <el-switch
                :active-value="1"
                :inactive-value="2"
                v-model="scope.row.Status"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-text="正常"
                inactive-text="冻结"
                @change="on冻结状态被改变(scope.$index,scope.row.Id,scope.row.Status)"
            />
          </template>
        </el-table-column>


        <el-table-column prop="Key" label="绑定信息" width="300"/>

        <el-table-column align="left" :label="isAppType计点()?'剩余点数':'vip到期时间'" prop="VipTime" width="160">
          <template #default="scope">
            <el-tag v-if="isAppType计点()" :type="scope.row.VipTime===0?'warning':''">
              {{ scope.row.VipTime }}
            </el-tag>

            <el-tag v-else :type="on时间_是否过期(scope.row.VipTime)?'warning':''">
              {{ on格式化_时间(scope.row.VipTime) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="Note" label="软件用户备注" width="200"/>
        <el-table-column prop="UserClassId" label="用户类型" width="140">
          <template #default="scope">
            <el-tag
                :type="scope.row.UserClassId!==0?对象_用户类型.hasOwnProperty(scope.row.UserClassId.toString())?'':'danger':'warning'">
              <!--              {{ scope.row.UserClassId === 0 ? '未分类' : 对象_用户类型[scope.row.UserClassId.toString()] }}-->
              {{
                !对象_用户类型.hasOwnProperty(scope.row.UserClassId.toString()) ? '已删待改' : 对象_用户类型[scope.row.UserClassId.toString()]
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="MaxOnline" label="最大在线数量" width="110"/>
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="scope">
            <el-button link type="primary" size="default" @click="on单个编辑(scope.row.Id)" style="color:#79bbff">
              <el-icon color="#79bbff" class="no-inherit">
                <Edit/>
              </el-icon>
              编辑
            </el-button>
            <!--            <el-button link type="primary" size="default" @click="on单个删除(scope.row.Id)" style="color:#f56d6d">-->
            <!--              <el-icon color="#f56d6d" class="no-inherit">-->
            <!--                <Delete/>-->
            <!--              </el-icon>-->
            <!--              删除-->
            <!--            </el-button>-->
          </template>
        </el-table-column>
              <template v-slot:empty >
          <div slot="empty"   style="text-align: left;">
            <el-empty description="居然没有数据啊" />
          </div>
        </template>
      </el-table>

      <div class="demo-pagination-block">

        <el-config-provider :locale="zhCn">
          <el-pagination
              v-model:current-page="对象_搜索条件.Page"
              v-model:page-size="对象_搜索条件.Size"
              :page-sizes="[10, 20, 30, 40,50]"
              small="small"
              :layout="is移动端()?'total,prev, pager, next':'total, sizes, prev, pager, next, jumper'"
              :pager-count="is移动端()?5:9"
              :total="parseInt( Data.Count)"
              @current-change="on读取列表"
          />
        </el-config-provider>
      </div>

    </div>
  </div>
  <AppUserinfo :is对话框可见="is对话框可见" :id="is对话框id" :AppId="对象_搜索条件.AppId"
               :AppName="MapAppId_Name[对象_搜索条件.AppId.toString()]" :AppType="Data.AppType"
               @on对话框详细信息关闭="on对话框详细信息关闭" :UserType="对象_用户类型"></AppUserinfo>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {GetAppUserList, Del批量删除AppUser, SetStatus} from "@/api/软件用户api.js";
import {GetAppIdNameList} from "@/api/应用列表api.js";
import {时间_时间戳到时间, 时间_取现行时间戳, Is卡号, is移动端} from "@/utils/utils";
import {useStore} from "vuex";
// 引入中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {ElMessage, ElMessageBox} from 'element-plus'
import {Delete} from "@element-plus/icons-vue";
import AppUserinfo from "./组件/软件用户详细信息.vue";


const on单个删除 = async (id: number) => {
  console.log('on单个删除' + id)

  const res = await Del批量删除AppUser({"ID": [id]})
  console.log(res)
  if (res.code == 0) {
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
    on读取列表()
  }
}
const isAppType计点 = () => {
  return Data.value.AppType === 2 || Data.value.AppType === 4
}

const isAppType卡号 = () => {
  return Data.value.AppType === 3 || Data.value.AppType === 4
}
const on单个编辑 = async (id: number) => {
  on对话框详细信息打开(id)

}
const on冻结状态被改变 = async (表项索引: number, ID: number, Status: number) => {
  // console.info("on冻结状态被改变索引:"+表项索引+",Id:"+ID,"Status:"+Status)
  // console.info(表项索引)
  const res = await SetStatus({"AppId": 对象_搜索条件.value.AppId, "Id": [ID], "Status": Status})

  console.log(res)
  if (res.code == 0) {
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
    return true
  } else {
    Data.value.List[表项索引].Status = Status == 1 ? 2 : 1
    return false
  }

}
const on批量删除 = async () => {
  const ids = 表格被选中列表.value.map((item => item.Id))
  console.log(ids)
  const res = await Del批量删除AppUser({"AppId": 对象_搜索条件.value.AppId, "ID": ids})
  console.log(res)
  if (res.code == 0) {
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
    on读取列表()
  }
}


const 表格被选中列表 = ref([])
const is批量删除禁用 = ref(true)
const is工具_更多 = ref(false)

const is对话框可见 = ref(false)
const is对话框id = ref(0)
const on对话框详细信息打开 = (id: number) => {
  is对话框可见.value = true
  is对话框id.value = id
}
const on对话框详细信息关闭 = (is重新读取: boolean) => {
  //console.info("父组件收到对话框被关闭了")
  is对话框可见.value = false
  is对话框id.value = 0
  if (is重新读取) {
    on读取列表()
  }
}

const on选择框被选择 = (val: any) => {
  表格被选中列表.value = val
  is批量删除禁用.value = 表格被选中列表.value.length == 0
}

const Data = ref({
  "Count": 0,
  "AppType": 1,
  "List": [
    {
      "Id": 1,
      "Uid": 1,
      "Status": 1,
      "Key": "绑定的key",
      "VipTime": 12346579,
      "VipNumber": 999,
      "Note": "用户备注",
      "MaxOnline": 1,
      "UserClassId": 0
    }]
})
const Store = useStore()
const 对象_搜索条件 = ref({AppId: 10000, Type: 3, Size: 10, Page: 1, Status: 0, Role: 0, Keywords: ""})

const on读取列表 = () => {
  console.log("对象_搜索条件")
  console.log(对象_搜索条件.value)
  onGetAppUserList()
}
const onReset = () => {
  let Appidc = 对象_搜索条件.value.AppId
  console.log("重置搜索条件,保留appid:" + Appidc)
  对象_搜索条件.value = {AppId: Appidc, Type: 3, Size: 10, Page: 1, Status: 0, Role: 0, Keywords: ""}
  onGetAppIdNameList()
}
const on时间_是否过期 = (time: Number) => {
  return 时间_取现行时间戳() > time
}

const on格式化_时间 = (Time: number) => {
  if (Time === 0) {
    return ""
  }
  let time: number = 时间_取现行时间戳()
  time = time - Time //看剩余秒数
  if (time < 0) {
    time = parseInt((-time / 60).toString())//看剩余分钟数
    if (time > 60) {
      return 时间_时间戳到时间(Time)
    }
    return time + "分钟后\n" + 时间_时间戳到时间(Time)
  } else {
    time = parseInt((time / 60).toString())  //看剩余分钟数
    if (time > 60) {
      return 时间_时间戳到时间(Time)
    }
    return time + "分钟前"
  }
}


const is加载中 = ref(false)
const onGetAppUserList = async () => {
  if (对象_搜索条件.value.AppId === 10000) {
    ElMessage({
      type: "success",
      message: "请选选择应用",
      showClose: true,
    })
    return   // 默认值 不搜索
  }

  is加载中.value = true
  const res = await GetAppUserList(对象_搜索条件.value)
  console.log(res)
  is加载中.value = false
  Data.value = res.data
  对象_用户类型.value = res.data.UserClass
  //对象_用户类型.value["0"] = "未分类"
  对象_用户类型.value  = {...对象_用户类型.value , 0: '未分类'};
  console.log("对象_用户类型")
  console.log(对象_用户类型.value)
}

const MapAppId_Name = ref({})
const 数组AppId_Name = ref([{
  "Appid": 10004,
  "AppName": ""
}])
const 对象_用户类型 = ref({"0": "未分类"})
const onGetAppIdNameList = async () => {
  const res = await GetAppIdNameList()
  数组AppId_Name.value = res.data.Array
  MapAppId_Name.value = res.data.Map

  console.log("没有搜索条件的应用,修改第一个,现在搜索条件的值为:" + res.data.Map[对象_搜索条件.value.AppId.toString()])

  if (res.data.Map[对象_搜索条件.value.AppId.toString()] == null || 对象_搜索条件.value.AppId <= 10000) {
    console.log("顶顶顶顶没有搜索条件的应用,修改第一个,现在搜索条件的值为:" + 数组AppId_Name.value[0].Appid)
    对象_搜索条件.value.AppId = 数组AppId_Name.value[0].Appid
  }

}
// table元素
const tableRef = ref<any>();
// table高度
const tableHeight = ref();

onMounted(async () => {
  // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  // 监听浏览器高度变化
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  };
  onReset()
  //如果 Store zize 不为0 且不为 null  才读取,不然就使用默认的
  if (Store.state.搜索_软件用户.Size != 0 && Store.state.搜索_软件用户.Size != null) {
    对象_搜索条件.value = Store.state.搜索_软件用户
    console.log("恢复搜索条件")
    console.log(Store.state.搜索_软件用户.Size)
    console.log(Store.state.搜索_软件用户)
  }

  await onGetAppIdNameList()
  await onGetAppUserList()

})

onBeforeUnmount(() => {
  console.log("事件在卸载之前触发")
  Store.commit("set搜索_软件用户", 对象_搜索条件.value)
})

export interface UserInfo2 {
  id: number;
  user: string;
  status: number;
  rmb: number;
  realNameAttestation: string;
  role: number;
  loginAppid: string;
  loginAppName: string;
  loginIp: string;
  loginTime: number;
  registerIp: string;
  registerTime: string;
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
  min-height: calc(100vh - 200px);
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
  font-size: 14px;

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
  font-size: 14px;
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
</style>
