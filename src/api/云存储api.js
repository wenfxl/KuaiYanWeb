import service from '@/api/request'

const url="/Admin/CloudStorage/"

//{ "Page": 0,"Size": 10 }
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
export const GetCloudStorageList = (data) => {
  return service({
    url: url+'GetList',
    method: 'post',
    data: data
  })
}


//获取上传凭证
export const GetUpToken = (data) => {
  return service({
    url: url+'GetUpToken',
    method: 'post',
    data: data
  })
}



//  Del批量删除
//{ "path": [ "" ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const Del批量删除 = (data) => {
  return service({
    url: url+'Delete',
    method: 'post',
    data: data
  })
}


//  文件移动
//{ "path": [ "" ]}
// @Success 200 {string} json "{"code": 0, "data": {},"msg": "注销成功"}"
export const 文件移动 = (data) => {
  return service({
    url: url+'MoveTo',
    method: 'post',
    data: data
  })
}
export const 下载 = (data) => {
  return service({
    url: url+'Download',
    method: 'post',
    data: data
  })
}

export const 获取外链 = (data) => {
  return service({
    url: url+'GetDownloadUrl',
    method: 'post',
    data: data
  })
}

export const 取基础信息 = (data) => {
  return service({
    url: url+'GetBaseInfo',
    method: 'post',
    data: data
  })
}
