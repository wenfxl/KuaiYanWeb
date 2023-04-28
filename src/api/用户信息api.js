import service from '@/api/request'


// 分页获取用户信息列表
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetUserList = (data) => {
  return service({
    url: '/admin/User/GetUserList',
    method: 'post',
    data: data
  })
}

//  Del批量删除用户
//{ "id": [ 5 ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除用户 = (data) => {
  return service({
    url: '/admin/User/DeleteUser',
    method: 'post',
    data: data
  })
}

//  Get用户详细信息
//{"Id": 1}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const Get用户详细信息 = (data) => {
  return service({
    url: '/admin/User/GetUserInfo',
    method: 'post',
    data: data
  })
}

//  Save用户详细信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const  Save用户信息 = (data) => {
  return service({
    url: '/admin/User/SaveUser',
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
    url: '/admin/User/SetUserStatus',
    method: 'post',
    data: data
  })
}
//  New用户信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "添加成功"}"
export const  New用户信息 = (data) => {
  return service({
    url: '/admin/User/NewUser',
    method: 'post',
    data: data
  })
}
