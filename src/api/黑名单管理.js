import service from '@/api/request'

const url="/Admin/Blacklist/"

// 黑名单列表
export const GetList = (data) => {
  return service({
    url: url+'GetList',
    method: 'post',
    data: data
  })
}

//  添加
export const Create = (data) => {
  return service({
    url: url+'Create',
    method: 'post',
    data: data
  })
}
//  Del批量删除Ka
export const Delete = (data) => {
  return service({
    url: url+'Delete',
    method: 'post',
    data: data
  })
}

//  Del批量删除Ka
export const Update = (data) => {
  return service({
    url: url+'Update',
    method: 'post',
    data: data
  })
}
//  查询
export const Info = (data) => {
  return service({
    url: url+'Update',
    method: 'post',
    data: data
  })
}

//  查询
export const DeleteBatch = (data) => {
  return service({
    url: url+'DeleteBatch',
    method: 'post',
    data: data
  })
}
