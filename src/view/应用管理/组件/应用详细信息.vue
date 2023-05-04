<template>
  <el-dialog v-model="is对话框可见2" :title="'编辑应用配置AppID:'+Props.id" @open="on对话框被打开"
             :width="is移动端()?'90%':'60%'"
             @close="on对话框被关闭"
             top="5vh"
             style="height: 90%"
             draggable
  >

    <div style="height:72vh;overflow:auto;padding:0 12px;">
      <el-form :inline="false" style="min-width: 80px;min-height: 100%" label-width="160px" :rules="on表单校验"
               :model="data"
               :label-position="is移动端()?'top':'right'" ref="ruleFormRef">
        <el-tabs class="应用详细信息顶部标签"  v-model="应用详细信息顶部标签现行选项">
          <el-tab-pane label="应用设置" name="应用设置">

            <el-form-item label="应用名称" prop="AppName">
              <el-input v-model="data.AppName" placeholder="请输入应用名称"/>
            </el-form-item>


            <el-form-item label="运营状态" prop="Status">
              <el-radio-group v-model="data.Status" :size="is移动端()?'small':''">
                <el-popover placement="left" trigger="hover" content="所有用户禁止登录">
                  <template #reference>
                    <el-radio-button :label="1">停止运营</el-radio-button>
                  </template>
                </el-popover>
                <el-popover placement="top" trigger="hover" content="非Vip也可正常登录">
                  <template #reference>
                    <el-radio-button :label="2">免费运营</el-radio-button>
                  </template>
                </el-popover>
                <el-radio-button :label="3">正常运营</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态提示" prop="AppStatusMessage">
              <el-input v-model="data.AppStatusMessage"/>
            </el-form-item>

            <el-form-item label="心跳超时" prop="OutTime">
              <el-tooltip
                  class="box-item"
                  effect="light"
                  :content="时间_计算天时分秒提示 (data.OutTime)"
                  placement="left"
              >
                <div style="display: flex; align-items: center">
                  <el-input-number v-model="data.OutTime" :step="10" :value-on-clear="10" :min="0"/>
                  秒
                  <el-button @click="data.OutTime=5*60" :style="is移动端()?'width: 9vh':'width: 4vh'">
                    {{ "5分钟" }}
                  </el-button>
                  <el-button @click="data.OutTime=15*60" :style="is移动端()?'width: 9vh':'width: 4vh'">
                    {{ "15分" }}
                  </el-button>
                  <el-button @click="data.OutTime=30*60" :style="is移动端()?'width: 9vh':'width: 4vh'">
                    {{ "30分" }}
                  </el-button>
                  <el-button @click="data.OutTime=60*60" :style="is移动端()?'width: 9vh':'width: 4vh'">
                    {{ "60分" }}
                  </el-button>
                </div>
              </el-tooltip>

            </el-form-item>
            <el-popconfirm
                confirm-button-text="查看详细描述"
                placement="top-end"
                cancel-button-text=" "
                width="30%"
                icon-color="#626AEF"
                title="一行一个,格式推荐使用[1.2.5],大版本号.小版本号.编译版本号,第一行为最新版本,后面为可用版本,自动更新只判断提示大小版本号,主动更新才判断检测编译版本号,非可用版本,强制更新,支持通配符[*]代表这一位通配0-9"
                @confirm="on打开版本信息详细描述"
            >
              <template #reference>
                <el-form-item label="可用版本" prop="AppVer">
                  <el-input type="textarea" autosize v-model="data.AppVer"/>
                </el-form-item>
              </template>
            </el-popconfirm>

            <el-form-item label="注册送卡" prop="RegisterGiveKaClassId">
              <el-popover placement="right" trigger="hover"
                          content="设置一个注册送卡类,注册送时间,点数,余额,积分都可以在设置,用户注册就会自动充值这个卡类简单方便">
                <template #reference>
                  <el-select v-model="data.RegisterGiveKaClassId" clear placeholder="选择卡类">
                    <el-option key="0" label="无赠送" :value="0"/>
                    <el-option v-for="(值,index) in 对象_卡类型" :key="index" :label="对象_卡类型[index]"
                               :value="Number(index)"/>
                  </el-select>
                </template>
              </el-popover>
            </el-form-item>

            <el-form-item label="绑定模式" prop="VerifyKey">
              <el-popover placement="right" trigger="hover"
                          content="登录是否验证绑定信息,是否允许更换绑定信息">
                <template #reference>
                  <el-select v-model="data.VerifyKey" clear>
                    <el-option key="1" label="免验证可以换绑" :value="1"/>
                    <el-option key="2" label="免验证禁止换绑" :value="2"/>
                    <el-option key="3" label="验证可以换绑" :value="3"/>
                    <el-option key="4" label="验证禁止换绑" :value="4"/>
                  </el-select>
                </template>
              </el-popover>
            </el-form-item>

            <el-form-item label="绑定相同" prop="IsUserKeySame">
              <el-popover placement="right" trigger="hover"
                          content="不同用户绑定信息可否相同,绑定(账号、机器码,等)可防止重复试用">
                <template #reference>
                  <el-select v-model="data.IsUserKeySame" clear>
                    <el-option key="1" label="不同用户可以相同" :value="1"/>
                    <el-option key="2" label="不同用户不可相同" :value="2"/>
                  </el-select>
                </template>
              </el-popover>
            </el-form-item>

            <el-form-item :label="isVipType?'换绑扣秒':'换绑扣点'" prop="UpKeyData">
              <el-input-number v-model="data.UpKeyData" :step="10" :value-on-clear="10" :min="0"/>
            </el-form-item>
            <el-form-item label="应用主页" prop="UrlHome">
              <el-input v-model="data.UrlHome"/>
            </el-form-item>

            <el-form-item icon="icon" label="更新下载地址json" prop="UrlDownload">

              <el-input type="textarea" autosize v-model="data.UrlDownload"/>

            </el-form-item>
            <el-form-item label="公告" prop="AppGongGao">
              <el-input type="textarea" autosize v-model="data.AppGongGao"/>
            </el-form-item>
            <el-popover
                placement="top-end"
                :width="200"
                trigger="hover"
                :content="isVipType?'只有会员时间未到期才可以读取,需要更多请使用专属云变量,效果相同':'只有剩余点数>0才可以读取,需要更多请使用专属云变量,效果相同'"
            >
              <template #reference>
                <el-form-item label="Vip数据" prop="VipData">
                  <el-input type="textarea" autosize v-model="data.VipData"/>
                </el-form-item>
              </template>
            </el-popover>


            <el-popover
                placement="top-end"
                :width="200"
                trigger="hover"
                content="余额和积分的区别,余额所有这个账号登录的应用都可以使用,积分只有这个账号登录的这个应用可以使用"
            >
              <template #reference>
                <el-form-item label="1Rmb兑换多少积分" prop="RmbToVipNumber">
                  <el-input v-model.number="data.RmbToVipNumber"/>
                </el-form-item>
              </template>
            </el-popover>
            <el-form-item label="验证码(暂未实现)" prop="Captcha">
              <el-input v-model="data.Captcha"/>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="安全设置" name="安全设置">
            <el-form-item label="web地址" prop="AppWeb">
              <el-input v-model="data.AppWeb" readonly="readonly" style="background: #889aa4">

                <template #prepend>
                  {{SerVerUrl}}
                </template>

                <template #append>
                  <el-popover
                      placement="top-start"
                      trigger="hover"
                      content="复制App配置到剪辑版"
                  >
                    <template #reference>
                    <el-button @click="on置剪辑版配置信息" icon="DocumentCopy"/>
                    </template>
                  </el-popover>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="通讯加密类型" prop="CryptoType">
              <el-radio-group v-model="data.CryptoType" :size="is移动端()?'small':''">
                <el-radio-button :label="1">明文</el-radio-button>
                <el-popover
                    placement="top"
                    trigger="hover"
                    content="AES_192CBC_IV0"
                >
                  <template #reference>
                    <el-radio-button :label="2">Md5签名Aes加密</el-radio-button>
                  </template>
                </el-popover>
                <el-popover
                    placement="top"
                    trigger="hover"
                    content="RSA交换AES密钥,重要数据RSA通讯防山寨服务器或客户端,一般数据AES加密通讯提高性能,混合使用性能安全兼顾,Rsa_1024位PKCS1"
                >
                  <template #reference>
                    <el-radio-button :label="3">Rsa交换Aes密匙后混合使用</el-radio-button>
                  </template>
                </el-popover>

              </el-radio-group>
              <div class="重置密钥" v-show="data.CryptoType>1">
                <el-tooltip content="重置密钥"
                            effect="dark"
                            placement="top">
                  <el-icon @click="on重置密钥">
                    <Refresh/>
                  </el-icon>
                </el-tooltip>
              </div>
            </el-form-item>


            <el-form-item v-show="data.CryptoType===2" label="加解密密匙" prop="CryptoKeyAes">
              <el-input type="text" v-model="data.CryptoKeyAes"/>
            </el-form-item>

            <el-form-item v-show="data.CryptoType===3" label="Rsa私钥" prop="CryptoKeyPrivate">
              <el-input type="textarea" v-model="data.CryptoKeyPrivate"/>
            </el-form-item>

            <el-form-item v-show="data.CryptoType===3" label="Rsa公钥" prop="CryptoKeyPublic">
              <el-input type="textarea" v-model="data.CryptoKeyPublic"/>
            </el-form-item>


            <el-form-item label="默认最大在线数量" prop="MaxOnline">
              <el-input-number v-model="data.MaxOnline" :step="1" :value-on-clear="1" :min="0"/>
            </el-form-item>

            <el-form-item label="超在线最大数处理方式" prop="ExceedMaxOnlineOut">
              <el-radio-group v-model="data.ExceedMaxOnlineOut" :size="is移动端()?'small':''">
                <el-radio-button :label="1">注销在线中最先登录的记录</el-radio-button>
                <el-radio-button :label="2">提示登录数量超过限制</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="专属云变量" name="专属云变量">

