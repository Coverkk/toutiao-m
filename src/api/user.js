// 用户请求模块
import request from '@/utils/request'
// import store from '@/store/index'

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

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export const followUser = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注
export const cancelFollowUser = autId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${autId}`
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
