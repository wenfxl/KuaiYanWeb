//Rsa  使用参考地址https://blog.csdn.net/weixin_44655037/article/details/126746637
import jsrsasign from 'jsrsasign'

export const Rsa生成密匙对 = (func) => {
    let rs = jsrsasign;
// 生产密钥对
    var date1 = new Date().getTime()
    var rsaKeypair = rs.KEYUTIL.generateKeypair("RSA", 1024);
    console.log(new Date().getTime() - date1) //314
// 密钥对象获取pem格式的密钥
    var publicKey = rs.KEYUTIL.getPEM(rsaKeypair.pubKeyObj);
    var privateKey = rs.KEYUTIL.getPEM(rsaKeypair.prvKeyObj, 'PKCS1PRV');

    func(privateKey, publicKey)

}

export const Rsa密匙对校验 = (privateKey, publicKey) => {
    try {
        let prv = jsrsasign.KEYUTIL.getKey(publicKey);   //传入公钥
        let iis = prv.encrypt('明文');  //加密
        prv = jsrsasign.KEYUTIL.getKey(privateKey);  //传入私钥
        let keyStr = prv.decrypt(iis);   //我这边的需求是返回的base64  所以我又转成16进制。 本身就是16进制，不需要在去转
        console.log("验证密匙对值为'明文'则正确:" + keyStr)
        return keyStr === '明文'
    }catch (e){
        return false
    }

}
