import service from '@/api/request'

const url="/admin/Agent/"
// 分页获取用户信息列表
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetUserList = (data) => {
  return service({
    url: url+'GetAgentUserList',
    method: 'post',
    data: data
  })
}

//  Del批量删除用户
//{ "id": [ 5 ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除用户 = (data) => {
  return service({
    url: url+'DeleteAgentUser',
    method: 'post',
    data: data
  })
}

//  Get用户详细信息
//{"Id": 1}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const Get用户详细信息 = (data) => {
  return service({
    url: url+'GetAgentUserInfo',
    method: 'post',
    data: data
  })
}



//  Save用户详细信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const  Save用户信息 = (data) => {
  return service({
    url: url+'SaveAgentUser',
    method: 'post',
    data: data
  })
}

//  批量修改用户状态
//{
//     "id": [
//         1,
//         2,
//         3
//     ],
//     "Status": 2
// }
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "msg"}"
export const  SetUserStatus = (data) => {
  return service({
    url: url+'SetAgentUserStatus',
    method: 'post',
    data: data
  })
}
//  New用户信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "添加成功"}"
export const  New用户信息 = (data) => {
  return service({
    url: url+'NewAgentUser',
    method: 'post',
    data: data
  })
}

//  Get代理可制卡类列表
//{"Id": 1}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const Get代理可制卡类列表 = (data) => {
  return service({
    url: url+'GetAgentKaClassAuthority',
    method: 'post',
    data: data
  })
}
//  Set代理可制卡类列表
//{"Id": 1,"Kid":[1,2,3]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const Set代理可制卡类列表 = (data) => {
  return service({
    url: url+'SetAgentKaClassAuthority',
    method: 'post',
    data: data
  })
}
