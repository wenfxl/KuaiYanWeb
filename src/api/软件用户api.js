import service from '@/api/request'

const url="/Admin/AppUser/"
// 分页获取AppUser信息列表
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetAppUserList = (data) => {
  return service({
    url: url+'GetList',
    method: 'post',
    data: data
  })
}

//  Del批量删除AppUser
//{ "id": [ 5 ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除AppUser = (data) => {
  return service({
    url: url+'Delete',
    method: 'post',
    data: data
  })
}

//  GetAppUser详细信息
//{"Id": 1}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const GetAppUser详细信息 = (data) => {
  return service({
    url:  url+'GetInfo',
    method: 'post',
    data: data
  })
}

//  SaveAppUser详细信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const  SaveAppUser信息 = (data) => {
  return service({
    url:  url+'SaveInfo',
    method: 'post',
    data: data
  })
}

//  NewAppUser信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "添加成功"}"
export const  NewAppUser信息 = (data) => {
  return service({
    url: url+'New',
    method: 'post',
    data: data
  })
}

//  SetStatus
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "修改成"}"
export const  SetStatus = (data) => {
  return service({
    url: url+'SetStatus',
    method: 'post',
    data: data
  })
}

//  Set批量维护_勾选用户增减时间点数
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "修改成"}"
export const  Set批量维护增减时间点数 = (data) => {
  return service({
    url: url+'SetBatchAddVipTime',
    method: 'post',
    data: data
  })
}
//  Set批量维护_勾选用户增减时间点数
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "修改成"}"
export const  Set批量维护修改用户类型 = (data) => {
  return service({
    url: url+'SetBatchUserClass',
    method: 'post',
    data: data
  })
}

//  Set批量维护_全部用户增减时间点数
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "修改成"}"
export const  Set批量维护_全部用户增减时间点数 = (data) => {
  return service({
    url: url+'SetBatchAllUserVipTime',
    method: 'post',
    data: data
  })
}

//  Del批量维护_删除
export const Del批量维护_删除 = (data) => {
  return service({
    url: url+'DeleteBatch',
    method: 'post',
    data: data
  })
}
