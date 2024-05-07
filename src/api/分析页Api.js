import service from '@/api/request'

const url="/Admin/Panel/"

export const get图表在线用户统计 = (data) => {
    return service({
        url: url+'ChartLinksUser',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const Get在线用户Ip地图分布统计 = () => {
    return service({
        url: url+'ChartLinksUserIPCity',
        method: 'POST',
        donNotShowLoading: true,
    })
}

export const get图表用户账号统计 = (data) => {
    return service({
        url: url+'ChartUser',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}

export const get图表余额充值消费统计 = (data) => {
    return service({
        url: url+'ChartRMBAddSub',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const Get代理组织架构图 = (data) => {
    return service({
        url: url+'ChartAgentLevel',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表积分点数消费统计 = (data) => {
    return service({
        url: url+'ChartVipNumberAddSub',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表取余额消费排行榜 = (data) => {
    return service({
        url: url+'getConsumptionRanking',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表取余额增长排行榜 = (data) => {
    return service({
        url: url+'getRmbIncreaseRanking',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表取积分消费排行榜 = (data) => {
    return service({
        url: url+'getNumberIncreaseRanking',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表在线用户登录活动时间 = (data) => {
    return service({
        url: url+'ChartLinksUserLoginTime',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表应用用户统计 = (data) => {
    return service({
        url: url+'ChartAppUser',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}

export const get图表卡号统计制卡 = (data) => {
    return service({
        url: url+'ChartKaRegister',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表卡号列表统计应用卡可用已用 = (data) => {
    return service({
        url: url+'ChartAppKa',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表卡号列表统计应用卡类可用已用 = (data) => {
    return service({
        url: url+'ChartAppKaClass',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
export const get图表应用用户类型统计 = (data) => {
    return service({
        url: url+'ChartAppUserClass',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}

export const get图表应用用户账号注册统计 = (data) => {
    return service({
        url: url+'ChartAppUserRegister',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}

export const get高德天气接口 = (data) => {
    return service({
        url: url+'gaodeWeather',
        method: 'POST',
        donNotShowLoading: true,
        data: data
    })
}
