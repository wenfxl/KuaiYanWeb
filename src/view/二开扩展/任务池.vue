<template>
  <div class="最底层div">
    <div class="内容div" style="align-items: center ">
      <el-form :inline="true">
        <el-form-item>
          <el-input class="搜索框"
                    v-model.trim="对象_搜索条件.Keywords"
                    placeholder="搜索内容"
                    style="top:0 ; width: 280px;padding: 0;margin: 0"
                    clearable
          >
            <template #prepend>
              <el-select v-model="对象_搜索条件.Type" placeholder="用户名" style="width: 130px;">
                <el-option label="Id" :value="1"/>
                <el-option label="任务类型名称" :value="2"/>
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

        <el-popconfirm title="确定删除勾选任务类型?" width="200" @confirm="on批量删除" confirm-button-text="确定"
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

      <el-table v-loading="is加载中" :data="List.List" border style="width: 100% ;white-space: pre-wrap;"
                ref="tableRef"
                :max-height="tableHeight"
                @selection-change="on选择框被选择"
                :header-cell-style="{background:'#FAFAFAFF',color:'#606266'}">
        <el-table-column type="selection" width="45"/>
        <el-table-column prop="Id" label="Id" width="80"/>
        <el-table-column prop="Name" label="任务类型名称" width="230"/>
        <el-table-column prop="HookSubmitDataStart" label="Hook函数创建入库前" width="230"/>
        <el-table-column prop="HookSubmitDataEnd" label="Hook函数创建入库后" width="230"/>
        <el-table-column prop="HookReturnDataStart" label="Hook函数执行入库前" width="230"/>
        <el-table-column prop="HookReturnDataEnd" label="Hook函数执行入库后" width="230"/>


        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button link type="primary" size="default" @click="on单个编辑(scope.row.Id)" style="color:#79bbff">
              <el-icon color="#79bbff" class="no-inherit">
                <Edit/>
              </el-icon>
              编辑
            </el-button>
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
               :total="parseInt( List.Count)"
              @current-change="on读取列表"
          />
        </el-config-provider>
      </div>
    </div>
  </div>
  <Userinfo :is对话框可见="is对话框可见" :id="is对话框id" @on对话框详细信息关闭="on对话框详细信息关闭"></Userinfo>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {GetTaskPool详细信息,Del批量删除TaskPool,GetTaskPoolList, SaveTaskPool信息, NewTaskPool信息} from "@/api/任务池api.js";
import {时间_时间戳到时间, 时间_取现行时间戳, is移动端} from "@/utils/utils";
import {useStore} from "vuex";
// 引入中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {ElMessage, ElMessageBox} from 'element-plus'
import {Delete} from "@element-plus/icons-vue";
import Userinfo from "@/view/二开扩展/组件/任务类型详细信息.vue";

const on单个删除 = async (id: number) => {
  console.log('on单个删除' + id)

  const res = await Del批量删除TaskPool({"ID": [id]})
  console.log(res)
  if (res.code == 10000) {
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
    on读取列表()
  }
}
const on单个编辑 = async (id: number) => {
  on对话框详细信息打开(id)

}

const on批量删除 = async () => {
  const ids = 表格被选中列表.value.map((item => item.Id))
  console.log(ids)
  const res = await Del批量删除TaskPool({"ID": ids})
  console.log(res)
  if (res.code == 10000) {
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

const List = ref({
  "Count":0,
  "List": [
    {
      "Id": 1,
      "Name": "test3",
      "HookSubmitDataStart": "",
      "HookSubmitDataEnd": "",
      "HookReturnDataStart": "",
      "HookReturnDataEnd": "",
    }]
})

const Store = useStore()
const 对象_搜索条件 = ref({Type: 2, Size: 10, Page: 1, Keywords: ""})

const on读取列表 = () => {
  console.log("对象_搜索条件")
  console.log(对象_搜索条件.value)
  onGetList()
}
const onReset = () => {
  对象_搜索条件.value = {Type: 2, Size: 10, Page: 1,  Keywords: ""}
}



const is加载中 = ref(false)
const onGetList = async () => {
  is加载中.value = true
  const res = await GetTaskPoolList(对象_搜索条件.value)
  console.log(res)
  is加载中.value = false
  List.value = res.data
}
// table元素
const tableRef = ref<any>();
// table高度
const tableHeight = ref();
onMounted(() => {
  // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  // 监听浏览器高度变化
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  };
  onReset()
  //如果 Store zize 不为0 且不为 null  才读取,不然就使用默认的
  if (Store.state.搜索_任务池.Size != 0 && Store.state.搜索_任务池.Size != null) {
    对象_搜索条件.value = Store.state.搜索_任务池
    console.log("恢复搜索条件")
    console.log(Store.state.搜索_任务池.Size)
    console.log(Store.state.搜索_任务池)
  }

  onGetList()
})

onBeforeUnmount(() => {
  console.log("事件在卸载之前触发")
  Store.commit("set搜索_任务池", 对象_搜索条件.value)
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
  font-size: 12px;

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
  font-size: 12px;
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
