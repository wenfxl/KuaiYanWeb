<template>
  <div class="最底层div">
    <div class="common-layout">
      <el-container>
        <el-header class="内容div">    <!-- 顶部功能区 -->
          <div style="align-items: center ">
            <!--            <el-button type="primary" @click="uploadFile">上传文件</el-button>-->
            <!--            <el-button type="primary" @click="createFolder">新建文件夹</el-button>-->
            <el-text style="margin-left: 10px">{{ Data.Path }}</el-text>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px" class="内容div">
            <!-- 左侧文件路径区 -->
            <div class="path-bar ">
              <el-tree
                  style="max-width: 600px"
                  ref="elTreeRef"
                  :data="树"
                  :props="defaultProps"
                  node-key="path"
                  @node-click="on读取列表"
              />
            </div>
          </el-aside>
          <el-main class="内容div" style="height: 75vh">
            <!-- 中间文件列表区 -->
            <div class="gva-btn-list" style="background:#FAFAFAFF">
              <el-button icon="Plus" type="primary" style="margin: 8px 8px 8px; width: 65px"
                         @click="is显示上传界面=true"
              >
                上传
              </el-button>

              <el-popconfirm title="确定删除勾选变量?" width="200"
                             @confirm="on批量删除" confirm-button-text="确定"
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
                  <el-icon @click="on读取列表({label: '', path: Data.Path})">
                    <RefreshRight/>
                  </el-icon>
                </el-tooltip>

              </div>
            </div>

            <el-table v-loading="is加载中" :data="Data.List" border style="width: 100% ;white-space: pre-wrap;"
                      ref="tableRef"
                      @header-dragend="on表格列宽被改变"
                      :max-height="tableHeight"
                      @selection-change="on选择框被选择"
                      :header-cell-style="{background:'#FAFAFAFF',color:'#606266'}">
              <el-table-column type="selection" width="45"/>
              <el-table-column prop="Name" label="文件名" show-overflow-tooltip=""/>

              <el-table-column prop="Path" label="地址" show-overflow-tooltip="">
                <template #default="scope">
                  <el-icon class="复制按钮" @click="置剪辑版文本(scope.row.Path,'已复制到剪辑版')">
                    <DocumentCopy/>
                  </el-icon>
                  {{ scope.row.Path }}
                </template>
              </el-table-column>
              <el-table-column prop="MD5" label="MD5" width="280" fixed="right"/>
              <el-table-column prop="Size" label="大小" width="120" fixed="right">
                <template #default="scope">
                {{字节转换mb(scope.row.Size)}}
                </template>
              </el-table-column>
              <el-table-column prop="UpTime" label="上传时间" width="160" fixed="right">
                <template #default="scope">
                  {{ 时间_时间戳到时间(scope.row.UpTime) }}
                </template>
              </el-table-column>


              <el-table-column :fixed="is移动端()?false:'right'" label="操作" :width="3*85">
                <template #default="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<el-icon class="el-icon--right"><ArrowDown/></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="on单个下载(scope.row)">下载</el-dropdown-item>
                        <el-dropdown-item @click="on单个重命名(scope.row)">重命名</el-dropdown-item>
                        <el-dropdown-item @click="on单个获取外链(scope.row)">获取直连复制外链</el-dropdown-item>
                        <el-dropdown-item @click="on单个删除(scope.row)">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-table-column>
              <template v-slot:empty>
                <div slot="empty" style="text-align: left;">
                  <el-empty description="居然没有数据啊"/>
                </div>
              </template>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
  <uplode v-if="is显示上传界面" :path="Data.Path" @on对话框详细信息关闭="on对话框详细信息关闭"/>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node'
import {
  is移动端,
  时间_时间戳到时间,
  置剪辑版文本,
  置剪辑版文本2,
  表格写入列宽数组,
  表格读取列宽数组
} from "@/utils/utils.js";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import {Delete} from "@element-plus/icons-vue";

import {Del批量删除, GetCloudStorageList, 文件移动, 下载, 获取外链} from "@/api/云存储api";
import {GetInfoCloudStorage} from "@/api/系统设置api";
import uplode from "./组件/云存储上传.vue";

const is加载中 = ref(false)
// table元素
const tableRef = ref<any>();
const on表格列宽被改变 = (newWidth: any, oldWidth: any, columns: any, event: any) => {
  let 局_列宽数组: number[] = 表格读取列宽数组(tableRef.value)

  localStorage.setItem('列宽_云存储', JSON.stringify(局_列宽数组));
}
const on表格列宽初始化 = () => {

  let 局_列宽数组文本 = localStorage.getItem('列宽_云存储')
  if (局_列宽数组文本 != null) {
    let 局_列宽数组: number[] = JSON.parse(局_列宽数组文本)

    表格写入列宽数组(tableRef.value, 局_列宽数组)
  }
}
onMounted(async () => {
      on表格列宽初始化()
    }
)
// table高度
const tableHeight = ref();
const 表格被选中列表 = ref([])
const is批量删除禁用 = ref(true)
const is显示上传界面 = ref(false)


