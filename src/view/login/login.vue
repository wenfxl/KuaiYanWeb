<template>
  <div id="userLayout">
    <div class="login_panel">
      <div class="login_panel_form">
        <div class="login_panel_form_title">
          <img
              class="login_panel_form_title_logo"
              src="@/assets/logo4_128_128.png"
              alt
          >
          <p class="login_panel_form_title_p">{{ Store.state.ServerName }}</p>
        </div>
        <el-form
            ref="loginForm"
            :model="loginFormData"
            :rules="rules"
            :validate-on-rule-change="false"
            @keyup.enter="submitForm"
        >
          <el-form-item prop="username">
            <el-input
                v-model="loginFormData.username"
                size="large"
                placeholder="请输入用户名"
                suffix-icon="user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="loginFormData.password"
                show-password
                size="large"
                type="password"
                placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item v-if="loginFormData.openCaptcha" prop="captcha">
            <div class="vPicBox">
              <el-input
                  v-model="loginFormData.captcha"
                  placeholder="请输入验证码"
                  size="large"
                  style="flex:1;padding-right: 20px;"
              />
              <div class="vPic">
                <img
                    v-if="picPath"
                    :src="picPath"
                    alt="请输入验证码"
                    @click="loginVerify()"
                >
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <!--            <el-button-->
            <!--              type="primary"-->
            <!--              style="width: 0% ;  visibility: hidden"-->
            <!--              size="large"-->
            <!--              @click="checkInit"-->
            <!--            >前往初始化</el-button>-->
            <el-button
                type="primary"
                size="large"
                style="width: 100%; margin-left: 0"
                @click="submitForm"
            >登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_panel_right"/>
      <div class="login_panel_foot">
        <div class="links">
          <!--底部版权信息提示-->
          <!--底部版权信息提示-->
          <!--底部版权信息提示-->
          <!-- 其他底部内容 -->

        </div>
        <div class="copyright">
          <!--          <BottomInfo />-->
          <el-button text></el-button>
          <el-link href="https://beian.miit.gov.cn" target="_blank" type="info">{{  Store.state.备案号 }}</el-link>
          <a target="_blank"></a>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import {captcha} from '@/api/user'
import {checkDB} from '@/api/initdb'
import {login} from '@/api/user'
/* import BottomInfo from '@/view/layout/bottomInfo/bottomInfo.vue' */

import {ElMessage} from 'element-plus'
import {useRouter} from "vue-router";
import {useStore} from 'vuex'
import {reactive, ref} from 'vue'
import {onMounted} from 'vue'
import router from "@/router";

const Store = useStore()
onMounted(() => {
  //console.log('测试')
  Store.commit("set服务器名称", '等待初始化')
  checkInit().then((is初始化) => {
    if (is初始化) {
      console.log("is初始化" + is初始化)
      console.log(is初始化)

      router.push("Init")
    }
  })
})


// 验证函数
const checkUsername = (rule, value, callback) => {
  if (value.length < 5) {
    return callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  if (value.length < 5) {
    return callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}

// 获取验证码
const loginVerify = () => {
  captcha({}).then(async (ele) => {
    rules.captcha.push({
      max: ele.data.captchaLength,
      min: ele.data.captchaLength,
      message: `请输入${ele.data.captchaLength}位验证码`,
      trigger: 'blur',
    })
    picPath.value = ele.data.picPath
    loginFormData.captchaId = ele.data.captchaId
    loginFormData.openCaptcha = ele.data.openCaptcha
    loginFormData.captcha = ""
  })
}
loginVerify()


const loginForm = ref(null)

const picPath = ref('')

const loginFormData = reactive({
  username: 'admin',
  password: '',
  captcha: '66',
  captchaId: '',
  openCaptcha: false,
})
//全局注册表单校验
const rules = reactive({
  username: [{validator: checkUsername, trigger: 'blur'}],
  password: [{validator: checkPassword, trigger: 'blur'}],
  captcha: [
    {
      message: '验证码格式不正确',
      trigger: 'blur',
    },
  ],
})

const onLogin = async (loginInfo) => {
  const res = await login(loginInfo)
  console.info("登录结果")
  console.info(res)
  if (res.code === 10000) {

    Store.commit("setToken", res.data.Token)
    Store.commit("setUserInfo", res.data.UserInfo)

    if (res.data.KuaiYan === true) {
      router.push('/个人中心')
    } else {
      router.replace({path: "/"})
    }
    ElMessage.success(res.msg)
    return true
  } else {
    return false
  }
}


const submitForm = () => {
  loginForm.value.validate(async (v) => {
    if (v) {
      const is登录结果 = await onLogin(loginFormData)
      // 如果登录失败 就刷新验证码
      if (is登录结果) {

      } else {
        loginVerify()
      }
    } else {
      ElMessage.error("请正确填写登录信息")

      loginVerify()
      return false
    }
  })

}

// 跳转初始化
const checkInit = async () => {
  const res = await checkDB()
  /* {
	"code": 0,
	"data": {
		"ServerName": "飞鸟快验后台管理系统",
		"needInit": false
	},
	"msg": "数据库无需初始化"
} */

  /* 把系统名称赋值 */
  Store.commit("set服务器名称", res.data.ServerName)
  Store.commit("set服务器备案号", res.data.Filing)
  console.log("set服务器名称:" + res.data.ServerName)
  console.log("set服务器备案号:" + res.data.Filing)
  console.log(res)
  /* 判断你是否需要初始化数据库如果需要直接跳转 */
  if (res.code === 10000) {
    if (res.data?.needInit) {
      Store.commit("NeedInit")
      return true
    }
  }
  return false
}

</script>

<style lang="scss" scoped>
@import "@/styles/newLogin.scss";
</style>
