import {createStore} from "vuex";
import {inputEmits} from "element-plus";
import {ITab} from "@/store/ITab";
import {useRouter} from "vue-router";
import 权限json from "@/store/权限.json"

interface state全局状态 {
    count: number
    ServerName: string
    备案号: string
    Token: string
    ITabList: Array<ITab>
    Tabs菜单当前Path: string
    权限json: object
    UserInfo: object
    搜索_在线用户: object
    搜索_用户信息: object
    搜索_软件用户: object
    搜索_用户类型: object
    搜索_卡类列表: object
    搜索_卡号列表: object
    搜索_公共变量: object
    搜索_公共函数: object
    搜索_任务池: object
    搜索_登录日志: object
    搜索_余额日志: object
    搜索_积分点数: object
    搜索_制卡日志: object
    搜索_用户消息: object
    搜索_个人中心: object
    搜索_库存日志: object

}


export const store = createStore<state全局状态>({
    state() {
        return {
            count: 0,
            ITabList: [],
            Tabs菜单当前Path: "",
            ServerName: "系统名称待初始化",
            备案号: "暂无备案号",
            Token: window.localStorage.getItem('AdminToken') || '',
            权限json: 权限json,
            UserInfo: {
                "AdminInfo": {
                    "Id": 1,
                    "User": "",
                    "phone": "",
                    "Email": "",
                    "Qq": "",
                    "Status": 1,
                    "authority": "All"
                },
                "UserMsgNoRead": 0
            },
            搜索_在线用户: {},
            搜索_用户信息: {},
            搜索_应用列表: {},
            搜索_软件用户: {},
            搜索_用户类型: {},
            搜索_卡类列表: {},
            搜索_卡号列表: {},
            搜索_公共变量: {},
            搜索_公共函数: {},
            搜索_任务池: {},
            搜索_登录日志: {},
            搜索_余额日志: {},
            搜索_积分点数: {},
            搜索_制卡日志: {},
            搜索_用户消息: {},
            搜索_库存日志: {},
            搜索_个人中心: {数组_可购买充值卡:[],支付通道状态:{},订单信息:{订单ID: "", PayQRCode: "", PayURL: "", 订单状态: 0}},
        }
    },
    mutations: {
        onCountAdd(state全局状态: state全局状态) {
            state全局状态.count++
        },
        addITab(state全局状态: state全局状态, ITab: ITab) {
            const isSome = state全局状态.ITabList.some((item) => item.path == ITab.path)
            //console.log("isSome" + isSome + " path:" + ITab.path + ",Title:" + ITab.title)
            if (!isSome) {
                state全局状态.ITabList.push(ITab)
            }
        },
        DeleteITab(state全局状态: state全局状态, Path: string) {
            const isSome = state全局状态.ITabList.findIndex((item) => item.path == Path)
            state全局状态.ITabList.splice(isSome, 1)
        },
        on更新菜单当前Path(state全局状态: state全局状态, Path: string) {
            state全局状态.Tabs菜单当前Path = Path
        },
        onTabs菜单删除(state全局状态: state全局状态, 命令: string) {
            const index = state全局状态.ITabList.findIndex((item) => item.path == state全局状态.Tabs菜单当前Path)
            switch (命令) {
                case "关闭所有":
                    state全局状态.ITabList = [{path: "/控制面板/仪表台", title: "仪表台"}]
                    sessionStorage.removeItem("Tabs_Router")
                    break;
                case "关闭左边":
                    state全局状态.ITabList.splice(0, index)
                    break;
                case "关闭右边":
                    state全局状态.ITabList.splice(index + 1)
                    break;
                case "关闭其他":
                    state全局状态.ITabList.filter((item) => item.path == state全局状态.Tabs菜单当前Path)
                    break;
                default:
                    console.info("菜单命令信息错误")
            }
        },
        set服务器名称(state全局状态: state全局状态, 服务器名称: string) {
            document.title = 服务器名称
            state全局状态.ServerName = 服务器名称
        },
        set服务器备案号(state全局状态: state全局状态, 备案号: string) {
            state全局状态.备案号 = 备案号
        },
        setToken(state全局状态: state全局状态, Token: string) {
            state全局状态.Token = Token
            window.localStorage.setItem('AdminToken', Token)
        },
        setUserInfo(state全局状态: state全局状态, UserInfo: object) {
            state全局状态.UserInfo = UserInfo
            window.localStorage.setItem('UserInfo', JSON.stringify(UserInfo))
        },
        NeedInit(state全局状态: state全局状态) {
            state全局状态.Token = ''
            window.localStorage.removeItem('AdminToken')
            localStorage.clear()

        },
        set搜索_在线用户(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_在线用户 = data
        },
        set搜索_用户信息(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_用户信息 = data
        },
        set搜索_应用列表(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_用户信息 = data
        },
        set搜索_软件用户(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_软件用户 = data
        },
        set搜索_用户类型(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_用户类型 = data
        },
        set搜索_卡类列表(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_卡类列表 = data
        },
        set搜索_卡号列表(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_卡号列表 = data
        },
        set搜索_公共变量(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_公共变量 = data
        },
        set搜索_公共函数(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_公共函数 = data
        },
        set搜索_任务池(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_任务池 = data
        },
        set搜索_登录日志(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_登录日志 = data
        },
        set搜索_余额日志(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_余额日志 = data
        },
        set搜索_积分点数(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_积分点数 = data
        },
        set搜索_制卡日志(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_制卡日志 = data
        },
        set搜索_用户消息(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_用户消息 = data
        },
        set搜索_个人中心(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_个人中心 = data
        },
        set搜索_库存日志(state全局状态: state全局状态, data: object) {
            state全局状态.搜索_库存日志 = data
        },

    },
    getters: {
        getItabArray(state全局状态: state全局状态) {
            return state全局状态.ITabList
        }
    }

})