<!--            <el-divider v-if="专属变量.length>0">
              {{ data.AppName }}
              -专属变量
            </el-divider>-->
            <el-form-item v-for="(data,key) in 专属变量" :label="data.Name" :key="key" style="width: 100%">
              <div class="专属变量" style="display: inline-block ;width: 100%">
                <el-input v-if="data.Type===1" type="text" v-model="data.Value"
                          style="width: calc(100% - 70px - 50px)"/>
                <el-input v-if="data.Type===2" type="textarea" v-model="data.Value"
                          :autosize="{ minRows: 2, maxRows: 23 }" style="width: calc(100% - 70px - 50px)"/>
                <el-radio-group v-if="data.Type===3" v-model="data.Value">
                  <el-radio label="1">开启</el-radio>
                  <el-radio label="0">关闭</el-radio>
                </el-radio-group>
                <div style="float: right;padding-left: 5px">
                  <el-switch
                      :active-value="1"
                      :inactive-value="0"
                      v-model="data.IsVip"
                      width="60"
                      style="margin-left: 5px"
                      inline-prompt
                      active-text="限Vip"
                      inactive-text="任意"
                  />
                  <el-popconfirm title="确定删除?"
                                 placement="right"
                                 @confirm="on删除专属变量(key)" confirm-button-text="确定"
                                 cancel-button-text="取消">

                    <template #reference>
                      <el-button type="danger" size="small" :icon="Delete" circle style=" margin-left: 5px"/>
                    </template>
                  </el-popconfirm>

                </div>

              </div>
            </el-form-item>
            <el-divider>
              <el-button type="primary" size="large" :icon="Plus" style="width: 110px" round
                         @click="is添加专属变量 = true">
                添加专属变量
              </el-button>
            </el-divider>


            <el-dialog
                v-model="is添加专属变量"
                width="30%"
                title="选择变量类型"
                append-to-body
            >
              <el-form :inline="false" style="min-width: 80px ;top: 10px" label-width="130px"
                       :model="添加专属变量"
                       label-position="top" ref="ruleFormRef">
                <el-form-item label="变量名称" prop="Name">
                  <el-input v-model="添加专属变量.Name" placeholder="请输入变量名称" style="width: 263px"/>
                </el-form-item>

                <el-form-item label="变量类型" prop="Status">
                  <el-radio-group v-model="添加专属变量.Type" :size="is移动端()?'small':''">
                    <el-radio-button :label="1">单行文本</el-radio-button>
                    <el-radio-button :label="2">多行文本</el-radio-button>
                    <el-radio-button :label="3">逻辑开关</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <div style="text-align: right; margin: 0">
                  <el-button size="small" text @click="on添加专属变量(false)">取消</el-button>
                  <el-button size="small" type="primary" @click="on添加专属变量(true)"
                  >确定
                  </el-button
                  >
                </div>
              </el-form>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="is对话框可见2=false">取 消</el-button>
        <el-button type="primary" @click="on确定按钮被点击(ruleFormRef)">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {SaveApp信息, GetApp详细信息} from "@/api/应用列表api";
