import service from '@/api/request'

const url="/Admin/KaClass/"
// 分页获取KaClass信息列表
//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetKaClassList = (data) => {
  return service({
    url: url+'GetList',
    method: 'post',
    data: data
  })
}

//  Del批量删除KaClass
//{ "id": [ 5 ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除KaClass = (data) => {
  return service({
    url: url+'Delete',
    method: 'post',
    data: data
  })
}

//  GetKaClass详细信息
//{"Id": 1}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const GetKaClass详细信息 = (data) => {
  return service({
    url:  url+'GetInfo',
    method: 'post',
    data: data
  })
}

//  SaveKaClass详细信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const  SaveKaClass信息 = (data) => {
  return service({
    url:  url+'SaveInfo',
    method: 'post',
    data: data
  })
}

//  NewKaClass信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "添加成功"}"
export const  NewKaClass信息 = (data) => {
  return service({
    url: url+'New',
    method: 'post',
    data: data
  })
}
