// 搜索请求模块
import request from '@/utils/request'

// 联想建议
export const searchSuggestion = query => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: query
    }
  })
}