import {New, DeleteInfo, GetList} from "@/api/公共变量api";
import {ElMessage, FormInstance} from "element-plus";
import {is移动端, 时间_计算天时分秒提示, 置剪辑版文本} from "@/utils/utils";
import {Rsa密匙对校验, Rsa生成密匙对} from "@/utils/Rsa工具";

import {CirclePlus, Plus, Refresh} from "@element-plus/icons";
import {Delete} from "@element-plus/icons-vue";

const Props = defineProps({
  is对话框可见: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: 0
  },
})
const emit = defineEmits(['on对话框详细信息关闭'])

const isVipType = ref(true)  // 真是件  假点数
const 应用详细信息顶部标签现行选项 = ref("应用设置")


watch(() => Props.is对话框可见, (newVal, oldVal) => {
  if (newVal) {
    is对话框可见2.value = newVal;
    console.info("is对话框可见2被检测到改变了:")
  }
})

const is对话框可见2 = ref(false)
const 对象_卡类型 = ref({})
const SerVerUrl = ref("http://127.0.0.1:18888")
const data = ref({
  "AppId": 0,
  "AppWeb": "/AppApi?AppId=10001",
  "AppName": "测试应用",
  "Status": 3,
  "AppStatusMessage": "正常运营中",
  "AppVer": "1.1.2\n1.1\n1.0",
  "RegisterGiveKaClassId": 0,
  "VerifyKey": 1,
  "IsUserKeySame": 1,
  "UpKeyData": 10,
  "OutTime": 1800,
  "UrlHome": "https://www.baidu.com/",
  "UrlDownload": "{\n    \"htmlurl\": \"www.baidu.com(自动下载失败打开指定网址,手动更新地址\",\n    \"data\": [{\n        \"WenJianMin\": \"文件名.exe\",\n        \"md5\": \"e10adc3949ba59abbe56e057f20f883e(小写文件md5可选,有就校验,空就只校验文件名)\",\n        \"Lujing\": \"/(下载本地相对路径)\",\n        \"size\": \"12345\",\n        \"url\": \"https://www.baidu.com/文件名.exe(下载路径)\",\n        \"YunXing\": \"1(值为更新完成后会运行这个文件,只能有一个文件值为1)\"\n\n    }, {\n        \"WenJianMin\": \"文件名.dll\",\n        \"md5\": \"e10adc3949ba59abbe56e057f20f883e(小写文件md5可选,有就校验,没有就文件名校验)\",\n        \"Lujing\": \"/(下载本地相对路径)\",\n        \"size\": \"12345\",\n        \"url\": \"https://www.baidu.com/文件名.dll(下载路径)\",\n        \"YunXing\": \"0\"\n    }]\n}",
  "AppGongGao": "我是一条公告",
  "VipData": "{\n\"VipData\":\"这里的数据,只有登录成功并且账号会员不过期才会传输出去的数据\",\n\"VipData2\":\"这里的数据,只有登录成功并且账号会员不过期才会传输出去的数据\"\n}",
  "CryptoType": 1,
  "CryptoKeyAes": "aE0WDmhp3j84STssmc2EypU5",
  "CryptoKeyPrivate": "",
  "CryptoKeyPublic": "",
  "MaxOnline": 1,
  "ExceedMaxOnlineOut": 1,
  "AppType": 1,
  "RmbToVipNumber": 1,
  "Captcha": ""
})

