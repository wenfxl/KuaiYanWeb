// [
// { id: 1, url: 'http://cdnjson.com/images/2025/04/10/165224b1w0ww55607xzw5x.png',label: '蓝色清新' },
//     { id: 2, url: 'https://www.fnkuaiyan.cn/images/logo4.png',label: '蓝色清新2'  },
//     { id: 3, url: 'https://www.fnkuaiyan.cn/images/logo4.png',label: '蓝色清新3'  },
// ]
export type  UiList = {
    id: number,
    url: string,
    label: string
}

// 上传凭证
export interface W文件上传凭证 {
    Path: string  // 对象路径
    Type: number // 对象类型  1:自身 2:七牛云
    Url: string   // 上传url
    UpToken: string // UpToken
    token: string // UpToken
    key: string // UpToken
}
