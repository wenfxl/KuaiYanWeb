<template>
  <div style="height:500px ;width: auto" v-loading="is加载中">
    <vue3-tree-org
                   :data="data"
                   :horizontal="horizontal"
                   :collapsable="collapsable"
                   :label-style="style"
                   :node-draggable="true"
                   :scalable="true"
                   :only-one-node="onlyOneNode"
                   :default-expand-level="1"
                   :clone-node-drag="cloneNodeDrag"
                   @on-node-dblclick="on节点被点击"
                   :props="{id: 'Id', pid: 'UPAgentId', label: 'User', expand: 'expand',children: 'Children' }"
                   :toolBar="{scale: true, restore: true, expand: true, zoom: true, fullscreen: true, }"
    >
      <!-- 自定义节点内容 -->
      <template v-slot="{node}">
        <div v-if="node.id>0" class="tree-org-node__text node-label">
          <div v-if="node.id>0" class="custom-content">{{ node.label===""?"":("代理名称："+node.label) }}</div>
          <div v-if="node.id>0">代理Id：{{ node.id }}</div>
          <div v-if="node.id>0">代理分成：{{ node.$$data.AgentDiscount }}%</div>

        </div>
      </template>
      <!-- 自定义展开按钮 -->
      <template v-slot:expand="{node}">
        <div>{{ node.children.length }}</div>
      </template>
    </vue3-tree-org>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {Get代理组织架构图} from "@/api/分析页Api.js";
import {置剪辑版文本} from "@/utils/utils";
//https://sangtian152.github.io/vue3-tree-org/demo/#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95  组织架构来源参考使用说明
//https://github.com/sangtian152/vue3-tree-org
const data = ref({
  "Id": 2,
  "User": "刘备",
  "UPAgentId": -1,
  "AgentDiscount": 50,
  "Children": [{
    "Id": 3,
    "User": "关羽",
    "UPAgentId": 2,
    "AgentDiscount": 30,
    "Children": [{"Id": 6, "User": "关平", "UPAgentId": 3, "AgentDiscount": 10}]
  }, {
    "Id": 4,
    "User": "张飞",
    "UPAgentId": 2,
    "AgentDiscount": 30,
    "Children": [{"Id": 7, "User": "张苞", "UPAgentId": 4, "AgentDiscount": 10}]
  }, {"Id": 5, "User": "诸葛亮", "UPAgentId": 2, "AgentDiscount": 30}]
});

const horizontal = false;
const collapsable = false;
const onlyOneNode = true;
const cloneNodeDrag = true;
const style = {
  background: "#fff",
  color: "#5e6d82",
};

const on节点被点击 =  (e, data) => {
  console.log(e)
  console.log(data)
  置剪辑版文本(data.User ,"复制成功:"+data.User)
}

const onMenus =  (e) => {
  console.log(e)
  //置剪辑版文本(data.label.toString() ,"复制成功")
}
const is加载中 = ref(false);

const on读取图表数据 = async () => {

  is加载中.value = true
  let 返回;
  返回 = await Get代理组织架构图()
  is加载中.value = false
  console.log(返回)
  if (返回.code === 10000) {

    data.value = {Id: 0, User: "代理组织架构图(双击复制代理名称)", UPAgentId: 0, AgentDiscount: 0, Children: 返回.data}

  }
}
onMounted(() => {
  on读取图表数据()
})
</script>

<style lang="scss" scoped>
.tree-org-node__text {
  text-align: left;
  font-size: 14px;

  .custom-content {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid currentColor;
  }
}
</style>
