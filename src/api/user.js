import service from '@/api/request'
// @Summary 用户登录
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/login [post]
export const login = (data) => {
  return service({
    url: 'admin/base/login',
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
    url: 'admin/base/captcha',
    method: 'post',
    data: data
  })
}


// @Summary 获取管理员信息
export const GetAdminInfo = () => {
  return service({
    url: '/admin/User/GetAdminInfo',
    method: 'get'
  })
}