const ruleFormRef = ref<FormInstance>()
const is重新读取 = ref(false)
const on确定按钮被点击 = async (formEl: FormInstance | undefined) => {

  console.info("on确定按钮被点击")
  console.info(data.value)
  if (!formEl) return

  let 表单验证结果 = await formEl.validate((valid, fields) => {
    if (!valid) {
      console.log('参数验证失败', fields)
    } else {
      console.log('参数验证通过')
    }
  })
  console.info("表单验证结果")
  console.info(表单验证结果)
  if (!表单验证结果) return   //如果是假直接返回
  let 返回;
  if (Props.id === 0) {

  } else {
    返回 = await SaveApp信息({"AppData": data.value, "PublicData": 专属变量.value});
  }

  console.log(返回)
  if (返回.code == 0) {
    is重新读取.value = true
    is对话框可见2.value = false
    ElMessage({
      type: "success",
      message: 返回.msg,
      showClose: true,
    })
  }
}
const on打开版本信息详细描述 = () => {
  window.open('https://zhidao.baidu.com/question/818814935849090692.html', '版本信息详细描述')
}
const on重置密钥 = () => {
  if (data.value.CryptoType === 2) {
    let e = 24;
    let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (let i = 0; i < e; i++) {
      n += t.charAt(Math.floor(Math.random() * a));
    }
    data.value.CryptoKeyAes = n
  }

  if (data.value.CryptoType === 3) {
    Rsa生成密匙对(function (privateKey, publicKey) {
      data.value.CryptoKeyPublic = publicKey
      data.value.CryptoKeyPrivate = privateKey
      console.log(privateKey, publicKey);
    })
  }
}