const on选择框被选择 = (val: any) => {
  表格被选中列表.value = val
  is批量删除禁用.value = 表格被选中列表.value.length == 0
}


onMounted(async () => {
  if (!is移动端()) {
    // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
    // 监听浏览器高度变化
    window.onresize = () => {
      tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
    }
  }
})

const Data = ref({
  "Count": 0,
  "Path": "",
  "List": [
    {
      "Name": "",
      "path": "",
      "Type": 1,
      "Size": 1,
      "MD5": "",
      "UpTime": 1710941229,
    }]
})

interface Tree {
  label: string
  path?: string
  children?: Tree[]
}

const on单个重命名 = (row) => {
  // 输入新文件名,旧文件名为默认文件名
  ElMessageBox.prompt('请输入新文件名', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: row.Name
  }).then(async ({value}) => {
    const res = await 文件移动({"Path1": row.Path, "Path2": Data.value.Path + value})
    if (res.code == 10000) {
      ElMessage.success(res.msg)
      on读取列表({label: "", path: Data.value.Path})
    }
  });
};
const on单个下载 = async (row) => {
  // 输入新文件名,旧文件名为默认文件名
  const res = await 下载({"Path": row.Path})
  if (res.code == 10000) {
    ElMessage.success(res.msg)
    //不打开新窗口,进行下载
    window.location.href = res.data
  }

};

const on单个获取外链 = async (row) => {
  ElMessageBox.prompt('请输入外链有效秒数(,3600=1小时,86400=1天,2592000=1个月,默认0=1年 )', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: 0
  }).then(async ({value}) => {
    const res = await 获取外链({"Path": row.Path, "LongTime": Number(value)})
    if (res.code == 10000) {
      置剪辑版文本2(res.data, "文件外链复制成功")
    }
  }).catch(() => {

  });

};

const on单个删除 = async (row) => {
  ElMessageBox.confirm('确定要删除此文件吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 删除文件逻辑
    const res = await Del批量删除({"Path": [row.Path]})
    if (res.code == 10000) {
      for (let i = 0; i < Data.value.List.length; i++) {
        if (Data.value.List[i].Path == row.Path) {
          Data.value.List.splice(i, 1)
          break
        }
      }
      ElMessage.success(res.msg)
    }
  }).catch(() => {
  });
};
const on批量删除 = async () => {
  const ids = 表格被选中列表.value.map((item => item.Path))
  console.log(ids)
  const res = await Del批量删除({"Path": ids})
  console.log(res)
  if (res.code == 10000) {
    ElMessage.success(res.msg)

    on读取列表({label: "", path: Data.value.Path})
  }
}
const elTreeRef = ref<InstanceType<typeof ElTree> | null>(null);
const on读取列表 = async (节点data: Tree) => {
  is加载中.value = true
  const res = await GetCloudStorageList({"Type": 2, "Size": 10, "Page": 1, "Keywords": "", "Path": 节点data.path})
  console.log(res)
  is加载中.value = false
  Data.value.Path = 节点data.path ?? ""
  Data.value.List = []
  const 局_节点数组: Tree[] = []
  for (let i = 0; i < res.data.Count; i++) {
    let file = res.data.List[i]
    if (file.Type == 2) { //2是文件 1是路径
      Data.value.List.push(file)
    } else if (file.Type == 1) {
      //查找到数对应的位置,并插入数据
      局_节点数组.push({
        "label": file.Name,
        "path": file.Path
      })
    }
  }

  if (elTreeRef.value != null) {
    let node = elTreeRef.value.updateKeyChildren(节点data.path, 局_节点数组)

  }
  Data.value.Count = Data.value.List.length

}


const 树 = ref<Tree[]>([{
  label: '云存储',
  path: '',
  children: [],
}])
onMounted(async () => {
  Data.value.List = []
  const res = await GetInfoCloudStorage({})
  let 局_默认根文件夹 = "fnkuaiyan"
  if (res.data.七牛云对象存储.rootPath) {
    局_默认根文件夹 = res.data.七牛云对象存储.rootPath
  }
  树.value[0].label = 局_默认根文件夹

})

const on对话框详细信息关闭 = (is重新读取: boolean) => {
  // console.info("父组件收到对话框被关闭了")
  is显示上传界面.value = false
  if (is重新读取) {
    on读取列表({label: "", path: Data.value.Path})
  }
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

//计算属性, 字节转换mb
const 字节转换mb = computed(() => {
  return (value: number) => {
    return (value / 1024 / 1024).toFixed(2) + "MB"
  }
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
