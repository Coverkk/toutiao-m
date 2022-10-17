// 频道请求模块
import request from '@/utils/request'

// 获取所有频道列表
export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 添加用户频道
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户指定频道
export const delUserChannel = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
