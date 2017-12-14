/**
 * 加密
 */
import CryptoJS from 'crypto-js'

const key = 'niugu123niugu456niugu123'
const iv = '12312300'

const Security = {
  md5 (msg) {
    return CryptoJS.MD5(msg).toString(CryptoJS.enc.Hex).toUpperCase()
  },
  /**
   * 加密
   */
  encode (msg) {
    const msgHex = CryptoJS.enc.Utf8.parse(msg)
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const ivHex = CryptoJS.enc.Utf8.parse(iv)

    const encrypted = CryptoJS.TripleDES.encrypt(msgHex, keyHex, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivHex
    })
    const res = CryptoJS.enc.Hex.stringify(encrypted.ciphertext)
    return res.toUpperCase()
  },
  /**
   * 解密
   */
  decode (msg) {
    const msgHex = CryptoJS.enc.Hex.parse(msg)
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const ivHex = CryptoJS.enc.Utf8.parse(iv)

    const decrypted = CryptoJS.TripleDES.decrypt({
      ciphertext: msgHex
    }, keyHex, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivHex
    })
    return CryptoJS.enc.Utf8.stringify(decrypted)
  }
}

window.Security = Security

export default Security
