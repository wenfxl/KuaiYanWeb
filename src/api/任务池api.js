import service from '@/api/request'

const url="/Admin/TaskPool/"

//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetTaskPoolList = (data) => {
  return service({
    url: url+'GetList',
    method: 'post',
    data: data
  })
}

//  Del批量删除TaskPool
//{ "id": [ 5 ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除TaskPool = (data) => {
  return service({
    url: url+'Delete',
    method: 'post',
    data: data
  })
}

//  GetTaskPool详细信息
//{"Id": 1}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const GetTaskPool详细信息 = (data) => {
  return service({
    url:  url+'GetInfo',
    method: 'post',
    data: data
  })
}

//  SaveTaskPool详细信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "获取成功"}"
export const  SaveTaskPool信息 = (data) => {
  return service({
    url:  url+'SaveInfo',
    method: 'post',
    data: data
  })
}

//  NewTaskPool信息
//...
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "添加成功"}"
export const  NewTaskPool信息 = (data) => {
  return service({
    url: url+'New',
    method: 'post',
    data: data
  })
}


export const  设置任务池任务类型状态 = (data) => {
  return service({
    url: url+'SetStatus',
    method: 'post',
    data: data
  })
}

export const  清空队列Tid = (data) => {
  return service({
    url: url+'DeleteTaskQueueTid',
    method: 'post',
    data: data
  })
}