const on校验表单重置 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
onMounted(() => {
  console.info("用户详细信息对话框加载完毕了")
})

const 校验是否json = (rule: any, value: any, callback: any) => {
  let c: string = ""
  try {
    JSON.parse(data.value.UrlDownload)
  } catch (d: any) {
    let str = d.toString()
    //校验UrlDownload是否json失败SyntaxError: Unexpected non-whitespace character after JSON at position 597
    //console.error("校验UrlDownload是否json失败"+d)
    str = str.match(/JSON at position (\d+)/)[1]
    c = "json格式错误,位置(" + str + ")字符处:" + value.substring(Number(str))
    //console.error(c)
  }
  if (c != "") {
    callback(new Error(c))
  } else {
    callback()
  }
}
const 校验Rsa密匙对校验 = (rule: any, value: any, callback: any) => {
  if (!Rsa密匙对校验(data.value.CryptoKeyPrivate, data.value.CryptoKeyPublic)) {
    callback(new Error("Rsa公私密钥对不匹配"))
  } else {
    callback()
  }
}


const on表单校验 = ref({
  AppName: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 4, message: '最低4位字符', trigger: ''}
  ],
  CryptoKeyAes: [
    {min: 24, max: 24, message: 'Aes_cbc_192密匙长度为24位字符', trigger: 'blur'},
  ],
  Phone: [
    {pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/, message: '请输入合法手机号', trigger: 'blur'},
  ],
  VipData: [{validator: 校验是否json, trigger: 'blur'}],
  UrlDownload: [{validator: 校验是否json, trigger: 'blur'}],
  CryptoKeyPrivate: [{validator: 校验Rsa密匙对校验, trigger: 'blur'}],
})


