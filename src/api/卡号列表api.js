import service from '@/api/request'

const url="/Admin/Ka/"
// 分页获取Ka信息列表
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetKaList = (data) => {
  return service({
    url: url+'GetList',
    method: 'post',
    data: data
  })
}

//  Del批量删除Ka
//{ "id": [ 5 ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除Ka = (data) => {
  return service({
    url: url+'Delete',
    method: 'post',
    data: data
  })
}

//  Del批量追回Ka
//{ "id": [ 5 ]}
export const Del批量追回Ka = (data) => {
  return service({
    url: url+'Recover',
    method: 'post',
    data: data
  })
}

//  GetKa详细信息
//{"Id": 1}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const GetKa详细信息 = (data) => {
  return service({
    url:  url+'GetInfo',
    method: 'post',
    data: data
  })
}

//  SaveKa详细信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const  SaveKa信息 = (data) => {
  return service({
    url:  url+'SaveInfo',
    method: 'post',
    data: data
  })
}

//  NewKa信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "添加成功"}"
export const  NewKa信息 = (data) => {
  return service({
    url: url+'New',
    method: 'post',
    data: data
  })
}

//  NewKa信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "添加成功"}"
export const  NewKa信息_指定卡号 = (data) => {
  return service({
    url: url+'batchKaNameNew',
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

//  SetAdminNote
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "修改成"}"
export const SetAdminNote = (data) => {
  return service({
    url: url+'SetAdminNote',
    method: 'post',
    data: data
  })
}
