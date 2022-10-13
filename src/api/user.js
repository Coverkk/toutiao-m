// 用户请求模块
import request from '@/utils/request'

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 请求发送验证码
export const sendSms = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
