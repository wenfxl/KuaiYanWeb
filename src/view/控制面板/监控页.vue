<template>
  <div>
    <el-row :gutter="15" class="system_state">
      <el-col :span="12">
        <el-card v-if="state.os" class="card_item">
          <template #header>
            <div>运行环境</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">系统:</el-col>
              <el-col :span="12">{{ state.os.goos }}
                <el-tooltip content="结束飞鸟快验系统进程"
                            effect="dark"
                            placement="top">
                  <el-icon @click="StopSystam"  style="cursor: pointer" color="#f56c6c">
                    <SwitchButton/>
                  </el-icon>
                </el-tooltip>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">cpu核心数:</el-col>
              <el-col :span="12" v-text="state.os.numCpu"/>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">编译器:</el-col>
              <el-col :span="12" v-text="state.os.compiler"/>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">go 版本号:</el-col>
              <el-col :span="12" v-text="state.os.goVersion"/>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">活动协程数:</el-col>
              <el-col :span="12" v-text="state.os.numGoroutine"/>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.disk" class="card_item">
          <template #header>
            <div>磁盘</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">全部 (MB)</el-col>
                  <el-col :span="12" v-text="state.disk.totalMb"/>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">已用 (MB)</el-col>
                  <el-col :span="12" v-text="state.disk.usedMb"/>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">全部 (GB)</el-col>
                  <el-col :span="12" v-text="state.disk.totalGb"/>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">已用 (GB)</el-col>
                  <el-col :span="12" v-text="state.disk.usedGb"/>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                    type="dashboard"
                    :percentage="state.disk.usedPercent"
                    :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="system_state">
      <el-col :span="12">
        <el-card
            v-if="state.cpu"
            class="card_item"
            :body-style="{ height: '180px', 'overflow-y': 'scroll' }"
        >
          <template #header>
            <div>CPU</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">物理核心数:</el-col>
              <el-col :span="12" v-text="state.cpu.cores"/>
            </el-row>
            <el-row v-for="(item, index) in state.cpu.cpus" :key="index" :gutter="10">
              <el-col :span="12">核心负载 {{ index }}:</el-col>
              <el-col
                  :span="12"
              >
                <el-progress
                    type="line"
                    :percentage="+item.toFixed(0)"
                    :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.ram" class="card_item">
          <template #header>
            <div>运行内存</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">全部 (MB)</el-col>
                  <el-col :span="12" v-text="state.ram.totalMb"/>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">已用 (MB)</el-col>
                  <el-col :span="12" v-text="state.ram.usedMb"/>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">全部 (GB)</el-col>
                  <el-col :span="12" v-text="state.ram.totalMb / 1024"/>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">已用 (GB)</el-col>
                  <el-col
                      :span="12"
                      v-text="(state.ram.usedMb / 1024).toFixed(2)"
                  />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                    type="dashboard"
                    :percentage="state.ram.usedPercent"
                    :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {getSystemState,系统热重启,系统停止} from '@/api/监控页'
import {onUnmounted, ref} from 'vue'
import {Stopwatch} from "@element-plus/icons-vue";

const timer = ref(null)
const state = ref({
  "os": {
    "goos": "windows",
    "numCpu": 16,
    "compiler": "gc",
    "goVersion": "go1.20",
    "numGoroutine": 5
  },
  "cpu": {
    "cpus": [
      0,
      0,
      7.142857142857142,
      7.142857142857142,
      0,
      0,
      0,
      7.142857142857142,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      7.142857142857142
    ],
    "cores": 8
  },
  "ram": {
    "usedMb": 17112,
    "totalMb": 40117,
    "usedPercent": 42
  },
  "disk": {
    "usedMb": 158997,
    "usedGb": 155,
    "totalMb": 976744,
    "totalGb": 953,
    "usedPercent": 16
  }
})
const colors = ref([
  {color: '#5cb87a', percentage: 20},
  {color: '#e6a23c', percentage: 40},
  {color: '#f56c6c', percentage: 80}
])

const reload = async () => {
  const {data} = await getSystemState()
  state.value = data.server
}
const StopSystam = async () => {
 系统停止()
  window.navigate(location)

}

//死循环 6秒钟重新获取一次服务器信息
reload()
timer.value = setInterval(() => {
  reload()
}, 1000 * 6)


onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})

</script>

<script>
export default {
  name: 'State',
}
</script>

<style lang="scss">
.system_state {
  padding: 10px;
}

.card_item {

  height: 280px;
}

.热重启系统 {
  list-style-type: none;
  font-size: 12px;
  margin: 0;
  padding: 7px 16px;
  //设置 鼠标悬停时样式
  &:hover {
    background: #889aa4; //改变背景颜色
    border-radius: 4px; //设置圆角
    /*设置边框阴影*/
    //box-shadow: 2px 2px 3px 0 rgba(45, 75, 74, 0.6);
    cursor: pointer; //改变鼠标样式为手型
  }
}

</style>

