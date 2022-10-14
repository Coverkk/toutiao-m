import request from '@/utils/request'

// 获取频道新闻列表推荐
export const getChannelArticles = params => {
  return request({
    url: '/v1_0/articles',
    params
  })
}
