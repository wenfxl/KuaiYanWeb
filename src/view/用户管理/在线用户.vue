<template>
  <div class="最底层div">
    <div class="内容div" style="align-items: center ">
      <el-form :inline="true" :model="对象_搜索条件">
        <el-form-item label="状态" prop="status" style="width:120px">
          <el-select v-model="对象_搜索条件.Status" clear placeholder="请选择">
            <el-option key="0" label="全部" :value="0"/>
            <el-option key="1" label="正常" :value="1"/>
            <el-option key="2" label="注销" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="搜索框"
                    v-model="对象_搜索条件.Keywords"
                    placeholder="搜索内容"
                    style="top:0 ; width: 250px;padding: 0;margin: 0"
                    clearable
          >
            <template #prepend>
              <el-select v-model="对象_搜索条件.Type" placeholder="用户名" style="width: 100px;">
                <el-option label="Id" :value="1"/>
                <el-option label="用户名" :value="2"/>
                <el-option label="绑定信息" :value="3"/>
                <el-option label="动态标记" :value="4"/>
                <el-option label="应用ID" :value="5"/>
                <el-option label="软件版本" :value="6"/>
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
        <el-popconfirm title="确定注销勾选在线用户?" width="200" @confirm="on批量注销" confirm-button-text="确定"
                       cancel-button-text="取消">
          <template #reference>
            <el-button icon="warning" type="danger" style="margin: 8px 8px 8px;"
                       :disabled=is批量注销禁用>注销
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

          <el-popover placement="right" trigger="hover">
            <template #reference>
              <el-icon>
                <More/>
              </el-icon>
            </template>
            <li class="工具_更多_li" @click="on删除已注销">删除已注销</li>
          </el-popover>
        </div>

      </div>

      <el-table v-loading="is加载中" :data="List.List" border style="width: 100% ;white-space: pre-wrap;"
                ref="tableRef"
                :max-height="tableHeight"
                @selection-change="on选择框被选择"
                :header-cell-style="{background:'#FAFAFAFF',color:'#606266'}">
        <el-table-column type="selection" width="45"/>
        <el-table-column prop="Id" label="Id" width="80"/>
        <el-table-column prop="User" label="用户名" width="130">
          <template #default="scope">
            {{ scope.row.User}}
            <el-tag v-if="scope.row.RiskControl>0" :type="scope.row.RiskControl<20?'info':'danger'">
              {{scope.row.RiskControl<20?'可疑':"非法"}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="状态" prop="status" width="80">
          <template #default="scope">
            <div>
              <el-tag :type="scope.row.Status===1?'':'warning'">{{
                  scope.row.Status === 1 ? '正常' : "已注销"
                }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="AppName" label="登录位置" width="282" show-overflow-tooltip="">
          <template #default="scope">
            <div>
              {{ scope.row.AppName }}
              <el-tag type="success" v-if="scope.row.AppVer">
                {{ scope.row.AppVer }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Key" label="绑定信息" width="140" show-overflow-tooltip=""/>
        <el-table-column prop="Tab" label="动态标记" width="140" show-overflow-tooltip=""/>
        <el-table-column prop="Ip" label="登录ip" width="140"/>
        <el-table-column prop="LoginTime" label="登录时间" width="160" :formatter="on格式化_登录时间"/>
        <el-table-column prop="LastTime" label="最后活动时间" width="160" :formatter="on格式化_最后活动时间"/>
        <el-table-column prop="OutTIme" label="自动注销时间" width="160">
          <template #default="scope">
            <div>
              <el-countdown style="font-size: 18px" :value="(scope.row.LastTime+scope.row.OutTIme)*1000"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="75">
          <template #default="scope">
            <el-button link type="primary" size="default" @click="on单个注销(scope.row.Id)"
                       v-if="scope.row.Status === 1"
                       style="color:#f56d6d">
              <el-icon color="#f56d6d" class="no-inherit">
                <SwitchButton/>
              </el-icon>
              注销
            </el-button
            >
          </template>
        </el-table-column>
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
              :total="parseInt( List.Count)"
              @current-change="on读取列表"
          />
        </el-config-provider>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, Ref, ref, watch,} from "vue";
import {GetLinkUserList, Del批量注销, Del批量删除} from "@/api/在线用户api.js";
import {时间_时间戳到时间, 时间_取现行时间戳, 时间_计算分钟提示, is移动端} from "@/utils/utils.js";
import {useStore} from "vuex";
// 引入中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {ElMessage, ElMessageBox, FormInstance} from 'element-plus'

const on单个注销 = async (id: number) => {
  console.log('在线注销id' + id)

  const res = await Del批量注销({"ID": [id]})
  console.log(res)
  if (res.code == 0) {
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
    for (let i = 0; i < List.value.List.length; i++) {
      //console.log(List.value.List[i])
      if (List.value.List[i].Id == id) {
        List.value.List[i].Status = 2
        break
      }

    }

  }

}

const on批量注销 = async () => {
  const ids = 表格被选中列表.value.map((item => item.Id))
  console.log(ids)
  const res = await Del批量注销({"ID": ids})
  console.log(res)
  if (res.code == 0) {
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })

    for (let i = 0; i < List.value.List.length; i++) {
      if (ids.includes(List.value.List[i].Id)) {
        List.value.List[i].Status = 2
      }
    }
  }
}

