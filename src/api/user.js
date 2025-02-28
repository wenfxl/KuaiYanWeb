import service from '@/api/request'
import {取url根入口路径} from "@/utils/utils";
const url_base = 取url根入口路径() +"/base/"
const url_user = 取url根入口路径() +"/User/"
// @Summary 用户登录
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/login [post]
export const login = (data) => {
  return service({
    url: url_base+'Login',
    method: 'post',
    data: data
  })
}

// @Summary 获取验证码
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/captcha [post]
export const captcha = (data) => {
  return service({
    url: url_base+'Captcha2',
    method: 'post',
    data: data
  })
}


// @Summary 获取管理员信息
export const GetAdminInfo = () => {
  return service({
    url: url_user+'GetAdminInfo',
    method: 'get'
  })
}

// @Summary 注销登录
export const OutLogin = () => {
  return service({
    url: url_user+'OutLogin',
    method: 'post'
  })
}

// @Summary 修改管理员密码
export const AdminNewPassword = (data) => {
  return service({
    url: url_user+'AdminNewPassword',
    method: 'post',
    data: data
  })
}