const on对话框被打开 = () => {
  is重新读取.value = false
  console.info("on对话框被打开id:" + Props.id)
  on校验表单重置(ruleFormRef.value)
  读取详细信息(Props.id)

}
const 读取详细信息 = async (id: number) => {
  if (id > 0) {
    let 返回 = await GetApp详细信息({"Id": id})
    if (返回.code == 0) {

      data.value = 返回.data.AppInfo
      SerVerUrl.value = "http://" + 返回.data.ServerUrl + ":" + 返回.data.Port
      对象_卡类型.value = 返回.data.KaClass
      if (返回.data.AppType === 2 || 返回.data.AppType === 4) {
        isVipType.value = false
      } else {
        isVipType.value = true
      }

      await on读取专属变量()
    } else {
      is重新读取.value = false
      is对话框可见2.value = false
    }
  } else {
    data.value = {
      "AppId": 10001,
      "AppWeb": "/AppApi?AppId=10001",
      "AppName": "测试应用",
      "Status": 3,
      "AppStatusMessage": "正常运营中",
      "AppVer": "1.1.2\n1.1\n1.0",
      "RegisterGiveKaClassId": 0,
      "VerifyKey": 1,
      "IsUserKeySame": 1,
      "UpKeyData": 10,
      "OutTime": 1800,
      "UrlHome": "https://www.baidu.com/",
      "UrlDownload": "{\n    \"htmlurl\": \"www.baidu.com(自动下载失败打开指定网址,手动更新地址\",\n    \"data\": [{\n        \"WenJianMin\": \"文件名.exe\",\n        \"md5\": \"e10adc3949ba59abbe56e057f20f883e(小写文件md5可选,有就校验,空就只校验文件名)\",\n        \"Lujing\": \"/(下载本地相对路径)\",\n        \"size\": \"12345\",\n        \"url\": \"https://www.baidu.com/文件名.exe(下载路径)\",\n        \"YunXing\": \"1(值为更新完成后会运行这个文件,只能有一个文件值为1)\"\n\n    }, {\n        \"WenJianMin\": \"文件名.dll\",\n        \"md5\": \"e10adc3949ba59abbe56e057f20f883e(小写文件md5可选,有就校验,没有就文件名校验)\",\n        \"Lujing\": \"/(下载本地相对路径)\",\n        \"size\": \"12345\",\n        \"url\": \"https://www.baidu.com/文件名.dll(下载路径)\",\n        \"YunXing\": \"0\"\n    }]\n}",
      "AppGongGao": "我是一条公告",
      "VipData": "{\n\"VipData\":\"这里的数据,只有登录成功并且账号会员不过期才会传输出去的数据\",\n\"VipData2\":\"这里的数据,只有登录成功并且账号会员不过期才会传输出去的数据\"\n}",
      "CryptoType": 2,
      "CryptoKeyAes": "aE0WDmhp3j84STssmc2EypU5",
      "CryptoKeyPrivate": "",
      "CryptoKeyPublic": "",
      "MaxOnline": 1,
      "ExceedMaxOnlineOut": 1,
      "AppType": 1,
      "RmbToVipNumber": 1,
      "Captcha": ""
    }

  }
}


const on对话框被关闭 = () => {
  console.info("on对话框被关闭")
  is对话框可见2.value = false
  emit('on对话框详细信息关闭', is重新读取.value)

}
const on置剪辑版配置信息 = () => {
  let appINfo = {}
  if (data.value.CryptoType === 1) {
    appINfo = {
      "AppWeb": SerVerUrl.value + data.value.AppWeb,
      "CryptoKeyAes": data.value.CryptoKeyAes,
      "CryptoKeyPublic": data.value.CryptoKeyPublic,
      "CryptoType": data.value.CryptoType
    }
  } else if (data.value.CryptoType === 2) {
    appINfo = {
      "AppWeb": SerVerUrl.value + data.value.AppWeb,
      "CryptoKeyAes": data.value.CryptoKeyAes,
      "CryptoType": data.value.CryptoType
    }
  } else if (data.value.CryptoType === 3) {
    appINfo = {
      "AppWeb": SerVerUrl.value + data.value.AppWeb,
      "CryptoKeyPublic": data.value.CryptoKeyPublic,
      "CryptoType": data.value.CryptoType
    }
  }

  置剪辑版文本(JSON.stringify(appINfo), "已复制:" + JSON.stringify(appINfo))

}

