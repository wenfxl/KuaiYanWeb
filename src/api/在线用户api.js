import service from '@/api/request'


// 分页获取在线列表
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetLinkUserList = (data) => {
  return service({
    url: '/Admin/User/GetLinkUserList',
    method: 'post',
    data: data
  })
}

//  Del批量注销在线用户
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量注销 = (data) => {
  return service({
    url: '/Admin/User/logout',
    method: 'post',
    data: data
  })
}

export const 批量永不注销 = (data) => {
  return service({
    url: '/Admin/User/SetTokenOutTime',
    method: 'post',
    data: data
  })
}
//  Del批量删除在线用户
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除 = (data) => {
  return service({
    url: '/Admin/User/DeleteLogout',
    method: 'post',
    data: data
  })
}

export const NewWebApiToken = (data) => {
  return service({
    url: '/Admin/User/NewWebApiToken',
    method: 'post',
    data: data
  })
}
