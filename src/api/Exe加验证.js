import service from '@/api/request'

import {取url根入口路径} from "@/utils/utils";
const url=取url根入口路径() +"/ExeTools/"
export const GetList = (data) => {
  return service({
    url: url+'GetList',
    method: 'post',
    data: data
  })
}


//  获取上传凭证
//{"Path": "aa/aa.apk"}
export const GetUploadToken = (data) => {
  return service({
    url:  url+'GetUploadToken',
    method: 'post',
    data: data
  })
}


//  创建apk加验证任务
//{"Path": "aa/aa.apk"}
export const CreateExeAddFNKYTask = (data) => {
  return service({
    url:  url+'CreateExeAddFNKYTask',
    method: 'post',
    data: data
  })
}


export const GetTaskIdStatus = () => {
  return service({
    url:  url+'GetTaskIdStatus',
    method: 'post'
  })
}

export const GetUiList = () => {
  return service({
    url:  url+'GetUiList',
    method: 'post'
  })
}