const 专属变量 = ref([
  {
    "AppId": 1,
    "Name": "测试逻辑开关",
    "Value": "1",
    "Type": 3,
    "IsVip": 1
  },
  {
    "AppId": 1,
    "Name": "系统名称",
    "Value": "Ty通用软件管理系统",
    "Type": 1,
    "IsVip": 1
  },
  {
    "AppId": 1,
    "Name": "系统地址",
    "Value": "www.baidu.com",
    "Type": 1,
    "IsVip": 1
  },
  {
    "AppId": 1,
    "Name": "超长1w+变量",
    "Value": "const on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})\nconst on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})\nconst on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})const on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})\nconst on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})const on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})const on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})\nconst on表单校验 = ref({\n  Name: [\n    {required: true, message: '请输入变量名称', trigger: 'blur'},\n    {min: 1, message: '最低1位字符', trigger: ''}\n  ],\n  Value: [\n    {min: 1, message: '最低1位字符', trigger: ''},\n    {max: 20000, message: '最长20000位字符', trigger: ''}\n  ],\n})",
    "Type": 2,
    "IsVip": 1
  }
])
let is添加专属变量 = ref(false)
const 添加专属变量 = ref({
  "AppId": 1,
  "Name": "",
  "Value": "",
  "Type": 1,
  "IsVip": 0
})
const on读取专属变量 = async () => {
  const res = await GetList({AppId: data.value.AppId, Type: 1, Size: 50, Page: 1, Keywords: ""})
  if (res.code == 0) {
    专属变量.value = res.data.List
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
  }
}
const on添加专属变量 = async (是否添加: boolean) => {


  if (!是否添加) {
    is添加专属变量.value = false
    return
  }
  添加专属变量.value.Name = 添加专属变量.value.Name.replace(/\s/g, "");
  if (添加专属变量.value.Name === "") {
    ElMessage({
      type: "warning",
      message: "名称不能为空",
      showClose: true,
    })
    return
  }

  let NewPublicData = {
    "AppId": data.value.AppId,
    "Name": 添加专属变量.value.Name,
    "Value": 添加专属变量.value.Type==3?"1":"",
    "Type": 添加专属变量.value.Type,
    "IsVip": 0
  }

  const res = await New(NewPublicData)
  if (res.code == 0) {
    is添加专属变量.value = false
    专属变量.value.push(NewPublicData)
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
  }
}

const on删除专属变量 = async (数组索引: number) => {
  const res = await DeleteInfo({
    "data": [{
      "AppId": 专属变量.value[数组索引].AppId,
      "Name": 专属变量.value[数组索引].Name
    }]
  })


  if (res.code == 0) {
    is添加专属变量.value = false
    专属变量.value.splice(数组索引, 1)
    ElMessage({
      type: "success",
      message: res.msg,
      showClose: true,
    })
  }
}


</script>

<style scoped lang="scss">

.li展示不可修改信息 {
  font-size: 16px;
  margin-left: 10px;
  float: left;
  clear: right;
  width: 100%;
  height: 30px;
  word-wrap: break-word;
  word-break: normal;
}

.重置密钥 {
  margin: 0;

  color: #606266;
  float: right;
  padding: 0;

  .el-icon {
    /*设置边框阴影*/
    font-size: 18px;
    margin-left: 10px;
    margin-top: 5px;
    padding: 5px;
    ///*边框 1px  颜色 */
    border: 1px solid rgb(235, 238, 245);
    color: #0c0d0e;
    //box-shadow: 2px 2px 3px 0 rgba(45, 75, 74, 0.6);
    speak: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    cursor: pointer; //改变鼠标样式为手型
  }
}
</style>
