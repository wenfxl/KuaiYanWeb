import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";
import {store} from "@/store/store";
import * as ElIcon from "@element-plus/icons-vue";
import 'element-plus/theme-chalk/el-message.css'    //ele 消息需要先引入css 不然 不显示
import 'element-plus/theme-chalk/el-message-box.css'    //ele 消息需要先引入css 不然 不显示

/**
 * @description 导入顶部加载进度条，防止首屏加载时间过长，用户等待
 *
 * */
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
Nprogress.start()

/**
 * 无需在这块结束，会在路由中间件中结束此块内容
 * */

const app= createApp(App)

for (const name in ElIcon){
    //console.log(name)
    app.component(name,(ElIcon as any)[name])
}

app.use(router)
    .use(store)
    .mount('#app')
