import { ref, onMounted, onBeforeUnmount, nextTick, watch, type ComponentPublicInstance } from 'vue'
//自动导出表格实例,并且监听全局触发信号,自适应 浏览器窗口大小
//使用方法 将下方两行,在需要使用的地方引入即可 tableRef 为表格实例,tableHeight为表格高度, updateTableHeight方法为主动更新表格高度
// import {useTableHeight} from "@/composables/useTableHeight";
// const { tableRef, tableHeight, updateTableHeight } = useTableHeight(85)
// 全局状态管理
const globalResizeTrigger = ref(0)
let observers = new Set<() => void>()

// 暴露全局触发方法
export const triggerGlobalResize = () => {
    globalResizeTrigger.value++
    observers.forEach(cb => cb())
}

export function useTableHeight(offset = 85) {
    const tableHeight = ref(0)
    const tableRef = ref<ComponentPublicInstance>()

    const updateHeight = () => {
        nextTick(() => {
            const el = tableRef.value?.$el
            if (el) {
                tableHeight.value = window.innerHeight - el.offsetTop - offset
            }
        })
    }

    // 组件内生命周期管理
    onMounted(() => {
        const handler = () => updateHeight()
        window.addEventListener('resize', handler)
        observers.add(updateHeight)

        // 初始化时立即执行
        updateHeight()

        // 组件卸载时清理
        onBeforeUnmount(() => {
            window.removeEventListener('resize', handler)
            observers.delete(updateHeight)
        })
    })

    // 监听全局触发信号
    watch(globalResizeTrigger, updateHeight)

    return {
        tableRef,
        tableHeight,
        updateTableHeight: updateHeight
    }
}
