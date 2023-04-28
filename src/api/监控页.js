import service from '@/api/request'

const url="/admin/Panel/"

// @Tags system
// @Summary 获取服务器运行状态
// @Security ApiKeyAuth
// @Produce  application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":"返回成功"}"
// @Router /system/getServerInfo [post]
export const getSystemState = (data) => {
    return service({
        url: url+'getServerInfo',
        method: 'post',
        donNotShowLoading: true
    })
}
