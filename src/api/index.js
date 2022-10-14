import { login, sendSms, getUserInfo } from './user'

// user.js
// 用户登录接口
export const loginAPI = login
// 请求发送验证码
export const sendSmsAPI = sendSms
// 获取用户自己的信息
export const getUserInfoAPI = getUserInfo
