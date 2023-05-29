import {ElMessage} from "element-plus";

export const is移动端 = (): boolean => {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true
    }
    return false
}
//从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数
export const 时间_取现行时间戳 = (): number => {
    let outcome = Math.round(new Date().getTime() / 1000).toString();
    return Number(outcome)
}
/**获取前monthNum个月的月份 */
export const 获取前几个个月的月份=(monthNum): any =>{
    let datelist = [""]
    datelist = []
    let date = new Date()
    let M = date.getMonth() + 1
    if (M - monthNum < 0) {
        let begin = 12 + (M - monthNum)
        for (let i = begin + 1; i <= begin + monthNum; i++) {
            if (i > 12) {
                datelist.push(`${i % 12}月`)
            } else {
                datelist.push(`${i}月`)
            }
        }
    } else {
        let begin = M - monthNum
        for (let i = begin + 1; i <= begin + monthNum; i++) {
            datelist.push(`${i}月`)
        }
    }
    return datelist
}

export const 获取前几个小时的小时=(monthNum): any =>{
    let datelist = [""]
    datelist = []
    let date = new Date()
    let M = date.getHours() + 1
    if (M - monthNum < 0) {
        let begin = 24 + (M - monthNum)
        for (let i = begin + 1; i <= begin + monthNum; i++) {
            if (i > 24) {
                datelist.push(`${i % 24}时`)
            } else {
                datelist.push(`${i}时`)
            }
        }
    } else {
        let begin = M - monthNum
        for (let i = begin + 1; i <= begin + monthNum; i++) {
            datelist.push(`${i}时`)
        }
    }
    return datelist
}
export const 时间_时间戳到时间 = (Time: number) => {
    var date = new Date(Time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';

    if (D.length == 2) {
        D = "0" + D
    }

    var h = date.getHours() + ':';
    if (h.length == 2) {
        h = "0" + h
    }
    var m = date.getMinutes() + ':';
    if (m.length == 2) {
        m = "0" + m
    }

    var s = date.getSeconds().toString();
    if (s.length == 1) {
        s = "0" + s
    }
    return Y + M + D + h + m + s;
}


export const 置剪辑版文本 = (text: string, 成功提示: string) => {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
            // 复制成功callback
            function () {
                if (成功提示 == "") {
                    ElMessage({
                        type: "success",
                        message: "复制成功",
                        showClose: true,
                    })
                } else {
                    ElMessage({
                        type: "success",
                        message: 成功提示,
                        showClose: true,
                    })
                }
            },
            // 复制失败callback
            function () {
                ElMessage({
                    type: "success",
                    message: "复制失败无操作剪辑版权限",
                    showClose: true,
                })
            },
        )
    }
}

export const 时间_计算分钟提示 = (Time: number) => {
    if (Time === 0) {
        return ""
    }
    let time: number = 时间_取现行时间戳()
    time = time - Time //看剩余秒数
    if (time < 0) {
        time = parseInt((-time / 60).toString())//看剩余分钟数
        if (time > 60) {
            return 时间_时间戳到时间(Time)
        }
        return time + "分钟后\n" + 时间_时间戳到时间(Time)
    } else {
        time = parseInt((time / 60).toString())  //看剩余分钟数
        if (time > 60) {
            return 时间_时间戳到时间(Time)
        }
        return time + "分钟前"
    }
}

export const 时间_计算天时分秒提示 = (val) => {
    let str = "",
        day,
        hour,
        minute,
        seconds;
    if (val > 0) {
        day = Math.floor(val / 60 / 60 / 24) || 0;
        hour = Math.floor((val - day * 3600 * 24) / 60 / 60) || 0;
        minute = Math.floor((val - day * 3600 * 24 - hour * 3600) / 60) || 0;
        seconds = Math.floor(val - day * 3600 * 24 - hour * 3600 - minute * 60) || 0;
        str = ''
        if (day != 0) {
            str += `${day}天`
        }

        if (hour != 0) {
            str += `${hour}小时`
        }
        if (minute != 0) {
            str += `${minute}分钟`
        }
        if (seconds != 0) {
            str += `${seconds}秒`
        }
        if (str == '') {
            str = '0天'
        }
        return str
    } else {
        return "0天"
    }
}

export const Is卡号 = (AppType: number) => {
    return AppType === 3 || AppType === 4
}