const on删除已注销 = async () => {
  is工具_更多.value = false
  const res = await Del批量删除({"ID": [-1]})

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
const is批量注销禁用 = ref(true)
const is工具_更多 = ref(false)

const on选择框被选择 = (val: any) => {
  表格被选中列表.value = val
  is批量注销禁用.value = 表格被选中列表.value.length == 0
}
const List = ref({
  "Count": 0,
  List: [{
    "Id": 11,
    "Uid": 1,
    "User": "admin",
    "Status": 1,
    "LoginAppid": 1,
    "LoginTime": 1680176166,
    "LastTime": 1680176166,
    "OutTIme": 3600,
    "Key": "",
    "Tab": "",
    "Ip": "127.0.0.1",
    "AppName": "管理后台",
    "RiskControl": 0
  }]
})
const Store = useStore()
const 对象_搜索条件 = ref({Type: 2, Size: 10, Page: 1, Status: 0, Keywords: ""})

const on读取列表 = () => {
  console.log("对象_搜索条件")
  console.log(对象_搜索条件.value)
  onGetLinkUserList()
}
const onReset = () => {
  对象_搜索条件.value = {Type: 2, Size: 10, Page: 1, Status: 0, Keywords: ""}
}
const on格式化_状态 = (row: any, column: any) => {
  // console.log("on状态格式化")
  // console.log(row)
  // console.log(column)
  if (row.Status == 1) {
    return "正常"
  } else if (row.Status == 2) {
    return "已注销"
  }
  return "未知" + row.Status
}


const on格式化_登录时间 = (row: any, column: any, Time: number) => {
  return 时间_计算分钟提示(Time)
}
const on格式化_最后活动时间 = (row: any, column: any, Time: number) => {
  return 时间_计算分钟提示(Time)
}
const on格式化_自动注销时间 = (row: any, column: any, Time: number) => {

  let time: number = 时间_取现行时间戳()

  time = time - row.OutTIme - row.LastTime  //看剩余秒数
  if (time < 0) {
    time = parseInt((-time / 60).toString())//看剩余分钟数
    return time + "分钟后\n" + 时间_时间戳到时间(row.OutTIme + row.LastTime)
  } else {
    time = parseInt((time / 60).toString())  //看剩余分钟数
    return time + "分钟前\n" + 时间_时间戳到时间(row.OutTIme + row.LastTime)
  }
}
const is加载中 = ref(false)
const onGetLinkUserList = async () => {
  is加载中.value = true
  const res = await GetLinkUserList(对象_搜索条件.value)
  console.log(res)
  is加载中.value = false
  List.value = res.data
}

// table元素
const tableRef = ref<any>()
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
  if (Store.state.搜索_在线用户.Size != 0 && Store.state.搜索_在线用户.Size != null) {
    对象_搜索条件.value = Store.state.搜索_在线用户
    console.log("恢复搜索条件")
    console.log(Store.state.搜索_在线用户.Size)
    console.log(Store.state.搜索_在线用户)
  }

  await onGetLinkUserList()
})

onBeforeUnmount(() => {
  console.log("事件在卸载之前触发")
  Store.commit("set搜索_在线用户", 对象_搜索条件.value)
})


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
  top: -5px;
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

.el-form-item {
  padding: 0;
  margin: 0 15px 8px 0;
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
</style>
