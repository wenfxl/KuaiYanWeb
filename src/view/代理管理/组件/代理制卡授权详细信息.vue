<template>
  <el-dialog v-model="is对话框可见2" :title='"修改代理ID:"+Props.id.toString()+"授权:"'
             :width="is移动端()?'90%':'760px'"
             top="5%"
             @close="on对话框被关闭">

    <div  v-loading="is加载中" >
<!--      const D代理功能_卡号冻结 = -1
      const D代理功能_卡号解冻 = -2
      const D代理功能_更换卡号 = -3
      const D代理功能_删除卡号 = -4 //附加信息  {}
      const D代理功能_余额充值 = -5
      const D代理功能_发展下级代理 = -6-->
      <el-divider >功能授权</el-divider>
      <el-checkbox v-if="D代理功能_功能可见ID.includes(-1)" v-model="D代理功能_卡号冻结" label="卡号冻结" border />
      <el-checkbox v-if="D代理功能_功能可见ID.includes(-2)" v-model="D代理功能_卡号解冻" label="卡号解冻" border />
      <el-checkbox v-if="D代理功能_功能可见ID.includes(-3)" v-model="D代理功能_更换卡号" label="更换卡号" border />
      <el-checkbox v-if="D代理功能_功能可见ID.includes(-5)" v-model="D代理功能_余额充值" label="余额充值" border />
      <el-checkbox v-if="D代理功能_功能可见ID.includes(-6)" v-model="D代理功能_发展下级代理" label="发展下级代理" border />

      <el-divider >可制卡号授权</el-divider>
      <el-tree
          ref="treeRef"
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current

          :props="{ class: customNodeClass }"
      />
    </div>
    <template #footer>
      <div class="dialog-footer" v-loading="is加载中">
        <el-button @click="treeRef.setCheckedKeys([], false);  D代理功能_卡号冻结=D代理功能_卡号解冻=D代理功能_更换卡号=D代理功能_余额充值=D代理功能_发展下级代理=false">清空</el-button>
        <el-button @click="is对话框可见2=false">取 消</el-button>
        <el-popover
            placement="top-start"
            title="Title"
            :width="200"
            trigger="hover"
            content="取消某卡类Id,会取消该所有下级代理的该卡类ID,增加某卡类Id,不会授权下级代理,需要代理重新操作授权下级代理"
        >
          <template #reference>
            <el-button type="primary" @click="on确定按钮被点击(ruleFormRef)">确 定</el-button>
          </template>
        </el-popover>

      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {New用户信息, Save用户信息, Get用户详细信息, Get代理可制卡类列表, Set代理可制卡类列表} from "@/api/代理信息api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端, 时间_时间戳到时间} from "@/utils/utils";
import type {ElTree} from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'

const Props = defineProps({
  id: {
    type: Number,
    default: 0
  },
})
const emit = defineEmits(['on对话框详细信息关闭'])

const customNodeClass = (data: Tree, node: Node) => {
  if (data.id===0) {
    return 'is-penultimate'
  }
  return null
}
const defaultProps = {
  children: 'children',
  label: 'label',
}

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const is加载中 = ref(false)
const D代理功能_卡号冻结 = ref(false)
const D代理功能_卡号解冻 = ref(false)
const D代理功能_更换卡号 = ref(false)
const D代理功能_余额充值 = ref(false)
const D代理功能_发展下级代理 = ref(false)
const D代理功能_功能可见ID = ref([])

const data = ref([
  {
    id: 0,
    label: '测试RSa混合加密',
    children: [
      {
        id: 3,
        label: '注册送卡'
      },
    ],
  },
  {
    id: 0,
    label: '测试计点',
    children: [
      {
        id: 6,
        label: '天卡',
      },
      {
        id: 7,
        label: '季卡',
      },
    ],
  },
])

const treeRef = ref<InstanceType<typeof ElTree>>()
const getCheckedNodes = () => {
  console.log(treeRef.value!.getCheckedNodes(false, false))
}

const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys([3], false)
}


const on对话框被关闭 = () => {
  emit('on对话框详细信息关闭', is重新读取.value)
}

const is对话框可见2 = ref(true)
const is重新读取 = ref(false)
const on确定按钮被点击 = async (formEl: FormInstance | undefined) => {
  is加载中.value=true
  let 返回;
  let Kids = treeRef.value!.getCheckedKeys(false)
  //需要过滤掉ID为0的
/*const D代理功能_卡号冻结 = -1
  const D代理功能_卡号解冻 = -2
  const D代理功能_更换卡号 = -3
  const D代理功能_删除卡号 = -4 //附加信息  {}
  const D代理功能_余额充值 = -5
  const D代理功能_发展下级代理 = -6
*/
  if (D代理功能_卡号冻结.value){
    Kids.push(-1)
  }
  if (D代理功能_卡号解冻.value){
    Kids.push(-2)
  }
  if (D代理功能_更换卡号.value){
    Kids.push(-3)
  }
  if (D代理功能_余额充值.value){
    Kids.push(-5)
  }
  if (D代理功能_发展下级代理.value){
    Kids.push(-6)
  }

  Kids = Kids.filter(function (num) {
    return num !== 0;
  })
  返回 = await Set代理可制卡类列表({Id: Props.id, Kid: Kids})
  is加载中.value=false
  console.log(返回)
  if (返回.code == 10000) {
    is重新读取.value = true
    is对话框可见2.value = false
    ElMessage({
      type: "success",
      message: 返回.msg,
      showClose: true,
    })
  }

}


  onMounted(() => {
    console.info("用户详细信息对话框加载完毕了")
    on对话框被打开()
  })

  const on对话框被打开 = () => {
    is重新读取.value = false
    读取详细信息(Props.id)
  }
  const 读取详细信息 = async (id: number) => {
    if (id > 0) {
      is加载中.value=true
      let 返回 = await Get代理可制卡类列表({"Id": id})

      if (返回.code == 10000) {
        data.value = 返回.data.KaList
        treeRef.value!.setCheckedKeys(返回.data.IdListAuthority, false)
        D代理功能_功能可见ID.value=返回.data.FunctionList
        D代理功能_卡号冻结.value=返回.data.FunctionId.includes(-1)
        D代理功能_卡号解冻.value=返回.data.FunctionId.includes(-2)
        D代理功能_更换卡号.value=返回.data.FunctionId.includes(-3)
        D代理功能_更换卡号.value=返回.data.FunctionId.includes(-3)
        D代理功能_余额充值.value=返回.data.FunctionId.includes(-5)
        D代理功能_发展下级代理.value=返回.data.FunctionId.includes(-6)

      } else {
        is重新读取.value = false
        is对话框可见2.value = false
      }
      is加载中.value=false
    }
  }

</script>

<style  lang="scss">
//scoped 不能限定,不然不变色了
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

/*下面部分样式*/
.person_body {
  width: 1000px;
  display: flex;
  position: absolute;
  border-radius: 5px;
}

.person_body_left {
  width: 27%;
  height: 600px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(
          left,
          rgb(42, 134, 141),
          #e9e625dc 20%,
          #3498db 40%,
          #e74c3c 60%,
          #09ff009a 80%,
          rgba(82, 196, 204, 0.281) 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}


</style>