export const 金额整数转中文 = (money) =>{
    // 接收数字或者字符串数字
    if (typeof money === "string") {
        if (money === '') return ''
        if (isNaN(parseFloat(money))) {
            throw Error(`参数有误：${money}，请输入数字或字符串数字`)
        } else {
            // 去掉分隔符(,)
            money = money.replace(/,/g, '')
        }
    } else if (typeof money === "number") {
        // 去掉分隔符(,)
        money = money.toString().replace(/,/g, '')
    } else {
        throw Error(`参数有误：${money}，请输入数字或字符串数字`)
    }
    // 汉字的数字
    const cnNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    // 基本单位
    const cnIntRadice = ['', '十', '百', '千']
    // 对应整数部分扩展单位
    const cnIntUnits = ['', '万', '亿', '兆']
    // 对应小数部分单位
    const cnDecUnits = ['角', '分', '毫', '厘']
    // 整数金额时后面跟的字符
    const cnInteger = '整'
    // 整型完以后的单位
    const cnIntLast = '元'
    // 金额整数部分
    let IntegerNum
    // 金额小数部分
    let DecimalNum
    // 输出的中文金额字符串
    let ChineseStr = ''
    // 正负值标记
    let Symbol = ''
    // 转成浮点数
    money = parseFloat(money)
    // 如果是0直接返回结果
    if (money === 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger
        return ChineseStr
    }
    // 如果小于0，则将Symbol标记为负，并转为正数
    if (money < 0) {
        money = -money
        Symbol = '负 '
    }
    // 转换为字符串
    money = money.toString()
    // 将整数部分和小数部分分别存入IntegerNum和DecimalNum
    if (money.indexOf('.') === -1) {
        IntegerNum = money
        DecimalNum = ''
    } else {
        const moneyArr = money.split('.')
        IntegerNum = moneyArr[0]
        DecimalNum = moneyArr[1].substr(0, 4)
    }
    // 获取整型部分转换
    if (parseInt(IntegerNum, 10) > 0) {
        let zeroCount = 0
        let IntLen = IntegerNum.length
        for (let i = 0; i < IntLen; i++) {
            // 获取整数的每一项
            let term = IntegerNum.substr(i, 1)
            // 剩余待处理的数量
            let surplus = IntLen - i - 1
            // 用于获取整数部分的扩展单位
            // 剩余数量除以4，比如12345，term为1时，expandUnit则为1，
            // cnIntUnits[expandUnit]对应得到的单位为万
            let expandUnit = surplus / 4
            // 用于获取整数部分的基本单位
            // 剩余数量取余4，比如123，那么第一遍遍历term为1，surplus为2，baseUnit则为2，
            // 所以cnIntRadice[baseUnit]对应得到的基本单位为'佰'
            let baseUnit = surplus % 4
            if (term === '0') {
                zeroCount++
            } else {
                // 连续存在多个0的时候需要补'零'
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0]
                }
                // 归零
                zeroCount = 0
                /*
                cnNums是汉字的零到玖组成的数组，term则是阿拉伯0-9，
                直接将阿拉伯数字作为下标获取中文数字
                例如term是0则cnNums[parseInt(term)]取的就是'零'，9取的就是'玖'
                最后加上单位就转换成功了！
                这里只加十百千的单位
                */
                ChineseStr += cnNums[parseInt(term)] + cnIntRadice[baseUnit]
            }
            /*
              如果baseUnit为0，意味着当前项和下一项隔了一个节权位即隔了一个逗号
              扩展单位只有大单位进阶才需要，判断是否大单位进阶，则通过zeroCount判断
              baseUnit === 0即存在逗号，baseUnit === 0 && zeroCount < 4 意为大单位进阶
            */
            if (baseUnit === 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[expandUnit]
            }
        }
        ChineseStr += cnIntLast
    }
    // 小数部分转换
    if (DecimalNum !== '') {
        let decLen = DecimalNum.length
        for (let i = 0; i < decLen; i++) {
            // 同理，参考整数部分
            let term = DecimalNum.substr(i, 1)
            if (term !== '0') {
                ChineseStr += cnNums[Number(term)] + cnDecUnits[i]
            }
        }
    }
    ChineseStr = Symbol + ChineseStr
    return ChineseStr
}
