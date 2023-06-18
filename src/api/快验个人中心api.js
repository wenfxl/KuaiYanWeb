import service from '@/api/request'

const url="/admin/KuaiYan/"

export const 取英数验证码 = (data) => {
  return service({
    url:  url+'GetCaptcha',
    method: 'post',
    data: data
  })
}
export const 取短信验证码 = (data) => {
  return service({
    url:  url+'GetSmsCaptcha',
    method: 'post',
    data: data
  })
}

export const 快验登录 = (data) => {
  return service({
    url:  url+'Login',
    method: 'post',
    data: data
  })
}
export const 快验注册 = (data) => {
  return service({
    url:  url+'Register',
    method: 'post',
    data: data
  })
}

export const 快验找回密码 = (data) => {
  return service({
    url:  url+'SetPassword',
    method: 'post',
    data: data
  })
}
export const 快验取用户信息 = (data) => {
  return service({
    url:  url+'GetUserInfo',
    method: 'post',
    data: data
  })
}

export const 快验取可购买充值卡 = (data) => {
  return service({
    url:  url+'GetIsBuyKaList',
    method: 'post',
    data: data
  })
}
export const 余额购买充值卡 = (data) => {
  return service({
    url:  url+'PayMoneyToKa',
    method: 'post',
    data: data
  })
}
export const 购买充值卡记录 = (data) => {
  return service({
    url:  url+'GetPurchasedKaList',
    method: 'post',
    data: data
  })
}
export const 使用充值卡 = (data) => {
  return service({
    url:  url+'UseKa',
    method: 'post',
    data: data
  })
}

export const 取支付通道状态 = (data) => {
  return service({
    url:  url+'GetPayStatus',
    method: 'post',
    data: data
  })
}


export const 取余额充值地址 = (data) => {
  return service({
    url:  url+'GetPayPC',
    method: 'post',
    data: data
  })
}


export const 取开启验证码接口列表 = (data) => {
  return service({
    url:  url+'GetCaptchaApiList',
    method: 'post',
    data: data
  })
}
export const 快验注销 = (data) => {
  return service({
    url:  url+'OutLogin',
    method: 'post',
    data: data
  })
}

export const 快验系统更新 = (data) => {
  return service({
    url:  url+'Updater',
    method: 'post',
    data: data
  })
}

