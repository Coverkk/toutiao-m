import { login, sendSms, getUserInfo, getUserChannels } from './user'

// user.js
// 用户登录接口
export const loginAPI = login
// 请求发送验证码
export const sendSmsAPI = sendSms
// 获取用户自己的信息
export const getUserInfoAPI = getUserInfo
// 获取用户频道
export const getUserChannelsAPI = getUserChannels
